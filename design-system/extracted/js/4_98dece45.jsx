// Stratum — Mitarbeiter-Shell (Employee view)
// Restricted sidebar: Mein Tag · Zeiterfassung · Kalender · Team · Abwesenheit.
// User identity: Sophia Nowak (Architektin, non-admin).

const EMP_USER = {
  id: 'sn',
  initials: 'SN',
  name: 'Sophia Nowak',
  role: 'Architektin',
  color: '#b89065',
  weekly: 32, // Teilzeit 32h
  urlaub: { jahr: 28, genommen: 16, geplant: 5, rest: 7 },
};

// Inline calendar icon (sidebar) — not in shared atoms.
const CalIcon = ({ size = 14, stroke = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <rect x="3" y="5" width="18" height="16" rx="1.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

const AwayIcon = ({ size = 14, stroke = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M4 21V10l8-5 8 5v11" />
    <path d="M9 21v-7h6v7" />
  </svg>
);

const EmpSidebar = ({ active = 'Mein Tag' }) => {
  const items = [
    { label: 'Mein Tag',      icon: 'dashboard' },
    { label: 'Zeiterfassung', icon: 'clock'     },
    { label: 'Kalender',      icon: 'calendar'  },
    { label: 'Team',          icon: 'team'      },
    { label: 'Abwesenheit',   icon: 'away'      },
  ];

  const renderIcon = (icon) => {
    if (icon === 'calendar') return <CalIcon size={14} />;
    if (icon === 'away')     return <AwayIcon size={14} />;
    return <Icon name={icon} size={14} />;
  };

  return (
    <div className="m-side" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '0 4px' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ModuloMark size={16} color="var(--surface)" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Modulo</div>
          <div className="m-mute" style={{ fontSize: 10 }}>Hofer · Renner</div>
        </div>
      </div>

      <div className="m-eyebrow" style={{ padding: '8px 10px 4px' }}>Mein Arbeitsplatz</div>
      {items.map(({ label, icon }) => {
        const isActive = label === active;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
                                      background: isActive ? 'var(--surface)' : 'transparent', borderRadius: 6,
                                      fontSize: 13, color: isActive ? 'var(--text)' : 'var(--text-dim)',
                                      fontWeight: isActive ? 600 : 400,
                                      boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.06)' : 'none' }}>
            {renderIcon(icon)}
            <span>{label}</span>
            {isActive && <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: 2, background: 'var(--accent)' }} />}
          </div>
        );
      })}

      <div className="m-eyebrow" style={{ padding: '20px 10px 4px' }}>Meine Projekte</div>
      {[
        ['BÜR-118', 'Bürohaus Stadtkrone'],
        ['SAN-302', 'Sanierung Maxvorstadt'],
      ].map(([id, name]) => (
        <div key={id} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '6px 10px',
                                  borderRadius: 6, fontSize: 12 }}>
          <span className="m-num m-mute" style={{ fontSize: 10 }}>{id}</span>
          <span style={{ color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
        </div>
      ))}

      {/* Mini-Urlaubs­anzeige */}
      <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 8,
                      background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="m-eyebrow" style={{ fontSize: 9 }}>Urlaubskonto · 2026</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
          <span className="m-num" style={{ fontSize: 18, fontWeight: 600 }}>{EMP_USER.urlaub.rest}</span>
          <span className="m-mute" style={{ fontSize: 10 }}>/ {EMP_USER.urlaub.jahr} Tage frei</span>
        </div>
        <div style={{ display: 'flex', gap: 2, marginTop: 6 }}>
          {Array.from({ length: EMP_USER.urlaub.jahr }).map((_, i) => {
            const isGenommen = i < EMP_USER.urlaub.genommen;
            const isGeplant  = i >= EMP_USER.urlaub.genommen && i < EMP_USER.urlaub.genommen + EMP_USER.urlaub.geplant;
            return (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 1,
                                      background: isGenommen ? 'var(--accent)'
                                                  : isGeplant ? 'color-mix(in oklch, var(--accent) 45%, var(--surface-2))'
                                                  : 'var(--surface-2)' }} />
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, padding: '10px',
                      background: 'var(--surface)', borderRadius: 8 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 30, height: 30, borderRadius: 15, background: EMP_USER.color,
                          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 600 }}>{EMP_USER.initials}</div>
          <div style={{ position: 'absolute', right: -1, bottom: -1, width: 9, height: 9, borderRadius: 5,
                          background: 'var(--pos)', border: '2px solid var(--surface)' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>{EMP_USER.name}</div>
          <div className="m-mute" style={{ fontSize: 10 }}>{EMP_USER.role}</div>
        </div>
        <Icon name="chevdown" size={12} />
      </div>
    </div>
  );
};

// Page layout — sidebar + main with padding.
const EmpPage = ({ active, children, padding = '24px 28px' }) => (
  <div className="m-app theme-stratum dens-comfy"
       style={{ width: 1280, height: 800, display: 'grid',
                gridTemplateColumns: '230px 1fr', overflow: 'hidden' }}>
    <EmpSidebar active={active} />
    <div style={{ padding, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
      {children}
    </div>
  </div>
);

// Shared employee header (reuses StratumHeader vocabulary, no search by default)
const EmpHeader = ({ title, subtitle, action, secondary, search = true }) =>
  <StratumHeader title={title} subtitle={subtitle} action={action} secondary={secondary} search={search} />;

// Tiny presence dot — used in Team views and avatars
const PresenceDot = ({ status = 'online', size = 9, border = 'var(--surface)' }) => {
  const map = {
    online:  'var(--pos)',
    busy:    'var(--neg)',
    away:    'var(--warn)',
    offline: 'var(--text-mute)',
  };
  return (
    <span style={{ display: 'inline-block', width: size, height: size, borderRadius: size / 2,
                    background: map[status], border: `2px solid ${border}` }} />
  );
};

// Team roster with presence status (shared by Mein Tag, Team, and Kalender)
// Used statuses: online · busy · away · offline · vacation · sick
const EMP_TEAM = [
  { id: 'mh', name: 'Maria Hofer',    role: 'Partnerin',          color: '#d97c4a', status: 'busy',     activity: 'Bauherrentermin BÜR-118',           ort: 'Stuttgart', bis: '17:30' },
  { id: 'ar', name: 'Andreas Renner', role: 'Partner',            color: '#7a9e6e', status: 'online',   activity: 'GEW-441 · Abnahmebericht',           ort: 'Büro',      bis: null    },
  { id: 'lv', name: 'Lukas Vogel',    role: 'Architekt',          color: '#6c7bb8', status: 'online',   activity: 'KIT-077 · Bauleitung remote',        ort: 'Home',      bis: null    },
  { id: 'sn', name: 'Sophia Nowak',   role: 'Architektin',        color: '#b89065', status: 'online',   activity: 'BÜR-118 · LP6 Trockenbau',           ort: 'Büro',      bis: null,   self: true },
  { id: 'jk', name: 'Jonas Klar',     role: 'Bauzeichner',        color: '#9a7eb5', status: 'away',     activity: 'Mittagspause',                       ort: 'Büro',      bis: '13:00' },
  { id: 'ec', name: 'Elif Çelik',     role: 'Architektin · BIM',  color: '#5fa3a8', status: 'vacation', activity: 'Urlaub bis 03.11.',                  ort: '—',         bis: null    },
  { id: 'tb', name: 'Tobias Burr',    role: 'Praktikant',         color: '#a8a8a8', status: 'sick',     activity: 'Krank gemeldet',                     ort: '—',         bis: null    },
];

Object.assign(window, { EMP_USER, EMP_TEAM, EmpSidebar, EmpPage, EmpHeader, PresenceDot, CalIcon, AwayIcon });
