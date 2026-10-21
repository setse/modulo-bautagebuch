const { z } = require('zod');
const { randomUUID } = require('node:crypto');
const {planSchema}=require('./planner-model.cjs');
const text = z.string().max(100000);
const id = z.uuid();
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const d = new Date(value + 'T12:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}, 'Ungültiges Datum');
const time = z.union([z.literal(''), z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)]);
const sectionKey = z.enum(['project','day','weather','trades','incidents','notes','photos','audio','signature']);
const color = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const font = z.enum(['Arial','Calibri','Segoe UI','Verdana','Georgia','Times New Roman']);
const sectionStyleSchema = z.object({ borderStyle:z.enum(['none','solid','dashed','dotted','double']),borderColor:color,borderWidth:z.number().min(0.5).max(5),backgroundColor:color,fontFamily:font,fontSize:z.number().min(6).max(36),textColor:color,alignment:z.enum(['left','center','right']) }).partial();
const attachmentSchema = z.object({
  id, name: z.string().max(260), kind: z.enum(['photo', 'audio']),
  extension: z.enum(['png', 'jpg', 'jpeg', 'webp', 'mp3', 'wav', 'm4a', 'ogg', 'webm', 'flac']),
  size: z.number().int().nonnegative().max(100 * 1024 * 1024),
  caption: text, transcript: text, transcription: z.enum(['pending', 'manual', 'automatic']),
  transcriptionModel:z.string().max(200).optional(),transcriptionRevision:z.string().max(100).optional(),transcribedAt:z.string().datetime().optional(),
  originalTranscript:text.optional(),assistantModel:z.string().max(200).optional(),assistantRevision:z.string().max(100).optional(),assistantEditedAt:z.string().datetime().optional(),
  section: sectionKey.optional(),
  pixelWidth: z.number().positive().max(100000).optional(), pixelHeight: z.number().positive().max(100000).optional(),
  layout: z.object({ page: z.number().int().min(0).max(499), x: z.number().min(0).max(200), y: z.number().min(0).max(280), width: z.number().positive().max(200) }).optional()
});
const documentSchema = z.object({
  headerText: z.string().max(1000).default('BAUTAGEBUCH · {zeitraum}'),
  footerText: z.string().max(1000).default('Seite {seite} / {seiten}'),
  logo: attachmentSchema.refine(a => a.kind === 'photo', 'Logo muss ein Bild sein').nullable().default(null),
  logoWidthMm: z.number().min(10).max(60).default(24),
  footerImage: attachmentSchema.refine(a=>a.kind==='photo').nullable().default(null),
  footerImageWidthMm:z.number().min(10).max(60).default(24),
  headerAlignment:z.enum(['left','center','right']).default('left'),footerAlignment:z.enum(['left','center','right']).default('right'),
  headerImageAlignment:z.enum(['left','center','right']).default('right'),footerImageAlignment:z.enum(['left','center','right']).default('right'),
  fontFamily:font.default('Arial'),fontSize:z.number().min(6).max(24).default(10),textColor:color.default('#111111'),
  headerFontFamily:font.default('Arial'),footerFontFamily:font.default('Arial'),headerFontSize:z.number().min(6).max(18).default(9),footerFontSize:z.number().min(6).max(18).default(9),
  margins:z.object({top:z.number().min(15).max(60),bottom:z.number().min(15).max(60),left:z.number().min(5).max(60),right:z.number().min(5).max(60)}).default({top:35,bottom:25,left:25,right:15}),
  table:z.object({variant:z.enum(['grid','rows','striped','plain']),borderColor:color,headerColor:color,rowColor:color,alternateColor:color,textColor:color}).default({variant:'grid',borderColor:'#aaaaaa',headerColor:'#f4f4f4',rowColor:'#ffffff',alternateColor:'#f5f5f5',textColor:'#111111'}),
  sections:z.partialRecord(sectionKey,sectionStyleSchema).default({})
});
const defaultDocument = () => documentSchema.parse({});
const entrySchema = z.object({
  id, projectId: id, date, endDate: z.union([z.literal(''), date]), title: z.string().max(500),
  startTime: time, endTime: time, weather: z.string().max(1000), temperature: z.string().max(100),
  status: z.enum(['draft', 'complete']),
  sectionStyles:z.partialRecord(sectionKey,sectionStyleSchema).default({}),
  trades: z.array(z.object({ id, code: z.string().max(100), company: z.string().max(500), workers: z.string().max(100), work: text })).max(500),
  incidents: text, notes: text, attachments: z.array(attachmentSchema).max(500), updatedAt: z.string().datetime()
}).refine(e => !e.endDate || e.endDate >= e.date, 'Das Enddatum liegt vor dem Anfangsdatum');
const projectSchema = z.object({ id, name: z.string().min(1).max(500), number: z.string().max(100), client: z.string().max(500), location: z.string().max(500), author: z.string().max(500), document: documentSchema.default(defaultDocument) });
const stateSchema = z.preprocess(input=>input && input.version===1 ? {...input,version:2,plans:input.plans||[]} : input, z.object({ version: z.literal(2), projects: z.array(projectSchema).min(1).max(100), entries: z.array(entrySchema).max(10000),
  plans:z.array(planSchema).max(100).default([]),
  preferences: z.object({ zoom: z.number().min(0.75).max(2).default(1.25),autoTranscribe:z.boolean().default(true) }).default({ zoom: 1.25,autoTranscribe:true }),
  headerPresets: z.array(z.object({ id, name: z.string().min(1).max(100), document: documentSchema })).max(100).default([])
}).superRefine((state, ctx) => {
  const projects = new Set(state.projects.map(p => p.id));
  if(new Set(state.plans.map(p=>p.projectId)).size!==state.plans.length||new Set(state.plans.map(p=>p.id)).size!==state.plans.length)ctx.addIssue({code:'custom',message:'Doppelter Projektplan'});
  for(const plan of state.plans)if(!projects.has(plan.projectId))ctx.addIssue({code:'custom',message:'Planprojekt fehlt'});
  if (projects.size !== state.projects.length || new Set(state.entries.map(e => e.id)).size !== state.entries.length)
    ctx.addIssue({ code: 'custom', message: 'Doppelte IDs' });
  for (const entry of state.entries) {
    if (!projects.has(entry.projectId)) ctx.addIssue({ code: 'custom', message: 'Projekt fehlt' });
    if (new Set(entry.attachments.map(a => a.id)).size !== entry.attachments.length)
      ctx.addIssue({ code: 'custom', message: 'Doppelte Anlagen' });
  }
}));
function initialState() {
  return stateSchema.parse({ version: 1, projects: [{ id: randomUUID(), name: 'Sanierung Hörsaal (RW1)', number: '2312', client: 'JGU – Universität Mainz', location: 'Johannes Gutenberg-Universität Mainz · Gebäude 1226', author: '' }], entries: [] });
}
function calendarWeek(value) {
  const d = new Date(value + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  return Math.ceil((((d - new Date(Date.UTC(d.getUTCFullYear(), 0, 1))) / 86400000) + 1) / 7);
}
function germanDate(value) { return new Date(value + 'T12:00:00Z').toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }); }
module.exports = { stateSchema, attachmentSchema, initialState, calendarWeek, germanDate, defaultDocument };
