const {test}=require('node:test');
const assert=require('node:assert/strict');
const {randomUUID}=require('node:crypto');
const JSZip=require('jszip');
const {stateSchema,initialState}=require('../electron/model.cjs');
const {photoLayouts,photoPageHeight,clampLayout,fillTemplate,fitPhotosOnPage}=require('../electron/layout.mjs');
const {reportHtml,reportDocx,reportPageTemplates}=require('../electron/report.cjs');
test('existing diaries receive defaults without losing entries or project details',()=>{
  const old={version:1,projects:[{id:randomUUID(),name:'Bestand',number:'42',client:'Bauherr',location:'Mainz',author:'Bauleitung'}],entries:[]};
  const migrated=stateSchema.parse(old);
  assert.equal(migrated.projects[0].name,'Bestand');assert.equal(migrated.preferences.zoom,1.25);assert.equal(migrated.projects[0].document.footerText,'Seite {seite} / {seiten}');assert.deepEqual(migrated.headerPresets,[]);
  assert.throws(()=>stateSchema.parse({...migrated,preferences:{zoom:3}}));
});
test('photo positions and aspect ratios fit within an A4 photo page',()=>{
  const photos=[{id:'a',pixelWidth:1600,pixelHeight:900},{id:'b',pixelWidth:900,pixelHeight:1600}];
  const automatic=photoLayouts(photos);assert.equal(automatic[0].page,0);assert.equal(automatic[1].page,0);
  const clamped=clampLayout(photos[1],{page:2,x:160,y:200,width:170});
  assert.ok(clamped.x+clamped.width<=170);assert.ok(clamped.y+clamped.width*1600/900+15<=215.01);
  assert.equal(clamped.page,2);
});
test('custom headers, footers, logo and placement survive report generation',async()=>{
  const state=initialState(),project=state.projects[0];
  const data=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGPIW9YNAAMlAaAdBx/IAAAAAElFTkSuQmCC','base64');
  const attachment={id:randomUUID(),name:'Logo.png',kind:'photo',extension:'png',size:data.length,caption:'Foto A',transcript:'',transcription:'pending',pixelWidth:1000,pixelHeight:600};
  project.document={headerText:'Büro <Stock>\n{projekt} · {nummer}',footerText:'Intern · {autor} · Seite {seite} von {seiten}',logo:attachment,logoWidthMm:30};
  const entry={id:randomUUID(),projectId:project.id,date:'2026-10-07',endDate:'',title:'Test',startTime:'',endTime:'',weather:'',temperature:'',status:'complete',trades:[],incidents:'',notes:'',attachments:[{...attachment,id:randomUUID(),layout:{page:1,x:25,y:30,width:80}}],updatedAt:new Date().toISOString()};
  const readImage=async()=>({data,width:1000,height:600,type:'png',mime:'image/png'});
  const templates=await reportPageTemplates(project,[entry],readImage);
  assert.ok(templates.headerTemplate.includes('Büro &lt;Stock&gt;'));assert.ok(templates.headerTemplate.includes('data:image/png'));assert.ok(templates.footerTemplate.includes('class="totalPages"'));
  const html=await reportHtml(project,[entry],readImage);assert.ok(html.includes('left:25mm;top:30mm;width:80mm'));assert.ok(html.includes('Fotoseite 2'));
  const zip=await JSZip.loadAsync(await reportDocx(project,[entry],readImage));
  const header=await zip.file('word/header1.xml').async('string'),footer=await zip.file('word/footer1.xml').async('string'),document=await zip.file('word/document.xml').async('string');
  assert.ok(header.includes('Büro &lt;Stock&gt;'));assert.ok(header.includes('w:drawing'));assert.ok(footer.includes('NUMPAGES'));assert.ok(document.includes('w:tblpX="1417"'));assert.ok(document.includes('Foto A'));
  assert.equal(fillTemplate('{nummer}: {projekt}',project,''),'2312: Sanierung Hörsaal (RW1)');
});

test('one-page arrangement fits mixed photo proportions without overlap or losing order',()=>{
  for(const count of [1,2,4,9,17,100,500]) {
    const photos=Array.from({length:count},(_,i)=>({id:String(i),pixelWidth:i%2?900:1600,pixelHeight:i%2?1600:900}));
    const positions=fitPhotosOnPage(photos);
    assert.equal(positions.length,count);
    positions.forEach((p,i)=>{
      assert.equal(p.id,photos[i].id);assert.equal(p.page,0);
      const height=p.width*photos[i].pixelHeight/photos[i].pixelWidth+15;
      assert.ok(p.width>0 && p.x>=0 && p.y>=0);
      assert.ok(p.x+p.width<=170.01 && p.y+height<=215.01);
      for(const q of positions.slice(i+1)) {
        const qHeight=q.width*photos[Number(q.id)].pixelHeight/photos[Number(q.id)].pixelWidth+15;
        assert.ok(p.x+p.width<=q.x+.001 || q.x+q.width<=p.x+.001 || p.y+height<=q.y+.001 || q.y+qHeight<=p.y+.001);
      }
    });
  }
  const tall={pixelWidth:100,pixelHeight:4000};
  const clamped=clampLayout(tall,{page:0,x:0,y:0,width:170});
  assert.ok(clamped.width*40+15<=215.01);
});


test('automatic photos share compact rows and only occupy their actual height',async()=>{
  const photos=Array.from({length:8},(_,i)=>({id:String(i),pixelWidth:1600,pixelHeight:900}));
  const positions=photoLayouts(photos);
  assert.equal(positions[0].page,positions[1].page);
  assert.equal(positions[0].y,positions[1].y);
  assert.ok(positions[0].x+positions[0].width<positions[1].x);
  const single=photoLayouts(photos.slice(0,1));assert.ok(photoPageHeight(single,0)<80);
  const manual={...photos[0],layout:{page:0,x:20,y:15,width:40}};
  assert.deepEqual(photoLayouts([manual])[0],{id:'0',...manual.layout,height:22.5});
  assert.equal(photoPageHeight(photoLayouts([manual]),0),52.5);
  assert.equal(photoPageHeight([],0),0);
  const portrait=photoLayouts([{id:'portrait',pixelWidth:100,pixelHeight:800}]);assert.ok(portrait[0].height<=90 && photoPageHeight(portrait,0)<=105);
  const {photoPagesHtml,docxPhotoPages}=require('../electron/document-design.cjs');
  const image=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGPIW9YNAAMlAaAdBx/IAAAAAElFTkSuQmCC','base64');
  const read=async()=>({data:image,width:1600,height:900,type:'png',mime:'image/png'});
  const html=await photoPagesHtml([{...manual,name:'Foto',caption:'Kurz'}],read);
  assert.ok(html.includes('height:52.5mm'));assert.ok(!html.includes('height:215mm'));
  const state=initialState(),entry={id:randomUUID(),projectId:state.projects[0].id,date:'2026-10-07',status:'complete',trades:[],attachments:[{...manual,name:'Foto',caption:'Kurz',kind:'photo'}]};
  const doc=await reportDocx(state.projects[0],[entry],read),zip=await JSZip.loadAsync(doc),xml=await zip.file('word/document.xml').async('string');
  assert.ok(xml.includes('w:vertAnchor="text"'));
  assert.ok(!xml.includes('w:pageBreakBefore w:val="true"'));
});
