import { useRef, useState } from 'react';
import { ImagePlus, Plus, Trash2, X } from 'lucide-react';
import type { DocumentDesign, HeaderPreset, Project } from './types';
import { mediaUrl, uid } from './helpers';
import PageBand from './PageBand';
import {AlignmentChooser,FontChooser} from './StyleControls';
import { fillTemplate } from '../electron/layout.mjs';

const fields = [['projekt','Projektname'],['nummer','Projektnummer'],['bauherr','Bauherr'],['autor','Autor'],['zeitraum','Zeitraum'],['seite','Seite'],['seiten','Seiten gesamt']] as const;

export default function HeaderFooterEditor({ design, project, period, presets, onChange, onPresetsChange, notify }: { design: DocumentDesign; project: Project; period: string; presets: HeaderPreset[]; onChange: (d: DocumentDesign) => void; onPresetsChange: (p: HeaderPreset[]) => void; notify: (text: string, error?: boolean) => void }) {
  const [band,setBand]=useState<'header'|'footer'>('header');
  const [name, setName] = useState('');
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const headerInput = useRef<HTMLTextAreaElement>(null);
  const footerInput = useRef<HTMLTextAreaElement>(null);
  function insertField(target: 'headerText' | 'footerText', key: string) {
    const input = target === 'headerText' ? headerInput.current : footerInput.current;
    const text = design[target], start = input?.selectionStart ?? text.length, end = input?.selectionEnd ?? text.length;
    const token = `{${key}}`;
    if (text.length - (end - start) + token.length > 1000) return;
    onChange({ ...design, [target]: text.slice(0, start) + token + text.slice(end) });
    requestAnimationFrame(() => { input?.focus({ preventScroll: true }); input?.setSelectionRange(start + token.length, start + token.length); });
  }
  const resolve = (text: string) => fillTemplate(text, project, period).replace(/\{seite\}/g, '1').replace(/\{seiten\}/g, '3');
  async function importLogo(file?: File, target:'logo'|'footerImage'='logo') {
    setLoading(true);
    try {
      if (file && file.size > 100 * 1024 * 1024) throw new Error('Maximal 100 MB pro Datei.');
      const logo = file ? await window.diary.addLogo(file.name,new Uint8Array(await file.arrayBuffer())) : await window.diary.importLogo();
      if (logo) onChange({ ...design, [target]:logo });
    } catch (error) { notify(`Logo konnte nicht geladen werden: ${error}`,true); }
    finally { setLoading(false); }
  }
  return <section className="document-design"><h3>Kopf- und Fußzeile</h3><p>Text, Firmenlogo und Felder mit direkter Vorschau.</p>
    <div className="design-workspace"><div className="design-fields">
      <div className="band-selector" role="group" aria-label="Zeile bearbeiten">{(['header','footer'] as const).map(kind=><button key={kind} aria-pressed={band===kind} className={band===kind?'selected':''} onClick={()=>setBand(kind)}>{kind==='header'?'Kopfzeile':'Fußzeile'}</button>)}</div>
      {(['header','footer'] as const).map(kind=>{const label=kind==='header'?'Kopfzeile':'Fußzeile',target=kind==='header'?'logo':'footerImage',image=design[target],widthKey=kind==='header'?'logoWidthMm':'footerImageWidthMm';return <div key={kind} hidden={kind!==band}>
        <label className="field"><span>{label}</span><textarea ref={kind==='header'?headerInput:footerInput} aria-label={label} rows={3} maxLength={1000} value={design[`${kind}Text`]} onChange={e=>onChange({...design,[`${kind}Text`]:e.target.value})}/></label>
        <div className="template-field-buttons" role="group" aria-label={`Felder für ${label}`}>{fields.map(([key,title])=><button key={key} className="field-insert-button" aria-label={`${title} in ${label} einfügen`} onMouseDown={e=>e.preventDefault()} onClick={()=>insertField(`${kind}Text`,key)}><Plus size={12}/>{title}</button>)}</div>
        <div className="logo-editor">{image&&<><img src={mediaUrl(image.id)} alt={kind==='header'?'Firmenlogo':'Fußzeilenbild'}/><span>{image.name}</span><button className="icon-button danger" title={kind==='header'?'Firmenlogo entfernen':'Fußzeilenbild entfernen'} onClick={()=>onChange({...design,[target]:null})}><X size={16}/></button></>}<button className="button secondary" disabled={loading} onClick={()=>importLogo(undefined,target)}><ImagePlus size={16}/>{kind==='header'?(image?'Logo ersetzen':'Logo hochladen'):'Bild in Fußzeile hochladen'}</button><input type="file" hidden data-testid={kind==='header'?'logo-input':'footer-image-input'} ref={kind==='header'?fileInput:undefined} accept=".png,.jpg,.jpeg,.webp" onChange={e=>{if(e.target.files?.[0])void importLogo(e.target.files[0],target);e.target.value='';}}/></div>
        <details className="settings-disclosure"><summary>Ausrichtung & Schrift</summary><div className="field-grid two"><AlignmentChooser label={`${label} Textausrichtung`} value={design[`${kind}Alignment`]} onChange={alignment=>onChange({...design,[`${kind}Alignment`]:alignment})}/><AlignmentChooser label={`${label} Bildausrichtung`} value={design[`${kind}ImageAlignment`]} onChange={alignment=>onChange({...design,[`${kind}ImageAlignment`]:alignment})}/><FontChooser label={`${label} Schriftart`} value={design[`${kind}FontFamily`]} onChange={font=>onChange({...design,[`${kind}FontFamily`]:font})}/><label className="field"><span>Schriftgröße · pt</span><input aria-label={`${label} Schriftgröße`} type="number" min={6} max={18} value={design[`${kind}FontSize`]} onChange={e=>{const n=+e.target.value;if(n>=6&&n<=18)onChange({...design,[`${kind}FontSize`]:n});}}/></label></div>{image&&<label className="field"><span>Bildbreite · {design[widthKey]} mm</span><input aria-label={kind==='header'?'Logobreite':'Fußzeilenbildbreite'} type="range" min={10} max={60} value={design[widthKey]} onChange={e=>onChange({...design,[widthKey]:+e.target.value})}/></label>}</details>
      </div>;})}
      <p className="band-help">Felder per Klick an der Textposition einfügen. Bis zu drei kurze Zeilen; leer lassen zum Ausblenden.</p>
    </div><div className="header-design-preview" role="region" aria-label="Live-Vorschau Kopf- und Fußzeile">
      <div className="design-preview-label">Live-Vorschau · A4</div>
      <div className="design-preview-page" style={{padding:`${design.margins.top/210*100}% ${design.margins.right/210*100}% ${design.margins.bottom/210*100}% ${design.margins.left/210*100}%`}}><div className="design-preview-header"><PageBand design={design} kind="header" text={resolve(design.headerText)} mini/></div>
        <div className="design-preview-body"><b>BAUTAGEBUCH</b><span>{project.number} · {project.name}</span><div/><div/><div/></div>
        <div className="design-preview-footer"><PageBand design={design} kind="footer" text={resolve(design.footerText)} mini/></div>
      </div><p>Beispielseite 1 von 3. Projektfelder werden direkt aufgelöst; Seitenzahlen entstehen beim Export.</p>
    </div></div>
    <details className="settings-disclosure"><summary>Gespeicherte Vorlagen</summary>    <div className="preset-editor"><label className="field"><span>Gespeicherte Gestaltung verwenden</span><select aria-label="Kopf- und Fußzeilenvorlage" value={selected} onChange={e => { setSelected(e.target.value); const preset=presets.find(p=>p.id===e.target.value); if(preset) { onChange(structuredClone(preset.document)); setName(preset.name); } }}><option value="">Vorlage auswählen …</option>{presets.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label><div className="preset-save"><input aria-label="Vorlagenname" maxLength={100} placeholder="Name der Gestaltung …" value={name} onChange={e=>setName(e.target.value)} /><button className="button secondary" disabled={!name.trim() || loading || presets.length >= 100} onClick={()=>{ const existing=presets.find(p=>p.name===name.trim()); const preset={ id:existing?.id || uid(),name:name.trim(),document:structuredClone(design) }; onPresetsChange(existing?presets.map(p=>p.id===existing.id?preset:p):[...presets,preset]); setSelected(preset.id); notify('Gestaltung mit Logo, Kopf- und Fußzeile gespeichert.'); }}><Plus size={14} />Vorlage speichern</button>{selected && <button className="icon-button danger" title="Gestaltungsvorlage löschen" onClick={()=>{ onPresetsChange(presets.filter(p=>p.id!==selected)); setSelected(''); }}><Trash2 size={16} /></button>}</div></div>
</details>
  </section>;
}
