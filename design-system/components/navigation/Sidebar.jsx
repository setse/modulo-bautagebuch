// Modulo Stratum — Navigation: Sidebar + items

export function Sidebar({ items = [], active, recentProjects = [], user, logoLabel = 'Modulo', logoSub }) {
  return React.createElement('div', {
    className: 'm-side',
    style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 4, height: '100%' },
  },
    // Logo area
    React.createElement('div', {
      style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '0 4px' },
    },
      React.createElement('div', {
        style: { width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
      },
        React.createElement(ModuloMark, { size: 16, color: 'var(--surface)' })
      ),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: 'var(--text)' } }, logoLabel),
        logoSub && React.createElement('div', { style: { fontSize: 10, color: 'var(--text-mute)' } }, logoSub)
      )
    ),

    // Section label
    React.createElement('div', {
      style: { fontFamily: 'var(--font-data)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-mute)', fontWeight: 500, padding: '8px 10px 4px' },
    }, 'Arbeitsbereich'),

    // Nav items
    items.map(({ label, icon }) => {
      const isActive = label === active;
      return React.createElement('div', {
        key: label,
        style: {
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
          background: isActive ? 'var(--surface)' : 'transparent', borderRadius: 6,
          fontSize: 13, color: isActive ? 'var(--text)' : 'var(--text-dim)',
          fontWeight: isActive ? 600 : 400, cursor: 'default',
          boxShadow: isActive ? 'var(--shadow-item)' : 'none',
        },
      },
        React.createElement(Icon, { name: icon, size: 14 }),
        React.createElement('span', null, label),
        isActive && React.createElement('span', {
          style: { marginLeft: 'auto', width: 4, height: 4, borderRadius: 2, background: 'var(--accent)' },
        })
      );
    }),

    // Recent projects
    recentProjects.length > 0 && React.createElement(React.Fragment, null,
      React.createElement('div', {
        style: { fontFamily: 'var(--font-data)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-mute)', fontWeight: 500, padding: '20px 10px 4px' },
      }, 'Letzte Projekte'),
      recentProjects.map(({ id, name }) =>
        React.createElement('div', {
          key: id,
          style: { display: 'flex', alignItems: 'baseline', gap: 8, padding: '6px 10px', borderRadius: 6, fontSize: 12 },
        },
          React.createElement('span', { style: { fontFamily: 'var(--font-data)', fontSize: 10, color: 'var(--text-mute)' } }, id),
          React.createElement('span', { style: { color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, name)
        )
      )
    ),

    // User footer
    user && React.createElement('div', {
      style: {
        marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10,
        padding: 10, background: 'var(--surface)', borderRadius: 8,
      },
    },
      React.createElement('div', {
        style: { width: 30, height: 30, borderRadius: 15, background: user.color || '#d97c4a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 },
      }, user.initials || user.name.split(' ').map(w => w[0]).join('')),
      React.createElement('div', { style: { flex: 1, minWidth: 0 } },
        React.createElement('div', { style: { fontSize: 12, fontWeight: 500, color: 'var(--text)' } }, user.name),
        React.createElement('div', { style: { fontSize: 10, color: 'var(--text-mute)' } }, user.role)
      ),
      React.createElement(Icon, { name: 'chevdown', size: 12 })
    )
  );
}
