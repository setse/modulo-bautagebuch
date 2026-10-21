// Stratum shared shell — sidebar, topbar, page wrapper used by every screen.
// Each screen passes `active` to highlight the right tab.

const StratumSidebar = ({ active = 'Übersicht' }) => {
  const items = [
    ['Übersicht',     'dashboard'],
    ['Projekte',      'project'],
    ['Akquise',       'folder'],
    ['Zeiterfassung', 'clock'],
    ['HOAI-Rechner',  'calc'],
    ['Honorare',      'euro'],
    ['Team',          'team'],
    ['Auswertungen',  'reports'],
  ];

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

      <div className="m-eyebrow" style={{ padding: '8px 10px 4px' }}>Arbeitsbereich</div>
      {items.map(([label, icon]) => {
        const isActive = label === active;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
                                      background: isActive ? 'var(--surface)' : 'transparent', borderRadius: 6,
                                      fontSize: 13, color: isActive ? 'var(--text)' : 'var(--text-dim)',
                                      fontWeight: isActive ? 600 : 400,
                                      boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.06)' : 'none' }}>
            <Icon name={icon} size={14} />
            <span>{label}</span>
            {isActive && <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: 2, background: 'var(--accent)' }} />}
          </div>
        );
      })}

      <div className="m-eyebrow" style={{ padding: '20px 10px 4px' }}>Letzte Projekte</div>
      {[
        ['BÜR-118', 'Bürohaus Stadtkrone'],
        ['WHB-204', 'Wohnhaus Bergmann'],
        ['SAN-302', 'Sanierung Maxvorstadt'],
      ].map(([id, name]) => (
        <div key={id} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '6px 10px',
                                  borderRadius: 6, fontSize: 12 }}>
          <span className="m-num m-mute" style={{ fontSize: 10 }}>{id}</span>
          <span style={{ color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
        </div>
      ))}

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, padding: '10px',
                      background: 'var(--surface)', borderRadius: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 15, background: '#d97c4a',
                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 600 }}>MH</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>Maria Hofer</div>
          <div className="m-mute" style={{ fontSize: 10 }}>Partnerin</div>
        </div>
        <Icon name="chevdown" size={12} />
      </div>
    </div>
  );
};

// Page header — title, subtitle, search, primary action.
const StratumHeader = ({ title, subtitle, breadcrumb, action, secondary, search = true }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 4 }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      {breadcrumb && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontSize: 11, marginBottom: 4 }}>
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              <span className={i === breadcrumb.length - 1 ? '' : 'm-mute'}
                    style={{ color: i === breadcrumb.length - 1 ? 'var(--text)' : 'var(--text-dim)' }}>{b}</span>
              {i < breadcrumb.length - 1 && <Icon name="chevron" size={9} />}
            </React.Fragment>
          ))}
        </div>
      )}
      <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.5 }}>{title}</div>
      {subtitle && <div className="m-mute" style={{ fontSize: 12, marginTop: 2 }}>{subtitle}</div>}
    </div>
    {search && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
                      fontSize: 12, color: 'var(--text-mute)', width: 220 }}>
        <Icon name="search" size={12} />
        <span>Suchen…</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-data)', fontSize: 10 }}>⌘K</span>
      </div>
    )}
    {secondary && (
      <div style={{ padding: '8px 14px', borderRadius: 8, background: 'var(--surface)',
                      border: '1px solid var(--border)', fontSize: 12, fontWeight: 500,
                      display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
        {secondary}
      </div>
    )}
    {action && (
      <div style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--accent)', color: 'var(--surface)',
                      fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
        {action}
      </div>
    )}
  </div>
);

// Card wrapper for Stratum.
const SCard = ({ children, style, padding = 18, header, headerAction }) => (
  <div className="m-card" style={{ padding: header ? 0 : padding, ...style }}>
    {header && (
      <div style={{ padding: '16px 18px 10px', display: 'flex', alignItems: 'baseline', gap: 10,
                      borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{header.title}</div>
        {header.subtitle && <div className="m-mute" style={{ fontSize: 11 }}>{header.subtitle}</div>}
        <div style={{ flex: 1 }} />
        {headerAction}
      </div>
    )}
    <div style={{ padding: header ? padding : 0 }}>{children}</div>
  </div>
);

// Pill-style tag (rounded full on Stratum).
const STag = ({ children, tone = 'default', style }) => {
  const tones = {
    default: { bg: 'var(--surface-2)', fg: 'var(--text-dim)' },
    accent:  { bg: 'var(--accent-dim)', fg: 'var(--accent)' },
    pos:     { bg: 'color-mix(in oklch, var(--pos) 18%, transparent)', fg: 'var(--pos)' },
    neg:     { bg: 'color-mix(in oklch, var(--neg) 18%, transparent)', fg: 'var(--neg)' },
    warn:    { bg: 'color-mix(in oklch, var(--warn) 22%, transparent)', fg: 'var(--warn)' },
    outline: { bg: 'transparent', fg: 'var(--text-dim)', border: '1px solid var(--border)' },
  };
  const t = tones[tone] || tones.default;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 9px', borderRadius: 999, fontSize: 11,
                    fontFamily: 'var(--font-data)', letterSpacing: 0.02,
                    background: t.bg, color: t.fg, border: t.border, ...style }}>
      {children}
    </span>
  );
};

// Page layout — sidebar + main with padding.
const StratumPage = ({ active, children, padding = '24px 28px' }) => (
  <div className="m-app theme-stratum dens-comfy"
       style={{ width: 1280, height: 800, display: 'grid',
                gridTemplateColumns: '230px 1fr', overflow: 'hidden' }}>
    <StratumSidebar active={active} />
    <div style={{ padding, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
      {children}
    </div>
  </div>
);

Object.assign(window, { StratumSidebar, StratumHeader, StratumPage, SCard, STag });
