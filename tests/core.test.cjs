const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const JSZip = require('jszip');
const { Store } = require('../electron/store.cjs');
const { stateSchema, initialState, calendarWeek } = require('../electron/model.cjs');
const { reportHtml, reportDocx } = require('../electron/report.cjs');
const { ParakeetTranscriptionProvider } = require('../electron/transcription.cjs');
const makeEntry = projectId => ({ id: randomUUID(), projectId, date: '2026-10-07', endDate: '', title: 'Baustellenbegehung', startTime: '08:30', endTime: '12:00', weather: 'Sonnig', temperature: '13–26', status: 'complete', trades: [{ id: randomUUID(), code: '120', company: 'Musterfirma', workers: '2', work: 'Türdurchbruch herstellen\nAufmaß prüfen' }], incidents: 'Baubesprechung\nAbstimmung Gerüst', notes: '', attachments: [], updatedAt: new Date().toISOString() });
test('saving is serial and survives restart; corrupted primary recovers last valid state', async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(),'modulo-store-')); t.after(() => fs.rm(root, { recursive:true, force:true }));
  const store = new Store(root); const first = (await store.load()).state;
  const next = { ...first, entries: [makeEntry(first.projects[0].id)] };
  await Promise.all([store.save(first), store.save(next)]);
  assert.equal((await new Store(root).load()).state.entries.length,1);
  await fs.writeFile(store.file, 'invalid json');
  const recovery = await store.load(); assert.equal(recovery.recovered,true); assert.equal(recovery.state.entries.length,0);
  await store.save(recovery.state);
  assert.equal((await store.load()).recovered,false);
});
test('validation rejects impossible dates, orphan entries, duplicates and backwards periods', () => {
  const s = initialState(); const entry = makeEntry(s.projects[0].id);
  for (const patch of [{ date:'2026-02-30' }, { projectId:randomUUID() }, { endDate:'2026-10-06' }]) assert.throws(() => stateSchema.parse({ ...s, entries:[{ ...entry,...patch }] }));
  assert.throws(() => stateSchema.parse({ ...s,entries:[entry,entry] }));
  assert.equal(calendarWeek('2021-01-01'),53); assert.equal(calendarWeek('2026-10-07'),41);
});
test('media filenames cannot escape the data folder', () => {
  const store = new Store(os.tmpdir());
  assert.throws(() => store.mediaPath({ id:'../../sensitive',extension:'png' }));
  assert.throws(() => store.mediaPath({ id:randomUUID(),extension:'../../exe' }));
});
test('reports preserve German text, escape HTML and embed photos', async () => {
  const s = initialState(); const e = makeEntry(s.projects[0].id);
  e.incidents = '<script>alert("x")</script> & Überwachung';
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGPIW9YNAAMlAaAdBx/IAAAAAElFTkSuQmCC', 'base64');
  e.attachments = [{ id:randomUUID(),name:'Foto.png',kind:'photo',extension:'png',size:png.length,caption:'Öffnung im Hörsaal',transcript:'',transcription:'pending' }];
  const readImage = async () => ({ data:png,width:1,height:1 });
  const html = await reportHtml(s.projects[0],[e],readImage);
  assert.ok(html.includes('&lt;script&gt;')); assert.ok(!html.includes('<script>')); assert.ok(html.includes('KW 41')); assert.ok(html.includes('data:image/png;base64,'));
  const bytes = await reportDocx(s.projects[0],[e],readImage); const zip = await JSZip.loadAsync(bytes);
  const xml = await zip.file('word/document.xml').async('string');
  assert.ok(xml.includes('Überwachung')); assert.ok(xml.includes('Türdurchbruch')); assert.ok(xml.includes('w:w="11906"')); assert.ok(Object.keys(zip.files).some(name => name.startsWith('word/media/')));
});
test('missing local transcription runtime fails without an invented transcript', async () => {
  const provider = new ParakeetTranscriptionProvider();
  assert.equal(provider.status().available,false);
  await assert.rejects(provider.transcribe('audio.wav'),/Spracherkennung fehlt/);
  provider.dispose();
});
