const {z}=require('zod');
const {randomUUID}=require('node:crypto');
const {schedule}=require('./planner.mjs');
const id=z.uuid(), text=z.string().max(100000);
const date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v=>{const d=new Date(v+'T12:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===v&&v>='1900-01-01'&&v<='2200-12-31';},'Ungültiges Plandatum (1900–2200)');
const optionalDate=z.union([z.literal(''),date]);
const calendarSchema=z.object({weekdays:z.array(z.number().int().min(0).max(6)).min(1).max(7).refine(a=>new Set(a).size===a.length,'Doppelte Wochentage'),exceptions:z.array(z.object({date,label:z.string().max(500)})).max(2000)});
const tradeSchema=z.object({id,code:z.string().max(100),name:z.string().trim().min(1).max(500),color:z.string().regex(/^#[0-9a-fA-F]{6}$/)});
const companySchema=z.object({id,name:z.string().trim().min(1).max(500)});
const taskSchema=z.object({id,title:z.string().trim().min(1).max(500),tradeId:id,companyId:z.union([z.literal(''),id]),area:z.string().max(500),start:optionalDate,duration:z.number().int().min(0).max(3660),predecessors:z.array(z.object({taskId:id,type:z.literal('FS'),lag:z.number().int().min(-366).max(3660),unit:z.enum(['work','calendar'])})).max(100),fixed:z.boolean(),deadline:optionalDate,status:z.enum(['planned','active','complete']),blocked:z.boolean(),progress:z.number().int().min(0).max(100),actualStart:optionalDate,actualEnd:optionalDate,notes:text}).refine(t=>!t.actualEnd||!t.actualStart||t.actualEnd>=t.actualStart,'Ist-Ende liegt vor Ist-Start');
function validateSnapshot(s,ctx) {
  for(const key of ['trades','companies','tasks'])if(new Set(s[key].map(i=>i.id)).size!==s[key].length)ctx.addIssue({code:'custom',message:'Doppelte Plan-IDs: '+key});
  const trades=new Set(s.trades.map(t=>t.id)),companies=new Set(s.companies.map(c=>c.id)),tasks=new Map(s.tasks.map(t=>[t.id,t]));
  for(const t of s.tasks){
    if(!trades.has(t.tradeId)||t.companyId&&!companies.has(t.companyId))ctx.addIssue({code:'custom',message:'Gewerk oder Firma fehlt: '+t.title});
    if(new Set(t.predecessors.map(l=>l.taskId)).size!==t.predecessors.length)ctx.addIssue({code:'custom',message:'Doppelter Vorgänger: '+t.title});
    for(const l of t.predecessors)if(!tasks.has(l.taskId)||l.taskId===t.id)ctx.addIssue({code:'custom',message:'Ungültiger Vorgänger: '+t.title});
  }
  const seen=new Set(),active=new Set();
  function visit(id){if(active.has(id))throw Error('Zyklische Abhängigkeit');if(seen.has(id))return;active.add(id);for(const l of tasks.get(id)?.predecessors||[])visit(l.taskId);active.delete(id);seen.add(id);}
  try{for(const t of s.tasks)visit(t.id);}catch(e){ctx.addIssue({code:'custom',message:e.message});}
  try{schedule(s.tasks,s.calendar);}catch(e){ctx.addIssue({code:'custom',message:e.message});}
}
const snapshotShape={calendar:calendarSchema,trades:z.array(tradeSchema).max(500),companies:z.array(companySchema).max(500),tasks:z.array(taskSchema).max(5000)};
const snapshotSchema=z.object(snapshotShape).superRefine(validateSnapshot);
const changeSchema=z.object({taskId:id,title:z.string().max(500),oldStart:optionalDate,newStart:optionalDate,oldEnd:optionalDate,newEnd:optionalDate});
const planSchema=z.object({id,projectId:id,...snapshotShape,baselines:z.array(z.object({id,name:z.string().trim().min(1).max(200),createdAt:z.string().datetime(),snapshot:snapshotSchema})).max(20),revisions:z.array(z.object({id,reason:z.string().max(1000),createdAt:z.string().datetime(),changes:z.array(changeSchema).max(10000)})).max(50),updatedAt:z.string().datetime()}).superRefine(validateSnapshot);
// Include historic IDs: deleted activities may still exist in a reference plan or revision.
function remapPlans(plans,projectIds,uuid=randomUUID){return plans.map(plan=>{
  const ids=new Map(), map=id=>{if(!id)return '';if(!ids.has(id))ids.set(id,uuid());return ids.get(id);};
  function snap(s){return {...s,trades:s.trades.map(t=>({...t,id:map(t.id)})),companies:s.companies.map(c=>({...c,id:map(c.id)})),tasks:s.tasks.map(t=>({...t,id:map(t.id),tradeId:map(t.tradeId),companyId:map(t.companyId),predecessors:t.predecessors.map(l=>({...l,taskId:map(l.taskId)}))}))};}
  return {...plan,...snap(plan),id:map(plan.id),projectId:projectIds.get(plan.projectId),baselines:plan.baselines.map(b=>({...b,id:map(b.id),snapshot:snap(b.snapshot)})),revisions:plan.revisions.map(r=>({...r,id:map(r.id),changes:r.changes.map(c=>({...c,taskId:map(c.taskId)}))}))};
});}
module.exports={planSchema,remapPlans};
