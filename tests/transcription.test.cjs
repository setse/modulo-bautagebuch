const {test}=require('node:test');
const assert=require('node:assert/strict');
const {EventEmitter}=require('node:events');
const {PassThrough}=require('node:stream');
const fs=require('node:fs/promises'),path=require('node:path');
const {ParakeetTranscriptionProvider}=require('../electron/transcription.cjs');
const {stateSchema,initialState}=require('../electron/model.cjs');
const {randomUUID}=require('node:crypto');
function harness(t,idleMs=90000){
 const workers=[],events=[],temp=[];
 const provider=new ParakeetTranscriptionProvider({resources:path.join(__dirname,'../.build/transcription'),idleMs,onProgress:e=>events.push(e),spawnProcess:(_exe,args)=>{
   temp.push(args[args.indexOf('--temp-root')+1]);const child=new EventEmitter();child.stdout=new PassThrough();child.stderr=new PassThrough();child.stdin=new PassThrough();child.jobs=[];child.stdin.on('data',line=>child.jobs.push(JSON.parse(line)));child.killed=false;child.kill=()=>{child.killed=true;child.emit('exit',0);child.emit('close',0);};child.send=e=>child.stdout.write(JSON.stringify(e)+'\n');workers.push(child);return child;
 }});
 provider.status=()=>({available:true});t.after(()=>provider.dispose());
 return {provider,workers,events,temp};
}
test('provider runs one job, exposes progress, ignores unrelated results and returns real metadata',async t=>{
 const {provider,workers,events}=harness(t);const promise=provider.transcribe('audio.mp3','attachment');const w=workers[0];
 await assert.rejects(provider.transcribe('other.wav','other'),/gerade/);w.send({type:'ready'});const job=w.jobs[0].jobId;
 w.send({type:'result',jobId:'unrelated',transcript:'wrong',duration:1,elapsed:1});assert.equal(provider.active.id,job);
 w.send({type:'progress',jobId:job,progress:50});w.send({type:'result',jobId:job,transcript:' Fenster montiert. ',duration:12,elapsed:1,segments:[{start:0,end:12,text:'Fenster montiert.'}]});
 const result=await promise;assert.equal(result.transcript,'Fenster montiert.');assert.equal(result.model,'primeline/parakeet-primeline');assert.equal(result.status,'completed');assert.ok(events.some(e=>e.progress===50));assert.equal(events.at(-1).stage,'completed');
});
test('cancel resolves cleanly, terminates only its own worker, discards late output and allows retry',async t=>{
 const {provider,workers,temp}=harness(t);const first=provider.transcribe('a.wav','a');const old=workers[0];assert.equal(provider.cancel('unrelated'),false);assert.equal(provider.cancel('a'),true);assert.equal((await first).status,'canceled');assert.equal(old.killed,true);
 const next=provider.transcribe('b.wav','b');const w=workers[1];old.send({type:'ready'});assert.equal(w.jobs.length,0);w.send({type:'ready'});w.send({type:'result',jobId:w.jobs[0].jobId,transcript:'Neuer Text.',duration:1,elapsed:1});assert.equal((await next).transcript,'Neuer Text.');
 await new Promise(r=>setTimeout(r,40));assert.equal(await fs.stat(temp[0]).then(()=>true,()=>false),false);
});
test('silence returns no invented transcript and worker errors are retryable',async t=>{
 const {provider,workers}=harness(t);const first=provider.transcribe('silence.wav','a');const w=workers[0];w.send({type:'ready'});w.send({type:'result',jobId:w.jobs[0].jobId,transcript:'',duration:2,elapsed:.1});assert.equal((await first).status,'empty');
 const bad=provider.transcribe('bad.wav','b');const assertion=assert.rejects(bad,/gültige/);w.send({type:'error',jobId:w.jobs[1].jobId,message:'Bitte gültige Audiodatei verwenden.'});await assertion;
 const good=provider.transcribe('good.wav','c');w.send({type:'result',jobId:w.jobs[2].jobId,transcript:'Text',duration:1,elapsed:1});assert.equal((await good).status,'completed');
});
test('invalid worker data fails visibly and idle workers release memory',async t=>{
 const {provider,workers}=harness(t,15);const bad=provider.transcribe('a.wav','a');const assertion=assert.rejects(bad,/ungültige/);workers[0].send({type:'ready'});workers[0].send({type:'result',jobId:workers[0].jobs[0].jobId,transcript:42,duration:1,elapsed:1});await assertion;assert.equal(workers[0].killed,true);
 const next=provider.transcribe('b.wav','b');const w=workers[1];w.send({type:'ready'});w.send({type:'result',jobId:w.jobs[0].jobId,transcript:'Text',duration:1,elapsed:1});await next;await new Promise(r=>setTimeout(r,40));assert.equal(w.killed,true);
});
test('old diaries migrate automatic recognition preference and preserve manual text and new metadata',()=>{
 const state=initialState();delete state.preferences.autoTranscribe;assert.equal(stateSchema.parse(state).preferences.autoTranscribe,true);delete state.preferences;assert.equal(stateSchema.parse(state).preferences.autoTranscribe,true);
 const next=initialState();next.entries=[{id:randomUUID(),projectId:next.projects[0].id,date:'2026-10-07',endDate:'',title:'',startTime:'',endTime:'',weather:'',temperature:'',status:'draft',trades:[],incidents:'',notes:'',updatedAt:new Date().toISOString(),attachments:[{id:randomUUID(),kind:'audio',name:'a.mp3',extension:'mp3',size:20,caption:'',transcript:'Fenster montiert.',transcription:'automatic',transcriptionModel:'primeline/parakeet-primeline',transcriptionRevision:'revision',transcribedAt:new Date().toISOString()}]}];
 const parsed=stateSchema.parse(next);assert.equal(parsed.entries[0].attachments[0].transcription,'automatic');assert.equal(parsed.entries[0].attachments[0].transcript,'Fenster montiert.');
});
