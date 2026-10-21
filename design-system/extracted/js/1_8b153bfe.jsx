// Shared atoms for Modulo mockups — icons, sparkline, mini bar chart, donut.
// All take `currentColor` so they inherit the theme.

const Icon = ({ name, size = 14, stroke = 1.6 }) => {
  const p = {
    dashboard: 'M3 3h7v7H3zM14 3h7v4h-7zM14 11h7v10h-7zM3 14h7v7H3zM3 21h0',
    project:   'M3 6h18M3 12h18M3 18h12',
    clock:     'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
    euro:      'M18 6a8 8 0 1 0 0 12M3 10h10M3 14h10',
    invoice:   'M5 3h10l4 4v14H5zM15 3v4h4M8 12h8M8 16h5',
    team:      'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c.5-3 3-5 6-5s5.5 2 6 5M17 11a3 3 0 1 0 0-6M22 20c-.3-2-1.6-3.6-3.4-4.4',
    reports:   'M4 19V5M4 19h16M8 15v-5M12 15V8M16 15v-7',
    settings:  'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
    search:    'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
    chevron:   'M9 6l6 6-6 6',
    chevdown:  'M6 9l6 6 6-6',
    plus:      'M12 5v14M5 12h14',
    play:      'M6 4l14 8-14 8V4z',
    pause:     'M6 5h4v14H6zM14 5h4v14h-4z',
    timer:     'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 1h6',
    folder:    'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    alert:     'M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
    download:  'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
    filter:    'M3 4h18l-7 9v7l-4-2v-5z',
    grid:      'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    list:      'M3 6h18M3 12h18M3 18h18',
    arrowup:   'M12 19V5M5 12l7-7 7 7',
    arrowdown: 'M12 5v14M5 12l7 7 7-7',
    arrowright: 'M5 12h14M13 5l7 7-7 7',
    check:     'M5 12l5 5L20 7',
    x:         'M6 6l12 12M18 6L6 18',
    dot:       'M12 12h.01',
    drawing:   'M3 3h18v18H3zM3 9h18M9 3v18',
    calc:      'M5 3h14v18H5zM8 7h8M8 11h2M12 11h2M16 11h-.01M8 15h2M12 15h2M16 15h-.01M8 19h6',
    layers:    'M12 2 2 8l10 6 10-6zM2 14l10 6 10-6M2 11l10 6 10-6',
  }[name] || 'M0 0h0';
  const isFilled = name === 'dot';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={isFilled ? 'none' : 'currentColor'} strokeWidth={stroke}
         strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {isFilled ? <circle cx="12" cy="12" r="3" fill="currentColor" /> : <path d={p} />}
    </svg>
  );
};

// Sparkline — accepts array of numbers, returns inline SVG.
const Sparkline = ({ data, w = 80, h = 22, stroke = 'currentColor', fill = 'none', strokeWidth = 1.4 }) => {
  if (!data || !data.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, h - ((v - min) / range) * (h - 2) - 1]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = fill === 'none' ? null
    : d + ` L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {area && <path d={area} fill={fill} />}
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

// Mini horizontal bar showing soll/ist.
const SollIstBar = ({ ist, soll, w = 140, h = 6, good = 'var(--pos)', bad = 'var(--neg)', neutral = 'var(--accent)' }) => {
  const pct = Math.min(1.5, ist / soll);
  const color = pct > 1.05 ? bad : pct < 0.85 ? neutral : good;
  const barW = Math.min(pct, 1) * w;
  const overW = pct > 1 ? Math.min(pct - 1, 0.5) * w : 0;
  return (
    <div style={{ position: 'relative', width: w, height: h, background: 'var(--surface-3)', borderRadius: 1 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: h, width: barW, background: color, borderRadius: 1 }} />
      {overW > 0 && (
        <div style={{ position: 'absolute', left: barW, top: 0, height: h, width: overW,
                      background: 'var(--neg)', opacity: 0.6, borderRadius: 1 }} />
      )}
      <div style={{ position: 'absolute', left: w, top: -2, height: h + 4, width: 1, background: 'var(--text-dim)' }} />
    </div>
  );
};

// Donut showing single percentage (0–1).
const Donut = ({ pct, size = 64, stroke = 8, color = 'var(--accent)', track = 'var(--surface-3)', children }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
                strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
                transform={`rotate(-90 ${size/2} ${size/2})`} strokeLinecap="butt" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
};

// Vertical bar chart for monthly hours.
const MonthBars = ({ data, w = 380, h = 110, accent = 'var(--accent)' }) => {
  const max = Math.max(...data.map(d => Math.max(d.ist, d.plan, d.prev || 0)));
  const bw = w / data.length;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {data.map((d, i) => {
        const x = i * bw + 2;
        const istH = (d.ist / max) * (h - 18);
        const planH = (d.plan / max) * (h - 18);
        return (
          <g key={i}>
            {/* plan line */}
            <line x1={x} x2={x + bw - 4} y1={h - 14 - planH} y2={h - 14 - planH}
                  stroke="var(--text-mute)" strokeDasharray="2 2" strokeWidth="1" />
            {/* ist bar */}
            <rect x={x + 2} y={h - 14 - istH} width={bw - 8} height={istH}
                  fill={d.future ? 'var(--surface-3)' : accent}
                  opacity={d.future ? 0.4 : 0.85} />
            <text x={x + bw / 2 - 2} y={h - 3} fontSize="9" fill="var(--text-mute)"
                  textAnchor="middle" fontFamily="var(--font-data)">{d.m}</text>
          </g>
        );
      })}
    </svg>
  );
};

// Status dot.
const StatusDot = ({ status }) => {
  const map = { aktiv: 'var(--pos)', abschluss: 'var(--accent)', akquise: 'var(--text-mute)', pause: 'var(--neg)' };
  return <span style={{ width: 6, height: 6, borderRadius: '50%', background: map[status] || 'var(--text-mute)',
                        display: 'inline-block', flexShrink: 0 }} />;
};

// Logo (wordmark + grid mark) — Modulo's brand
const ModuloMark = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="9" height="9" fill={color} />
    <rect x="13" y="2" width="9" height="9" stroke={color} strokeWidth="2" />
    <rect x="2" y="13" width="9" height="9" stroke={color} strokeWidth="2" />
    <rect x="13" y="13" width="9" height="9" fill={color} opacity="0.4" />
  </svg>
);

Object.assign(window, { Icon, Sparkline, SollIstBar, Donut, MonthBars, StatusDot, ModuloMark });
