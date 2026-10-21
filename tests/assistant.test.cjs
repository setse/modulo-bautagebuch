const {test}=require('node:test');
const assert=require('node:assert/strict');
const {EventEmitter}=require('node:events');
const {LocalInferenceQueue}=require('../electron/inference-queue.cjs');
const {QwenAssistantProvider}=require('../electron/assistant.cjs');
const format=require('../electron/assistant-format.cjs');
const blank=()=>({trades:[],weather:{value:'',evidence:''},temperature:{value:'',evidence:''},incidents:[],notes:[]});
const deferred=()=>{let resolve;const promise=new Promise(r=>resolve=r);return {promise,resolve};};

test('extraction rejects unsupported fields and ungrounded facts; preserves unmatched source for review',()=>{
 const source='Firma Müller arbeitet mit drei Mitarbeitern. Eine Tür ist nicht fertig. Es regnet bei 14 Grad.';
 const result=format.validateOutput('organize',{...blank(),trades:[{company:'Erfundene Firma',workers:'8',work:'Montage',evidence:'Firma Müller arbeitet mit drei Mitarbeitern.'}],incidents:[{text:'Schaden',evidence:'Es gab einen Schaden.'}]},source);
 assert.equal(result.data.trades[0].company,'');assert.equal(result.data.trades[0].workers,'');assert.deepEqual(result.data.incidents,[]);
 assert.ok(result.data.notes.some(v=>v.unassigned&&v.text==='Eine Tür ist nicht fertig.'));
 assert.ok(result.warnings.length>=3);
 assert.throws(()=>format.validateOutput('organize',{...blank(),tools:['execute']},source));
 assert.throws(()=>format.validateOutput('cleanup',{text:'',extra:'no'},source));
});
test('evidence can span sentences; employee number normalization retains a documented number',()=>{
 const source='Firma Müller ist mit drei Mitarbeitern da. Sie montieren Fenster.';
 const result=format.validateOutput('organize',{...blank(),trades:[{company:'Müller',workers:'3',work:'Fenster montieren',evidence:source}]},source);
 assert.equal(result.data.trades[0].workers,'3');assert.equal(result.data.notes.length,0);assert.deepEqual(result.warnings,[]);
});
test('cleanup warns for changed quantities and negations without pretending it can prove semantic correctness',()=>{
 assert.equal(format.validateOutput('cleanup',{text:'Drei Mitarbeiter montieren 14 Fenster nicht.'},'Äh, drei Mitarbeiter montieren 14 Fenster nicht.').warnings.length,0);
 assert.equal(format.validateOutput('cleanup',{text:'Vier Mitarbeiter montieren 15 Fenster.'},'Drei Mitarbeiter montieren 14 Fenster nicht.').warnings.length,2);
});
test('negative and planned work cannot become completed work; negative occurrence text retains its meaning',()=>{
 const source='Die Firma Müller arbeitet mit drei Mitarbeitern. Eine Tür wurde noch nicht eingebaut. Morgen sollen Fenster geprüft werden. Kein Schaden festgestellt.';
 const result=format.validateOutput('organize',{...blank(),trades:[{company:'Müller',workers:'drei Mitarbeiter',work:'Montage',evidence:'Die Firma Müller arbeitet mit drei Mitarbeitern.'},{company:'Müller',workers:'',work:'Tür eingebaut',evidence:'Eine Tür wurde noch nicht eingebaut.'},{company:'Müller',workers:'',work:'Fenster geprüft',evidence:'Morgen sollen Fenster geprüft werden.'}],incidents:[{text:'Schaden festgestellt.',evidence:'Kein Schaden festgestellt.'}]},source);
 assert.equal(result.data.trades.length,1);assert.equal(result.data.trades[0].workers,'3');assert.ok(result.data.incidents.some(v=>v.text==='Eine Tür wurde noch nicht eingebaut.'));assert.ok(result.data.incidents.some(v=>v.text==='Kein Schaden festgestellt.'));assert.ok(result.data.notes.some(v=>v.text==='Morgen sollen Fenster geprüft werden.'));
});
test('temperatures must have source numbers and cannot fill the weather field',()=>{
 const result=format.validateOutput('organize',{...blank(),weather:{value:'14 Grad',evidence:'Es sind 14 Grad.'},temperature:{value:'40 °C',evidence:'Es sind 14 Grad.'}},'Es sind 14 Grad.');
 assert.equal(result.data.weather.value,'');assert.equal(result.data.temperature.value,'');assert.equal(result.data.notes[0].unassigned,true);
});
test('long transcripts retain all input words across bounded chunks; conflicting weather stays visible',()=>{
 const input=Array.from({length:200},(_,i)=>`Satz ${i} mit Fenstern.`).join(' '),chunks=format.splitTranscript(input);
 assert.ok(chunks.length>1);assert.equal(chunks.join(' '),input);assert.ok(chunks.every(c=>c.length<=2501));
 const a={data:{...blank(),weather:{value:'Regen',evidence:'Regen.'}},warnings:[]},b={data:{...blank(),weather:{value:'Sonne',evidence:'Sonne.'}},warnings:[]};
 const combined=format.combine('organize',[a,b]);assert.equal(combined.data.weather.value,'Regen');assert.equal(combined.data.notes[0].text,'Wetter: Sonne');assert.equal(combined.warnings.length,1);
 assert.equal(format.combine('cleanup',[{data:{text:'A'},warnings:[]},{data:{text:'B'},warnings:[]}]).data.text,'A\n\nB');
});
test('review applies only selected fields, retains existing work and skips exact duplicates',async()=>{
 const {applyOrganization}=await import('../src/assistant-apply.mjs');
 const row={id:'existing',code:'120',company:'Müller',workers:'3',work:'Fenster'},entry={trades:[row],weather:'Sonne',temperature:'20',incidents:'Bestehender Vorfall',notes:'Bestehende Notiz',attachments:[{transcript:'Original'}]};
 const data={...blank(),trades:[{...row,evidence:'Original'},{company:'Meier',workers:'2',work:'Türen',evidence:'Original'}],weather:{value:'Regen'},temperature:{value:'14'},incidents:[{text:'Bestehender Vorfall'},{text:'Neue Lieferung'}],notes:[{text:'Nicht ausgewählt'}]};
 const result=applyOrganization(entry,data,{trades:[0,1],weather:false,temperature:true,incidents:[0,1],notes:[]},()=> 'new');
 assert.deepEqual(result.trades[0],row);assert.equal(result.trades.length,2);assert.equal(result.trades[1].code,'');assert.equal(result.weather,'Sonne');assert.equal(result.temperature,'14');assert.equal(result.incidents,'Bestehender Vorfall\n\nNeue Lieferung');assert.equal(result.notes,entry.notes);assert.equal(result.attachments,entry.attachments);assert.equal(entry.trades.length,1);
 assert.equal(applyOrganization(result,data,{trades:[0,1],weather:false,temperature:false,incidents:[0,1],notes:[]},()=> 'duplicate').trades.length,2);
});
test('speech and text inference serialize; queued cancellation never starts the canceled job',async()=>{
 const queue=new LocalInferenceQueue(),gate=deferred(),order=[];let queued=false;
 const first=queue.run('speech','one',async()=>{order.push('speech');await gate.promise;return 'done';},()=>{});
 const canceled=queue.run('assistant','two',async()=>{throw new Error('must not start');},()=>{},()=>queued=true);
 const last=queue.run('assistant','three',async()=>{order.push('assistant');return 'ready';},()=>{});
 assert.equal(queued,true);assert.equal(queue.cancel('assistant','two'),true);assert.equal((await canceled).status,'canceled');gate.resolve();assert.equal(await first,'done');assert.equal(await last,'ready');assert.deepEqual(order,['speech','assistant']);
});
test('cancellation during model unload prevents starting inference; a failed job does not block successors',async()=>{
 const queue=new LocalInferenceQueue(),gate=deferred();let cancelCount=0,started=false;
 const first=queue.run('assistant','one',async signal=>{await gate.promise;if(signal.aborted)return {status:'canceled'};started=true;},()=>cancelCount++);
 assert.equal(queue.cancel('assistant','one'),true);gate.resolve();assert.equal((await first).status,'canceled');assert.equal(started,false);assert.equal(cancelCount,1);
 await assert.rejects(queue.run('speech','bad',async()=>{throw new Error('bad');},()=>{}));assert.equal(await queue.run('assistant','good',async()=>42,()=>{}),42);
 queue.close();await assert.rejects(queue.run('speech','closed',async()=>{},()=>{}),/beendet/);
});
function fakeProvider(fetchRequest,idleMs=90000){let child,killed=0,args,options;const provider=new QwenAssistantProvider({resources:'unused',idleMs,fetchRequest,spawnProcess:(_exe,a,o)=>{args=a;options=o;child=new EventEmitter();child.stdout=new EventEmitter();child.stderr=new EventEmitter();child.kill=()=>{killed++;queueMicrotask(()=>{child.emit('exit',0);child.emit('close',0);});};return child;}});provider.status=()=>({available:true});return {provider,inspect:()=>({killed,args,options})};}
test('native inference uses authenticated loopback, constrained JSON, offline CPU and releases idle memory',async()=>{
 let request;const fake=fakeProvider(async(url,options)=>{if(url.endsWith('/health'))return {ok:true,json:async()=>({status:'ok'})};request={url,options,body:JSON.parse(options.body)};return {ok:true,json:async()=>({choices:[{finish_reason:'stop',message:{content:'{"text":"Original."}'}}]})};},5);
 const result=await fake.provider.analyze({requestId:'id',mode:'cleanup',transcript:'Original.'});assert.equal(result.data.text,'Original.');assert.match(request.url,/^http:\/\/127\.0\.0\.1:\d+\/v1\/chat\/completions$/);assert.match(request.options.headers.Authorization,/^Bearer [a-f0-9]{64}$/);assert.equal(request.body.response_format.schema.additionalProperties,false);assert.equal(request.body.chat_template_kwargs.enable_thinking,false);
 const {args,options}=fake.inspect();assert.ok(args.includes('--offline')&&args.includes('--no-agent'));assert.equal(args[args.indexOf('-ngl')+1],'0');assert.equal(options.windowsHide,true);assert.equal(options.env.HF_HUB_OFFLINE,'1');
 await new Promise(r=>setTimeout(r,20));assert.equal(fake.inspect().killed,1);await fake.provider.dispose();
});
test('cancel aborts an in-flight generation and stops only its worker',async()=>{
 const entered=deferred();const fake=fakeProvider(async(url,options)=>{if(url.endsWith('/health'))return {ok:true,json:async()=>({status:'ok'})};entered.resolve();return new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(options.signal.reason),{once:true}));});
 const pending=fake.provider.analyze({requestId:'id',mode:'cleanup',transcript:'Original.'});await entered.promise;assert.equal(fake.provider.cancel('other'),false);assert.equal(fake.provider.cancel('id'),true);assert.equal((await pending).status,'canceled');assert.equal(fake.inspect().killed,1);await fake.provider.dispose();
});
test('malformed or truncated model responses are not accepted',async()=>{
 for(const choice of [{finish_reason:'length',message:{content:'{"text":"partial"}'}},{finish_reason:'stop',message:{content:'not JSON'}}]){
  const fake=fakeProvider(async url=>({ok:true,json:async()=>url.endsWith('/health')?{status:'ok'}:{choices:[choice]}}));await assert.rejects(fake.provider.analyze({mode:'cleanup',transcript:'Original.'}));assert.equal(fake.inspect().killed,1);await fake.provider.dispose();
 }
});
