// Modulo Stratum — Button component

export function Button({
  children,
  variant = 'primary',  // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = 'md',          // 'sm' | 'md' | 'lg'
  icon,                 // optional icon name (shown left of label)
  iconRight,            // optional icon name (shown right of label)
  disabled = false,
  onClick,
  style,
}) {
  const sizes = {
    sm: { padding: '5px 10px', fontSize: 11, gap: 5, iconSize: 11, borderRadius: 6 },
    md: { padding: '8px 16px', fontSize: 12, gap: 6, iconSize: 12, borderRadius: 8 },
    lg: { padding: '10px 20px', fontSize: 13, gap: 7, iconSize: 14, borderRadius: 8 },
  };
  const variants = {
    primary:   { background: 'var(--accent)', color: 'var(--surface)', border: 'none' },
    secondary: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' },
    ghost:     { background: 'transparent', color: 'var(--text-dim)', border: 'none' },
    danger:    { background: 'color-mix(in oklch, var(--neg) 12%, transparent)', color: 'var(--neg)', border: '1px solid color-mix(in oklch, var(--neg) 30%, transparent)' },
  };

  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  const [hovered, setHovered] = React.useState(false);

  const hoverStyle = hovered && !disabled ? {
    filter: variant === 'primary' ? 'brightness(0.92)' : 'brightness(0.96)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  } : {};

  return React.createElement('button', {
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: s.gap, padding: s.padding, fontSize: s.fontSize, fontWeight: 500,
      fontFamily: 'var(--font-ui)', borderRadius: s.borderRadius,
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
      transition: 'filter 0.12s, box-shadow 0.12s',
      lineHeight: 1, whiteSpace: 'nowrap',
      ...v, ...hoverStyle, ...style,
    },
  },
    icon && React.createElement(Icon, { name: icon, size: s.iconSize }),
    children,
    iconRight && React.createElement(Icon, { name: iconRight, size: s.iconSize })
  );
}
