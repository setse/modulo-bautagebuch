const fs=require('node:fs'),path=require('node:path'),net=require('node:net');
const {spawn}=require('node:child_process'),{randomUUID,randomBytes}=require('node:crypto');
const manifest=require('../assistant/assets.json');
const format=require('./assistant-format.cjs');
const delay=(ms,signal)=>new Promise((resolve,reject)=>{if(signal.aborted)return reject(signal.reason);const abort=()=>{clearTimeout(timer);reject(signal.reason);};const timer=setTimeout(()=>{signal.removeEventListener('abort',abort);resolve();},ms);signal.addEventListener('abort',abort,{once:true});});
async function freePort(){return new Promise((resolve,reject)=>{const server=net.createServer();server.once('error',reject);server.listen(0,'127.0.0.1',()=>{const port=server.address().port;server.close(error=>error?reject(error):resolve(port));});});}
class QwenAssistantProvider{
 constructor({resources,onProgress=()=>{},idleMs=90000,spawnProcess=spawn,fetchRequest=fetch}={}){this.resources=resources;this.onProgress=onProgress;this.idleMs=idleMs;this.spawnProcess=spawnProcess;this.fetchRequest=fetchRequest;this.server=null;this.active=null;this.disposed=false;}
 modelPath(){return path.join(this.resources||'','models','Qwen3.5-2B-Q4_K_M.gguf');}
 runtimePath(){return path.join(this.resources||'','runtime','llama-server.exe');}
 status(){let available=false;try{available=fs.statSync(this.modelPath()).size===manifest.assets[0].size&&fs.existsSync(this.runtimePath());}catch{}return {available,model:'Qwen3.5 · 2B',device:'CPU · 4 Bit',busy:!!this.active,message:available?'Lokaler Textassistent ist bereit.':'Textassistent fehlt. Bitte die vollständige Windows-Version verwenden.'};}
 progress(stage,message,progress=null){if(this.active)this.onProgress({requestId:this.active.id,stage,message,progress});}
 async ensureServer(signal){
  if(this.server?.ready)return this.server;
  this.progress('loading','Qwen wird auf diesem PC geladen …');const port=await freePort();signal.throwIfAborted();const key=randomBytes(32).toString('hex');
  const env=Object.fromEntries(Object.entries(process.env).filter(([name])=>!name.startsWith('LLAMA_')));env.LLAMA_API_KEY=key;env.HF_HUB_OFFLINE='1';
  const child=this.spawnProcess(this.runtimePath(),['-m',this.modelPath(),'--host','127.0.0.1','--port',String(port),'-c','4096','-t','4','-tb','4','-ngl','0','--parallel','1','-b','512','-ub','128','--offline','--no-webui','--no-agent','--no-ui-mcp-proxy','--reasoning','off','--chat-template-kwargs','{"enable_thinking":false}','--no-cache-prompt','--log-disable'],{windowsHide:true,stdio:['ignore','pipe','pipe'],env});
  const server={child,port,key,ready:false,error:null};this.server=server;
  // No audio, transcript, prompt or generated response is written to logs.
  child.stdout.on('data',()=>{});child.stderr.on('data',()=>{});
  server.closed=new Promise(resolve=>child.once('close',resolve));
  child.once('error',()=>{server.error=new Error('Qwen konnte nicht gestartet werden. Bitte die vollständige App verwenden.');});
  child.once('exit',()=>{server.error=new Error('Qwen wurde unerwartet beendet. Bitte erneut versuchen.');if(this.server===server)this.server=null;});
  const start=Date.now();while(Date.now()-start<120000){signal.throwIfAborted();if(server.error)throw server.error;
   try{const r=await this.fetchRequest(`http://127.0.0.1:${port}/health`,{signal:AbortSignal.any([signal,AbortSignal.timeout(1500)])});if(r.ok&&(await r.json()).status==='ok'){server.ready=true;return server;}}catch(e){if(signal.aborted)throw e;}
   await delay(250,signal);
  }throw new Error('Qwen konnte nicht rechtzeitig geladen werden. Bitte erneut versuchen.');
 }
 async analyze({requestId=randomUUID(),mode,transcript}){
  if(this.disposed)throw new Error('Textassistent wird beendet.');if(this.active)throw new Error('Eine Sprachnotiz wird bereits bearbeitet.');if(!this.status().available)throw new Error(this.status().message);
  clearTimeout(this.idleTimer);const controller=new AbortController();const active={id:requestId,controller,canceled:false};this.active=active;const timeout=setTimeout(()=>controller.abort(new Error('Die Bearbeitung dauert zu lange. Bitte die Sprachnotiz aufteilen.')),1200000);const started=Date.now();
  try{
   const server=await this.ensureServer(controller.signal),chunks=format.splitTranscript(transcript),parts=[];
   for(let i=0;i<chunks.length;i++){
    controller.signal.throwIfAborted();this.progress('generating',`${mode==='cleanup'?'Text wird geglättet':'Eintrag wird vorbereitet'}${chunks.length>1?` (${i+1}/${chunks.length})`:''} …`,chunks.length>1?Math.round(i/chunks.length*95):null);
    const r=await this.fetchRequest(`http://127.0.0.1:${server.port}/v1/chat/completions`,{method:'POST',signal:controller.signal,headers:{'Content-Type':'application/json',Authorization:`Bearer ${server.key}`},body:JSON.stringify({messages:format.messages(mode,chunks[i]),response_format:{type:'json_object',schema:format.schema(mode)},chat_template_kwargs:{enable_thinking:false},reasoning_effort:'none',temperature:0,seed:42,max_tokens:1800,stream:false,cache_prompt:false})});
    if(!r.ok)throw new Error('Qwen konnte den Text nicht verarbeiten. Bitte eine kürzere Sprachnotiz versuchen.');
    const response=await r.json(),choice=response.choices?.[0];if(choice?.finish_reason==='length')throw new Error('Der Vorschlag ist zu lang. Bitte die Sprachnotiz aufteilen.');
    if(typeof choice?.message?.content!=='string')throw new Error('Qwen hat keinen gültigen Vorschlag geliefert.');
    try{parts.push(format.validateOutput(mode,JSON.parse(choice.message.content),chunks[i]));}catch{throw new Error('Qwen hat keinen gültigen Vorschlag geliefert. Bitte erneut versuchen.');}
   }
   const combined=format.combine(mode,parts);this.progress('completed','Vorschlag bereit. Bitte prüfen.',100);
   return {status:'completed',mode,...combined,model:manifest.source,revision:manifest.revision,elapsed:(Date.now()-started)/1000,message:'Vorschlag bereit. Bitte prüfen.'};
  }catch(error){await this.stop();if(active.canceled)return {status:'canceled',message:'Textbearbeitung abgebrochen.'};this.progress('error',error.message);throw error;}
  finally{clearTimeout(timeout);if(this.active===active)this.active=null;if(this.server){this.idleTimer=setTimeout(()=>void this.stop(),this.idleMs);this.idleTimer.unref?.();}}
 }
 cancel(id){if(this.active?.id!==id)return false;this.active.canceled=true;this.progress('canceled','Textbearbeitung abgebrochen.');this.active.controller.abort();void this.stop();return true;}
 stop(){clearTimeout(this.idleTimer);const server=this.server;this.server=null;if(!server)return this.stopping||Promise.resolve();server.child.kill();this.stopping=Promise.all([this.stopping||Promise.resolve(),server.closed]);return this.stopping;}
 async dispose(){this.disposed=true;if(this.active)this.cancel(this.active.id);await this.stop();}
}
module.exports={QwenAssistantProvider};
