const {_electron:electron,chromium,expect}=require('@playwright/test');
const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),qa=path.join(root,'.qa','planner-print-'+Date.now()),data=path.join(qa,'data'),out=path.join(root,'output','pdf');
let app,w,browser;const errors=[];
async function target(file){await app.evaluate(({dialog},filePath)=>{dialog.showSaveDialog=async()=>({canceled:false,filePath});},file);}
async function saved(){await w.waitForTimeout(1100);await expect(w.getByText('Alle Änderungen gespeichert')).toHaveText('Alle Änderungen gespeichert');}
(async()=>{
  await fs.mkdir(qa,{recursive:true});await fs.mkdir(out,{recursive:true});await fs.cp(path.join(root,'demo','data'),data,{recursive:true});
  const s=JSON.parse(await fs.readFile(path.join(data,'diary.json'),'utf8')),project=s.projects[0],plan=s.plans[0];
  app=await electron.launch({...(process.env.MODULO_PACKAGED_EXE?{executablePath:process.env.MODULO_PACKAGED_EXE,args:[]}:{args:[root]}),env:{...process.env,MODULO_TEST_DATA:data},timeout:60000});
  w=await app.firstWindow();w.setDefaultTimeout(20000);w.on('pageerror',e=>errors.push(e.message));
  await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows()[0].setSize(1920,1200));
  await w.getByRole('navigation',{name:'Module'}).getByRole('button',{name:'Bauzeitenplaner',exact:true}).click();
  await w.getByLabel('Gewerk filtern').selectOption(plan.trades.find(g=>g.code==='EL').id);
  await w.getByRole('button',{name:'Exportieren',exact:true}).click();await expect(w.getByLabel('Planexport Layout')).toHaveValue('detail');
  await w.getByLabel('Planexport Layout').selectOption('list');await w.getByLabel('Planexport Papier').selectOption('A4');await w.getByRole('button',{name:'Druckvorschau',exact:true}).click();
  await expect(w.frameLocator('iframe').getByRole('heading',{name:'BAUZEITENPLAN - VORGANGSLISTE'}).first()).toBeVisible();await expect(w.frameLocator('iframe').locator('.timeline')).toHaveCount(0);
  await w.getByLabel('Planexport Layout').selectOption('overall');await expect(w.locator('iframe')).toHaveCount(0);await w.getByLabel('Planexport Papier').selectOption('A0');await w.getByLabel('Planexport Zeitskala').selectOption('month');await w.getByRole('button',{name:'Druckvorschau',exact:true}).click();await expect(w.frameLocator('iframe').locator('.activity-bar').first()).toBeVisible();
  await w.getByRole('button',{name:'Planer-Dialog schließen',exact:true}).click();await saved();
  const getTrade=code=>plan.trades.find(g=>g.code===code).id;
  const chosen=plan.tasks.filter(t=>['EL','HZ','LU','SA','TB','ES','BO'].some(c=>getTrade(c)===t.tradeId)).filter(t=>t.area.endsWith('BA 01')||t.area.endsWith('BA 02'));
  const settings={projectId:project.id,taskIds:chosen.map(t=>t.id),from:'2026-08-01',to:'2027-03-31',paper:'A2',layout:'overall',scale:'month',format:'pdf',baselineId:plan.baselines[0].id};
  const cases=[
    {file:path.join(out,'Modulo-Demo-Gesamtterminplan.pdf'),options:settings},
    {file:path.join(out,'Modulo-Demo-Gewerketerminplan.pdf'),options:{...settings,layout:'detail',paper:'A3',taskIds:plan.tasks.filter(t=>t.tradeId===getTrade('FL')).slice(0,8).map(t=>t.id)}},
    {file:path.join(out,'Modulo-Demo-Vorgangsliste.pdf'),options:{...settings,layout:'list',paper:'A3'}},
    {file:path.join(qa,'stress-a0.pdf'),options:{...settings,paper:'A0',taskIds:plan.tasks.map(t=>t.id)}},
    {file:path.join(qa,'tiled-a4.pdf'),options:{...settings,paper:'A4',scale:'day',from:'2026-10-01',to:'2026-11-20',taskIds:plan.tasks.filter(t=>t.title.startsWith('TEST')).map(t=>t.id)}},
  ];
  browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1800,height:1300}}),results=[];
  for(const c of cases){
    const report=await w.evaluate(options=>window.diary.previewPlan(options),c.options);await fs.writeFile(path.join(qa,path.basename(c.file)+'.html'),report.html);await page.setContent(report.html);await page.emulateMedia({media:'print'});await page.evaluate(()=>document.fonts.ready);
    const geometry=await page.evaluate(()=>[...document.querySelectorAll('.sheet')].map(sheet=>{const footer=sheet.querySelector('footer').getBoundingClientRect(),legend=sheet.querySelector('.legend').getBoundingClientRect(),table=sheet.querySelector('table').getBoundingClientRect(),th=sheet.querySelector('thead').getBoundingClientRect(),svg=sheet.querySelector('.timeline')?.getBoundingClientRect();return {tableBottom:table.bottom,legendTop:legend.top,footerTop:footer.top,tableRows:table.height-th.height,svgHeight:svg?.height,overflow:[...sheet.querySelectorAll('td,th')].some(td=>td.scrollWidth>td.clientWidth+2)};}));
    assert.ok(geometry.every(g=>g.tableBottom<=g.legendTop+1&&g.legendTop<g.footerTop),'table/legend/footer overlap: '+JSON.stringify(geometry));assert.ok(geometry.every(g=>!g.overflow),'text column overflow: '+JSON.stringify(geometry));assert.ok(geometry.every(g=>g.svgHeight===undefined||Math.abs(g.svgHeight-g.tableRows)<1.5),'chart/table row alignment: '+JSON.stringify(geometry));
    await target(c.file);const result=await w.evaluate(options=>window.diary.exportPlan(options),c.options);assert.equal(result.pages,report.pages);assert.equal((await fs.readFile(c.file)).subarray(0,5).toString(),'%PDF-');
    results.push({file:c.file,pages:result.pages,options:c.options});console.log(path.basename(c.file)+': '+result.pages+' pages');
  }
  assert.deepEqual(errors,[]);await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify({status:'passed',qa,examples:cases.slice(0,3).map(c=>c.file)}));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();if(app)await app.close();});
