import type { DocumentDesign, SectionStyle } from './types';
import {FontChooser,ColorChooser,BorderChooser} from './StyleControls';
import { sectionNames,sectionStyle } from '../electron/design.mjs';

export default function DocumentSettings({design,onChange}:{design:DocumentDesign;onChange:(d:DocumentDesign)=>void}) {
  // A single shared default updates all sections; existing entry overrides remain local.
  const standard=sectionStyle(design,null,'trades') as SectionStyle;
  function shared(patch:Partial<SectionStyle>,documentPatch:Partial<DocumentDesign>={}) {
    const sections={...design.sections};
    for(const key of Object.keys(sectionNames) as (keyof typeof sectionNames)[]) sections[key]={...sections[key],...patch};
    onChange({...design,...documentPatch,sections});
  }
  return <section className="document-settings"><h3>Dokumentgestaltung</h3><p>Ein gemeinsamer Stil für alle Abschnitte. Einzelne Anpassungen bleiben in der Vorschau möglich.</p>
    <div className="field-grid two"><FontChooser label="Dokumentschrift" value={design.fontFamily} onChange={fontFamily=>shared({fontFamily},{fontFamily})}/><label className="field"><span>Schriftgröße · pt</span><input aria-label="Dokumentschriftgröße" type="number" min={6} max={24} value={design.fontSize} onChange={e=>{const fontSize=+e.target.value;if(fontSize>=6&&fontSize<=24)shared({fontSize},{fontSize});}}/></label></div>
    <h4>Rahmen & Hintergrund</h4><div className="field-grid two"><BorderChooser value={standard.borderStyle} onChange={borderStyle=>shared({borderStyle})}/><ColorChooser label="Rahmenfarbe" value={standard.borderColor} onChange={borderColor=>shared({borderColor})}/><ColorChooser label="Hintergrundfarbe" value={standard.backgroundColor} onChange={backgroundColor=>shared({backgroundColor})}/><ColorChooser label="Dokumenttextfarbe" value={design.textColor} onChange={textColor=>shared({textColor},{textColor})}/></div>
    <details className="settings-disclosure"><summary>Tabellen</summary><div className="field-grid two"><label className="field"><span>Tabellenstil</span><select aria-label="Tabellenstil" value={design.table.variant} onChange={e=>onChange({...design,table:{...design.table,variant:e.target.value as DocumentDesign['table']['variant']}})}><option value="grid">Raster</option><option value="rows">Zeilenlinien</option><option value="striped">Abwechselnde Zeilen</option><option value="plain">Ohne Linien</option></select></label><ColorChooser label="Tabellenkopf" value={design.table.headerColor} onChange={headerColor=>onChange({...design,table:{...design.table,headerColor}})}/><ColorChooser label="Tabellenrahmen" value={design.table.borderColor} onChange={borderColor=>onChange({...design,table:{...design.table,borderColor}})}/></div><details className="settings-disclosure"><summary>Weitere Tabellenfarben</summary><div className="field-grid two">{([['rowColor','Tabellenzeilen'],['alternateColor','Wechselzeilen'],['textColor','Tabellentext']] as const).map(([key,label])=><ColorChooser key={key} label={label} value={design.table[key]} onChange={color=>onChange({...design,table:{...design.table,[key]:color}})}/>)}</div></details></details>
    <details className="settings-disclosure"><summary>Seitenränder · A4</summary><div className="field-grid two">{([['top','Oben'],['bottom','Unten'],['left','Links'],['right','Rechts']] as const).map(([key,label])=><label className="field" key={key}><span>{label} · mm</span><input aria-label={`Seitenrand ${label}`} type="number" min={key==='top'||key==='bottom'?15:5} max={60} value={design.margins[key]} onChange={e=>{const n=+e.target.value;if(n>=(key==='top'||key==='bottom'?15:5)&&n<=60)onChange({...design,margins:{...design.margins,[key]:n}});}}/></label>)}</div></details>
  </section>;
}
