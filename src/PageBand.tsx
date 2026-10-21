import type { DocumentDesign } from './types';
import {mediaUrl} from './helpers';
export default function PageBand({design,kind,text,mini=false}:{design:DocumentDesign;kind:'header'|'footer';text:string;mini?:boolean}) {
  const image=kind==='header'?design.logo:design.footerImage;
  const width=kind==='header'?design.logoWidthMm:design.footerImageWidthMm;
  const usable=210-design.margins.left-design.margins.right;
  const maxHeight=Math.max(3,Math.min(18,(design.margins[kind==='header'?'top':'bottom']-10)/2));
  return <div className="page-band" style={{fontFamily:design[`${kind}FontFamily`],fontSize:mini?`${design[`${kind}FontSize`]*0.425}px`:`${design[`${kind}FontSize`]}pt`}}>
    {image && <div style={{textAlign:design[`${kind}ImageAlignment`]}}><img src={mediaUrl(image.id)} alt={kind==='header'?(mini?'Logo in Live-Vorschau':'Firmenlogo'):'Bild in Fußzeile'} style={{display:'inline-block',width:`${width/usable*100}%`,maxHeight:mini?`${maxHeight/297*254}px`:`${maxHeight}mm`,objectFit:'contain'}}/></div>}
    <div style={{textAlign:design[`${kind}Alignment`],whiteSpace:'pre-wrap'}}>{text}</div>
  </div>;
}
