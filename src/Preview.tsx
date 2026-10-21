import {useState} from 'react';
import {ImagePlus,Settings2,RotateCcw,Grid2X2} from 'lucide-react';
import PhotoLayoutEditor from './PhotoLayoutEditor';
import StyleControls from './StyleControls';
import PageBand from './PageBand';
import type { Entry, Project, Attachment, SectionKey, SectionStyle } from './types';
import { dateLabel, week } from './helpers';
import { fillTemplate,fitPhotosOnPage } from '../electron/layout.mjs';
import {sectionNames,sectionStyle,inSection,sectionBounds} from '../electron/design.mjs';

export default function Preview({ project, entry, onPhotosChange,onStyleChange,onAddPhotos,busy }: { project: Project; entry: Entry; onPhotosChange: (section:SectionKey,photos:Attachment[]) => void; onStyleChange:(section:SectionKey,style:Partial<SectionStyle>|null)=>void; onAddPhotos:(section:SectionKey)=>void; busy:boolean }) {
  const [editing,setEditing]=useState<SectionKey|null>(null);
  const [hovering,setHovering]=useState<SectionKey|null>(null);
  const [popoverAbove,setPopoverAbove]=useState(false);
  function placePopover(button:HTMLElement){const rect=button.getBoundingClientRect(),viewport=button.closest('.preview-wrap')!.getBoundingClientRect();setPopoverAbove(rect.bottom+340>viewport.bottom&&rect.top-viewport.top>280);}
  const design=project.document;
  const period = entry.date.split('-').reverse().join('.') + (entry.endDate && entry.endDate!==entry.date ? ' – '+entry.endDate.split('-').reverse().join('.') : '');
  const resolve=(text:string)=>fillTemplate(text,project,period).replace(/\{seite\}/g,'1').replace(/\{seiten\}/g,'…');
  const section=(key:SectionKey,children:React.ReactNode)=>{
    const style=sectionStyle(design,entry,key) as SectionStyle,photos=entry.attachments.filter(a=>inSection(a,key));
    return <div className={`document-section ${editing===key||hovering===key?'is-styling':''}`} data-section={key} key={key} tabIndex={0} aria-label={sectionNames[key]} onPointerDown={e=>{if(!(e.target as HTMLElement).closest('.document-section-tools')){setEditing(null);setHovering(null);}}}>
      <div className="document-section-tools" onMouseLeave={()=>setHovering(null)} onKeyDown={e=>{if(e.key==='Escape'){setEditing(null);setHovering(null);}}}>
        <button className="icon-button" title={`Gestaltung: ${sectionNames[key]}`} aria-label={`Gestaltung: ${sectionNames[key]}`} aria-expanded={editing===key||hovering===key} onMouseEnter={e=>{placePopover(e.currentTarget);setHovering(key);}} onClick={e=>{placePopover(e.currentTarget);setEditing(editing===key?null:key);setHovering(null);}}><Settings2 size={15}/></button>
        <button className="icon-button" title={`Fotos hinzufügen: ${sectionNames[key]}`} aria-label={`Fotos hinzufügen: ${sectionNames[key]}`} disabled={busy} onMouseEnter={()=>setHovering(null)} onClick={()=>onAddPhotos(key)}><ImagePlus size={15}/></button>
        {!!photos.length&&<><button className="icon-button" aria-label="Automatisch anordnen" title="Automatisch anordnen" onMouseEnter={()=>setHovering(null)} onClick={()=>onPhotosChange(key,photos.map(photo=>({...photo,layout:undefined})))}><RotateCcw size={15}/></button><button className="icon-button" aria-label="Alle auf eine Seite" title="Alle auf eine Seite" onMouseEnter={()=>setHovering(null)} onClick={()=>{const fitted=fitPhotosOnPage(photos,sectionBounds(design,entry,key));onPhotosChange(key,photos.map((photo,i)=>({...photo,layout:fitted[i]})));}}><Grid2X2 size={15}/></button></>}
        {(editing===key||hovering===key) && <div className={`section-style-panel ${popoverAbove?'above':''}`} role="region" aria-label={`Gestaltung ${sectionNames[key]}`}><div className="section-popover-heading"><b>{sectionNames[key]}</b><button className="icon-button" aria-label="Gestaltung schließen" onClick={()=>{setEditing(null);setHovering(null);}}>×</button></div><StyleControls value={style} onChange={s=>onStyleChange(key,s)}/><button className="text-button" onClick={()=>onStyleChange(key,null)}>Projektstandard verwenden</button></div>}
      </div>
      <div className="document-section-content" style={{border:style.borderStyle==='none'?'none':`${style.borderWidth}px ${style.borderStyle} ${style.borderColor}`,background:style.backgroundColor,fontFamily:style.fontFamily,fontSize:`${style.fontSize}pt`,color:style.textColor,textAlign:style.alignment,padding:style.borderStyle==='none'?0:'3mm'}}>{children}
        {!!photos.length && <PhotoLayoutEditor photos={photos} bounds={sectionBounds(design,entry,key)} onChange={p=>onPhotosChange(key,p)}/>}</div>
    </div>;
  };
  const table=design.table;
  const cell=(head:boolean,row=0):React.CSSProperties=>({border:table.variant==='grid'?`1px solid ${table.borderColor}`:'none',borderBottom:table.variant==='rows'?`1px solid ${table.borderColor}`:undefined,background:head?table.headerColor:table.variant==='striped'&&row%2?table.alternateColor:table.rowColor,color:table.textColor,font:'inherit'});
  return <div className="preview-wrap"><div className="paper" style={{padding:`${design.margins.top}mm ${design.margins.right}mm ${design.margins.bottom}mm ${design.margins.left}mm`,fontFamily:design.fontFamily,fontSize:`${design.fontSize}pt`,color:design.textColor}}>
    <div className="paper-custom-header"><PageBand design={design} kind="header" text={resolve(design.headerText)}/></div>
    <div className="paper-title">BAUTAGEBUCH <span>{project.number}</span></div>
    {section('project',<div className="paper-project"><b>Projekt</b><div>{project.name}<br/>{project.location}</div><b>Bauherr</b><div>{project.client||'—'}</div></div>)}
    {section('day',<><div className="paper-date"><b>{dateLabel(entry.date,true)}{entry.endDate && entry.endDate!==entry.date&&<><br/>bis {dateLabel(entry.endDate,true)}</>}</b><span>KW {week(entry.date)}</span></div>{entry.title&&<h3>{entry.title}</h3>}</>)}
    {section('weather',<><div className="paper-weather"><b>Wetter</b><span>{[entry.weather,entry.temperature&&`${entry.temperature} °C`].filter(Boolean).join(' · ')||'—'}</span></div>{(entry.startTime||entry.endTime)&&<p>Zeit: {entry.startTime||'—'} bis {entry.endTime||'—'}</p>}</>)}
    {section('trades',<table><colgroup>{[14,24,8,54].map((width,i)=><col key={i} style={{width:`${width}%`}}/>)}</colgroup><thead><tr>{['Gewerk','Firma','MA','Arbeiten'].map(t=><th key={t} style={cell(true)}>{t}</th>)}</tr></thead><tbody>{entry.trades.length?entry.trades.map((t,i)=><tr key={t.id}>{[t.code,t.company,t.workers,t.work].map((v,j)=><td key={j} style={cell(false,i)}>{v}</td>)}</tr>):<tr><td colSpan={4} style={cell(false)}>Keine Gewerke dokumentiert.</td></tr>}</tbody></table>)}
    {section('incidents',<><h3>Besondere Vorkommnisse</h3><p>{entry.incidents||'—'}</p></>)}
    {(entry.notes||entry.attachments.some(a=>inSection(a,'notes'))) && section('notes',<><h3>Weitere Notizen</h3><p>{entry.notes||'—'}</p></>)}
    {entry.attachments.some(a=>inSection(a,'photos'))&&section('photos',<h3>Fotodokumentation</h3>)}
    {entry.attachments.some(a=>a.kind==='audio'||inSection(a,'audio'))&&section('audio',<><h3>Sprachnotizen</h3>{entry.attachments.filter(a=>a.kind==='audio').map(a=><div key={a.id}><b>{a.name}</b><p>{a.transcript||'Noch kein Transkript vorhanden.'}</p></div>)}</>)}
    <details className="preview-insert"><summary aria-label="Fotos ergänzen" title="Fotos ergänzen"><ImagePlus size={14}/><span>Fotos ergänzen</span></summary><div>{(['photos','notes','audio'] as const).map(key=><button className="text-button" key={key} disabled={busy} onClick={()=>onAddPhotos(key)}>{sectionNames[key]}</button>)}</div></details>
    {section('signature' ,<div className="paper-signature">Aufgestellt{project.author?`, ${project.author}`:''}<div><span>(Ort, Datum)</span><span>(Bauüberwachung)</span></div></div>)}
    {entry.status==='draft'&&<span className="paper-draft">Entwurf</span>}
    <div className="paper-custom-footer"><PageBand design={design} kind="footer" text={resolve(design.footerText)}/></div>
  </div><p className="preview-note">Vorschau · Die genauen Seitenumbrüche entstehen beim Export.</p></div>;
}
