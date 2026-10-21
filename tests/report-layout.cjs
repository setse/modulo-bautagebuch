const { _electron: electron, expect } = require('@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname,'..');
const qa = path.join(root,'.qa');
let app;
(async () => {
  app = await electron.launch({ args:[root],env:{ ...process.env,MODULO_TEST_DATA:path.join(qa,'layout-'+Date.now()) } });
  const w = await app.firstWindow(); await expect(w.getByRole('heading',{ name:'Bautagebuch',exact:true })).toBeVisible();
  const initial = await w.evaluate(() => window.diary.load());
  const sourceDirectories = (await fs.readdir(qa)).filter(name => name.startsWith('desktop-')).sort();
  const source = JSON.parse(await fs.readFile(path.join(qa,sourceDirectories.at(-1),'diary.json'),'utf8'));
  const first = source.entries.find(e => e.title === 'Baustellenbegehung Hörsaal');
  first.projectId = initial.state.projects[0].id;
  for (const attachment of first.attachments) {
    const buffer = await fs.readFile(path.join(qa,sourceDirectories.at(-1),'media',`${attachment.id}.${attachment.extension}`));
    const imported = await w.evaluate(async ({ name,base64,kind }) => { const bytes = Uint8Array.from(atob(base64),c => c.charCodeAt(0)); return window.diary.addMedia(name,bytes,kind); },{ name:attachment.name,base64:buffer.toString('base64'),kind:attachment.kind });
    attachment.id=imported.id; attachment.extension=imported.extension; attachment.size=imported.size;
  }
  let state = { ...initial.state,entries:[first] };
  await w.evaluate(s => window.diary.save(s),state);
  let target = path.join(qa,'selected-report.pdf');
  await app.evaluate(({ dialog },filePath) => { dialog.showSaveDialog=async()=>({ canceled:false,filePath }); },target);
  await w.evaluate(options => window.diary.exportReport(options),{ projectId:first.projectId,entryIds:[first.id],format:'pdf' });
  const entries = [1,2,3].map(day => ({ ...first,id:crypto.randomUUID(),date:`2026-10-0${day}`,title:`Chronologie ${day}`,attachments:day === 3 ? first.attachments : [],incidents:`Ende Eintrag ${day}`,trades:Array.from({ length:day===2?32:2 },(_,i)=>({ id:crypto.randomUUID(),code:String(100+i),company:`Firma ${i+1}`,workers:'3',work:`Abschnitt ${i+1}: Arbeiten und Prüfung dokumentiert.\nWeitere Abstimmung mit Bauüberwachung.\nFreigabe für den nächsten Arbeitsschritt.` })) }));
  // Deliberately pass IDs out of order: the export must remain chronological.
  state = { ...initial.state,entries };
  await w.evaluate(s => window.diary.save(s),state);
  target = path.join(qa,'multipage-report.pdf');
  await app.evaluate(({ dialog },filePath) => { dialog.showSaveDialog=async()=>({ canceled:false,filePath }); },target);
  await w.evaluate(options => window.diary.exportReport(options),{ projectId:first.projectId,entryIds:entries.slice().reverse().map(e=>e.id),format:'pdf' });
  console.log('Generated selected and multi-page reports for layout QA.');
})().catch(error => { console.error(error);process.exitCode=1; }).finally(async()=>{ if(app) await app.close(); });
