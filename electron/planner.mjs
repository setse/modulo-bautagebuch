// Civil dates only: noon UTC avoids DST and local-time date shifts.
export const day = value => Math.floor(Date.parse(value + 'T12:00:00Z') / 86400000);
export const dateFromDay = value => new Date(value * 86400000 + 43200000).toISOString().slice(0, 10);
export const addDays = (value, count) => dateFromDay(day(value) + count);
export const distance = (a, b) => day(b) - day(a);
export const validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(day(value)) && dateFromDay(day(value)) === value;
export const isWorkday = (value, calendar) => calendar.weekdays.includes(new Date(value + 'T12:00:00Z').getUTCDay()) && !calendar.exceptions.some(e => e.date === value);
export function nextWorkday(value, calendar, direction = 1) {
  for (let i = 0; i < 36600; i++, value = addDays(value, direction)) if (isWorkday(value, calendar)) return value;
  throw new Error('Im Kalender ist kein Arbeitstag erreichbar.');
}
export function shiftWorkdays(value, count, calendar) {
  value = nextWorkday(value, calendar, count < 0 ? -1 : 1);
  for (let i = 0; i < Math.abs(count); i++) value = nextWorkday(addDays(value, count < 0 ? -1 : 1), calendar, count < 0 ? -1 : 1);
  return value;
}
export function finish(task, calendar) {
  if (!task.start) return '';
  return task.duration === 0 ? task.start : shiftWorkdays(task.start, task.duration - 1, calendar);
}
export function workDuration(start, end, calendar) {
  let result = 0;
  for (let value = start; value <= end; value = addDays(value, 1)) if (isWorkday(value, calendar)) result++;
  return Math.max(1, result);
}
export function dependencyStart(predecessor, link, calendar) {
  const end = finish(predecessor, calendar);
  if (!end) return '';
  const after = addDays(end, 1);
  return link.unit === 'calendar' ? nextWorkday(addDays(after, link.lag), calendar) : shiftWorkdays(nextWorkday(after, calendar), link.lag, calendar);
}
export function topological(tasks) {
  const byId = new Map(tasks.map(t => [t.id, t])), visiting = new Set(), visited = new Set(), output = [], chain = [];
  function visit(task) {
    if (visiting.has(task.id)) throw new Error('Abhängigkeit im Kreis: ' + [...chain.slice(chain.indexOf(task.id)), task.id].map(id => byId.get(id)?.title || id).join(' → '));
    if (visited.has(task.id)) return;
    visiting.add(task.id); chain.push(task.id);
    for (const link of task.predecessors) { const before = byId.get(link.taskId); if (!before) throw new Error('Vorgänger fehlt: ' + task.title); visit(before); }
    chain.pop(); visiting.delete(task.id); visited.add(task.id); output.push(task);
  }
  tasks.forEach(visit); return output;
}
export function schedule(tasks, calendar) {
  if(!calendar.weekdays.length)throw new Error('Mindestens ein Arbeitstag muss ausgewählt sein.');
  for(const e of calendar.exceptions)if(!validDate(e.date)||e.date<'1900-01-01'||e.date>'2200-12-31')throw new Error('Ungültiger arbeitsfreier Tag: '+e.date);
  for(const t of tasks){
    for(const value of [t.start,t.deadline,t.actualStart,t.actualEnd])if(value&&(!validDate(value)||value<'1900-01-01'||value>'2200-12-31'))throw new Error('Ungültiges Datum: '+t.title);
    if(!Number.isInteger(t.duration)||t.duration<0||t.duration>3660)throw new Error('Dauer muss 0–3.660 Arbeitstage sein: '+t.title);
    if(t.actualStart&&t.actualEnd&&t.actualEnd<t.actualStart)throw new Error('Tatsächliches Ende liegt vor dem tatsächlichen Start: '+t.title);
    for(const link of t.predecessors)if(!Number.isInteger(link.lag)||link.lag < -366||link.lag>3660)throw new Error('Wartezeit muss −366 bis 3.660 Tage sein: '+t.title);
  }
  const ordered = topological(tasks), computed = new Map(), warnings = [];
  for (const source of ordered) {
    const task = structuredClone(source);
    const required = task.predecessors.map(link => dependencyStart(computed.get(link.taskId), link, calendar));
    if (task.predecessors.length && required.some(value => !value)) warnings.push({taskId:task.id, message:'Ein Vorgänger ist noch nicht terminiert.'});
    const earliest = required.filter(Boolean).sort().at(-1);
    if (task.fixed) {
      if (task.start && task.duration > 0 && !isWorkday(task.start, calendar)) warnings.push({taskId:task.id,message:'Fixierter Start liegt auf einem arbeitsfreien Tag.'});
      if (earliest && task.start && task.start < earliest) warnings.push({taskId:task.id,message:'Fixierter Start widerspricht Vorgängern. Frühestens ' + earliest + '.'});
      if (earliest && !task.start) warnings.push({taskId:task.id,message:'Fixierter Vorgang hat noch keinen Start.'});
    } else if (task.predecessors.length) task.start = required.some(value=>!value) ? '' : earliest || '';
    else if (task.start && task.duration > 0) task.start = nextWorkday(task.start, calendar);
    const end = finish(task, calendar);
    if(end&&end>'2200-12-31')throw new Error('Berechnetes Ende liegt nach 2200: '+task.title);
    if (task.deadline && end && end > task.deadline) warnings.push({taskId:task.id,message:'Ende liegt ' + distance(task.deadline,end) + ' Kalendertage nach dem Zieltermin.'});
    computed.set(task.id,task);
  }
  return {tasks:tasks.map(t=>computed.get(t.id)),warnings};
}
export function propose(plan, nextTasks, calendar = plan.calendar) {
  const result = schedule(nextTasks,calendar), old = new Map(plan.tasks.map(t=>[t.id,t]));
  const changes = result.tasks.flatMap(task=>{
    const previous = old.get(task.id);
    if (previous && JSON.stringify(previous) === JSON.stringify(task) && finish(previous,plan.calendar) === finish(task,calendar)) return [];
    return [{taskId:task.id,title:task.title,oldStart:previous?.start||'',newStart:task.start,oldEnd:previous?finish(previous,plan.calendar):'',newEnd:finish(task,calendar)}];
  });
  for (const task of plan.tasks) if (!result.tasks.some(t=>t.id===task.id)) changes.push({taskId:task.id,title:task.title,oldStart:task.start,newStart:'',oldEnd:finish(task,plan.calendar),newEnd:''});
  return {...result,changes,calendar};
}
export const snapshot = plan => structuredClone({calendar:plan.calendar,trades:plan.trades,companies:plan.companies,tasks:plan.tasks});
export function createPlan(projectId, uuid) {
  return {id:uuid(),projectId,calendar:{weekdays:[1,2,3,4,5],exceptions:[]},trades:[],companies:[],tasks:[],baselines:[],revisions:[],updatedAt:new Date().toISOString()};
}
export function createTask(tradeId, uuid, start = '') {
  return {id:uuid(),title:'',tradeId,companyId:'',area:'',start,duration:1,predecessors:[],fixed:false,deadline:'',status:'planned',blocked:false,progress:0,actualStart:'',actualEnd:'',notes:''};
}
// RFC4180 quoting, German spreadsheet delimiter; neutralize spreadsheet formulas.
export const csvCell = value => '"' + String(/^[=+\-@\t\r]/.test(String(value)) ? "'" + value : value).replaceAll('"','""') + '"';
export function exportCsv(plan, tasks = plan.tasks) {
  const rows = [['Vorgang','Gewerk','Firma','Bereich','Start','Dauer','Einheit','Ende','Status','Fortschritt','Blockiert','Notizen']];
  for (const t of tasks) rows.push([t.title,plan.trades.find(g=>g.id===t.tradeId)?.name||'',plan.companies.find(c=>c.id===t.companyId)?.name||'',t.area,t.start,t.duration,'Arbeitstage',finish(t,plan.calendar),t.status,t.progress,t.blocked?'ja':'nein',t.notes]);
  return '\uFEFF' + rows.map(row=>row.map(csvCell).join(';')).join('\r\n');
}
export function parseCsv(source) {
  if (source.length > 5_000_000) throw new Error('CSV ist größer als 5 MB.');
  source = source.replace(/^\uFEFF/,'');
  const first = source.split(/\r?\n/)[0], delimiter = first.includes(';') ? ';' : ',';
  const rows = []; let row = [], cell = '', quoted = false;
  for (let i=0;i<source.length;i++) {
    const char=source[i];
    if (char==='"') { if(quoted&&source[i+1]==='"'){cell+='"';i++;} else quoted=!quoted; }
    else if(!quoted && char===delimiter){row.push(cell);cell='';}
    else if(!quoted && (char==='\r'||char==='\n')){if(char==='\r'&&source[i+1]==='\n')i++;row.push(cell);if(row.some(Boolean))rows.push(row);row=[];cell='';}
    else cell+=char;
  }
  if(quoted)throw new Error('CSV enthält ein nicht geschlossenes Anführungszeichen.');
  row.push(cell);if(row.some(Boolean))rows.push(row);
  if(rows.length>5001)throw new Error('Maximal 5.000 CSV-Zeilen.');
  return {headers:rows[0]||[],rows:rows.slice(1)};
}
export function importDate(value) {
  if(!value.trim())return '';
  const match=value.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  const result=match?`${match[3]}-${match[2].padStart(2,'0')}-${match[1].padStart(2,'0')}`:value.trim();
  if(!validDate(result))throw new Error('Ungültiges Datum: '+value); return result;
}
