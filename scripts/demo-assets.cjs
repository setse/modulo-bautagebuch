const fs=require('node:fs/promises'),path=require('node:path');
const {promisify}=require('node:util'),{execFile}=require('node:child_process');
const {chromium}=require('@playwright/test'),{PNG}=require('pngjs');
const run=promisify(execFile);
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const scenes=['Rohbau / Öffnungen','Fenstermontage','Trockenbau / Leitungen','Estrich / Bodenflächen','Gerüst / Fassade','Brandschutz / Durchführungen','Sanitär / Nassraum','Maler / Oberflächen','Außenanlage / Wege','Detailprüfung / Anschlüsse','Bauabschnitt / Übersicht','Material / Baustellenlogistik'];
function picture(index,w,h){
  const accent=['#607462','#7588a0','#a18462','#9a7174','#807397','#7e8b67'][index%6];
  const windows=Array.from({length:12},(_,n)=>{const x=160+n%4*140,y=160+Math.floor(n/4)*105;return `<rect x="${x}" y="${y}" width="85" height="67" fill="${index%3===0?'#687b77':'#c5d4da'}" stroke="#50675d" stroke-width="4"/><path d="M${x+42} ${y}v67M${x} ${y+33}h85" stroke="#50675d" stroke-width="3"/>${index%4===1?`<path d="M${x-8} ${y-8}h101v83h-101z" fill="none" stroke="${accent}" stroke-width="7"/>`:''}`;}).join('');
  const extra=index%4===0?'<path d="M110 130v425M275 130v425M445 130v425M615 130v425M780 130v425M100 250h690M100 360h690M100 475h690" stroke="#a18462" stroke-width="5" fill="none"/>':index%4===2?'<path d="M190 460V160h160v300M580 450V155h120v315" stroke="#a76e64" stroke-width="10" fill="none"/><path d="M170 155h560M170 465h560" stroke="#7588a0" stroke-width="9"/>':'<path d="M110 548h715" stroke="#607462" stroke-width="8"/>';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 1000 700"><rect width="1000" height="700" fill="#f0ece2"/><rect x="35" y="35" width="930" height="630" rx="18" fill="#faf8f1" stroke="#c8c0a8" stroke-width="2"/><text x="65" y="82" font-family="Arial" font-size="22" font-weight="bold" fill="#2a2a26">DEMO / SYNTHETISCHES TESTBILD</text><text x="65" y="117" font-family="Arial" font-size="19" fill="#6a665a">${esc(scenes[index])} · Ansicht ${String(index+1).padStart(2,'0')}</text><rect x="130" y="140" width="650" height="385" fill="#dedbcf" stroke="#a7a38f" stroke-width="4"/>${windows}${extra}<rect x="150" y="535" width="140" height="50" rx="4" fill="${accent}"/><rect x="310" y="535" width="190" height="50" rx="4" fill="#a9b4a3"/><path d="M590 540l45-65 45 65z" fill="#a18462"/><path d="M630 541v42" stroke="#607462" stroke-width="9"/><text x="65" y="625" font-family="Arial" font-size="16" fill="#6a665a">Keine reale Baustelle. Illustration für Layout-, Medien- und Exporttests.</text></svg>`;
}
function silence(){const length=16000*3*2,b=Buffer.alloc(44+length);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(16000,24);b.writeUInt32LE(32000,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(length,40);return b;}
async function makeAssets(root,directory){
  await fs.mkdir(directory,{recursive:true});const browser=await chromium.launch({headless:true}),page=await browser.newPage(),photos=[],logos=[];
  async function raster(name,svg,width,height){await page.setViewportSize({width,height});await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);await page.evaluate(()=>document.fonts.ready);const bytes=await page.screenshot({type:'png'});await fs.writeFile(path.join(directory,name),bytes);return {name,extension:'png',bytes,width,height};}
  try{
    for(let i=0;i<12;i++){const [w,h]=i%4===2?[640,960]:i%4===3?[1280,480]:[1200,800];photos.push({...await raster(`Demo-Testbild-${String(i+1).padStart(2,'0')}.png`,picture(i,w,h),w,h),scene:scenes[i]});}
    const mark=await fs.readFile(path.join(root,'src/assets/modulo-mark.svg'),'utf8');
    for(let i=0;i<4;i++){const title=['DEMO BAUWERK','DEMO SONNENHOF','DEMO QUARTIER','DEMO START'][i],svg=`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="150"><rect width="600" height="150" rx="12" fill="#f5f2e9"/>${mark.replace('viewBox="0 0 32 36"','x="28" y="26" width="78" height="90" viewBox="0 0 32 36"')}<text x="134" y="68" font-family="Arial" font-weight="bold" font-size="30" fill="#2a2a26">${title}</text><text x="134" y="105" font-family="Arial" font-size="19" fill="#607462">FIKTIVE FIRMA / TESTDATEN</text></svg>`;logos.push(await raster(`Demo-Firmenlogo-${i+1}.png`,svg,600,150));}
    const footer=await raster('Demo-Fusszeilenbild.png','<svg xmlns="http://www.w3.org/2000/svg" width="700" height="90"><rect width="700" height="90" rx="12" fill="#e7e5dc"/><text x="26" y="56" font-family="Arial" font-size="28" fill="#607462">DEMO · Nur für Tests · Keine Baudokumentation</text></svg>',700,90);
    const source=path.join(root,'tests/fixtures/parakeet-german.mp3'),bytes=await fs.readFile(source),audio=[{name:'Demo-Sprachnotiz.mp3',extension:'mp3',bytes}];await fs.writeFile(path.join(directory,audio[0].name),bytes);
    const ffmpeg=path.join(root,'.build/transcription/ffmpeg/bin/ffmpeg.exe');let formats='MP3';
    try{await fs.access(ffmpeg);for(const ext of ['wav','m4a','ogg','webm','flac']){const file=path.join(directory,'Demo-Sprachnotiz.'+ext);await run(ffmpeg,['-hide_banner','-loglevel','error','-y','-i',source,'-ar','16000','-ac','1',file],{windowsHide:true});audio.push({name:path.basename(file),extension:ext,bytes:await fs.readFile(file)});}const long=path.join(directory,'Demo-Sprachnotiz-lang.mp3');await run(ffmpeg,['-hide_banner','-loglevel','error','-y','-stream_loop','4','-i',source,'-c','copy',long],{windowsHide:true});audio.push({name:path.basename(long),extension:'mp3',bytes:await fs.readFile(long)});formats='MP3, WAV, M4A, OGG, WEBM, FLAC; langer MP3-Testclip';}
    catch(error){if(error.code!=='ENOENT')throw error;}
    const silent={name:'Demo-Stille-3-Sekunden.wav',extension:'wav',bytes:silence()};await fs.writeFile(path.join(directory,silent.name),silent.bytes);
    return {photos,logos,footer,audio,silence:silent,formats};
  }finally{await browser.close();}
}
async function largeImportPhoto(file){const image=new PNG({width:3200,height:2400});let seed=731;
  for(let i=0;i<image.data.length;i+=4){for(let c=0;c<3;c++){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;image.data[i+c]=seed&255;}image.data[i+3]=255;}
  await fs.writeFile(file,PNG.sync.write(image));
}
module.exports={makeAssets,largeImportPhoto};
