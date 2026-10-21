// Modulo Stratum — Input / Search field

export function Input({ placeholder, value, onChange, icon, type = 'text', size = 'md', style }) {
  const sizes = {
    sm: { padding: '5px 10px', fontSize: 11, borderRadius: 6, height: 28 },
    md: { padding: '7px 12px', fontSize: 12, borderRadius: 8, height: 34 },
    lg: { padding: '9px 14px', fontSize: 13, borderRadius: 8, height: 40 },
  };
  const s = sizes[size] || sizes.md;
  const [focused, setFocused] = React.useState(false);

  return React.createElement('div', {
    style: {
      position: 'relative', display: 'inline-flex', alignItems: 'center',
      width: '100%', ...style,
    },
  },
    icon && React.createElement('span', {
      style: {
        position: 'absolute', left: 10, color: 'var(--text-mute)',
        display: 'flex', alignItems: 'center', pointerEvents: 'none',
      },
    }, React.createElement(Icon, { name: icon, size: 12 })),
    React.createElement('input', {
      type, placeholder, value, onChange,
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      style: {
        width: '100%', height: s.height, padding: s.padding,
        paddingLeft: icon ? 30 : s.padding.split(' ')[1],
        fontSize: s.fontSize, fontFamily: 'var(--font-ui)',
        color: 'var(--text)', background: 'var(--surface)',
        border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: s.borderRadius, outline: 'none',
        boxShadow: focused ? 'var(--focus-ring)' : 'none',
        transition: 'border-color 0.12s, box-shadow 0.12s',
      },
    })
  );
}

export function SearchBar({ placeholder = 'Suchen…', value, onChange, width = 220, shortcut = '⌘K' }) {
  return React.createElement('div', {
    style: {
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '7px 12px', background: 'var(--surface)',
      border: '1px solid var(--border)', borderRadius: 8,
      fontSize: 12, color: 'var(--text-mute)', width,
      cursor: 'text',
    },
  },
    React.createElement(Icon, { name: 'search', size: 12 }),
    React.createElement('span', { style: { flex: 1 } }, value || placeholder),
    shortcut && React.createElement('span', {
      style: { fontFamily: 'var(--font-data)', fontSize: 10, color: 'var(--text-mute)' },
    }, shortcut)
  );
}
