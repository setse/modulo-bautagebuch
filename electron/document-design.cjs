const { Paragraph, TextRun, ImageRun, Header, Footer, PageNumber, Table, TableRow, TableCell, WidthType, TableAnchorType, TableLayoutType, LineRuleType } = require('docx');
const { photoLayouts, photoPageHeight, fillTemplate } = require('./layout.mjs');
const { defaultDocument } = require('./model.cjs');
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const imageUrl = image => `data:${image.mime || 'image/png'};base64,${image.data.toString('base64')}`;
const mmTwips = value => Math.round(value * 1440 / 25.4);
const mmPixels = value => value * 96 / 25.4;
const none = Object.fromEntries(['top','bottom','left','right','insideHorizontal','insideVertical'].map(side => [side, { style: 'nil', size: 0, color: 'FFFFFF' }]));
function compactCaption(photo) {
  const full = photo.caption || photo.name;
  const text = full.replace(/\s+/g, ' ');
  const limit = Math.max(12, Math.min(180, Math.floor(photo.position.width * 1.8)));
  return { full, shortened: text.length > limit, text: text.length > limit ? text.slice(0, limit - 3) + '…' : text };
}
function templateHtml(text, project, period) {
  return escape(fillTemplate(text, project, period)).replace(/\n/g,'<br>').replace(/\{seite\}/g,'<span class="pageNumber"></span>').replace(/\{seiten\}/g,'<span class="totalPages"></span>');
}
async function reportPageTemplates(project, entries, readImage, period) {
  const d={...defaultDocument(),...project.document};
  async function band(kind) {
    const image=kind==='header'?d.logo:d.footerImage;
    const width=kind==='header'?d.logoWidthMm:d.footerImageWidthMm;
    const maxHeight=Math.max(3,Math.min(18,(d.margins[kind==='header'?'top':'bottom']-10)/2));
    const data=image?await readImage(image):null;
    return `<div style="font-family:'${d[kind+'FontFamily']}';font-size:${d[kind+'FontSize']}pt;line-height:1.2;width:100%;padding:0 ${d.margins.right}mm 0 ${d.margins.left}mm;box-sizing:border-box;color:${d.textColor}">${data?`<div style="text-align:${d[kind+'ImageAlignment']}"><img src="${imageUrl(data)}" style="display:inline-block;width:${width}mm;max-height:${maxHeight}mm;object-fit:contain"></div>`:''}<div style="text-align:${d[kind+'Alignment']};overflow-wrap:anywhere">${templateHtml(d[kind+'Text'],project,period)}</div></div>`;
  }
  return {headerTemplate:await band('header'),footerTemplate:await band('footer')};
}
async function preparedPhotos(photos, readImage, bounds) {
  const prepared = [];
  for (const photo of photos) { const image = await readImage(photo); prepared.push({ ...photo, pixelWidth: image.width, pixelHeight: image.height, image }); }
  const positions = photoLayouts(prepared,bounds);
  return prepared.map((photo, i) => ({ ...photo, position: positions[i] }));
}
async function photoPagesHtml(photos, readImage, bounds={width:170,height:215}, label='Fotodokumentation') {
  const prepared = await preparedPhotos(photos, readImage,bounds);
  const pages = [...new Set(prepared.map(p => p.position.page))].sort((a,b) => a-b);
  return pages.map(page => `<div class="photo-page"><h3>${escape(label)} · Fotoseite ${page + 1}</h3><div class="photo-canvas" style="width:${bounds.width}mm;height:${photoPageHeight(prepared.map(p=>p.position),page)}mm">${prepared.filter(p => p.position.page === page).map(photo => {
    const p = photo.position, caption = compactCaption(photo);
    return `<figure style="left:${p.x}mm;top:${p.y}mm;width:${p.width}mm"><img style="width:${p.width}mm;height:${p.height}mm" src="${imageUrl(photo.image)}" alt="${escape(caption.full)}"><figcaption style="max-height:15mm;overflow:hidden;font-size:${Math.max(2, Math.min(8, p.width * 0.5))}pt">${escape(caption.text)}</figcaption></figure>`;
  }).join('')}</div></div>`).join('') + prepared.filter(p => compactCaption(p).shortened).map(p => `<p><b>${escape(p.name)}</b><br>${escape(compactCaption(p).full).replace(/\n/g,'<br>')}</p>`).join('');
}
function templateParagraph(text, project, period, kind, d) {
  const tokens = fillTemplate(text, project, period).split(/(\{seite\}|\{seiten\}|\n)/g);
  return new Paragraph({ alignment:d[kind+'Alignment'],children: tokens.map(token => token === '\n' ? new TextRun({ break: 1 }) : new TextRun({font:d[kind+'FontFamily'],size:d[kind+'FontSize']*2,color:d.textColor.slice(1), children: [token === '{seite}' ? PageNumber.CURRENT : token === '{seiten}' ? PageNumber.TOTAL_PAGES : token] })), spacing:{after:0} });
}
async function docxHeaderFooter(project, period, readImage) {
  const d={...defaultDocument(),...project.document};
  async function band(kind) {
    const children=[],photo=kind==='header'?d.logo:d.footerImage;
    if(photo) {
      const image=await readImage(photo),maxHeight=Math.max(3,Math.min(18,(d.margins[kind==='header'?'top':'bottom']-10)/2));
      const width=kind==='header'?d.logoWidthMm:d.footerImageWidthMm;
      const scale=Math.min(mmPixels(width)/image.width,mmPixels(maxHeight)/image.height);
      children.push(new Paragraph({alignment:d[kind+'ImageAlignment'],spacing:{after:0},children:[new ImageRun({type:image.type||'png',data:image.data,transformation:{width:Math.round(image.width*scale),height:Math.round(image.height*scale)}})]}));
    }
    children.push(templateParagraph(d[kind+'Text'],project,period,kind,d));return children;
  }
  return {headers:{default:new Header({children:await band('header')})},footers:{default:new Footer({children:await band('footer')})}};
}
async function docxPhotoPages(photos, readImage, bounds={width:170,height:215}, label='Fotodokumentation', style=null) {
  const prepared = await preparedPhotos(photos, readImage,bounds);
  const pages = [...new Set(prepared.map(p => p.position.page))].sort((a,b) => a-b);
  const children = [];
  const photoBorders=style&&style.borderStyle!=='none'?Object.fromEntries(Object.keys(none).map(side=>[side,{style:({solid:'single',dashed:'dashed',dotted:'dotted',double:'double'})[style.borderStyle],size:style.borderWidth*6,color:style.borderColor.slice(1)}])):none;
  for (const [index,page] of pages.entries()) {
    children.push(new Paragraph({pageBreakBefore:index>0,children:[new TextRun({text:`${label} · Fotoseite ${page+1}`,bold:true})]}));
    for (const photo of prepared.filter(p => p.position.page === page)) {
      const p = photo.position, caption = compactCaption(photo);
      children.push(new Table({ borders:none,layout:TableLayoutType.FIXED,width:{size:mmTwips(p.width),type:WidthType.DXA},columnWidths:[mmTwips(p.width)],float:{horizontalAnchor:TableAnchorType.MARGIN,verticalAnchor:TableAnchorType.TEXT,absoluteHorizontalPosition:mmTwips(p.x),absoluteVerticalPosition:mmTwips(10+p.y),overlap:'overlap'},rows:[new TableRow({children:[new TableCell({borders:photoBorders,shading:style?{fill:style.backgroundColor.slice(1)}:undefined,margins:{top:0,bottom:0,left:0,right:0},children:[
        new Paragraph({spacing:{before:0,after:0},children:[new ImageRun({type:photo.image.type || 'png',data:photo.image.data,transformation:{width:mmPixels(p.width),height:mmPixels(p.height)}})]}),
        new Paragraph({spacing:{after:0},children:[new TextRun({text:caption.text,font:style?.fontFamily,color:style?.textColor.slice(1),size:Math.max(4, Math.min((style?.fontSize||8)*2, p.width))})]})
      ]})]})] }));
    }
    children.push(new Paragraph({spacing:{line:mmTwips(photoPageHeight(prepared.map(p=>p.position),page)+12),lineRule:LineRuleType.EXACT,after:0}}));
  }

  for (const p of prepared.filter(p => compactCaption(p).shortened)) children.push(new Paragraph({text:`${p.name}\n${compactCaption(p).full}`}));
  return children;
}
module.exports = { reportPageTemplates, photoPagesHtml, docxHeaderFooter, docxPhotoPages };
