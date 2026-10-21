import {addDays,distance,finish,isWorkday,workDuration,exportCsv,validDate} from './planner.mjs';

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mm=72/25.4;
const papers={A4:[297,210],A3:[420,297],A2:[594,420],A1:[841,594],A0:[1189,841]};
const months=['Jan','Feb','Mrz','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
const weekday=['So','Mo','Di','Mi','Do','Fr','Sa'];
const label=date=>date?date.split('-').reverse().join('.'):'-';
const civilNow=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin'}).format(new Date());
const n=value=>Number(value.toFixed(3));

// Conservative Arial widths keep every line inside its column without hidden text.
function textWidth(text,font){return [...String(text)].reduce((sum,c)=>sum+font/mm*(/^[WM@%]$/.test(c)?.98:/^[ilI.,:;'!| ]$/.test(c)?.34:c.codePointAt(0)>0x2fff?1.1:.68),0);}
function wrap(text,width,font){
  const lines=[];let line='';
  for(const word of String(text||'').split(/(\s+)/)){
    if(word.includes('\n')){for(const part of word.split('\n').slice(1)){lines.push(line.trimEnd());line=part;}continue;}
    if(!line&&/^\s+$/.test(word))continue;
    if(textWidth(line+word,font)<=width){line+=word;continue;}
    if(line.trim()){lines.push(line.trimEnd());line='';}
    for(const c of word.trimStart()){if(line&&textWidth(line+c,font)>width){lines.push(line);line='';}line+=c;}
  }
  if(line.trim()||!lines.length)lines.push(line.trimEnd());return lines;
}
const lineHtml=lines=>lines.map(s=>`<span class="line">${esc(s)||'&#160;'}</span>`).join('');
function shortText(text,width,font){let value=String(text);if(textWidth(value,font)<=width)return value;while(value&&textWidth(value+'...',font)>width)value=value.slice(0,-1);return value+'...';}
function span(tasks,calendar){const dates=tasks.filter(t=>t.start).map(t=>[t.start,finish(t,calendar)]);if(!dates.length)return {start:'',end:'',duration:''};const start=dates.map(d=>d[0]).sort()[0],end=dates.map(d=>d[1]).sort().at(-1);return {start,end,duration:String(workDuration(start,end,calendar))+' AT'};}
function dateText(value){return value?weekday[new Date(value+'T12:00:00Z').getUTCDay()]+' '+label(value):'Noch offen';}

export function reportRows(plan,taskIds,layout='overall'){
  const selected=new Set(taskIds),numbers=new Map(),groups=new Map();let next=1;
  // Numbers stay identical across overview, trade plans, filters and the list.
  for(const trade of plan.trades){groups.set(trade.id,++next);for(const t of plan.tasks.filter(t=>t.tradeId===trade.id))numbers.set(t.id,++next);}
  const successors=new Map(plan.tasks.map(t=>[t.id,[]]));
  for(const t of plan.tasks)for(const link of t.predecessors)successors.get(link.taskId)?.push({...link,taskId:t.id});
  const linkText=link=>`${numbers.get(link.taskId)}EA${link.lag?(link.lag>0?'+':'')+link.lag+' '+(link.unit==='calendar'?'KT':'AT'):''}`;
  const rows=[{key:'total',number:1,title:'GESAMTTERMINPLAN',summary:true,...span(plan.tasks,plan.calendar),company:'',predecessors:'',successors:''}];
  for(const trade of plan.trades){
    const tasks=plan.tasks.filter(t=>t.tradeId===trade.id&&selected.has(t.id));if(!tasks.length)continue;
    const firms=[...new Set(tasks.map(t=>plan.companies.find(c=>c.id===t.companyId)?.name).filter(Boolean))];
    rows.push({key:'trade-'+trade.id,number:groups.get(trade.id),title:[trade.code,trade.name].filter(Boolean).join(' '),summary:true,...span(tasks,plan.calendar),company:firms.length===1&&tasks.every(t=>plan.companies.find(c=>c.id===t.companyId)?.name===firms[0])?firms[0]:'',predecessors:'',successors:''});
    for(const t of tasks){
      const flags=[t.blocked?'Blockiert':'',t.fixed?'Fixtermin':'',t.deadline&&finish(t,plan.calendar)>t.deadline?'Ziel überschritten':''].filter(Boolean);
      rows.push({key:t.id,task:t,number:numbers.get(t.id),title:t.title,summary:false,start:t.start,end:finish(t,plan.calendar),duration:t.duration+' AT',company:plan.companies.find(c=>c.id===t.companyId)?.name||'-',predecessors:t.predecessors.map(linkText).join('; '),successors:(successors.get(t.id)||[]).map(linkText).join('; '),flags,area:layout==='detail'&&!t.title.includes(t.area)?t.area:''});
    }
  }
  return rows;
}

function segments(from,to,key,title){
  const result=[];let start=from,previous=key(from);
  for(let date=addDays(from,1);date<=addDays(to,1);date=addDays(date,1))if(date>to||key(date)!==previous){result.push({start,end:addDays(date,-1),label:title(start)});start=date;previous=key(date);}
  return result;
}
function week(date){const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+4-(d.getUTCDay()||7));return [d.getUTCFullYear(),Math.ceil(((d-Date.UTC(d.getUTCFullYear(),0,1))/86400000+1)/7)];}
export function reportWindows(from,to,width,requested='auto'){
  const days=distance(from,to)+1;
  const scale=requested==='auto'?(days<=Math.floor(width/5)?'day':days<=Math.floor(width/7)*7?'week':'month'):requested;
  const capacity=scale==='day'?Math.max(1,Math.floor(width/5)):scale==='week'?Math.max(1,Math.floor(width/7))*7:Math.max(1,Math.floor(width/7))*30;
  const windows=[];for(let start=from;start<=to;){const end=[addDays(start,capacity-1),to].sort()[0];windows.push({from:start,to:end,scale});start=addDays(end,1);}return windows;
}
function timelineHeader(from,to,scale,width,height){
  const days=distance(from,to)+1,x=date=>distance(from,date)/days*width;
  const years=segments(from,to,d=>d.slice(0,4),d=>d.slice(0,4));
  const middle=scale==='month'?segments(from,to,d=>d.slice(0,4)+'-'+Math.ceil(Number(d.slice(5,7))/3),d=>Math.ceil(Number(d.slice(5,7))/3)+'. Quartal'):segments(from,to,d=>d.slice(0,7),d=>months[Number(d.slice(5,7))-1]+' '+d.slice(0,4));
  const lower=scale==='month'?segments(from,to,d=>d.slice(0,7),d=>months[Number(d.slice(5,7))-1]):scale==='week'?segments(from,to,d=>week(d).join('-'),d=>'KW '+week(d)[1]):segments(from,to,d=>d,d=>d.slice(8));
  const tier=height/3;
  return `<svg class="time-heading" viewBox="0 0 ${n(width)} ${height}" width="100%" height="${height}mm" preserveAspectRatio="none">${[years,middle,lower].map((items,row)=>items.map(s=>{const left=x(s.start),right=x(addDays(s.end,1));return `<path d="M${n(left)},${n(row*tier)}v${n(tier)}h${n(right-left)}" fill="none" stroke="#b2b2b2" stroke-width=".15"/>${right-left>=3.5?`<text x="${n((left+right)/2)}" y="${n(row*tier+tier*.67)}" text-anchor="middle" font-size="${n(Math.min(2.6,(right-left)/Math.max(s.label.length*.65,1)))}">${esc(s.label)}</text>`:''}`;}).join('')).join('')}</svg>`;
}
function columns(layout,width){
  const ratios=layout==='detail'?[['number','Nr.',.055],['title','Vorgangsname',.555],['duration','Dauer',.11],['start','Anfang',.14],['end','Ende',.14]]:[['number','Nr.',.045],['title','Vorgangsname',.385],['company','Auftragnehmer',.16],['duration','Dauer',.075],['start','Anfang',.09],['end','Ende',.09],['predecessors','Vorgänger',.0775],['successors','Nachfolger',.0775]];
  return ratios.map(([key,title,ratio])=>({key,title,width:width*ratio}));
}
function prepareRows(rows,cols,font,rowMin,bodyHeight){
  const lineHeight=font/mm*1.25,maxLines=Math.max(2,Math.floor((bodyHeight-2*rowMin-2)/lineHeight));
  const prepared=[];
  for(const row of rows){
    const cells=cols.map(c=>{
      let text=c.key==='start'||c.key==='end'?dateText(row[c.key]):String(row[c.key]??'');
      if(c.key==='title')text+=[row.area,(row.flags||[]).join(' · ')].filter(Boolean).map(s=>'\n'+s).join('');
      return {...c,lines:wrap(text,c.width-2-(c.key==='title'&&!row.summary?2:0),font)};
    });
    const count=Math.max(...cells.map(c=>c.lines.length));
    for(let offset=0;offset<count;offset+=maxLines){const part=cells.map(c=>({...c,lines:c.lines.slice(offset,offset+maxLines)}));prepared.push({...row,continuation:offset>0,cells:part,height:Math.max(rowMin,Math.max(...part.map(c=>c.lines.length))*lineHeight+2.35)});}
  }
  return prepared;
}
function paginate(rows,height){
  const pages=[];let page=[],used=0;
  for(let i=0;i<rows.length;i++){
    const row=rows[i],reserve=row.summary&&rows[i+1]?row.height+rows[i+1].height:row.height;
    if(page.length&&used+Math.min(height,reserve)>height){pages.push(page);page=[];used=0;}
    if(row.height>height)throw Error('Eine Tabellenzeile passt nicht auf dieses Papierformat. Größeres Format wählen.');
    page.push(row);used+=row.height;
  }
  if(page.length)pages.push(page);return pages;
}
function timeline(rows,window,width,bodyHeight,plan,baseline,stand,prefix){
  const {from,to,scale}=window,days=distance(from,to)+1,x=date=>distance(from,date)/days*width;
  const old=new Map((baseline?.snapshot.tasks||[]).map(t=>[t.id,t]));
  const bounds=(start,end)=>!start||end<from||start>to?null:{left:Math.max(0,x(start)),right:Math.min(width,x(addDays(end,1)))};
  let y=0;const positions=rows.map(row=>{const p={row,y,center:y+row.height*.62};y+=row.height;return p;});
  const grid=segments(from,to,d=>scale==='month'?d.slice(0,7):scale==='week'?week(d).join('-'):d,d=>d).map(s=>`<path d="M${n(Math.max(0,x(s.start)))},0V${n(bodyHeight)}" stroke="#d2d2d2" stroke-width=".15"/>`).join('');
  const offdays=scale==='day'?Array.from({length:days},(_,i)=>addDays(from,i)).filter(d=>!isWorkday(d,plan.calendar)).map(d=>`<rect x="${n(x(d))}" y="0" width="${n(width/days)}" height="${n(bodyHeight)}" fill="#f0f0f0"/>`).join(''):'';
  const edges=[];const visible=new Map(positions.filter(p=>p.row.task&&!p.row.continuation).map(p=>[p.row.key,p]));
  for(const target of visible.values())for(const link of target.row.task.predecessors){const source=visible.get(link.taskId);if(!source||!target.row.start||!source.row.end||source.row.end<from||source.row.end>to||target.row.start<from||target.row.start>to)continue;const sx=Math.min(width-.7,x(addDays(source.row.end,1))),tx=Math.max(.7,x(target.row.start)),bend=Math.min(width-.5,Math.max(sx,tx)+1.5);edges.push(`<path class="dependency" d="M${n(sx)},${n(source.center)}H${n(bend)}V${n(target.center)}H${n(tx)}" fill="none" stroke="#0070c0" stroke-width=".25" marker-end="url(#arrow-${prefix})"/>`);}
  const bars=positions.map(({row,y,center})=>{
    const b=bounds(row.start,row.end),reference=row.task&&old.get(row.key),rb=reference?bounds(reference.start,finish(reference,baseline.snapshot.calendar)):null;
    const labelFont=row.summary?2.7:2.35;
    let content=`<path d="M0,${n(y+row.height)}H${n(width)}" stroke="#b2b2b2" stroke-width=".15"/>`;
    if(rb&&!row.continuation)content+=`<path class="reference" d="M${n(rb.left)},${n(center+2.1)}H${n(rb.right)}" stroke="#878787" stroke-width=".55"/>`;
    if(!b)return content+(!row.summary&&!row.continuation?`<text x="2" y="${n(center)}" font-size="2.3" fill="#777">Noch nicht terminiert</text>`:'');
    if(row.continuation)return content;
    const middle=(b.left+b.right)/2;
    content+=`<text class="bar-label" x="${n(Math.max(1,Math.min(b.left,width-5)))}" y="${n(y+Math.min(3,row.height*.32))}" font-size="${labelFont}" font-weight="${row.summary?'bold':'normal'}">${esc(shortText(row.title,Math.max(4,width-b.left-1),labelFont*mm))}</text>`;
    if(row.summary)content+=`<path class="summary-bar" d="M${n(b.left)},${n(center)}H${n(b.right)}" stroke="#111" stroke-width="1"/><path d="M${n(b.left)},${n(center-.5)}l1.2,0 -.6,1.5zM${n(b.right-1.2)},${n(center-.5)}l1.2,0 -.6,1.5z" fill="#111"/>`;
    else if(row.task.duration===0)content+=`<path class="milestone" d="M${n(middle)},${n(center-1.6)}l1.6,1.6 -1.6,1.6 -1.6,-1.6z" fill="#111"/>`;
    else{const w=Math.max(.6,b.right-b.left);content+=`<rect class="activity-bar" x="${n(b.left)}" y="${n(center-1.1)}" width="${n(w)}" height="2.2" fill="#0070c0"${row.task.blocked?' stroke="#b52b27" stroke-width=".4" stroke-dasharray="1 .6"':''}/>${row.task.progress?`<rect x="${n(b.left)}" y="${n(center-1.1)}" width="${n(w*row.task.progress/100)}" height="2.2" fill="#00487d"/>`:''}`;if(w>10)content+=`<text x="${n(b.left+.7)}" y="${n(center+.65)}" fill="white" font-size="1.9">${row.task.progress}%</text>`;}
    if(row.height>=11&&b.right-b.left>=19)content+=`<text x="${n(b.left)}" y="${n(center+3.5)}" font-size="2">${esc(row.start.slice(8)+'.'+row.start.slice(5,7))}</text><text x="${n(b.right)}" y="${n(center+3.5)}" text-anchor="end" font-size="2">${esc(row.end.slice(8)+'.'+row.end.slice(5,7))}</text>`;
    return content;
  }).join('');
  const standLine=stand>=from&&stand<=to?`<path class="stand-line" d="M${n(x(stand))},0V${n(bodyHeight)}" stroke="#64a669" stroke-width=".25"/>`:'';
  return `<svg class="timeline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n(width)} ${n(bodyHeight)}" width="100%" height="${n(bodyHeight)}mm" preserveAspectRatio="none"><defs><marker id="arrow-${prefix}" viewBox="0 0 4 4" refX="3.5" refY="2" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0,0L4,2L0,4z" fill="#0070c0"/></marker><clipPath id="chart-clip-${prefix}"><rect width="${n(width)}" height="${n(bodyHeight)}"/></clipPath></defs><g clip-path="url(#chart-clip-${prefix})">${offdays}${grid}${standLine}${edges.join('')}${bars}</g></svg>`;
}

export async function plannerReport(project,plan,options,readImage){
  const layout=options.layout||'overall',paper=options.paper||'A3',scale=options.scale||'auto';
  if(!papers[paper]||!['overall','detail','list'].includes(layout)||!['auto','day','week','month'].includes(scale))throw Error('Ungültiges Drucklayout.');
  if(!validDate(options.from)||!validDate(options.to)||options.from>options.to||distance(options.from,options.to)>3660)throw Error('Zeitraum muss zwischen 1 und 3.661 Kalendertagen liegen.');
  const selected=plan.tasks.filter(t=>options.taskIds.includes(t.id));if(!selected.length)throw Error('Keine Vorgänge ausgewählt.');
  const baseline=plan.baselines.find(b=>b.id===options.baselineId);
  const [landscapeWidth,landscapeHeight]=papers[paper],portrait=layout==='list';
  const width=(portrait?landscapeHeight:landscapeWidth)-20,height=(portrait?landscapeWidth:landscapeHeight)-20;
  const font=paper==='A4'?7.5:paper==='A3'?8:9,rowMin=paper==='A4'?9:10;
  const tableWidth=layout==='list'?width:width*(layout==='detail'?.52:.57),chartWidth=width-tableWidth,cols=columns(layout,tableWidth);
  const headingFont=paper==='A4'?11:13,logoWidth=28;
  const nameLines=wrap(project.name,width-logoWidth*2-8,headingFont),locationLines=wrap(project.location,width-logoWidth*2-8,9);
  const meta=layout==='list'?`${selected.length} von ${plan.tasks.length} Vorgängen - Liste ohne Zeitachse`:`${label(options.from)} - ${label(options.to)} - Auswahl: ${selected.length} von ${plan.tasks.length} Vorgängen${baseline?' - Sollplan: '+baseline.name:''}`;
  const metaLines=wrap(meta,width-8,7.5);
  const headerHeight=Math.max(25,6+nameLines.length*headingFont/mm*1.2+locationLines.length*9/mm*1.2+8+metaLines.length*7.5/mm*1.2);
  const tableHeading=12,footerHeight=10,legendHeight=baseline?10:7,bodyHeight=height-headerHeight-tableHeading-footerHeight-legendHeight-5;
  if(bodyHeight<35)throw Error('Projektkopf ist für dieses Papierformat zu lang. Größeres Papierformat wählen.');
  const rowPages=paginate(prepareRows(reportRows(plan,options.taskIds,layout),cols,font,rowMin,bodyHeight),bodyHeight);
  const windows=layout==='list'?[null]:reportWindows(options.from,options.to,chartWidth,scale);
  if(windows.length*rowPages.length>500)throw Error('Export hat mehr als 500 Seiten. Zeitraum oder Auswahl reduzieren.');
  let logo='';if(project.document.logo){const img=await readImage(project.document.logo);logo=`<img class="logo" alt="Firmenlogo" src="data:${img.mime||'image/png'};base64,${img.data.toString('base64')}">`;}
  const printDate=options.printDate||civilNow(),stand=plan.updatedAt.slice(0,10),title=layout==='detail'?'GEWERKETERMINPLAN':layout==='list'?'BAUZEITENPLAN - VORGANGSLISTE':'BAUZEITENPLAN';
  const pages=[];
  for(const window of windows)for(const rows of rowPages){
    const used=rows.reduce((total,row)=>total+row.height,0),heading=cols.map(c=>`<th style="width:${n(c.width)}mm">${esc(c.title)}</th>`).join('');
    const body=rows.map(row=>`<tr class="${row.summary?'summary':'activity'}${row.continuation?' continuation':''}" data-row="${esc(row.key)}" style="height:${n(row.height)}mm">${row.cells.map(c=>`<td class="cell-${c.key}">${lineHtml(c.lines)}</td>`).join('')}</tr>`).join('');
    pages.push(`<section class="sheet" data-layout="${layout}"><header>${logo}<div class="project-name">${lineHtml(nameLines)}</div><div class="project-location">${lineHtml(locationLines)}</div><h1>${title}</h1><div class="meta">${lineHtml(metaLines)}</div></header><div class="plan-grid"><table style="width:${n(tableWidth)}mm"><colgroup>${cols.map(c=>`<col style="width:${n(c.width)}mm">`).join('')}</colgroup><thead><tr>${heading}</tr></thead><tbody>${body}</tbody></table>${window?`<div class="chart" style="left:${n(tableWidth)}mm;width:${n(chartWidth)}mm">${timelineHeader(window.from,window.to,window.scale,chartWidth,tableHeading)}${timeline(rows,window,chartWidth,used,plan,baseline,stand,pages.length)}<div class="time-range">Zeitachse: ${label(window.from)} - ${label(window.to)}</div></div>`:''}</div><div class="legend">${layout==='list'?'':'Schwarz = Sammelvorgang · Blau = Vorgang · Dunkelblau = Fortschritt · Raute = Meilenstein · Grün = Planstand. '}${baseline&&layout!=='list'?'Graue Linie = Sollplan. ':''}AT = Arbeitstage · KT = Kalendertage · EA = Ende-Anfang. Nr. beziehen sich auf den Gesamtplan.${layout!=='list'?' Pfeile verbinden Vorgänge auf derselben Druckseite.':''}</div><footer><span>Druckdatum: ${dateText(printDate)}</span><span>Seite ${pages.length+1} / ${windows.length*rowPages.length}</span><span>Stand ${label(stand)}</span></footer></section>`);
  }
  const html=`<!doctype html><html lang="de"><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:"><title>${title}</title><style>
    @page{size:${width+20}mm ${height+20}mm;margin:10mm}*{box-sizing:border-box}body{margin:0;background:white;color:#111;font:${font}pt Arial,sans-serif}.sheet{position:relative;width:${width}mm;height:${height}mm;break-after:page}.sheet::before{content:"";position:absolute;inset:0;border:.25mm solid #222;pointer-events:none;z-index:2}.sheet:last-child{break-after:auto}header{height:${n(headerHeight)}mm;border-bottom:.25mm solid #222;padding:3mm 4mm;position:relative;text-align:center}.project-name{font-size:${headingFont}pt;font-weight:bold;margin:0 ${logoWidth+1}mm;line-height:1.2}.project-location{font-size:9pt;margin:1mm ${logoWidth+1}mm;line-height:1.2}.logo{position:absolute;right:2mm;top:2mm;max-width:${logoWidth}mm;max-height:18mm}h1{font-size:12pt;margin:3mm 0 1mm;letter-spacing:.3pt}.meta{font-size:7.5pt;line-height:1.2}.plan-grid{position:relative;min-height:${n(tableHeading+bodyHeight)}mm}table{border-collapse:collapse;table-layout:fixed;margin-left:0}th,td{border-right:.15mm solid #8b8b8b;border-bottom:.15mm solid #b2b2b2;padding:1mm;vertical-align:top;text-align:left}th{overflow-wrap:anywhere;height:${tableHeading}mm;font-size:${font}pt;font-weight:normal;background:white}.line{display:block;line-height:1.25;white-space:pre}.summary{font-weight:bold}.summary td{background:#fafafa}.activity .cell-title{padding-left:3mm}.cell-number{text-align:center}.chart{position:absolute;top:0;border-left:.2mm solid #333}.time-heading{display:block;border-bottom:.15mm solid #8b8b8b;font-family:Arial,sans-serif}.timeline{display:block;font-family:Arial,sans-serif}.time-range{font-size:7pt;padding:1mm 2mm;text-align:right}.legend{font-size:7pt;position:absolute;left:2mm;right:2mm;bottom:${footerHeight+1}mm;line-height:1.35}footer{position:absolute;bottom:0;left:0;right:0;height:${footerHeight}mm;border-top:.25mm solid #222;display:flex;justify-content:space-between;align-items:center;gap:5mm;padding:1mm 2mm;font-size:8pt}footer span{white-space:nowrap}@media screen{body{background:#e7e3db;padding:10mm}.sheet{background:white;margin:0 auto 10mm;box-shadow:0 2px 12px #0002}@supports(zoom:calc(1px / 1px)){.sheet{zoom:min(1,calc((100vw - 20mm) / ${width}mm))}}}
  </style></head><body>${pages.join('')}</body></html>`;
  return {html,pages:pages.length,layout,paper,scale:windows[0]?.scale||null};
}
export {exportCsv};
