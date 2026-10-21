// Fictional, reproducible fixtures. This module never reads or changes live app data.
const {createHash}=require('node:crypto');
const {stateSchema,defaultDocument}=require('../electron/model.cjs');
const {createPlan,createTask,addDays,nextWorkday,shiftWorkdays,schedule,finish,snapshot,propose}=require('../electron/planner.mjs');
const colors=['#607462','#7588a0','#a18462','#9a7174','#807397','#7e8b67'];
const definitions=[
  ['BE','Baustelleneinrichtung','Bauwerk Logistik Demo GmbH','Baustelle einrichten',[]],
  ['GE','Gerüstbau','Höhenwerk Demo GmbH','Arbeitsgerüst stellen',[0]],
  ['AB','Rückbau','Rückbau Nord Demo GmbH','Bestand selektiv rückbauen',[0]],
  ['RB','Rohbau','Massivbau Demo GmbH','Öffnungen und Rohbau herstellen',[2]],
  ['AD','Abdichtung','Dichtwerk Demo GmbH','Sockel und Anschlüsse abdichten',[3]],
  ['DA','Dacharbeiten','Dach & Form Demo GmbH','Dachfläche instand setzen',[4]],
  ['FA','Fassade','Fassadenwerk Demo GmbH','Fassadenabschnitt sanieren',[1,5]],
  ['FE','Fensterbau','Müller Fenster Demo GmbH','Fenster und Anschlüsse montieren',[3,6]],
  ['TU','Türen','Türwerk Demo GmbH','Innentüren und Zargen montieren',[14]],
  ['EL','Elektro','Elektro Lichtblick Demo GmbH','Rohinstallation Elektro ausführen',[3]],
  ['HZ','Heizung','Wärmeweg Demo GmbH','Heizungsverteilung montieren',[3]],
  ['LU','Lüftung','Luftwerk Demo GmbH','Lüftungsleitungen montieren',[3]],
  ['SA','Sanitär','Wasserwerk Demo GmbH','Sanitärleitungen installieren',[3]],
  ['BS','Brandschutz','Brandschutz Sicher Demo GmbH','Durchführungen abschotten',[9,11]],
  ['TB','Trockenbau','Raumwerk Demo GmbH','Wände und Decken schließen',[9,10,11,12]],
  ['PU','Putzarbeiten','Oberfläche Demo GmbH','Wandflächen verputzen',[14]],
  ['ES','Estrich','Estrich Mitte Demo GmbH','Estrich einbringen',[12,15]],
  ['BO','Bodenbeläge','Bodenwerk Demo GmbH','Bodenbeläge verlegen',[16]],
  ['FL','Fliesen','Keramik Demo GmbH','Nassräume fliesen',[12,16]],
  ['MA','Malerarbeiten','Farbwerk Demo GmbH','Oberflächen beschichten',[15,17]],
  ['ME','Metallbau','Metall & Form Demo GmbH','Geländer und Stahlteile montieren',[3]],
  ['AU','Aufzüge','Liftwerk Demo GmbH','Aufzugtechnik montieren',[3,9]],
  ['AA','Außenanlagen','Freiraum Demo GmbH','Wege und Außenflächen herstellen',[6]],
  ['RE','Baureinigung','Klarwerk Demo GmbH','Bauabschnitt endreinigen',[8,17,18,19]],
  ['IB','Inbetriebnahme & Abnahme','Prüfwerk Demo GmbH','Bauabschnitt abnehmen',[13,21,23]],
  ['IT','Datentechnik','Netzwerk Demo GmbH','Datennetz prüfen und freigeben',[9]],
  ['BM','Brandmeldetechnik','Alarmwerk Demo GmbH','Brandmeldeanlage prüfen',[9,13]],
  ['SO','Sonnenschutz','Schattenwerk Demo GmbH','Sonnenschutz montieren',[7]],
  ['PV','Photovoltaik','Solarwerk Demo GmbH','PV-Anlage montieren',[5,9]],
  ['GA','Gebäudeautomation','Steuerwerk Demo GmbH','Gebäudeautomation parametrieren',[10,11,25]],
];
const speech='Heute wurden die Fenster im zweiten Obergeschoss montiert. Die Firma Müller war mit drei Mitarbeitern vor Ort. Morgen wird die Baustelle gemeinsam mit der Bauleitung kontrolliert.';
function createDemo({anchor,seed='modulo-demo-v1',assets}) {
  const id=key=>{const b=createHash('sha256').update(seed+'|'+key).digest().subarray(0,16);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=b.toString('hex');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;};
  const stamp=(offset=0,hour=12)=>addDays(anchor,offset)+`T${String(hour).padStart(2,'0')}:00:00.000Z`;
  const media=new Map(),scenarios=[];
  function attachment(key,asset,caption,section='photos',kind='photo') {
    const a={id:id('media/'+key),name:asset.name,kind,extension:asset.extension,size:asset.bytes.length,caption,transcript:'',transcription:kind==='audio'?'pending':'manual'};
    if(kind==='photo'){a.pixelWidth=asset.width;a.pixelHeight=asset.height;a.section=section;}
    media.set(a.id,{attachment:a,bytes:asset.bytes});return a;
  }
  const specs=[
    {key:'campus',number:'DEMO-2601',name:'DEMO · Campus West – Sanierung in 12 Bauabschnitten',location:'Fiktiver Campus · Musterallee 12 · Beispielstadt',areas:12,indices:Array.from({length:25},(_,i)=>i),diaries:60,saturday:false},
    {key:'kita',number:'DEMO-2602',name:'DEMO · Kita Sonnenhof – Umbau im laufenden Betrieb',location:'Fiktive Kita · Beispielweg 7 · Musterstadt',areas:8,indices:[0,2,3,7,9,10,12,14,16,17,19,23],diaries:24,saturday:true},
    {key:'stress',number:'DEMO-2603',name:'DEMO · Quartier Süd – Lasttest mit 600 Vorgängen',location:'Fiktives Quartier · Teststraße 30 · Beispielstadt',areas:20,indices:Array.from({length:30},(_,i)=>i),diaries:15,saturday:false},
    {key:'starter',number:'DEMO-2604',name:'DEMO · Leeres Startprojekt',location:'Noch keine Baustelle zugeordnet',areas:0,indices:[],diaries:1,saturday:false},
  ];
  const projects=[],plans=[],entries=[];
  function progress(plan){return {...plan,tasks:plan.tasks.map((task,index)=>{
    const end=finish(task,plan.calendar);let status='planned',percent=0,actualStart='',actualEnd='';
    if(task.start&&end<anchor){status='complete';percent=100;actualStart=task.start;actualEnd=end;}
    else if(task.start&&task.start<=anchor&&end>=anchor){status='active';percent=25+(index*17)%61;actualStart=task.start;}
    const blocked=status!=='complete'&&(task.blocked||index%17===7);
    return {...task,status,progress:percent,actualStart,actualEnd,blocked,notes:task.notes+(blocked?'\nDEMO-Hindernis: Materialfreigabe steht aus. Zuständig: Test-Bauleitung. Nächste Abstimmung: '+addDays(anchor,2)+'.':'')};
  })};}
  for(const [pi,spec] of specs.entries()) {
    const uuid=()=>id(spec.key+'/plan');
    const document=defaultDocument();document.fontFamily='Arial';document.fontSize=10;document.headerText='DEMO · {nummer} · {projekt}\nBAUTAGEBUCH · {zeitraum}';document.footerText='FIKTIVE TESTDATEN · {autor}\nSeite {seite} / {seiten}';document.margins={top:35,bottom:25,left:20,right:20};document.table={...document.table,variant:pi%2?'rows':'striped',headerColor:'#e7e5dc',alternateColor:'#f2f0e8',borderColor:'#c8c0a8',textColor:'#2a2a26'};
    document.logo=attachment(spec.key+'/logo',assets.logos[pi],'Fiktives Demo-Firmenlogo','project');document.logoWidthMm=30;document.headerImageAlignment=pi%3===0?'left':pi%3===1?'center':'right';
    if(pi<2){document.footerImage=attachment(spec.key+'/footer',assets.footer,'DEMO-Kennzeichnung','signature');document.footerImageWidthMm=35;document.footerImageAlignment=pi?'center':'right';}
    const project={id:id(spec.key+'/project'),name:spec.name,number:spec.number,client:'Fiktive Demo-Bauherrschaft · keine realen Kontaktdaten',location:spec.location,author:'Demo-Bauleitung · Alex Muster',document};projects.push(project);
    let plan=createPlan(project.id,uuid);plan.updatedAt=stamp();
    if(spec.saturday)plan.calendar.weekdays=[1,2,3,4,5,6];
    if(spec.areas)plan.calendar.exceptions=[{date:nextWorkday(addDays(anchor,11),plan.calendar),label:'DEMO · Baustellensperrung für Sicherheitsprüfung'},{date:nextWorkday(addDays(anchor,35),plan.calendar),label:'DEMO · Betriebsruhe / Wartung'}];
    const indexToTrade=new Map();
    for(const [gi,globalIndex] of spec.indices.entries()){
      const [code,name,company]=definitions[globalIndex],g={id:id(spec.key+'/trade/'+code),code,name,color:colors[gi%colors.length]};plan.trades.push(g);indexToTrade.set(globalIndex,g);
      plan.companies.push({id:id(spec.key+'/company/'+gi),name:company});
      if(gi%5===0)plan.companies.push({id:id(spec.key+'/company/partner/'+gi),name:company.replace(' Demo GmbH',' Partner Demo GmbH')});
    }
    const taskMatrix=new Map();
    for(let area=0;area<spec.areas;area++){
      const floor=area%4,wing=['Nord','West','Süd'][Math.floor(area/4)%3];
      const areaName=spec.key==='stress'?`Bauteil ${String.fromCharCode(65+Math.floor(area/4))} · Ebene ${floor} · Zone ${area+1}`:spec.key==='kita'?`Bereich ${area+1} · ${['Gruppenraum','Flur','Sanitär','Personalraum'][floor]}`:`Flügel ${wing} · ${floor===0?'EG':floor+'. OG'} · BA ${String(area+1).padStart(2,'0')}`;
      for(const [gi,globalIndex] of spec.indices.entries()){
        const trade=indexToTrade.get(globalIndex),name=definitions[globalIndex][3];
        const task={...createTask(trade.id,()=>id(spec.key+'/task/'+area+'/'+globalIndex)),title:`${name} · ${areaName}`,area:areaName,duration:globalIndex===24?0:2+(area+gi)%4,companyId:id(spec.key+'/company/'+gi),notes:'Fiktiver Vorgang zum Testen. Mengen, Personal und Dauern sind Demo-Annahmen, keine Kalkulation.\nBauabschnitt '+(area+1)+' · Ansprechpartner: Demo-Bauleitung.'};
        if(globalIndex===0)task.start=nextWorkday(addDays(anchor,(spec.key==='kita'?-24:-42)+area*(spec.key==='stress'?3:2)),plan.calendar);
        if(gi%5===0&&area%4===2)task.companyId=id(spec.key+'/company/partner/'+gi);
        plan.tasks.push(task);taskMatrix.set(area+'/'+globalIndex,task);
      }
    }
    for(let area=0;area<spec.areas;area++)for(const [gi,globalIndex] of spec.indices.entries()){
      const task=taskMatrix.get(area+'/'+globalIndex);
      const deps=spec.key==='kita'?(gi?[spec.indices[gi-1]]:[]):definitions[globalIndex][4].filter(i=>indexToTrade.has(i));
      task.predecessors=deps.map(before=>({taskId:taskMatrix.get(area+'/'+before).id,type:'FS',lag:globalIndex===17&&before===16?7:globalIndex===18&&before===16?5:0,unit:globalIndex===17||globalIndex===18?'calendar':'work'}));
    }
    plan.tasks=schedule(plan.tasks,plan.calendar).tasks;
    for(const task of plan.tasks.filter(t=>t.duration===0)){task.deadline=addDays(task.start,2);}
    if(spec.areas){
      const first={id:id(spec.key+'/baseline/1'),name:'Sollplan 01 · Erstfreigabe (DEMO)',createdAt:stamp(-50,9),snapshot:snapshot(plan)};plan.baselines.push(first);
      plan.revisions.push({id:id(spec.key+'/revision/0'),reason:'DEMO · Erstfreigabe des Terminplans',createdAt:stamp(-50,9),changes:[]});
      for(const [step,area] of [Math.min(3,spec.areas-1),Math.min(7,spec.areas-1)].entries()){
        const root=taskMatrix.get(area+'/0');const proposal=propose(plan,plan.tasks.map(t=>t.id===root.id?{...t,start:shiftWorkdays(t.start,step+3,plan.calendar)}:t));
        plan={...plan,tasks:proposal.tasks,revisions:[...plan.revisions,{id:id(spec.key+'/revision/'+(step+1)),reason:'DEMO · Bauabschnitt '+(area+1)+' wegen geänderter Materialanlieferung verschoben',createdAt:stamp(-14+step*7,10),changes:proposal.changes}]};
      }
      plan.baselines.push({id:id(spec.key+'/baseline/2'),name:'Sollplan 02 · Koordinationsstand (DEMO)',createdAt:stamp(-5,9),snapshot:snapshot(plan)});
    }
    if(spec.key==='campus'){
      const trade=plan.trades.find(g=>g.code==='EL'),company=plan.companies.find(c=>c.name.includes('Elektro Lichtblick'));
      const extra=(key,title,start,duration,patch={})=>{const t={...createTask(trade.id,()=>id('scenario/'+key),start),title,duration,companyId:company.id,area:'TESTFÄLLE · Koordination',notes:'Expliziter Demo-Testfall. Keine reale Terminvereinbarung.',...patch};plan.tasks.push(t);scenarios.push({key,projectId:project.id,taskId:t.id,title});return t;};
      let friday=anchor;while(new Date(friday+'T12:00:00Z').getUTCDay()!==5)friday=addDays(friday,1);
      const fridayTask=extra('friday','TEST · Übergabe am Freitag',friday,1);
      extra('monday','TEST · Ende–Anfang: nächster Arbeitstag','',1,{predecessors:[{taskId:fridayTask.id,type:'FS',lag:0,unit:'work'}]});
      const wait=extra('wait','TEST · Trocknung: 7 Kalendertage','',2,{predecessors:[{taskId:fridayTask.id,type:'FS',lag:7,unit:'calendar'}]});
      extra('fixed','TEST · Fixtermin trotz späterem Vorgänger',nextWorkday(addDays(friday,3),plan.calendar),1,{fixed:true,predecessors:[{taskId:wait.id,type:'FS',lag:0,unit:'work'}]});
      const unknown=extra('unscheduled','TEST · Entscheidung / Freigabe noch offen','',3,{blocked:true});
      extra('unplanned-successor','TEST · Nachfolger ohne terminierte Freigabe','',2,{predecessors:[{taskId:unknown.id,type:'FS',lag:0,unit:'work'}]});
      extra('deadline','TEST · Zieltermin wird überschritten',nextWorkday(addDays(anchor,-3),plan.calendar),8,{deadline:addDays(anchor,1)});
      extra('parallel','TEST · Paralleler Einsatz derselben Firma',friday,3);
      extra('escaping','TEST · Abstimmung "Nord" & Prüfung <Schnitt A>',nextWorkday(addDays(anchor,4),plan.calendar),2,{notes:'Zeilenumbruch\nAnführungszeichen: "Tür A" & "Tür B".\nHTML bleibt Text: <script>DEMO</script>\nKeine automatische Interpretation von 12,5 m² oder 3 Mitarbeitern.'});
      plan.tasks=schedule(plan.tasks,plan.calendar).tasks;
    }
    plan=progress(plan);plan.updatedAt=stamp();plans.push(plan);
    for(let i=0;i<spec.diaries;i++){
      let date=shiftWorkdays(anchor,-Math.max(0,i-2),plan.calendar),endDate='';if(i===1&&spec.areas)date=nextWorkday(addDays(anchor,1),plan.calendar);if(i>0&&i%13===0)endDate=addDays(date,2);
      if(spec.key==='kita'&&i===23){date=(Number(anchor.slice(0,4))-1)+'-12-31';endDate=anchor.slice(0,4)+'-01-02';}
      const future=date>anchor,empty=!spec.areas,heavy=spec.key==='campus'&&i===0;
      const e={id:id(spec.key+'/entry/'+i),projectId:project.id,date,endDate,title:empty?'DEMO · Erster Entwurf ohne Inhalte':heavy?'DEMO · Fotoreicher Prüfbericht – alle Medienfunktionen':future?'DEMO · Entwurf für die nächste Begehung':`DEMO · Tagesbericht ${String(i+1).padStart(2,'0')} · ${['Nordflügel','Westflügel','Südflügel'][i%3]}`,startTime:empty?'':['07:00','07:30','08:00'][i%3],endTime:empty?'':['15:30','16:00','17:15'][i%3],weather:empty?'':['Sonnig','Bewölkt','Leichter Regen','Wechselhaft','Windig'][i%5],temperature:empty?'':['8–14','12–18','10–16','14–21','6–11'][i%5],status:future||i<3||i%7===0||empty?'draft':'complete',sectionStyles:heavy?{incidents:{backgroundColor:'#f2ede0',borderStyle:'dashed',borderColor:'#a18462'},notes:{backgroundColor:'#edf0e9',borderStyle:'solid',borderColor:'#607462'}}:{},trades:[],incidents:empty?'':future?'DEMO-Entwurf: Für morgen ist eine Abstimmung vorgesehen. Es werden keine künftigen Arbeiten als ausgeführt dokumentiert.':`Fiktive Baubegehung im Abschnitt ${i%spec.areas+1}.\n${['Materiallieferung zwei Stunden verspätet. Ablauf mit Demo-Bauleitung abgestimmt.','Tür im Flur noch nicht eingebaut. Anschlussdetails sind vor der Montage zu prüfen.','Gerüstzugang kontrolliert; keine freigegebenen Bereiche außerhalb des Demo-Bauabschnitts betreten.','Brandschutzdurchführung zur Nachprüfung vorgemerkt. Bilddokumentation ergänzt.'][i%4]}`,notes:empty?'':'Sämtliche Inhalte sind synthetische Testdaten.\n'+['Morgen sollen die Fensteranschlüsse geprüft werden. Keine Aussage über bereits abgeschlossene Arbeit.','Wiedervorlage: Raumfreigabe und Materiallieferung in der nächsten Besprechung abstimmen.','Maßangaben zum Testen: 12,5 m² · 2 × 3,20 m · 4 Mitarbeiter.','Sonderzeichen: ä ö ü ß – Müller & Söhne, "Tür A" <Schnitt B>.'][i%4],attachments:[],updatedAt:stamp(0,11)};
      if(!empty&&!future)for(let r=0;r<3+i%3;r++){const g=plan.trades[(i+r*3)%plan.trades.length],company=plan.companies.find(c=>c.id===id(spec.key+'/company/'+((i+r*3)%spec.indices.length)));e.trades.push({id:id(spec.key+'/entry/'+i+'/trade/'+r),code:g.code,company:company.name,workers:String(2+(i+r)%5),work:`DEMO: ${definitions[spec.indices[(i+r*3)%spec.indices.length]][3]} im freigegebenen Testbereich.\n${r===0?'Aufmaß und Anschlussdetails abgestimmt.':'Arbeiten und Übergabe dokumentiert.'}`});}
      if(!empty){
        const photoCount=heavy?24:3;
        for(let n=0;n<photoCount;n++){
          const asset=assets.photos[(i+n+pi*4)%assets.photos.length],section=heavy?['photos','photos','photos','photos','photos','photos','photos','photos','photos','photos','photos','photos','trades','trades','trades','incidents','incidents','incidents','notes','notes','weather','weather','signature','project'][n]:['photos','trades','incidents'][n];
          const photo=attachment(spec.key+'/entry/'+i+'/photo/'+n,asset,`Synthetisches Testbild ${n+1} · ${asset.scene} · Abschnitt ${i%spec.areas+1}. ${n%5===0?'Lange Bildunterschrift für Umbruch und Export: Anschlüsse, Arbeitsbereiche und Prüfdetails sind fiktiv; kein Foto einer realen Baustelle.':''}`,section);
          if(heavy&&n<12)photo.layout={page:Math.floor(n/4),x:n%2?82:0,y:Math.floor((n%4)/2)*118,width:75};e.attachments.push(photo);
        }
        const interval=spec.key==='campus'?5:spec.key==='kita'?4:3;
        if(i%interval===0){const asset=assets.audio[(i/interval+pi)%assets.audio.length],audio=attachment(spec.key+'/entry/'+i+'/audio',asset,'Synthetische Sprachnotiz: wiederverwendete deutsche TTS-Testaufnahme.','audio','audio');if(i%3!==0){audio.transcript=speech;audio.transcription='manual';}e.attachments.push(audio);}
        if(heavy){const manual=attachment(spec.key+'/edited-audio',assets.audio[0],'TEST: manuell ergänztes Transkript; Zusatztext ist nicht Bestandteil der Aufnahme.','audio','audio');manual.transcription='manual';manual.originalTranscript=speech;manual.transcript=speech+'\nManueller Demo-Zusatz: Eine Tür wurde noch nicht eingebaut. Die Lieferung kam zwei Stunden zu spät. Es regnete bei 14 Grad. Morgen sollen die Fensteranschlüsse geprüft werden.';e.attachments.push(manual);const silence=attachment(spec.key+'/silence',assets.silence,'TEST: drei Sekunden Stille; die Spracherkennung soll keinen Inhalt erfinden.','audio','audio');e.attachments.push(silence);}
      }
      entries.push(e);
    }
  }
  const headerPresets=projects.slice(0,3).map((p,i)=>({id:id('preset/'+i),name:['DEMO · Standard mit Firmenlogo','DEMO · Kompakt / Bild mittig','DEMO · Lasttest / Bild rechts'][i],document:structuredClone(p.document)}));
  const state=stateSchema.parse({version:2,projects,entries,plans,preferences:{zoom:1.25,autoTranscribe:false},headerPresets});
  const summary={anchor,seed,projects:projects.length,activities:plans.reduce((n,p)=>n+p.tasks.length,0),trades:plans.reduce((n,p)=>n+p.trades.length,0),companies:plans.reduce((n,p)=>n+p.companies.length,0),diaryEntries:entries.length,photos:entries.flatMap(e=>e.attachments).filter(a=>a.kind==='photo').length,audio:entries.flatMap(e=>e.attachments).filter(a=>a.kind==='audio').length,baselines:plans.reduce((n,p)=>n+p.baselines.length,0),presets:headerPresets.length,mediaFiles:media.size,perProject:projects.map(p=>{const plan=plans.find(x=>x.projectId===p.id);return {id:p.id,number:p.number,name:p.name,activities:plan.tasks.length,entries:entries.filter(e=>e.projectId===p.id).length,conflicts:schedule(plan.tasks,plan.calendar).warnings.length};})};
  return {state,media,scenarios,summary};
}
module.exports={createDemo,speech};
