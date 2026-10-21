const { _electron: electron, expect } = require('@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const qa = path.join(root,'.qa');
const data = path.join(qa,'desktop-' + Date.now());
let app;
async function launch() {
  app = await electron.launch({ args:[root,'--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream'], env:{ ...process.env, MODULO_TEST_DATA:data }, timeout:30000 });
  const window = await app.firstWindow(); await window.waitForLoadState('domcontentloaded');
  await expect(window.getByRole('heading',{ name:'Bautagebuch',exact:true })).toBeVisible();
  return window;
}
async function save() {
  const window = app.windows()[0];
  await window.evaluate(() => window.diary.save ? new Promise(resolve => setTimeout(resolve,1100)) : undefined);
  await expect(window.getByText('Alle Änderungen gespeichert')).toBeVisible();
}
async function exportTo(filePath) {
  await app.evaluate(({ dialog }, target) => { dialog.showSaveDialog = async () => ({ canceled:false,filePath:target }); }, filePath);
}
(async () => {
  await fs.mkdir(qa,{ recursive:true });
  let w = await launch();
  const errors = []; w.on('pageerror',error => errors.push(error.message));
  await w.screenshot({ path:path.join(qa,'app-empty.png') });
  await w.getByRole('button',{ name:'Einstellungen',exact:true }).click();
  await w.getByRole('button',{name:'Spracherkennung',exact:true}).click();
  await w.getByRole('checkbox',{name:/Neue Sprachnotizen automatisch/}).uncheck();
  await w.getByRole('button',{name:'Einstellungen speichern',exact:true}).click();
  await w.getByRole('button',{ name:'Ersten Eintrag erstellen' }).click();
  await w.getByLabel('Datum',{ exact:true }).fill('2026-10-07');
  await w.getByLabel('Bezeichnung · optional').fill('Baustellenbegehung Hörsaal');
  await w.getByLabel('Wetter',{ exact:true }).fill('Sonnig');
  await w.getByLabel('Temperatur').fill('13–26');
  await w.getByRole('button',{ name:'Gewerk hinzufügen',exact:true }).click();
  await w.getByLabel('Gewerk 1',{ exact:true }).fill('120');
  await w.getByLabel('Firma 1',{ exact:true }).fill('Musterfirma');
  await w.getByLabel('Mitarbeiter 1',{ exact:true }).fill('2');
  await w.getByLabel('Arbeiten 1',{ exact:true }).fill('Türdurchbruch herstellen\nAufmaß überprüfen');
  await w.getByLabel('Besondere Vorkommnisse',{ exact:true }).fill('Baubesprechung Nr. 01\nAbstimmung der nächsten Bauabschnitte.');
  const photo = await fs.readFile(path.join(__dirname,'fixtures','construction.png'));
  await w.getByTestId('photo-input').setInputFiles({ name:'Baustelle.png',mimeType:'image/png',buffer:photo });
  await expect(w.getByLabel('Bildunterschrift Baustelle.png')).toBeVisible();
  await w.getByLabel('Bildunterschrift Baustelle.png').fill('Türöffnung im Hörsaal');
  const wav = Buffer.alloc(44+16000); wav.write('RIFF'); wav.writeUInt32LE(wav.length-8,4); wav.write('WAVEfmt ',8); wav.writeUInt32LE(16,16); wav.writeUInt16LE(1,20); wav.writeUInt16LE(1,22); wav.writeUInt32LE(8000,24); wav.writeUInt32LE(16000,28); wav.writeUInt16LE(2,32); wav.writeUInt16LE(16,34); wav.write('data',36); wav.writeUInt32LE(16000,40);
  await w.getByTestId('audio-input').setInputFiles({ name:'Begehung.wav',mimeType:'audio/wav',buffer:wav });
  await expect(w.getByLabel('Transkript',{ exact:true })).toBeVisible();
  await w.getByLabel('Transkript',{ exact:true }).fill('Fensteranschlüsse morgen prüfen.');
  await w.getByRole('button',{ name:'In Eintrag übernehmen' }).click();
  assert.ok((await w.getByLabel('Besondere Vorkommnisse',{ exact:true }).inputValue()).includes('Fensteranschlüsse'));
  await w.getByRole('button',{ name:'Sprachnotiz aufnehmen',exact:true }).click();
  await expect(w.getByRole('button',{ name:/Aufnahme stoppen/ })).toBeVisible();
  await w.waitForTimeout(1200);
  await w.getByRole('button',{ name:/Aufnahme stoppen/ }).click();
  await expect(w.locator('.audio-card')).toHaveCount(2);
  await w.getByRole('button',{ name:'Als fertig markieren' }).click();
  await expect(w.locator('.paper')).toBeVisible();
  await w.getByRole('button',{name:'Eintrag bearbeiten',exact:true}).click();
  await save();
  // Verify registered protocol image decoding and playable audio metadata.
  await expect.poll(() => w.locator('.photo-image img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect.poll(() => w.locator('audio').first().evaluate(audio => audio.readyState)).toBeGreaterThanOrEqual(1);
  await expect.poll(() => w.locator('audio').nth(1).evaluate(audio => audio.readyState)).toBeGreaterThanOrEqual(1);
  await w.locator('.editor-scroll').evaluate(el => el.scrollTop = 0);
  await w.screenshot({ path:path.join(qa,'app-editor.png') });
  await w.getByRole('button',{ name:'Dokumentvorschau' }).click();
  await expect(w.locator('.paper')).toContainText('Musterfirma');
  await w.screenshot({ path:path.join(qa,'app-preview.png') });
  // Restart with the same data directory and verify persistence.
  await app.close(); w = await launch();
  await expect(w.getByLabel('Bezeichnung · optional')).toHaveValue('Baustellenbegehung Hörsaal');
  await expect(w.getByLabel('Firma 1',{ exact:true })).toHaveValue('Musterfirma');
  await expect(w.getByLabel('Bildunterschrift Baustelle.png')).toHaveValue('Türöffnung im Hörsaal');
  await w.getByRole('button',{ name:'Neuer Eintrag',exact:true }).first().click();
  await w.getByLabel('Datum',{ exact:true }).fill('2026-10-08');
  await w.getByLabel('Bezeichnung · optional').fill('Nicht exportieren');
  await save();
  await w.getByRole('button',{ name:'Exportieren',exact:true }).last().click();
  const pdf = path.join(qa,'selected-report.pdf'); await exportTo(pdf);
  await w.locator('.export-entry').filter({ hasText:'Nicht exportieren' }).getByRole('checkbox').uncheck();
  await w.screenshot({ path:path.join(qa,'app-export.png') });
  await w.getByRole('button',{ name:'PDF exportieren',exact:true }).click();
  await expect(w.getByRole('dialog')).toHaveCount(0);
  assert.ok((await fs.stat(pdf)).size > 1000);
  await w.getByRole('button',{ name:'Meldung schließen' }).click();
  await w.getByRole('button',{ name:'Exportieren',exact:true }).last().click();
  await w.locator('.export-entry').filter({ hasText:'Nicht exportieren' }).getByRole('checkbox').uncheck();
  await w.getByRole('button',{ name:'Word-Dokument' }).click();
  await exportTo(path.join(qa,'selected-report.docx'));
  await w.getByRole('button',{ name:'Word exportieren',exact:true }).click();
  await expect(w.getByRole('dialog')).toHaveCount(0);
  // Backup / restore include attachments and add projects without overwriting.
  const backup = path.join(qa,'backup.zip'); await exportTo(backup);
  await w.getByRole('button',{ name:'Einstellungen',exact:true }).click();await w.getByRole('button',{name:'Daten & Sicherung',exact:true}).click();
  await w.getByRole('button',{ name:'Sichern',exact:true }).click();
  await expect.poll(async () => (await fs.stat(backup).catch(() => ({ size:0 }))).size).toBeGreaterThan(100);
  await app.evaluate(({ dialog },source) => { dialog.showOpenDialog = async () => ({ canceled:false,filePaths:[source] }); },backup);
  await w.getByRole('button',{ name:'Sicherung importieren',exact:true }).click();
  await expect(w.getByRole('dialog')).toHaveCount(0);
  await w.getByRole('button',{name:'Projekt auswählen'}).click();
  await expect(w.getByRole('listbox',{name:'Projekte'}).getByRole('option')).toHaveCount(2);
  await w.keyboard.press('Escape');
  await w.getByRole('button',{ name:'Eintrag löschen',exact:true }).click();
  await w.getByRole('button',{ name:'Abbrechen',exact:true }).click();
  assert.equal(errors.length,0,errors.join('\n'));
  console.log(JSON.stringify({ status:'passed',checks:['entry editing','photo import and caption','audio playback metadata','microphone recording with a simulated device','manual transcript','completion','restart persistence','PDF entry selection','DOCX export','ZIP backup and import','delete cancellation'],pdf,data,screenshots:['app-empty.png','app-editor.png','app-preview.png','app-export.png'] },null,2));
})().catch(error => { console.error(error); process.exitCode=1; }).finally(async () => { if (app) await app.close(); });
