const { app, BrowserWindow, ipcMain, dialog, protocol, net, nativeImage, shell, Menu } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { randomUUID } = require('node:crypto');
const JSZip = require('jszip');
const { z } = require('zod');
const { Store } = require('./store.cjs');
const { stateSchema, attachmentSchema } = require('./model.cjs');
const {remapPlans}=require('./planner-model.cjs');
const { reportHtml, reportDocx } = require('./report.cjs');
const { pdfBuffer } = require('./pdf.cjs');
const { compressImage } = require('./images.cjs');
const { ParakeetTranscriptionProvider } = require('./transcription.cjs');
const { QwenAssistantProvider } = require('./assistant.cjs');
const { LocalInferenceQueue } = require('./inference-queue.cjs');
protocol.registerSchemesAsPrivileged([{ scheme: 'diary-media', privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true } }]);
if (process.env.MODULO_TEST_DATA) app.setPath('userData', path.resolve(process.env.MODULO_TEST_DATA));
const singleInstance = app.requestSingleInstanceLock();
if (!singleInstance) app.quit();
let window, store, state, readyToClose = false;
app.on('second-instance', () => { if (window) { if (window.isMinimized()) window.restore(); window.show(); window.focus(); } });
const provider = new ParakeetTranscriptionProvider({resources:app.isPackaged?path.join(process.resourcesPath,'transcription'):path.join(__dirname,'..','.build','transcription'),onProgress:progress=>{if(window&&!window.isDestroyed())window.webContents.send('diary:transcription-progress',progress);}});
const assistant = new QwenAssistantProvider({resources:app.isPackaged?path.join(process.resourcesPath,'assistant'):path.join(__dirname,'..','.build','assistant'),onProgress:progress=>{if(window&&!window.isDestroyed())window.webContents.send('diary:assistant-progress',progress);}});
const inference = new LocalInferenceQueue();
app.on('before-quit',event=>{if(provider.disposed&&assistant.disposed)return;event.preventDefault();inference.close();void Promise.all([provider.dispose(),assistant.dispose()]).finally(()=>app.quit());});
const importedMedia = new Map();
const media = () => [...state.entries.flatMap(e => e.attachments), ...state.projects.flatMap(p => [p.document.logo,p.document.footerImage].filter(Boolean)), ...state.headerPresets.flatMap(p => [p.document.logo,p.document.footerImage].filter(Boolean))];
const findAttachment = id => { const a = media().find(a => a.id === id) || importedMedia.get(id); if (!a) throw new Error('Anlage nicht gefunden'); return a; };
async function readImage(attachment) {
  const image = nativeImage.createFromPath(store.mediaPath(attachment));
  if (image.isEmpty()) throw new Error(`Foto konnte nicht gelesen werden: ${attachment.name}`);
  const { width, height } = image.getSize();
  const jpeg = ['jpg', 'jpeg'].includes(attachment.extension);
  return { data: ['jpg', 'jpeg', 'png'].includes(attachment.extension) ? await fs.readFile(store.mediaPath(attachment)) : image.toPNG(), width, height, type: jpeg ? 'jpg' : 'png', mime: jpeg ? 'image/jpeg' : 'image/png' };
}
async function addMedia({ name, bytes, kind, logo = false }) {
  z.enum(['photo', 'audio']).parse(kind);
  z.string().min(1).max(260).parse(name);
  if (!(bytes instanceof Uint8Array) || !bytes.length || bytes.length > 100 * 1024 * 1024) throw new Error('Datei ist leer oder größer als 100 MB.');
  let extension = path.extname(name).slice(1).toLowerCase();
  const allowed = kind === 'photo' ? ['jpg', 'jpeg', 'png', 'webp'] : ['mp3', 'wav', 'm4a', 'ogg', 'webm', 'flac'];
  if (!allowed.includes(extension)) throw new Error('Dieses Dateiformat wird nicht unterstützt.');
  let buffer = Buffer.from(bytes);
  let dimensions = {};
  if (kind === 'photo') {
    const image = nativeImage.createFromBuffer(buffer);
    if (image.isEmpty()) throw new Error('Das Foto konnte nicht geöffnet werden. Bitte JPEG, PNG oder WebP verwenden.');
    const compressed = compressImage(image, { transparent: logo });
    buffer = compressed.bytes; extension = compressed.extension;
    dimensions = { pixelWidth: compressed.width, pixelHeight: compressed.height };
  }
  const attachment = attachmentSchema.parse({ id: randomUUID(), name: path.basename(name), kind, extension, size: buffer.length, caption: '', transcript: '', transcription: 'pending', ...dimensions });
  await fs.mkdir(path.join(store.root, 'media'), { recursive: true });
  await fs.writeFile(store.mediaPath(attachment), buffer);
  importedMedia.set(attachment.id, attachment);
  return attachment;
}
function handle(channel, handler) {
  ipcMain.handle(channel, async (event, ...args) => {
    if (event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame) throw new Error('Unzulässiger Zugriff');
    return handler(...args);
  });
}
app.whenReady().then(async () => {
  if (!singleInstance) return;
  Menu.setApplicationMenu(null);
  store = new Store(app.getPath('userData'));
  let loaded;
  try { loaded = await store.load(); state = loaded.state; }
  catch (error) { dialog.showErrorBox('Bautagebuch konnte nicht geöffnet werden', error.message); app.quit(); return; }
  for (const photo of media().filter(a => a.kind === 'photo' && (!a.pixelWidth || !a.pixelHeight))) {
    const image = nativeImage.createFromPath(store.mediaPath(photo));
    if (!image.isEmpty()) { const size = image.getSize(); photo.pixelWidth = size.width; photo.pixelHeight = size.height; }
  }
  protocol.handle('diary-media', async request => {
    try {
      const url = new URL(request.url);
      if (url.host !== 'local') return new Response('Not found', { status: 404 });
      const attachment = findAttachment(url.pathname.slice(1));
      return net.fetch(pathToFileURL(store.mediaPath(attachment)).href, { headers: request.headers });
    } catch { return new Response('Not found', { status: 404 }); }
  });
  window = new BrowserWindow({ width: 1510, height: 1000, minWidth: 1060, minHeight: 720, show: !process.env.MODULO_TEST_DATA, title: 'Modulo Bautagebuch', icon: path.join(__dirname, '..', 'assets', 'icon.png'), backgroundColor: '#f0ece2', webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false } });
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-navigate', event => event.preventDefault());
  window.on('close', event => { if (!readyToClose) { event.preventDefault(); window.webContents.send('diary:before-close'); } });
  ipcMain.on('diary:ready-close', event => { if (event.sender === window.webContents) { readyToClose = true; window.close(); } });
  handle('diary:load', () => ({ state, recovered: loaded.recovered, dataPath: store.root }));
  const planOptions=z.object({projectId:z.uuid(),taskIds:z.array(z.uuid()).min(1).max(5000),from:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),to:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),paper:z.enum(['A0','A1','A2','A3','A4']),format:z.enum(['pdf','csv']),baselineId:z.union([z.literal(''),z.uuid()]),layout:z.enum(['overall','detail','list']).default('overall'),scale:z.enum(['auto','day','week','month']).default('auto')});
  async function planContext(input){const options=planOptions.parse(input),plan=state.plans.find(p=>p.projectId===options.projectId),project=state.projects.find(p=>p.id===options.projectId);if(!plan||!project)throw new Error('Projektplan fehlt.');const engine=await import('./planner.mjs');if(!engine.validDate(options.from)||!engine.validDate(options.to))throw new Error('Ungültiger Zeitraum.');if(options.taskIds.some(id=>!plan.tasks.some(t=>t.id===id)))throw new Error('Vorgang fehlt.');return {options,plan,project};}
  handle('planner:preview',async input=>{const {options,plan,project}=await planContext(input);return (await import('./planner-report.mjs')).plannerReport(project,plan,options,readImage);});
  handle('planner:export',async input=>{
    const {options,plan,project}=await planContext(input),report=await import('./planner-report.mjs');
    const result=await dialog.showSaveDialog(window,{title:'Bauzeitenplan exportieren',defaultPath:`Bauzeitenplan-${project.number||'Projekt'}.${options.format}`,filters:[{name:options.format.toUpperCase(),extensions:[options.format]}]});if(result.canceled)return null;
    let bytes,pages=0;
    if(options.format==='csv')bytes=report.exportCsv(plan,plan.tasks.filter(t=>options.taskIds.includes(t.id)));
    else {const output=await report.plannerReport(project,plan,options,readImage);pages=output.pages;bytes=await pdfBuffer(output.html,{BrowserWindow,tempRoot:app.getPath('temp'),displayHeaderFooter:false});}
    await fs.writeFile(result.filePath,bytes);return {path:result.filePath,pages};
  });
  handle('diary:save', async input => {
    const parsed = stateSchema.parse(input);
    await store.save(parsed); state = parsed; window.webContents.setZoomFactor(parsed.preferences.zoom);
    return { savedAt: new Date().toISOString() };
  });
  handle('diary:add-media', addMedia);
  handle('diary:add-logo', input => addMedia({ ...input, kind: 'photo', logo: true }));
  handle('diary:zoom', zoom => { window.webContents.setZoomFactor(z.number().min(0.75).max(2).parse(zoom)); return zoom; });
  handle('diary:import-logo', async () => {
    const result = await dialog.showOpenDialog(window, { title: 'Firmenlogo hinzufügen', properties: ['openFile'], filters: [{ name: 'Firmenlogo', extensions: ['png', 'jpg', 'jpeg', 'webp'] }] });
    if (result.canceled) return null;
    const file = result.filePaths[0];
    if ((await fs.stat(file)).size > 100 * 1024 * 1024) throw new Error('Datei ist größer als 100 MB.');
    return addMedia({ name: path.basename(file), bytes: new Uint8Array(await fs.readFile(file)), kind: 'photo', logo: true });
  });
  handle('diary:import-media', async kind => {
    z.enum(['photo', 'audio']).parse(kind);
    const result = await dialog.showOpenDialog(window, { title: kind === 'photo' ? 'Fotos hinzufügen' : 'Sprachnotizen hinzufügen', properties: ['openFile', 'multiSelections'], filters: [{ name: kind === 'photo' ? 'Fotos' : 'Audio', extensions: kind === 'photo' ? ['jpg', 'jpeg', 'png', 'webp'] : ['mp3', 'wav', 'm4a', 'ogg', 'webm', 'flac'] }] });
    if (result.canceled) return { attachments: [], errors: [] };
    const attachments = [], errors = [];
    for (const file of result.filePaths) {
      try {
        if ((await fs.stat(file)).size > 100 * 1024 * 1024) throw new Error('Datei ist größer als 100 MB.');
        attachments.push(await addMedia({ name: path.basename(file), bytes: new Uint8Array(await fs.readFile(file)), kind }));
      } catch (error) { errors.push(`${path.basename(file)}: ${error.message}`); }
    }
    return { attachments, errors };
  });
  handle('diary:transcription-status',()=>provider.status());
  handle('diary:transcription-cancel',id=>inference.cancel('speech',z.uuid().parse(id)));
  handle('diary:transcribe', id => { const audio = findAttachment(z.uuid().parse(id)); if (audio.kind !== 'audio') throw new Error('Keine Audiodatei'); return inference.run('speech',audio.id,async signal=>{await assistant.stop();if(signal.aborted)return {status:'canceled',message:'Auftrag abgebrochen.'};return provider.transcribe(store.mediaPath(audio),audio.id);},()=>provider.cancel(audio.id),()=>window.webContents.send('diary:transcription-progress',{attachmentId:audio.id,jobId:audio.id,stage:'queued',progress:null,message:'Wartet auf den Textassistenten …'})); });
  handle('diary:assistant-status',()=>assistant.status());
  handle('diary:assistant-cancel',id=>inference.cancel('assistant',z.uuid().parse(id)));
  handle('diary:assistant-analyze',input=>{
    const request=z.object({requestId:z.uuid(),attachmentId:z.uuid(),mode:z.enum(['cleanup','organize']),transcript:z.string().trim().min(1).max(100000)}).strict().parse(input);
    const audio=findAttachment(request.attachmentId);if(audio.kind!=='audio')throw new Error('Keine Sprachnotiz.');
    if(audio.transcript.trim()!==request.transcript)throw new Error('Das Transkript wurde geändert. Bitte speichern und erneut versuchen.');
    return inference.run('assistant',request.requestId,async signal=>{await provider.stopWorker();if(signal.aborted)return {status:'canceled',message:'Auftrag abgebrochen.'};return assistant.analyze(request);},()=>assistant.cancel(request.requestId),()=>window.webContents.send('diary:assistant-progress',{requestId:request.requestId,stage:'queued',progress:null,message:'Wartet auf die Spracherkennung …'}));
  });
  handle('diary:export', async options => {
    const { projectId, entryIds, format } = z.object({ projectId: z.uuid(), entryIds: z.array(z.uuid()).min(1), format: z.enum(['pdf', 'docx']) }).parse(options);
    const project = state.projects.find(p => p.id === projectId);
    if (!project) throw new Error('Projekt nicht gefunden');
    const ids = new Set(entryIds);
    const entries = state.entries.filter(e => e.projectId === projectId && ids.has(e.id)).sort((a,b) => a.date.localeCompare(b.date));
    if (entries.length !== ids.size) throw new Error('Einträge nicht gefunden');
    const result = await dialog.showSaveDialog(window, { title: 'Bautagebuch exportieren', defaultPath: `Bautagebuch-${project.number || 'Projekt'}-${entries[0].date}.${format}`, filters: [{ name: format === 'pdf' ? 'PDF' : 'Word-Dokument', extensions: [format] }] });
    if (result.canceled) return null;
    const bytes = format === 'pdf' ? await pdfBuffer(await reportHtml(project, entries, readImage), { BrowserWindow, tempRoot: app.getPath('temp'), ...(await require('./report.cjs').reportPageTemplates(project, entries, readImage)) }) : await reportDocx(project, entries, readImage);
    await fs.writeFile(result.filePath, bytes);
    return { path: result.filePath, count: entries.length };
  });
  handle('diary:backup', async () => {
    const result = await dialog.showSaveDialog(window, { title: 'Vollständige Sicherung speichern', defaultPath: `Bautagebuch-Sicherung-${new Date().toISOString().slice(0,10)}.zip`, filters: [{ name: 'Bautagebuch-Sicherung', extensions: ['zip'] }] });
    if (result.canceled) return null;
    const zip = new JSZip(); zip.file('diary.json', JSON.stringify(state, null, 2));
    const unique = new Map(media().map(a => [a.id, a]));
    for (const a of unique.values()) zip.file(`media/${a.id}.${a.extension}`, await fs.readFile(store.mediaPath(a)));
    await fs.writeFile(result.filePath, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
    return result.filePath;
  });
  handle('diary:restore', async () => {
    const result = await dialog.showOpenDialog(window, { title: 'Sicherung als zusätzliche Projekte importieren', properties: ['openFile'], filters: [{ name: 'Bautagebuch-Sicherung', extensions: ['zip'] }] });
    if (result.canceled) return null;
    const source = result.filePaths[0];
    if ((await fs.stat(source)).size > 1024 * 1024 * 1024) throw new Error('Sicherung ist größer als 1 GB.');
    const zip = await JSZip.loadAsync(await fs.readFile(source));
    const json = zip.file('diary.json'); if (!json) throw new Error('Keine Bautagebuch-Sicherung.');
    const restored = stateSchema.parse(JSON.parse(await json.async('string')));
    const projectIds = new Map(restored.projects.map(p => [p.id, randomUUID()]));
    const attachmentIds = new Map();
    const restoredMedia = [...restored.entries.flatMap(e => e.attachments), ...restored.projects.flatMap(p => [p.document.logo,p.document.footerImage].filter(Boolean)), ...restored.headerPresets.flatMap(p => [p.document.logo,p.document.footerImage].filter(Boolean))];
    for (const a of restoredMedia) {
      if (attachmentIds.has(a.id)) continue;
      const file = zip.file(`media/${a.id}.${a.extension}`); if (!file) throw new Error(`Anlage fehlt: ${a.name}`);
      const bytes = await file.async('uint8array');
      if (!bytes.length || bytes.length > 100 * 1024 * 1024) throw new Error(`Ungültige Anlage: ${a.name}`);
      if (a.kind === 'photo' && nativeImage.createFromBuffer(Buffer.from(bytes)).isEmpty()) throw new Error(`Ungültiges Bild: ${a.name}`);
      const imported = { ...a, id: randomUUID(), size: bytes.length };
      await fs.writeFile(store.mediaPath(imported), bytes); importedMedia.set(imported.id, imported);
      attachmentIds.set(a.id, imported);
    }
    const restoreDocument = document => ({ ...document, logo: document.logo ? attachmentIds.get(document.logo.id) : null, footerImage:document.footerImage ? attachmentIds.get(document.footerImage.id) : null });
    const projects = restored.projects.map(p => ({ ...p, id: projectIds.get(p.id), name: p.name + ' (importiert)', document: restoreDocument(p.document) }));
    const entries = restored.entries.map(e => ({ ...e, id: randomUUID(), projectId: projectIds.get(e.projectId), attachments: e.attachments.map(a => ({ ...a, ...attachmentIds.get(a.id), name: a.name, caption: a.caption, transcript: a.transcript, transcription: a.transcription })) }));
    const presets = restored.headerPresets.map(p => ({ ...p, id: randomUUID(), name: p.name + ' (importiert)', document: restoreDocument(p.document) }));
    const merged = stateSchema.parse({ ...state, projects: [...state.projects, ...projects], entries: [...state.entries, ...entries], headerPresets: [...state.headerPresets, ...presets],plans:[...state.plans,...remapPlans(restored.plans,projectIds)] });
    await store.save(merged); state = merged;
    return { state: merged, projectId: projects[0].id };
  });
  handle('diary:open-folder', async () => { const error = await shell.openPath(store.root); if (error) throw new Error(error); });
  if (process.argv.includes('--dev')) await window.loadURL('http://127.0.0.1:5173');
  else await window.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  window.webContents.setZoomFactor(state.preferences.zoom);
}).catch(error => { dialog.showErrorBox('Startfehler', error.message); app.quit(); });
app.on('window-all-closed', () => app.quit());
