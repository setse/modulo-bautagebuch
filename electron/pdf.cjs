const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { randomUUID } = require('node:crypto');

async function pdfBuffer(html, { BrowserWindow, tempRoot = os.tmpdir(), displayHeaderFooter = true, headerTemplate = '<span></span>', footerTemplate = '<div style="font-size:9px;width:100%;text-align:right;padding-right:15mm;color:#666">Seite <span class="pageNumber"></span> / <span class="totalPages"></span></div>' }) {
  const root = path.resolve(tempRoot);
  const directory = await fs.mkdtemp(path.join(root, 'modulo-pdf-'));
  let printWindow;
  try {
    // Detailed photo reports can exceed Chromium's navigation URL limit.
    const file = path.join(directory, 'report.html');
    await fs.writeFile(file, html, 'utf8');
    printWindow = new BrowserWindow({ show: false, webPreferences: { sandbox: true, contextIsolation: true, nodeIntegration: false, partition: 'pdf-' + randomUUID() } });
    await printWindow.loadFile(file);
    await printWindow.webContents.executeJavaScript('Promise.all(Array.from(document.images).map(image => image.decode())).then(() => document.fonts.ready).then(() => true)');
    return await printWindow.webContents.printToPDF({ printBackground: true, preferCSSPageSize: true, displayHeaderFooter, headerTemplate, footerTemplate });
  } finally {
    try { if (printWindow && !printWindow.isDestroyed()) printWindow.destroy(); }
    finally {
      if (path.dirname(directory) !== root || !path.basename(directory).startsWith('modulo-pdf-')) throw new Error('Ungültiger temporärer Exportordner');
      await fs.rm(directory, { recursive: true, force: true });
    }
  }
}

module.exports = { pdfBuffer };
