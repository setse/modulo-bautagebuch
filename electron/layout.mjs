export const PAGE_WIDTH = 170;
export const PAGE_HEIGHT = 215;
export const CAPTION_HEIGHT = 15;
/** @param {{pixelWidth?:number,pixelHeight?:number}} photo */
export function aspect(photo) { return (photo.pixelHeight || 600) / (photo.pixelWidth || 1000); }
/** @param {{pixelWidth?:number,pixelHeight?:number}} photo
 * @param {{page:number,x:number,y:number,width:number}} layout */
export function clampLayout(photo, layout, bounds = { width:PAGE_WIDTH, height:PAGE_HEIGHT }) {
  const { width:PAGE_WIDTH, height:PAGE_HEIGHT } = bounds;
  const maxWidth = Math.min(PAGE_WIDTH, (PAGE_HEIGHT - CAPTION_HEIGHT) / aspect(photo));
  const width = Math.max(Math.min(0.01, maxWidth), Math.min(layout.width, maxWidth));
  return { page: Math.max(0, Math.min(499, Math.round(layout.page))), width, x: Math.max(0, Math.min(layout.x, PAGE_WIDTH - width)), y: Math.max(0, Math.min(layout.y, PAGE_HEIGHT - CAPTION_HEIGHT - width * aspect(photo))) };
}
/** Fit photos in an ordered, non-overlapping grid on one A4 photo page.
 * @param {Array<{id:string,pixelWidth?:number,pixelHeight?:number}>} photos */
export function fitPhotosOnPage(photos, bounds = { width:PAGE_WIDTH, height:PAGE_HEIGHT }) {
  const { width:PAGE_WIDTH, height:PAGE_HEIGHT } = bounds;
  if (!photos.length) return [];
  const gap = Math.min(4, PAGE_WIDTH / (Math.ceil(Math.sqrt(photos.length)) * 8));
  let best = [], bestArea = -1;
  for (let columns = 1; columns <= photos.length; columns++) {
    const rows = Math.ceil(photos.length / columns);
    const cellWidth = (PAGE_WIDTH - gap * (columns - 1)) / columns;
    const cellHeight = (PAGE_HEIGHT - gap * (rows - 1)) / rows;
    if (cellWidth <= 0 || cellHeight <= CAPTION_HEIGHT) continue;
    let area = 0;
    const candidate = photos.map((photo, index) => {
      const width = Math.min(cellWidth, (cellHeight - CAPTION_HEIGHT) / aspect(photo));
      area += width * width * aspect(photo);
      return { id: photo.id, page: 0, x: (index % columns) * (cellWidth + gap) + (cellWidth - width) / 2, y: Math.floor(index / columns) * (cellHeight + gap), width };
    });
    if (area > bestArea) { best = candidate; bestArea = area; }
  }
  return best;
}
/** @param {Array<{id:string,pixelWidth?:number,pixelHeight?:number,layout?:{page:number,x:number,y:number,width:number}}>} photos */
export function photoLayouts(photos, bounds = { width:PAGE_WIDTH, height:PAGE_HEIGHT }) {
  const occupied = photos.filter(photo=>photo.layout).map(photo=>{
    const layout=clampLayout(photo,photo.layout,bounds);
    return {...layout,height:layout.width*aspect(photo)};
  });
  return photos.map(photo => {
    let layout=photo.layout?clampLayout(photo,photo.layout,bounds):null;
    if(!layout) {
      const width=Math.min(photos.length===1?100:(bounds.width-4)/2,90/aspect(photo),bounds.width,(bounds.height-CAPTION_HEIGHT)/aspect(photo));
      const height=width*aspect(photo)+CAPTION_HEIGHT;
      for(let page=0;page<=499&&!layout;page++) {
        const onPage=occupied.filter(p=>p.page===page);
        const rows=[0,...onPage.map(p=>p.y+p.height+CAPTION_HEIGHT+4)].sort((a,b)=>a-b);
        for(const y of rows) {
          for(const x of [0,(bounds.width+4)/2]) {
            if(x+width>bounds.width+.001||y+height>bounds.height+.001)continue;
            if(onPage.every(p=>x+width+3.99<=p.x||p.x+p.width+3.99<=x||y+height+3.99<=p.y||p.y+p.height+CAPTION_HEIGHT+3.99<=y)) {
              layout={page,x,y,width};break;
            }
          }
          if(layout)break;
        }
      }
      layout ||= {page:499,x:0,y:0,width};
      occupied.push({...layout,height:layout.width*aspect(photo)});
    }
    return { id: photo.id, ...layout, height: layout.width * aspect(photo) };
  });
}
/** Only reserve occupied space, while retaining deliberately placed gaps.
 * @param {Array<{page:number,y:number,height:number}>} positions @param {number} page */
export function photoPageHeight(positions,page) {
  return Math.max(0,...positions.filter(p=>p.page===page).map(p=>p.y+p.height+CAPTION_HEIGHT));
}
/** @param {string} text @param {{name:string,number:string,client:string,author:string}} project @param {string} period */
export function fillTemplate(text, project, period) {
  const variables = { projekt: project.name, nummer: project.number, bauherr: project.client, autor: project.author, zeitraum: period };
  return text.replace(/\{(projekt|nummer|bauherr|autor|zeitraum)\}/g, (_, key) => variables[key]);
}
