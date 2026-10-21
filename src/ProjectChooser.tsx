import { useEffect, useRef, useState } from 'react';
import { Building2, Check, ChevronDown, Search } from 'lucide-react';
import type { Project } from './types';

export default function ProjectChooser({ projects, project, disabled, onChange }: { projects: Project[]; project: Project; disabled: boolean; onChange: (id: string) => void }) {
  const [open, setOpen] = useState(false), [query, setQuery] = useState('');
  const root = useRef<HTMLDivElement>(null), trigger = useRef<HTMLButtonElement>(null), search = useRef<HTMLInputElement>(null);
  const options = useRef<Array<HTMLButtonElement | null>>([]);
  const filtered = projects.filter(p => `${p.number} ${p.name} ${p.location}`.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de')));
  useEffect(() => {
    if (!open) return;
    search.current?.focus();
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  function close() { setOpen(false); trigger.current?.focus(); }
  return <div className="project-chooser" ref={root} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}
    onKeyDown={event => { if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); close(); } }}>
    <div className="eyebrow">Aktuelles Projekt</div>
    <button ref={trigger} className="project-chooser-trigger" aria-label="Projekt auswählen" aria-haspopup="listbox" aria-expanded={open} aria-controls="project-options"
      disabled={disabled} onClick={() => { setQuery(''); setOpen(value => !value); }} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setQuery(''); setOpen(true); } }}>
      <Building2 size={17} /><span><b>{project.number || 'Projekt'}</b><span>{project.name}</span></span><ChevronDown size={14} />
    </button>
    {open && <div className="project-menu"><div className="project-search"><Search size={14}/><input ref={search} aria-label="Projekte suchen" placeholder="Projekte suchen …" value={query}
      onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === 'ArrowDown' && filtered.length) { event.preventDefault(); options.current[0]?.focus(); } }} /></div>
      <div id="project-options" role="listbox" aria-label="Projekte" className="project-options">
        {filtered.map((p, i) => <button key={p.id} ref={el => { options.current[i] = el; }} role="option" aria-selected={p.id === project.id} className="project-option"
          onClick={() => { onChange(p.id); close(); }} onKeyDown={event => {
            let target: number | undefined;
            if (event.key === 'ArrowDown') target = (i + 1) % filtered.length;
            if (event.key === 'ArrowUp') target = (i + filtered.length - 1) % filtered.length;
            if (event.key === 'Home') target = 0;
            if (event.key === 'End') target = filtered.length - 1;
            if (target !== undefined) { event.preventDefault(); options.current[target]?.focus(); }
          }}><span><b>{p.number || 'Projekt'}</b><strong>{p.name}</strong>{p.location && <small>{p.location}</small>}</span>{p.id === project.id && <Check size={15}/>}</button>)}
      </div>{!filtered.length && <p className="project-no-results">Keine Projekte gefunden.</p>}
      <div className="project-menu-footer">{projects.length} {projects.length === 1 ? 'Projekt' : 'Projekte'}</div>
    </div>}
  </div>;
}
