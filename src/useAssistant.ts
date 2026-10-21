import {useEffect,useRef,useState} from 'react';
import type {AssistantMode,AssistantProgress,AssistantResult,AssistantStatus,DiaryState,Entry,OrganizedTranscript} from './types';
import {applyOrganization,type Selection} from './assistant-apply.mjs';
import {uid} from './helpers';
export type AssistantProposal={entryId:string;attachmentId:string;name:string;source:string;mode:AssistantMode;result:AssistantResult;data:{text:string}|OrganizedTranscript};
type Options={stateRef:{current:DiaryState|null};updateEntry:(id:string,patch:Partial<Entry>|((e:Entry)=>Entry))=>void;flush:()=>Promise<unknown>;notify:(text:string,error?:boolean)=>void};
export default function useAssistant({stateRef,updateEntry,flush,notify}:Options){
 const [status,setStatus]=useState<AssistantStatus|null>(null),[active,setActive]=useState<(AssistantProgress&{attachmentId:string})|null>(null),[proposal,setProposal]=useState<AssistantProposal|null>(null);
 const activeRef=useRef<{id:string;attachmentId:string;canceled:boolean}|null>(null),mounted=useRef(true);
 useEffect(()=>{mounted.current=true;void window.diary.assistantStatus().then(s=>{if(mounted.current)setStatus(s);}).catch(()=>{});const off=window.diary.onAssistantProgress(progress=>{if(mounted.current&&activeRef.current?.id===progress.requestId)setActive({...progress,attachmentId:activeRef.current.attachmentId});});return ()=>{mounted.current=false;off();if(activeRef.current)void window.diary.cancelAssistant(activeRef.current.id).catch(()=>{});};},[]);
 async function start(entryId:string,attachmentId:string,mode:AssistantMode){
  if(activeRef.current||proposal)return;const audio=stateRef.current?.entries.find(e=>e.id===entryId)?.attachments.find(a=>a.id===attachmentId);if(!audio?.transcript.trim())return;
  const job={id:uid(),attachmentId,canceled:false},source=audio.transcript.trim();activeRef.current=job;setActive({requestId:job.id,attachmentId,stage:'loading',message:'Textassistent wird vorbereitet …',progress:null});
  try{await flush();if(job.canceled)return;const result=await window.diary.analyzeTranscript({requestId:job.id,attachmentId,mode,transcript:source});if(!mounted.current||job.canceled)return;if(result.status==='canceled')return;
   const exists=stateRef.current?.entries.find(e=>e.id===entryId)?.attachments.some(a=>a.id===attachmentId);if(exists&&result.data)setProposal({entryId,attachmentId,name:audio.name,source,mode,result,data:result.data});
  }catch(error){if(mounted.current&&!job.canceled)notify(`Textbearbeitung fehlgeschlagen: ${error instanceof Error?error.message:String(error)}`,true);}
  finally{if(activeRef.current===job)activeRef.current=null;if(mounted.current)setActive(null);}
 }
 async function cancel(){const job=activeRef.current;if(!job)return;job.canceled=true;await window.diary.cancelAssistant(job.id);}
 function accept(data:AssistantProposal['data'],selection:Selection){
  if(!proposal)return false;const current=stateRef.current?.entries.find(e=>e.id===proposal.entryId),audio=current?.attachments.find(a=>a.id===proposal.attachmentId);
  if(!current||!audio){setProposal(null);notify('Der Eintrag oder die Sprachnotiz wurde entfernt.',true);return false;}
  if(audio.transcript.trim()!==proposal.source){setProposal(null);notify('Das Transkript wurde inzwischen bearbeitet. Bitte den Vorschlag neu erstellen.',true);return false;}
  try{
   if(proposal.mode==='cleanup'){
    const text=(data as {text:string}).text.trim();if(!text||text.length>100000)throw new Error('Bitte einen gültigen Textvorschlag verwenden.');
    updateEntry(proposal.entryId,e=>({...e,attachments:e.attachments.map(a=>a.id===proposal.attachmentId?{...a,originalTranscript:a.originalTranscript??proposal.source,transcript:text,transcription:'manual',assistantModel:proposal.result.model,assistantRevision:proposal.result.revision,assistantEditedAt:new Date().toISOString()}:a)}));
   }else{
    const updated=applyOrganization(current,data as OrganizedTranscript,selection,uid);updateEntry(proposal.entryId,updated);
   }
   setProposal(null);notify(proposal.mode==='cleanup'?'Geprüftes Transkript übernommen. Das Original bleibt erhalten.':'Ausgewählte Angaben in den Eintrag übernommen.');void flush().catch(error=>notify(`Speichern fehlgeschlagen: ${error.message}`,true));return true;
  }catch(error){notify(error instanceof Error?error.message:String(error),true);return false;}
 }
 return {status,active,proposal,start,cancel,accept,reject:()=>setProposal(null)};
}
