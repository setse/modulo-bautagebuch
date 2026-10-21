import {useEffect,useRef,useState} from 'react';
import type {Attachment,DiaryState,Entry,TranscriptionProgress,TranscriptionResult,TranscriptionStatus} from './types';
type Options={stateRef:{current:DiaryState|null};updateEntry:(id:string,patch:Partial<Entry>|((e:Entry)=>Entry))=>void;flush:()=>Promise<unknown>;notify:(text:string,error?:boolean)=>void};
type Task={entryId:string;id:string;automatic:boolean};
type Proposal=Task&{name:string;text:string;generated:string;previous:string;result:TranscriptionResult};
export default function useTranscription({stateRef,updateEntry,flush,notify}:Options) {
  const [status,setStatus]=useState<TranscriptionStatus|null>(null);
  const statusRef=useRef<TranscriptionStatus|null>(null);
  const [active,setActive]=useState<TranscriptionProgress|null>(null);
  const [pending,setPending]=useState<string[]>([]);
  const [proposals,setProposals]=useState<Proposal[]>([]);
  const tasks=useRef<Task[]>([]),ids=useRef(new Set<string>()),canceled=useRef(new Set<string>());
  const draining=useRef(false),activeId=useRef(''),mounted=useRef(true);
  useEffect(()=>{
    mounted.current=true;
    window.diary.transcriptionStatus().then(result=>{statusRef.current=result;if(mounted.current)setStatus(result);}).catch(()=>{if(mounted.current)setStatus(null);});
    const unsubscribe=window.diary.onTranscriptionProgress(progress=>{if(mounted.current&&progress.attachmentId===activeId.current)setActive(progress);});
    return ()=>{mounted.current=false;tasks.current=[];unsubscribe();if(activeId.current)void window.diary.cancelTranscription(activeId.current).catch(()=>{});};
  },[]);
  function metadata(result:TranscriptionResult):Partial<Attachment> {return {transcriptionModel:result.model,transcriptionRevision:result.revision,transcribedAt:new Date().toISOString()};}
  async function drain() {
    if(draining.current)return;draining.current=true;
    try {
      while(tasks.current.length&&mounted.current) {
        const task=tasks.current.shift()!;
        try {
          if(canceled.current.delete(task.id))continue;
          const entry=stateRef.current?.entries.find(e=>e.id===task.entryId),audio=entry?.attachments.find(a=>a.id===task.id);
          if(!audio || (task.automatic&&(!stateRef.current?.preferences.autoTranscribe||audio.transcript||audio.transcription!=='pending')))continue;
          const available=statusRef.current||await window.diary.transcriptionStatus();
          if(!available.available){notify(available.message,true);continue;}
          activeId.current=task.id;setActive({attachmentId:task.id,jobId:'',stage:'loading',progress:null,message:'Parakeet wird vorbereitet …'});
          await flush();
          if(canceled.current.has(task.id)||!mounted.current)continue;
          const result=await window.diary.transcribe(task.id);
          if(!mounted.current)break;
          if(canceled.current.has(task.id))continue;
          const current=stateRef.current?.entries.find(e=>e.id===task.entryId)?.attachments.find(a=>a.id===task.id);
          if(!current)continue;
          if(result.status!=='completed'||!result.transcript){notify(result.message);continue;}
          if(!audio.transcript&&!current.transcript) {
            updateEntry(task.entryId,e=>({...e,attachments:e.attachments.map(a=>a.id===task.id?{...a,transcript:result.transcript!,originalTranscript:a.originalTranscript??result.transcript!,transcription:'automatic',assistantModel:undefined,assistantRevision:undefined,assistantEditedAt:undefined,...metadata(result)}:a)}));
            await flush();
          }else setProposals(p=>[...p,{...task,name:audio.name,text:result.transcript!,generated:result.transcript!,previous:current.transcript,result}]);
        }catch(error){if(mounted.current)notify(`Transkription fehlgeschlagen: ${error instanceof Error?error.message:String(error)}`,true);}
        finally {
          ids.current.delete(task.id);canceled.current.delete(task.id);
          if(activeId.current===task.id)activeId.current='';
          if(mounted.current){setPending([...ids.current]);setActive(null);}
        }
      }
    }finally{draining.current=false;}
  }
  function enqueue(entryId:string,id:string,automatic=false) {
    if(ids.current.has(id))return;
    if(automatic&&!stateRef.current?.preferences.autoTranscribe)return;
    ids.current.add(id);canceled.current.delete(id);tasks.current.push({entryId,id,automatic});setPending([...ids.current]);void drain();
  }
  async function cancel(id:string) {
    canceled.current.add(id);
    if(activeId.current===id)await window.diary.cancelTranscription(id);
    else {canceled.current.add(id);ids.current.delete(id);setPending([...ids.current]);}
  }
  async function cancelAll(){for(const id of ids.current)canceled.current.add(id);tasks.current=[];if(activeId.current)await window.diary.cancelTranscription(activeId.current);ids.current.clear();if(mounted.current)setPending([]);}
  function acceptProposal() {
    const proposal=proposals[0];if(!proposal)return;
    const exists=stateRef.current?.entries.find(e=>e.id===proposal.entryId)?.attachments.some(a=>a.id===proposal.id);
    if(exists)updateEntry(proposal.entryId,e=>({...e,attachments:e.attachments.map(a=>a.id===proposal.id?{...a,transcript:proposal.text,originalTranscript:a.originalTranscript??proposal.generated,assistantModel:undefined,assistantRevision:undefined,assistantEditedAt:undefined,transcription:proposal.text===proposal.generated?'automatic':'manual',...metadata(proposal.result)}:a)}));
    setProposals(p=>p.slice(1));
  }
  return {status,active,pending,enqueue,cancel,cancelAll,proposal:proposals[0]||null,acceptProposal,rejectProposal:()=>setProposals(p=>p.slice(1)),editProposal:(text:string)=>setProposals(p=>p.map((v,i)=>i===0?{...v,text}:v))};
}
