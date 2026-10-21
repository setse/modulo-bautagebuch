// Modulo Stratum — Card container

export function Card({ children, padding = 18, header, headerAction, style }) {
  return React.createElement('div', {
    style: {
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 6, boxShadow: 'var(--shadow-card)',
      padding: header ? 0 : padding, overflow: 'hidden', ...style,
    },
  },
    header && React.createElement('div', {
      style: {
        padding: '14px 18px 10px', display: 'flex', alignItems: 'baseline',
        gap: 10, borderBottom: '1px solid var(--border)',
      },
    },
      React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: 'var(--text)' } }, header.title),
      header.subtitle && React.createElement('div', {
        style: { fontSize: 11, color: 'var(--text-mute)' },
      }, header.subtitle),
      React.createElement('div', { style: { flex: 1 } }),
      headerAction
    ),
    React.createElement('div', { style: { padding: header ? padding : 0 } }, children)
  );
}

// Section eyebrow label
export function Eyebrow({ children, style }) {
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--font-data)', fontSize: 10,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      color: 'var(--text-mute)', fontWeight: 500, ...style,
    },
  }, children);
}
