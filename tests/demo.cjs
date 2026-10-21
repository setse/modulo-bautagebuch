const {_electron:electron,expect}=require('@playwright/test');
const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict'),JSZip=require('jszip');
const {stateSchema}=require('../electron/model.cjs');
const root=path.resolve(__dirname,'..'),demo=path.join(root,'demo'),qa=path.join(root,'.qa','demo-'+Date.now()),data=path.join(qa,'data');
let app,w;const errors=[];
async function launch(){
  const packaged=process.env.MODULO_PACKAGED_EXE||path.join(root,'release','win-unpacked','Modulo Bautagebuch.exe');
  const hasPackaged=await fs.access(packaged).then(()=>true,()=>false);
  app=await electron.launch({...(hasPackaged?{executablePath:packaged,args:[]}:{args:[root]}),env:{...process.env,MODULO_TEST_DATA:data},timeout:60000});
  w=await app.firstWindow();w.setDefaultTimeout(20000);w.on('pageerror',e=>errors.push(e.message));
  await app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows()[0].setSize(2560,1440));
  await expect(w.getByRole('heading',{name:'Bautagebuch',exact:true})).toBeVisible();
}
async function saved(){await w.waitForTimeout(1100);await expect(w.getByText('Alle Änderungen gespeichert')).toHaveText('Alle Änderungen gespeichert');}
async function state(){await saved();return (await w.evaluate(()=>window.diary.load())).state;}
async function target(file){await app.evaluate(({dialog},filePath)=>{dialog.showSaveDialog=async()=>({canceled:false,filePath});},path.join(qa,file));}
async function project(number){await w.getByRole('button',{name:'Projekt auswählen'}).click();await w.getByRole('listbox',{name:'Projekte'}).getByRole('option').filter({hasText:number}).click();}
async function moduleView(name){await w.getByRole('navigation',{name:'Module'}).getByRole('button',{name,exact:true}).click();}
async function capture(file){await app.evaluate(({BrowserWindow})=>{const win=BrowserWindow.getAllWindows()[0],[x,y]=win.getSize();win.setSize(x+1,y);win.setSize(x,y);});await w.waitForTimeout(300);const image=await app.evaluate(async({BrowserWindow})=>(await BrowserWindow.getAllWindows()[0].webContents.capturePage()).toPNG().toString('base64'));await fs.writeFile(path.join(qa,file),Buffer.from(image,'base64'));}
(async()=>{
  await fs.mkdir(qa,{recursive:true});
  const archivePath=path.join(demo,'Modulo-Demo-Daten.zip');
  const archive=await JSZip.loadAsync(await fs.readFile(archivePath));
  const source=stateSchema.parse(JSON.parse(await archive.file('diary.json').async('string')));
  assert.equal(Object.values(archive.files).filter(f=>f.name.startsWith('media/')&&!f.dir).length,349);
  for(const file of ['import-tests/Gueltig-deutsche-Datumswerte.csv','import-tests/Ungueltig-zur-Validierung.csv','import-tests/Foto-gross-3200x2400.png','csv/DEMO-2601-Vorgaenge.csv','source-media/Demo-Sprachnotiz.mp3'])assert.ok(archive.file(file),'ZIP must include manual test material: '+file);
  console.log('Testing demo ZIP in an isolated app data directory.');await launch();
  await w.getByLabel('Ansichtszoom').selectOption('150');
  await w.getByRole('button',{name:'Ersten Eintrag erstellen'}).click();await w.getByLabel('Bezeichnung · optional').fill('Existing project survives demo import');
  await w.getByLabel('Besondere Vorkommnisse',{exact:true}).fill('Preserve this original entry.');const original=await state();
  await app.evaluate(({dialog},file)=>{dialog.showOpenDialog=async()=>({canceled:false,filePaths:[file]});},archivePath);
  await w.getByRole('button',{name:'Einstellungen',exact:true}).click();await w.getByRole('button',{name:'Daten & Sicherung',exact:true}).click();
  await w.getByRole('button',{name:'Sicherung importieren',exact:true}).click();await expect(w.getByRole('dialog',{name:'Einstellungen',exact:true})).toHaveCount(0,{timeout:60000});
  let s=await state();assert.equal(s.projects.length,5);assert.equal(s.entries.length,101);assert.equal(s.plans.reduce((n,p)=>n+p.tasks.length,0),1005);assert.equal(s.headerPresets.length,3);
  assert.deepEqual(s.preferences,original.preferences);assert.deepEqual(s.entries.find(e=>e.id===original.entries[0].id),original.entries[0]);
  for(const old of source.projects){const imported=s.projects.find(p=>p.number===old.number);assert.notEqual(imported.id,old.id);assert.notEqual(imported.document.logo.id,old.document.logo.id);
    const plan=s.plans.find(p=>p.projectId===imported.id),oldPlan=source.plans.find(p=>p.projectId===old.id);assert.equal(plan.tasks.length,oldPlan.tasks.length);
    for(let i=0;i<plan.tasks.length;i++){assert.notEqual(plan.tasks[i].id,oldPlan.tasks[i].id);for(const link of plan.tasks[i].predecessors)assert.ok(plan.tasks.some(t=>t.id===link.taskId));}
    for(const baseline of plan.baselines)for(const task of baseline.snapshot.tasks)assert.equal(plan.tasks.find(t=>t.title===task.title).id,task.id);
    for(const rev of plan.revisions)for(const change of rev.changes)assert.ok(plan.tasks.some(t=>t.id===change.taskId));
  }
  stateSchema.parse(s);console.log('Imported 1,005 activities, 100 entries and 349 media files; original data and preferences preserved.');
  await project('DEMO-2601');await moduleView('Bauzeitenplaner');await expect(w.locator('.gantt-row')).toHaveCount(309);
  const campus=s.projects.find(p=>p.number==='DEMO-2601'),plan=s.plans.find(p=>p.projectId===campus.id);
  await w.getByLabel('Sollplan vergleichen').selectOption(plan.baselines[0].id);await w.getByLabel('Vorgänge durchsuchen').fill('TEST');await expect(w.locator('.gantt-row')).toHaveCount(9);await capture('campus-test-cases.png');
  await w.getByRole('button',{name:'Wochenvorschau',exact:true}).click();await expect(w.locator('.weekly-grid')).toBeVisible();await capture('campus-weekly.png');await w.getByRole('button',{name:'Terminplan',exact:true}).click();
  await w.getByText('Weitere Optionen',{exact:true}).click();await w.getByRole('button',{name:'CSV importieren',exact:true}).click();
  await w.getByLabel('CSV-Datei').setInputFiles(path.join(demo,'import-tests','Ungueltig-zur-Validierung.csv'));await expect(w.getByRole('button',{name:'Vorschau importieren',exact:true})).toBeDisabled();await expect(w.getByRole('dialog',{name:'CSV importieren'}).locator('.planner-warning')).toHaveCount(4);
  await w.getByLabel('CSV-Datei').setInputFiles(path.join(demo,'import-tests','Gueltig-deutsche-Datumswerte.csv'));await expect(w.getByText('3 Zeilen · 3 neue Vorgänge',{exact:true})).toBeVisible();await w.getByRole('button',{name:'Vorschau importieren',exact:true}).click();
  s=await state();assert.equal(s.plans.find(p=>p.projectId===campus.id).tasks.length,312);
  await project('DEMO-2603');await expect(w.locator('.gantt-row')).toHaveCount(600);const last=s.plans.find(p=>p.projectId===s.projects.find(p=>p.number==='DEMO-2603').id).tasks.at(-1);
  await w.getByLabel('Vorgänge durchsuchen').fill(last.title);await expect(w.locator('.gantt-row')).toHaveCount(1);await w.getByLabel('Vorgänge durchsuchen').fill('');await capture('stress-600-activities.png');
  await project('DEMO-2601');await moduleView('Bautagebuch');await w.getByLabel('Einträge durchsuchen').fill('Fotoreicher');await w.locator('.entry-item').filter({hasText:'Fotoreicher'}).click();
  await expect(w.locator('.photo-card')).toHaveCount(24);await expect(w.locator('.audio-card')).toHaveCount(3);
  await expect.poll(()=>w.locator('.audio-card audio').evaluateAll(elements=>elements.every(el=>el.readyState>=1)),{timeout:15000}).toBe(true);
  // MP3 streams may expose Infinity until Chromium reaches the last frame.
  const playback=await w.locator('.audio-card audio').evaluateAll(elements=>elements.map(el=>({duration:el.duration,error:el.error?.message,source:el.currentSrc})));assert.ok(playback.every(a=>a.duration>0&&!a.error),JSON.stringify(playback));
  await w.locator('.audio-card audio').first().evaluate(async audio=>{audio.muted=true;await audio.play();});
  await expect.poll(()=>w.locator('.audio-card audio').first().evaluate(audio=>audio.currentTime)).toBeGreaterThan(0.1);await w.locator('.audio-card audio').first().evaluate(audio=>audio.pause());
  await w.getByRole('button',{name:'Als fertig markieren',exact:true}).click();await expect(w.locator('.photo-board')).toHaveCount(9);await expect(w.locator('.paper-custom-header')).toContainText('Campus West');await capture('rich-diary-preview.png');await saved();
  s=await state();const rich=s.entries.find(e=>e.projectId===campus.id&&e.title.includes('Fotoreicher'));assert.equal(rich.status,'complete');assert.equal(rich.attachments.filter(a=>a.originalTranscript).length,1);
  console.log('Planner filters, weekly view, both CSV fixtures, 600-row schedule and 24-photo diary verified.');
  for(const format of ['pdf','docx']){await target('rich-diary.'+format);const result=await w.evaluate(options=>window.diary.exportReport(options),{projectId:campus.id,entryIds:[rich.id],format});assert.equal(result.count,1);const bytes=await fs.readFile(path.join(qa,'rich-diary.'+format));if(format==='pdf')assert.equal(bytes.subarray(0,5).toString(),'%PDF-');else{const doc=await JSZip.loadAsync(bytes);assert.ok(Object.keys(doc.files).some(n=>n.startsWith('word/media/')));assert.ok((await doc.file('word/document.xml').async('string')).includes('Fotoreicher'));}}
  await target('campus-test-cases-a3.pdf');const report=await w.evaluate(options=>window.diary.exportPlan(options),{projectId:campus.id,taskIds:plan.tasks.filter(t=>t.title.startsWith('TEST')).map(t=>t.id),from:'2026-10-01',to:'2026-10-31',paper:'A3',format:'pdf',baselineId:plan.baselines[0].id});assert.ok(report.pages>=1);
  await w.getByRole('button',{name:'Eintrag bearbeiten',exact:true}).click();await w.getByTestId('photo-input').setInputFiles(path.join(demo,'import-tests','Foto-gross-3200x2400.png'));await expect(w.locator('.photo-card')).toHaveCount(25,{timeout:60000});
  s=await state();const importedPhoto=s.entries.find(e=>e.id===rich.id).attachments.find(a=>a.name.startsWith('Foto-gross'));assert.ok(importedPhoto.size<=500*1024);assert.equal(importedPhoto.extension,'jpg');
  await target('roundtrip.zip');await w.evaluate(()=>window.diary.backup());const roundtrip=await JSZip.loadAsync(await fs.readFile(path.join(qa,'roundtrip.zip')));assert.equal(JSON.parse(await roundtrip.file('diary.json').async('string')).entries.length,101);
  await app.close();app=null;await launch();s=await state();assert.equal(s.projects.length,5);assert.equal(s.entries.length,101);assert.equal(s.plans.reduce((n,p)=>n+p.tasks.length,0),1008);assert.equal(s.entries.find(e=>e.id===rich.id).attachments.length,28);
  assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'passed',projects:4,activities:1005,diaryEntries:100,photos:318,audio:25,compressedBytes:importedPhoto.size,plannerPages:report.pages,restart:true,qa},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(app)await app.close();});
