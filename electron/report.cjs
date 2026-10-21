const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, VerticalAlign } = require('docx');
const { calendarWeek, germanDate, defaultDocument } = require('./model.cjs');
const { photoPagesHtml, docxPhotoPages, docxHeaderFooter } = require('./document-design.cjs');
const {sectionStyle,styleCss,sectionNames,inSection,sectionBounds,defaultTable}=require('./design.mjs');
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const lines = value => escape(value).replace(/\n/g, '<br>');
const twips=value=>Math.round(value*1440/25.4);
function entryLabel(e) { return germanDate(e.date) + (e.endDate && e.endDate !== e.date ? ' bis ' + germanDate(e.endDate) : ''); }
function period(entries) {
  if (!entries.length) return '';
  const first = entries.map(e => e.date).sort()[0];
  const last = entries.map(e => e.endDate || e.date).sort().at(-1);
  const format = date => date.split('-').reverse().join('.');
  return first === last ? format(first) : `${format(first)} – ${format(last)}`;
}
function designOf(project){return {...defaultDocument(),...project.document};}
async function reportHtml(project, entries, readImage) {
  const d=designOf(project),t={...defaultTable,...d.table},m=d.margins,blocks=[];
  for (const e of entries) {
    async function section(key,content) {
      const photos=e.attachments.filter(a=>inSection(a,key));
      const pictures=await photoPagesHtml(photos,readImage,sectionBounds(d,e,key),sectionNames[key]);
      return `<div class="document-section" data-section="${key}" style="${styleCss(sectionStyle(d,e,key))}">${content}${pictures}</div>`;
    }
    blocks.push('<section>'+await section('project',`<div class="project"><p><b>Projekt ${escape(project.number)}</b> &nbsp; ${escape(project.name)}</p><p>${escape(project.location)}</p><p><b>Bauherr</b> &nbsp; ${escape(project.client)}</p></div>`)
      +await section('day',`<h2>${escape(entryLabel(e))}<span>KW ${calendarWeek(e.date)}</span></h2>${e.title?`<h3>${escape(e.title)}</h3>`:''}`)
      +await section('weather',`<div class="weather"><b>Wetter</b><span>${escape([e.weather,e.temperature&&e.temperature+' °C'].filter(Boolean).join(' · ')||'—')}</span>${e.startTime||e.endTime?`<span>Zeit: ${escape(e.startTime||'—')} bis ${escape(e.endTime||'—')}</span>`:''}</div>`)
      +await section('trades',`<table><colgroup><col style="width:14%"><col style="width:24%"><col style="width:8%"><col style="width:54%"></colgroup><thead><tr><th>Gewerk</th><th colspan="2">Firma – Anzahl Mitarbeiter</th><th>Arbeiten</th></tr></thead><tbody>${e.trades.length?e.trades.map(r=>`<tr><td>${lines(r.code)}</td><td>${lines(r.company)}</td><td class="center">${lines(r.workers)}</td><td>${lines(r.work)}</td></tr>`).join(''):'<tr><td colspan="4">Keine Gewerke dokumentiert.</td></tr>'}</tbody></table>`)
      +await section('incidents',`<div class="prose"><b>Besondere Vorkommnisse</b><p>${lines(e.incidents||'—')}</p></div>`)
      +(e.notes||e.attachments.some(a=>inSection(a,'notes'))?await section('notes',`<div class="prose"><b>Weitere Notizen</b><p>${lines(e.notes||'—')}</p></div>`):'')
      +(e.attachments.some(a=>inSection(a,'photos'))?await section('photos',''):'')
      +(e.attachments.some(a=>a.kind==='audio'||inSection(a,'audio'))?await section('audio',`<h3>Sprachnotizen</h3>${e.attachments.filter(a=>a.kind==='audio').map(a=>`<div class="prose"><b>${escape(a.name)}</b><p>${lines(a.transcript||'Noch kein Transkript vorhanden.')}</p></div>`).join('')}`):'')
      +await section('signature',`<div class="signature"><p>Aufgestellt${project.author?', '+escape(project.author):''}</p><div class="line"><span>(Ort, Datum)</span><span>(Bauüberwachung)</span></div></div>`)
      +(e.status==='draft'?'<p class="draft">Entwurf</p>':'')+'</section>');
  }
  const border=t.variant==='grid'?`border:1px solid ${t.borderColor};`:t.variant==='rows'?`border:0;border-bottom:1px solid ${t.borderColor};`:'border:0;';
  return `<!doctype html><html lang="de"><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:"><title>Bautagebuch</title><style>
    @page { size:A4; margin:${m.top}mm ${m.right}mm ${m.bottom}mm ${m.left}mm; }
    *{box-sizing:border-box}body{font-family:'${d.fontFamily}',sans-serif;color:${d.textColor};font-size:${d.fontSize}pt;line-height:1.4;margin:0;overflow-wrap:anywhere}
    h1{font-size:1.2em;letter-spacing:.8pt;margin:0 0 12pt}section{margin:0 0 24pt}.document-section{margin-bottom:10pt;box-decoration-break:clone}.project p{margin:2pt 0}h2{font-size:inherit;padding:0;margin:0;display:flex;justify-content:space-between;gap:12pt;break-after:avoid}h2 span{white-space:nowrap}h3{font-size:inherit;margin:10pt 0 7pt;break-after:avoid}.weather{display:flex;gap:12pt;padding:0}
    table{border-collapse:collapse;width:100%;table-layout:fixed}th,td{${border}padding:6pt;text-align:inherit;vertical-align:top;font-size:inherit;color:${t.textColor};background:${t.rowColor}}th{background:${t.headerColor};font-weight:bold}${t.variant==='striped'?`tbody tr:nth-child(even) td{background:${t.alternateColor}}`:''}thead{display:table-header-group}tr{break-inside:avoid}.center{text-align:center}.prose b{break-after:avoid}.prose p{margin:3pt 0 0}
    .photo-page{break-inside:avoid;margin-top:3mm}.photo-page+.photo-page{break-before:page}.photo-page h3{margin:0 0 2mm;font-size:8pt}.photo-canvas{position:relative}.photo-canvas figure{position:absolute;margin:0}.photo-canvas img{display:block;object-fit:contain}figcaption{font-size:8pt;line-height:1.3;padding-top:2mm;overflow-wrap:anywhere}.draft{color:#777;font-size:9pt}.signature{margin-top:20pt;break-inside:avoid}.signature p{margin:8pt 0}.signature .line{margin-top:35pt;display:flex;justify-content:space-between;border-top:1px solid #aaa;padding-top:5pt}
    </style></head><body><h1>BAUTAGEBUCH · ${escape(period(entries))}</h1>${blocks.join('')}</body></html>`;
}
async function reportDocx(project, entries, readImage) {
  const d=designOf(project),t={...defaultTable,...d.table},m=d.margins,children=[];
  const sides=['top','bottom','left','right','insideHorizontal','insideVertical'];
  const borderStyles={none:'nil',solid:'single',dashed:'dashed',dotted:'dotted',double:'double'};
  const border=(style,color,size=4)=>({style,size,color:color.replace('#','')});
  for(const e of entries) {
    async function section(key,build) {
      const s=sectionStyle(d,e,key),bounds=sectionBounds(d,e,key),width=twips(bounds.width);
      const p=(value,bold=false,options={})=>new Paragraph({alignment:s.alignment,children:String(value??'').split('\n').map((text,i)=>new TextRun({text,bold,font:s.fontFamily,size:s.fontSize*2,color:s.textColor.slice(1),break:i?1:undefined})),...options});
      const contents=build(p,width,s);
      const borders=Object.fromEntries(sides.map(side=>[side,border(borderStyles[s.borderStyle],s.borderColor,s.borderWidth*6)]));
      children.push(new Table({width:{size:twips(210-m.left-m.right),type:WidthType.DXA},borders,columnWidths:[twips(210-m.left-m.right)],rows:[new TableRow({children:[new TableCell({borders,shading:{fill:s.backgroundColor.slice(1)},margins:{top:s.borderStyle==='none'?0:twips(3),bottom:s.borderStyle==='none'?0:twips(3),left:s.borderStyle==='none'?0:twips(3),right:s.borderStyle==='none'?0:twips(3)},children:[...contents,p('',false,{spacing:{after:0,line:1}})]})]})]}));
      children.push(new Paragraph({spacing:{after:100}}));
      children.push(...await docxPhotoPages(e.attachments.filter(a=>inSection(a,key)),readImage,bounds,sectionNames[key],s));
    }
    await section('project',p=>[p(`Projekt ${project.number} · ${project.name}`,true),p(project.location),p(`Bauherr    ${project.client}`)]);
    await section('day',p=>[p(`${entryLabel(e)}    KW ${calendarWeek(e.date)}`,true),...(e.title?[p(e.title,true)]:[])]);
    await section('weather',p=>[p(['Wetter',e.weather,e.temperature&&e.temperature+' °C',(e.startTime||e.endTime)&&`${e.startTime||'—'} bis ${e.endTime||'—'}`].filter(Boolean).join(' · '))]);
    await section('trades',(p,width,s)=>{
      const widths=[.14,.24,.08,.54].map(r=>Math.floor(width*r));widths[3]=width-widths.slice(0,3).reduce((a,b)=>a+b,0);
      const borders=Object.fromEntries(sides.map(side=>[side,border(t.variant==='grid'||t.variant==='rows'&&(side==='top'||side==='bottom'||side==='insideHorizontal')?'single':'nil',t.borderColor)]));
      const row=(values,head=false,index=0)=>new TableRow({tableHeader:head,cantSplit:true,children:values.map((value,i)=>new TableCell({width:{size:widths[i],type:WidthType.DXA},borders,verticalAlign:VerticalAlign.CENTER,margins:{top:100,bottom:100,left:100,right:100},shading:{fill:(head?t.headerColor:t.variant==='striped'&&index%2?t.alternateColor:t.rowColor).slice(1)},children:[new Paragraph({alignment:s.alignment,children:String(value).split('\n').map((text,j)=>new TextRun({text,bold:head,font:s.fontFamily,size:s.fontSize*2,color:t.textColor.slice(1),break:j?1:undefined}))})]}))});
      return [new Table({width:{size:width,type:WidthType.DXA},columnWidths:widths,borders,rows:[row(['Gewerk','Firma','MA','Arbeiten'],true),...(e.trades.length?e.trades.map((r,i)=>row([r.code,r.company,r.workers,r.work],false,i)):[row(['','','','Keine Gewerke dokumentiert.'])])]})];
    });
    await section('incidents',p=>[p('Besondere Vorkommnisse',true),p(e.incidents||'—')]);
    if(e.notes||e.attachments.some(a=>inSection(a,'notes')))await section('notes',p=>[p('Weitere Notizen',true),p(e.notes||'—')]);
    if(e.attachments.some(a=>inSection(a,'photos')))await section('photos',()=>[]);
    if(e.attachments.some(a=>a.kind==='audio'||inSection(a,'audio')))await section('audio',p=>[p('Sprachnotizen',true),...e.attachments.filter(a=>a.kind==='audio').flatMap(a=>[p(a.name,true),p(a.transcript||'Noch kein Transkript vorhanden.')])]);
    await section('signature',p=>[p(`Aufgestellt${project.author?', '+project.author:''}`),p('\n\n(Ort, Datum)                                               (Bauüberwachung)')]);
    if(e.status==='draft')children.push(new Paragraph({text:'Entwurf'}));
  }
  return Packer.toBuffer(new Document({creator:'Modulo Bautagebuch',title:`Bautagebuch ${project.number}`,styles:{default:{document:{run:{font:d.fontFamily,size:d.fontSize*2,color:d.textColor.slice(1)},paragraph:{spacing:{after:100}}}}},sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:twips(m.top),bottom:twips(m.bottom),left:twips(m.left),right:twips(m.right),header:200,footer:200}}},...await docxHeaderFooter(project,period(entries),readImage),children}]}));
}
module.exports = { reportHtml, reportDocx, escape, reportPageTemplates:(project,entries,readImage)=>require('./document-design.cjs').reportPageTemplates(project,entries,readImage,period(entries)) };
