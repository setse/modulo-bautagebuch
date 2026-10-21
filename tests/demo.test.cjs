const {test}=require('node:test');
const assert=require('node:assert/strict');
const {createDemo,speech}=require('../scripts/demo-state.cjs');
const {schedule,propose,shiftWorkdays,finish}=require('../electron/planner.mjs');
const {stateSchema}=require('../electron/model.cjs');
// Tiny bytes suffice for schema/fixture logic. Desktop tests use the real generated assets.
const photo={name:'Illustration.png',extension:'png',bytes:Buffer.from('test'),width:1200,height:800,scene:'Fiktiver Testbereich'};
const audio={name:'Demo.mp3',extension:'mp3',bytes:Buffer.from('audio')};
const assets={photos:Array(12).fill(photo),logos:Array(4).fill(photo),footer:photo,audio:[audio],silence:{...audio,name:'Stille.wav',extension:'wav'}};
const demo=()=>createDemo({anchor:'2026-10-08',assets});

test('extensive demo covers four distinct project sizes and realistic status variants',()=>{
  const {state,summary}=demo();assert.equal(stateSchema.safeParse(state).success,true);
  assert.deepEqual(summary.perProject.map(p=>[p.activities,p.entries]),[[309,60],[96,24],[600,15],[0,1]]);
  assert.equal(summary.activities,1005);assert.equal(summary.diaryEntries,100);assert.equal(summary.photos,318);assert.equal(summary.audio,25);
  const tasks=state.plans.flatMap(p=>p.tasks);assert.deepEqual(new Set(tasks.map(t=>t.status)),new Set(['planned','active','complete']));
  assert.ok(tasks.some(t=>t.blocked));assert.ok(tasks.some(t=>t.duration===0));assert.ok(tasks.some(t=>t.progress>0&&t.progress<100));
  assert.ok(state.entries.some(e=>e.endDate&&e.endDate.slice(0,4)!==e.date.slice(0,4)));
  assert.ok(state.entries.some(e=>e.status==='draft'));assert.ok(state.entries.some(e=>e.status==='complete'));
  assert.deepEqual(state.plans[1].calendar.weekdays,[1,2,3,4,5,6]);
});
test('demo IDs and dates reproduce exactly, with a separate seed creating another dataset',()=>{
  const a=demo(),b=demo();assert.deepEqual(a.state,b.state);assert.deepEqual(a.summary,b.summary);
  const other=createDemo({anchor:'2026-10-08',assets,seed:'second-demo'});assert.notEqual(a.state.projects[0].id,other.state.projects[0].id);
  for(const anchor of ['2027-01-02','2028-02-29','2030-03-31'])assert.equal(stateSchema.safeParse(createDemo({anchor,assets}).state).success,true);
});
test('calendar scenarios expose fixed conflicts, missing starts, elapsed waits and late targets',()=>{
  const {state,scenarios}=demo(),plan=state.plans[0],get=key=>plan.tasks.find(t=>t.id===scenarios.find(s=>s.key===key).taskId);
  assert.equal(get('friday').start,'2026-10-09');assert.equal(get('monday').start,'2026-10-12');assert.equal(get('wait').start,'2026-10-20');
  assert.equal(get('fixed').start,'2026-10-12');assert.equal(get('unscheduled').start,'');assert.equal(get('unplanned-successor').start,'');
  const {warnings}=schedule(plan.tasks,plan.calendar);
  assert.ok(warnings.some(w=>w.taskId===get('fixed').id&&w.message.includes('widerspricht')));
  assert.ok(warnings.some(w=>w.taskId===get('unplanned-successor').id&&w.message.includes('nicht terminiert')));
  assert.ok(warnings.some(w=>w.taskId===get('deadline').id&&w.message.includes('5 Kalendertage')));
  assert.ok(!warnings.some(w=>w.taskId===get('parallel').id));
  assert.equal(get('parallel').companyId,get('friday').companyId);
  assert.equal(finish(get('deadline'),plan.calendar),'2026-10-14');
});
test('branched networks recalculate without changing reference plans or inventing provenance',()=>{
  const {state}=demo();for(const plan of state.plans.filter(p=>p.tasks.length)){
    const baseline=JSON.stringify(plan.baselines),before=JSON.stringify(plan),root=plan.tasks[0];
    const changes=propose(plan,plan.tasks.map(t=>t.id===root.id?{...t,start:shiftWorkdays(t.start,4,plan.calendar)}:t));
    assert.ok(changes.changes.length>=12);assert.equal(JSON.stringify(plan),before);assert.equal(JSON.stringify(plan.baselines),baseline);
    assert.ok(plan.revisions.some(r=>r.changes.length>0));assert.ok(plan.tasks.some(t=>t.predecessors.length>=3)||plan.tasks.length===96);
  }
  const clips=state.entries.flatMap(e=>e.attachments).filter(a=>a.kind==='audio');
  assert.ok(clips.every(a=>!a.transcriptionModel&&!a.transcriptionCompletedAt&&!a.assistantModel));
  assert.ok(clips.some(a=>a.transcription==='pending'));assert.ok(clips.some(a=>a.transcription==='manual'&&a.transcript===speech));
  assert.ok(clips.some(a=>a.originalTranscript===speech&&a.caption.includes('nicht Bestandteil')));
});
test('all media references resolve, while the rich diary covers sections and manual photo pages',()=>{
  const {state,media,summary}=demo();const referenced=[];
  for(const doc of [...state.projects.map(p=>p.document),...state.headerPresets.map(p=>p.document)])for(const a of [doc.logo,doc.footerImage].filter(Boolean))referenced.push(a);
  for(const e of state.entries)referenced.push(...e.attachments);
  assert.equal(new Set(referenced.map(a=>a.id)).size,summary.mediaFiles);
  for(const a of referenced){assert.ok(media.has(a.id));assert.equal(a.size,media.get(a.id).bytes.length);}
  const heavy=state.entries.find(e=>e.title.includes('Fotoreicher'));
  assert.equal(heavy.attachments.filter(a=>a.kind==='photo').length,24);assert.equal(heavy.attachments.filter(a=>a.kind==='audio').length,3);
  assert.equal(new Set(heavy.attachments.filter(a=>a.layout).map(a=>a.layout.page)).size,3);
  assert.deepEqual(new Set(heavy.attachments.filter(a=>a.kind==='photo').map(a=>a.section)),new Set(['photos','trades','incidents','notes','weather','signature','project']));
  assert.ok(state.projects.every(p=>!p.document.footerText.includes('{bauleitung}')));
});
