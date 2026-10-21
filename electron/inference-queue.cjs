// One inference job at a time across both models. Queued jobs can be canceled.
class LocalInferenceQueue{
 constructor(){this.queue=[];this.active=null;this.closed=false;}
 run(kind,id,operation,cancel,onQueued=()=>{}){
  if(this.closed)return Promise.reject(new Error('Lokale KI wird beendet.'));
  if(this.active?.kind===kind&&this.active.id===id||this.queue.some(t=>t.kind===kind&&t.id===id))return Promise.reject(new Error('Dieser Auftrag wartet bereits.'));
  return new Promise((resolve,reject)=>{const task={kind,id,operation,cancel,resolve,reject,controller:new AbortController()};if(this.active)onQueued();this.queue.push(task);void this.drain();});
 }
 async drain(){if(this.active)return;while(this.queue.length&&!this.closed){const task=this.queue.shift();this.active=task;try{task.resolve(await task.operation(task.controller.signal));}catch(error){task.reject(error);}finally{this.active=null;}}}
 cancel(kind,id){if(this.active?.kind===kind&&this.active.id===id){this.active.controller.abort();this.active.cancel();return true;}const index=this.queue.findIndex(t=>t.kind===kind&&t.id===id);if(index<0)return false;const [task]=this.queue.splice(index,1);task.resolve({status:'canceled',message:'Auftrag abgebrochen.'});return true;}
 close(){this.closed=true;for(const task of this.queue)task.resolve({status:'canceled',message:'Auftrag abgebrochen.'});this.queue=[];if(this.active){this.active.controller.abort();this.active.cancel();}}
}
module.exports={LocalInferenceQueue};
