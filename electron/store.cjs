const fs = require('node:fs/promises');
const path = require('node:path');
const { stateSchema, initialState } = require('./model.cjs');
class Store {
  constructor(root) { this.root = root; this.file = path.join(root, 'diary.json'); this.queue = Promise.resolve(); }
  async load() {
    await fs.mkdir(path.join(this.root, 'media'), { recursive: true });
    try { return { state: stateSchema.parse(JSON.parse(await fs.readFile(this.file, 'utf8'))), recovered: false }; }
    catch (error) {
      if (error.code === 'ENOENT') return { state: initialState(), recovered: false };
      try { return { state: stateSchema.parse(JSON.parse(await fs.readFile(this.file + '.bak', 'utf8'))), recovered: true }; }
      catch { throw new Error('Die Datendatei und ihre Sicherung konnten nicht gelesen werden. Bitte den Datenordner sichern und die Dateien prüfen.'); }
    }
  }
  save(input) {
    const state = stateSchema.parse(input);
    const operation = this.queue.then(async () => {
      await fs.mkdir(this.root, { recursive: true });
      try {
        const previous = await fs.readFile(this.file, 'utf8');
        stateSchema.parse(JSON.parse(previous));
        await fs.writeFile(this.file + '.bak', previous, 'utf8');
      } catch (error) { if (error.code !== 'ENOENT' && !(error instanceof SyntaxError) && error.name !== 'ZodError') throw error; }
      const temporary = this.file + '.tmp';
      await fs.writeFile(temporary, JSON.stringify(state, null, 2), 'utf8');
      await fs.rename(temporary, this.file);
    });
    this.queue = operation.catch(() => {});
    return operation;
  }
  mediaPath(attachment) {
    if (!/^[0-9a-f-]{36}$/i.test(attachment.id) || !/^(png|jpg|jpeg|webp|mp3|wav|m4a|ogg|webm|flac)$/.test(attachment.extension)) throw new Error('Ungültige Anlage');
    return path.join(this.root, 'media', `${attachment.id}.${attachment.extension}`);
  }
}
module.exports = { Store };
