const { _electron: electron, expect } = require('@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { PNG } = require('pngjs');
const { reportHtml } = require('../electron/report.cjs');

const root = path.resolve(__dirname, '..');
let app;
(async () => {
  const data = path.join(root, '.qa', 'large-pdf-' + Date.now());
  const executablePath = process.argv.includes('--packaged') ? path.join(root, 'release', 'win-unpacked', 'Modulo Bautagebuch.exe') : undefined;
  app = await electron.launch({ ...(executablePath ? { executablePath, args: [] } : { args: [root] }), env: { ...process.env, MODULO_TEST_DATA: data } });
  const w = await app.firstWindow();
  await expect(w.getByRole('heading', { name: 'Bautagebuch', exact: true })).toBeVisible();
  // Let the renderer's initial autosave finish before inserting the IPC fixture.
  await w.waitForTimeout(1000);
  const { state } = await w.evaluate(() => window.diary.load());
  const image = new PNG({ width: 1200, height: 900 });
  let seed = 1741;
  for (let i = 0; i < image.data.length; i += 4) {
    for (let channel = 0; channel < 3; channel++) { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; image.data[i + channel] = seed & 255; }
    image.data[i + 3] = 255;
  }
  const bytes = PNG.sync.write(image);
  const photo = await w.evaluate(({ base64 }) => window.diary.addMedia('Großes Testfoto.png', Uint8Array.from(atob(base64), c => c.charCodeAt(0)), 'photo'), { base64: bytes.toString('base64') });
  assert.ok(photo.size <= 500 * 1024, 'New imports must be compressed below 500 kB');
  // Simulate a large PNG retained from an older diary. New imports are now compressed.
  photo.extension = 'png'; photo.size = bytes.length;
  await fs.writeFile(path.join(data, 'media', `${photo.id}.png`), bytes);
  photo.caption = 'Großes Foto vollständig im PDF';
  const entry = { id: randomUUID(), projectId: state.projects[0].id, date: '2026-10-07', endDate: '', title: 'PDF Regressionstest mit großem Foto', startTime: '', endTime: '', weather: 'Sonnig', temperature: '18', status: 'complete', trades: [], incidents: 'Export großer Fotos prüfen.', notes: '', attachments: [photo], updatedAt: new Date().toISOString() };
  state.entries = [entry];
  await w.evaluate(s => window.diary.save(s), state);
  const storedImage = await fs.readFile(path.join(data, 'media', `${photo.id}.${photo.extension}`));
  const html = await reportHtml(state.projects[0], [entry], async () => ({ data: storedImage, width: 1200, height: 900 }));
  const oldURLLength = ('data:text/html;charset=utf-8,' + encodeURIComponent(html)).length;
  assert.ok(oldURLLength > 2 * 1024 * 1024);
  const oldFailure = await app.evaluate(async ({ BrowserWindow }, url) => {
    const printWindow = new BrowserWindow({ show: false, webPreferences: { sandbox: true, contextIsolation: true, nodeIntegration: false } });
    try { await printWindow.loadURL(url); return null; }
    catch (error) { return error.code; }
    finally { printWindow.destroy(); }
  }, 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
  assert.equal(oldFailure, 'ERR_INVALID_URL', 'Regression fixture must reproduce the original failure');
  const beforeWindows = await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows().length);
  const tempRoot = await app.evaluate(({ app }) => app.getPath('temp'));
  const beforeDirectories = new Set((await fs.readdir(tempRoot)).filter(name => name.startsWith('modulo-pdf-')));
  const target = path.join(root, '.qa', executablePath ? 'large-photo-packaged.pdf' : 'large-photo.pdf');
  await app.evaluate(({ dialog }, filePath) => { dialog.showSaveDialog = async () => ({ canceled: false, filePath }); }, target);
  const result = await w.evaluate(options => window.diary.exportReport(options), { projectId: entry.projectId, entryIds: [entry.id], format: 'pdf' });
  assert.equal(result.count, 1);
  const pdf = await fs.readFile(target);
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  assert.ok(pdf.length > 1000000, 'Large photo should be embedded in the PDF');
  assert.equal(await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows().length), beforeWindows);
  assert.deepEqual((await fs.readdir(tempRoot)).filter(name => name.startsWith('modulo-pdf-') && !beforeDirectories.has(name)), []);
  console.log(JSON.stringify({ status: 'passed', oldFailure, oldURLLength, pdfBytes: pdf.length, target, temporaryFilesRemoved: true }));
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { if (app) await app.close(); });
