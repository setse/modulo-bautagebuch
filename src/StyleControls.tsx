import type { SectionStyle, Alignment } from './types';
import { fonts } from '../electron/design.mjs';
const palette=[['#ffffff','Weiß'],['#f0ece2','Creme'],['#e2eade','Salbei hell'],['#47764b','Salbei'],['#c8c0a8','Sand'],['#2a2a26','Dunkel']] as const;
export function AlignmentChooser({label,value,onChange}:{label:string;value:Alignment;onChange:(a:Alignment)=>void}) {
  return <label className="field"><span>{label}</span><select aria-label={label} value={value} onChange={e=>onChange(e.target.value as Alignment)}><option value="left">Links</option><option value="center">Mitte</option><option value="right">Rechts</option></select></label>;
}
export function FontChooser({label,value,onChange}:{label:string;value:string;onChange:(a:string)=>void}) {
  return <label className="field"><span>{label}</span><select aria-label={label} value={value} onChange={e=>onChange(e.target.value)}>{fonts.map(font=><option key={font}>{font}</option>)}</select></label>;
}
export function BorderChooser({value,onChange}:{value:SectionStyle['borderStyle'];onChange:(a:SectionStyle['borderStyle'])=>void}) {
  return <label className="field"><span>Rahmenstil</span><select aria-label="Rahmenstil" value={value} onChange={e=>onChange(e.target.value as SectionStyle['borderStyle'])}><option value="none">Ohne Rahmen</option><option value="solid">Durchgezogen</option><option value="dashed">Gestrichelt</option><option value="dotted">Gepunktet</option><option value="double">Doppelt</option></select></label>;
}
export function ColorChooser({label,value,onChange}:{label:string;value:string;onChange:(a:string)=>void}) {
  return <div className="field palette-field"><span>{label}</span><div className="color-swatches" role="group" aria-label={label}>{palette.map(([color,name])=><button key={color} type="button" title={name} aria-label={`${label}: ${name}`} aria-pressed={value.toLowerCase()===color} style={{backgroundColor:color}} onClick={()=>onChange(color)}/>)}{!palette.some(([color])=>color===value.toLowerCase())&&<span className="custom-swatch" title={`Aktuelle Farbe ${value}`} style={{backgroundColor:value}}/>}</div><details className="custom-color"><summary>Eigene Farbe</summary><input aria-label={label} type="color" value={value} onChange={e=>onChange(e.target.value)}/></details></div>;
}
export default function StyleControls({value,onChange}:{value:SectionStyle;onChange:(s:Partial<SectionStyle>)=>void}) {
  return <div className="style-controls">
    <div className="field-grid two"><BorderChooser value={value.borderStyle} onChange={borderStyle=>onChange({borderStyle})}/><ColorChooser label="Hintergrundfarbe" value={value.backgroundColor} onChange={backgroundColor=>onChange({backgroundColor})}/></div>
    <details className="settings-disclosure"><summary>Weitere Optionen</summary><div className="field-grid two"><ColorChooser label="Rahmenfarbe" value={value.borderColor} onChange={borderColor=>onChange({borderColor})}/><label className="field"><span>Rahmenstärke · px</span><input aria-label="Rahmenstärke" type="number" min={0.5} max={5} step={0.5} value={value.borderWidth} onChange={e=>{const borderWidth=Number(e.target.value);if(borderWidth>=0.5&&borderWidth<=5)onChange({borderWidth});}}/></label><FontChooser label="Schriftart" value={value.fontFamily} onChange={fontFamily=>onChange({fontFamily})}/><label className="field"><span>Schriftgröße · pt</span><input aria-label="Schriftgröße" type="number" min={6} max={36} value={value.fontSize} onChange={e=>{const fontSize=Number(e.target.value);if(fontSize>=6&&fontSize<=36)onChange({fontSize});}}/></label><ColorChooser label="Textfarbe" value={value.textColor} onChange={textColor=>onChange({textColor})}/><AlignmentChooser label="Textausrichtung" value={value.alignment} onChange={alignment=>onChange({alignment})}/></div></details>
  </div>;
}
