const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { pdfBuffer } = require('../electron/pdf.cjs');

for (const failure of [null, 'load', 'images', 'print']) {
  test(`PDF loads a large file and cleans up after ${failure || 'success'}`, async t => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'modulo-pdf-test-'));
    t.after(() => fs.rm(root, { recursive: true, force: true }));
    const html = '<!doctype html><p>' + 'Überwachung '.repeat(300000) + '</p>';
    let destroyed = false, loaded;
    class PrintWindow {
      constructor(options) {
        assert.equal(options.show, false);
        assert.equal(options.webPreferences.nodeIntegration, false);
        this.webContents = {
          executeJavaScript: async () => { if (failure === 'images') throw new Error('images failed'); },
          printToPDF: async options => { assert.equal(options.preferCSSPageSize, true); if (failure === 'print') throw new Error('print failed'); return Buffer.from('%PDF-test'); }
        };
      }
      async loadFile(file) {
        loaded = file;
        assert.equal(await fs.readFile(file, 'utf8'), html);
        if (failure === 'load') throw new Error('load failed');
      }
      isDestroyed() { return destroyed; }
      destroy() { destroyed = true; }
    }
    const operation = pdfBuffer(html, { BrowserWindow: PrintWindow, tempRoot: root });
    if (failure) await assert.rejects(operation, new RegExp(`${failure} failed`));
    else assert.equal((await operation).toString(), '%PDF-test');
    assert.ok(loaded);
    assert.equal(destroyed, true);
    assert.deepEqual(await fs.readdir(root), []);
  });
}
