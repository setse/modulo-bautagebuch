export const sectionNames = { project:'Projektübersicht', day:'Tag & Datum', weather:'Rahmenbedingungen', trades:'Gewerke & Arbeiten', incidents:'Besondere Vorkommnisse', notes:'Weitere Notizen', photos:'Fotodokumentation', audio:'Sprachnotizen', signature:'Unterschrift' };
export const fonts = ['Arial', 'Calibri', 'Segoe UI', 'Verdana', 'Georgia', 'Times New Roman'];
export const defaultMargins = { top:35, bottom:25, left:25, right:15 };
export const defaultTable = { variant:'grid', borderColor:'#aaaaaa', headerColor:'#f4f4f4', rowColor:'#ffffff', alternateColor:'#f5f5f5', textColor:'#111111' };
/** @param {any} document */
export function pageBounds(document) {
  const m = { ...defaultMargins, ...document?.margins };
  return { width:210-m.left-m.right, height:297-m.top-m.bottom-22 };
}
/** @param {any} document @param {any} entry @param {string} key */
export function sectionBounds(document,entry,key) {
  const b=pageBounds(document), inset=sectionStyle(document,entry,key).borderStyle==='none'?0:6;
  return {width:b.width-inset,height:b.height-inset};
}
/** @param {any} document @param {any} entry @param {string} key */
export function sectionStyle(document, entry, key) {
  return { borderStyle:'none', borderColor:'#aaaaaa', borderWidth:1, backgroundColor:'#ffffff', fontFamily:document.fontFamily || 'Arial', fontSize:document.fontSize || 10, textColor:document.textColor || '#111111', alignment:'left', ...(['project','day','weather'].includes(key)?{borderStyle:'solid',backgroundColor:key==='day'?'#eeeeee':'#ffffff'}:{}), ...document.sections?.[key], ...entry?.sectionStyles?.[key] };
}
/** @param {any} style */
export function styleCss(style) {
  return `border:${style.borderStyle==='none'?'0':`${style.borderWidth}px ${style.borderStyle} ${style.borderColor}`};background:${style.backgroundColor};font-family:'${style.fontFamily}';font-size:${style.fontSize}pt;color:${style.textColor};text-align:${style.alignment};padding:${style.borderStyle==='none'?'0':'3mm'};`;
}
/** @param {any} attachment @param {string} key */
export function inSection(attachment, key) { return attachment.kind==='photo' && (attachment.section || 'photos')===key; }
