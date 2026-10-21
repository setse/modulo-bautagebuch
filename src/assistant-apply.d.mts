import type {Entry,OrganizedTranscript} from './types';
export type Selection={trades:number[];incidents:number[];notes:number[];weather:boolean;temperature:boolean};
export function appendUnique(current:string,items:string[]):string;
export function applyOrganization(entry:Entry,data:OrganizedTranscript,selection:Selection,id:()=>string):Entry;
