// Modulo Stratum — Badge / Tag / Pill

export function Badge({ children, tone = 'default', size = 'md', dot = false, style }) {
  const tones = {
    default: { bg: 'var(--surface-2)',                                        fg: 'var(--text-dim)',  border: '1px solid var(--border-strong)' },
    accent:  { bg: 'var(--accent-dim)',                                       fg: 'var(--accent)',    border: 'none' },
    pos:     { bg: 'color-mix(in oklch, var(--pos)  18%, transparent)',       fg: 'var(--pos)',       border: 'none' },
    neg:     { bg: 'color-mix(in oklch, var(--neg)  18%, transparent)',       fg: 'var(--neg)',       border: 'none' },
    warn:    { bg: 'color-mix(in oklch, var(--warn) 18%, transparent)',       fg: 'var(--warn)',      border: 'none' },
    outline: { bg: 'transparent',                                             fg: 'var(--text-dim)',  border: '1px solid var(--border)' },
  };
  const sizes = {
    sm: { padding: '1px 6px',  fontSize: 9,  gap: 3 },
    md: { padding: '2px 8px',  fontSize: 10, gap: 4 },
    lg: { padding: '3px 10px', fontSize: 11, gap: 5 },
  };
  const t = tones[tone] || tones.default;
  const s = sizes[size] || sizes.md;
  return React.createElement('span', {
    style: {
      display: 'inline-flex', alignItems: 'center', gap: s.gap,
      padding: s.padding, borderRadius: 999, fontSize: s.fontSize,
      fontFamily: 'var(--font-data)', letterSpacing: '0.02em',
      background: t.bg, color: t.fg, border: t.border,
      lineHeight: 1.4, whiteSpace: 'nowrap', flexShrink: 0,
      ...style,
    },
  },
    dot && React.createElement('span', {
      style: { width: 5, height: 5, borderRadius: '50%', background: t.fg, flexShrink: 0 },
    }),
    children
  );
}

// Status badge for project status strings
export function StatusBadge({ status }) {
  const map = {
    aktiv:      { tone: 'pos',  label: 'aktiv' },
    abschluss:  { tone: 'accent', label: 'abschluss' },
    akquise:    { tone: 'outline', label: 'akquise' },
    pause:      { tone: 'warn', label: 'pause' },
    risiko:     { tone: 'neg',  label: 'risiko' },
  };
  const cfg = map[status] || { tone: 'default', label: status };
  return React.createElement(Badge, { tone: cfg.tone, dot: true }, cfg.label);
}
