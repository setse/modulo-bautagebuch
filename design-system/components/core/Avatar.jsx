// Modulo Stratum — Avatar / team member chip

export function Avatar({ name, initials, color = 'var(--accent)', size = 32, style }) {
  const init = initials || (name ? name.split(' ').map(w => w[0]).slice(0,2).join('') : '?');
  const fontSize = size < 28 ? 9 : size < 36 ? 11 : 13;
  return React.createElement('div', {
    title: name,
    style: {
      width: size, height: size, borderRadius: size / 2,
      background: color, color: '#fff', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize, fontWeight: 600, fontFamily: 'var(--font-ui)',
      userSelect: 'none', ...style,
    },
  }, init);
}

// Stacked avatar group
export function AvatarGroup({ members, size = 28, max = 4 }) {
  const visible = members.slice(0, max);
  const rest = members.length - max;
  return React.createElement('div', {
    style: { display: 'flex', alignItems: 'center' },
  },
    visible.map((m, i) =>
      React.createElement(Avatar, {
        key: m.id || i, name: m.name, initials: m.initials,
        color: m.color, size,
        style: { marginLeft: i ? -size * 0.35 : 0, border: '2px solid var(--surface)', boxSizing: 'content-box' },
      })
    ),
    rest > 0 && React.createElement('div', {
      style: {
        width: size, height: size, borderRadius: size / 2,
        background: 'var(--surface-2)', color: 'var(--text-mute)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 9, fontWeight: 600, fontFamily: 'var(--font-data)',
        marginLeft: -size * 0.35, border: '2px solid var(--surface)', boxSizing: 'content-box',
      },
    }, `+${rest}`)
  );
}
