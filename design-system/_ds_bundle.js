/* @ds-bundle: {"format":3,"namespace":"ModuloStratumDesignSystem_879962","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"StatusBadge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"ModuloMark","sourcePath":"components/core/Icon.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"SearchBar","sourcePath":"components/core/Input.jsx"},{"name":"DataViz","sourcePath":"components/data/DataViz.jsx"},{"name":"Donut","sourcePath":"components/data/DataViz.jsx"},{"name":"SollIstBar","sourcePath":"components/data/DataViz.jsx"},{"name":"Sparkline","sourcePath":"components/data/DataViz.jsx"},{"name":"MonthBars","sourcePath":"components/data/DataViz.jsx"},{"name":"KpiCard","sourcePath":"components/data/DataViz.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"82ffb8d1fdc5","components/core/Badge.jsx":"22d2e515eb71","components/core/Button.jsx":"b655be83b039","components/core/Card.jsx":"82cd39fe49e4","components/core/Icon.jsx":"678024dc401a","components/core/Input.jsx":"b114ce2125bb","components/data/DataViz.jsx":"08031ef2c849","components/navigation/Sidebar.jsx":"e927215526bd","extracted/js/0_942e9caf.jsx":"02dea5c1c1f4","extracted/js/10_7d35d784.jsx":"5e14d382f961","extracted/js/11_723871a7.jsx":"46f4936786ff","extracted/js/12_2ceecf03.jsx":"72a3821d8e13","extracted/js/13_6360b7a0.jsx":"d2dbfe604a41","extracted/js/14_bb58fff3.jsx":"c36a02cb098f","extracted/js/15_1cd42158.jsx":"9ec6a9c280dd","extracted/js/16_26742bc6.jsx":"c9eadbd3c559","extracted/js/17_90237563.jsx":"aae5b8ac196a","extracted/js/18_fee6c38e.jsx":"b658154b724a","extracted/js/19_6de7acc9.jsx":"e8de0e719e98","extracted/js/1_8b153bfe.jsx":"0b770ba3379b","extracted/js/20_3147d609.jsx":"90449e2cc680","extracted/js/2_b3b77a21.jsx":"536f070029b9","extracted/js/3_94e3e103.jsx":"3d7a621dc76d","extracted/js/4_98dece45.jsx":"09b0d373e2dd","extracted/js/5_3f1c7887.jsx":"801f647cf9a2","extracted/js/6_6dcf60de.jsx":"e38cf9e3fc0b","extracted/js/7_30a415ac.jsx":"3097f1b98a5c","extracted/js/8_abe1f3de.jsx":"fc2b0d987c92","extracted/js/9_59627a1e.jsx":"d7d4ff20f5d6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ModuloStratumDesignSystem_879962 = window.ModuloStratumDesignSystem_879962 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
// Modulo Stratum — Avatar / team member chip

function Avatar({
  name,
  initials,
  color = 'var(--accent)',
  size = 32,
  style
}) {
  const init = initials || (name ? name.split(' ').map(w => w[0]).slice(0, 2).join('') : '?');
  const fontSize = size < 28 ? 9 : size < 36 ? 11 : 13;
  return React.createElement('div', {
    title: name,
    style: {
      width: size,
      height: size,
      borderRadius: size / 2,
      background: color,
      color: '#fff',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize,
      fontWeight: 600,
      fontFamily: 'var(--font-ui)',
      userSelect: 'none',
      ...style
    }
  }, init);
}

// Stacked avatar group
function AvatarGroup({
  members,
  size = 28,
  max = 4
}) {
  const visible = members.slice(0, max);
  const rest = members.length - max;
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, visible.map((m, i) => React.createElement(Avatar, {
    key: m.id || i,
    name: m.name,
    initials: m.initials,
    color: m.color,
    size,
    style: {
      marginLeft: i ? -size * 0.35 : 0,
      border: '2px solid var(--surface)',
      boxSizing: 'content-box'
    }
  })), rest > 0 && React.createElement('div', {
    style: {
      width: size,
      height: size,
      borderRadius: size / 2,
      background: 'var(--surface-2)',
      color: 'var(--text-mute)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 9,
      fontWeight: 600,
      fontFamily: 'var(--font-data)',
      marginLeft: -size * 0.35,
      border: '2px solid var(--surface)',
      boxSizing: 'content-box'
    }
  }, `+${rest}`));
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
// Modulo Stratum — Badge / Tag / Pill

function Badge({
  children,
  tone = 'default',
  size = 'md',
  dot = false,
  style
}) {
  const tones = {
    default: {
      bg: 'var(--surface-2)',
      fg: 'var(--text-dim)',
      border: '1px solid var(--border-strong)'
    },
    accent: {
      bg: 'var(--accent-dim)',
      fg: 'var(--accent)',
      border: 'none'
    },
    pos: {
      bg: 'color-mix(in oklch, var(--pos)  18%, transparent)',
      fg: 'var(--pos)',
      border: 'none'
    },
    neg: {
      bg: 'color-mix(in oklch, var(--neg)  18%, transparent)',
      fg: 'var(--neg)',
      border: 'none'
    },
    warn: {
      bg: 'color-mix(in oklch, var(--warn) 18%, transparent)',
      fg: 'var(--warn)',
      border: 'none'
    },
    outline: {
      bg: 'transparent',
      fg: 'var(--text-dim)',
      border: '1px solid var(--border)'
    }
  };
  const sizes = {
    sm: {
      padding: '1px 6px',
      fontSize: 9,
      gap: 3
    },
    md: {
      padding: '2px 8px',
      fontSize: 10,
      gap: 4
    },
    lg: {
      padding: '3px 10px',
      fontSize: 11,
      gap: 5
    }
  };
  const t = tones[tone] || tones.default;
  const s = sizes[size] || sizes.md;
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: s.gap,
      padding: s.padding,
      borderRadius: 999,
      fontSize: s.fontSize,
      fontFamily: 'var(--font-data)',
      letterSpacing: '0.02em',
      background: t.bg,
      color: t.fg,
      border: t.border,
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      flexShrink: 0,
      ...style
    }
  }, dot && React.createElement('span', {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: t.fg,
      flexShrink: 0
    }
  }), children);
}

// Status badge for project status strings
function StatusBadge({
  status
}) {
  const map = {
    aktiv: {
      tone: 'pos',
      label: 'aktiv'
    },
    abschluss: {
      tone: 'accent',
      label: 'abschluss'
    },
    akquise: {
      tone: 'outline',
      label: 'akquise'
    },
    pause: {
      tone: 'warn',
      label: 'pause'
    },
    risiko: {
      tone: 'neg',
      label: 'risiko'
    }
  };
  const cfg = map[status] || {
    tone: 'default',
    label: status
  };
  return React.createElement(Badge, {
    tone: cfg.tone,
    dot: true
  }, cfg.label);
}
Object.assign(__ds_scope, { Badge, StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
// Modulo Stratum — Button component

function Button({
  children,
  variant = 'primary',
  // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = 'md',
  // 'sm' | 'md' | 'lg'
  icon,
  // optional icon name (shown left of label)
  iconRight,
  // optional icon name (shown right of label)
  disabled = false,
  onClick,
  style
}) {
  const sizes = {
    sm: {
      padding: '5px 10px',
      fontSize: 11,
      gap: 5,
      iconSize: 11,
      borderRadius: 6
    },
    md: {
      padding: '8px 16px',
      fontSize: 12,
      gap: 6,
      iconSize: 12,
      borderRadius: 8
    },
    lg: {
      padding: '10px 20px',
      fontSize: 13,
      gap: 7,
      iconSize: 14,
      borderRadius: 8
    }
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--surface)',
      border: 'none'
    },
    secondary: {
      background: 'var(--surface)',
      color: 'var(--text)',
      border: '1px solid var(--border)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-dim)',
      border: 'none'
    },
    danger: {
      background: 'color-mix(in oklch, var(--neg) 12%, transparent)',
      color: 'var(--neg)',
      border: '1px solid color-mix(in oklch, var(--neg) 30%, transparent)'
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hovered, setHovered] = React.useState(false);
  const hoverStyle = hovered && !disabled ? {
    filter: variant === 'primary' ? 'brightness(0.92)' : 'brightness(0.96)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  } : {};
  return React.createElement('button', {
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      padding: s.padding,
      fontSize: s.fontSize,
      fontWeight: 500,
      fontFamily: 'var(--font-ui)',
      borderRadius: s.borderRadius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'filter 0.12s, box-shadow 0.12s',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...v,
      ...hoverStyle,
      ...style
    }
  }, icon && React.createElement(Icon, {
    name: icon,
    size: s.iconSize
  }), children, iconRight && React.createElement(Icon, {
    name: iconRight,
    size: s.iconSize
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
// Modulo Stratum — Card container

function Card({
  children,
  padding = 18,
  header,
  headerAction,
  style
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 6,
      boxShadow: 'var(--shadow-card)',
      padding: header ? 0 : padding,
      overflow: 'hidden',
      ...style
    }
  }, header && React.createElement('div', {
    style: {
      padding: '14px 18px 10px',
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      borderBottom: '1px solid var(--border)'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text)'
    }
  }, header.title), header.subtitle && React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--text-mute)'
    }
  }, header.subtitle), React.createElement('div', {
    style: {
      flex: 1
    }
  }), headerAction), React.createElement('div', {
    style: {
      padding: header ? padding : 0
    }
  }, children));
}

// Section eyebrow label
function Eyebrow({
  children,
  style
}) {
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--font-data)',
      fontSize: 10,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-mute)',
      fontWeight: 500,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card, Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
// Modulo Stratum — Icon atom
// Inline SVG icons using path data from the app's icon vocabulary.
// All icons use stroke: currentColor, so they inherit surrounding text color.

function Icon({
  name,
  size = 14,
  stroke = 1.6
}) {
  const paths = {
    dashboard: 'M3 3h7v7H3zM14 3h7v4h-7zM14 11h7v10h-7zM3 14h7v7H3z',
    project: 'M3 6h18M3 12h18M3 18h12',
    clock: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
    euro: 'M18 6a8 8 0 1 0 0 12M3 10h10M3 14h10',
    invoice: 'M5 3h10l4 4v14H5zM15 3v4h4M8 12h8M8 16h5',
    team: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c.5-3 3-5 6-5s5.5 2 6 5M17 11a3 3 0 1 0 0-6M22 20c-.3-2-1.6-3.6-3.4-4.4',
    reports: 'M4 19V5M4 19h16M8 15v-5M12 15V8M16 15v-7',
    settings: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
    search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
    chevron: 'M9 6l6 6-6 6',
    chevdown: 'M6 9l6 6 6-6',
    chevup: 'M18 15l-6-6-6 6',
    plus: 'M12 5v14M5 12h14',
    play: 'M6 4l14 8-14 8V4z',
    pause: 'M6 5h4v14H6zM14 5h4v14h-4z',
    timer: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 1h6',
    folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    alert: 'M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
    download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
    filter: 'M3 4h18l-7 9v7l-4-2v-5z',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    list: 'M3 6h18M3 12h18M3 18h18',
    arrowup: 'M12 19V5M5 12l7-7 7 7',
    arrowdown: 'M12 5v14M5 12l7 7 7-7',
    arrowright: 'M5 12h14M13 5l7 7-7 7',
    arrowleft: 'M19 12H5M11 19l-7-7 7-7',
    check: 'M5 12l5 5L20 7',
    x: 'M6 6l12 12M18 6L6 18',
    drawing: 'M3 3h18v18H3zM3 9h18M9 3v18',
    calc: 'M5 3h14v18H5zM8 7h8M8 11h2M12 11h2M16 11h-.01M8 15h2M12 15h2M16 15h-.01M8 19h6',
    layers: 'M12 2 2 8l10 6 10-6zM2 14l10 6 10-6M2 11l10 6 10-6',
    dot: null,
    // handled specially
    calc2: 'M5 3h14v18H5z'
  };
  if (name === 'dot') {
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      style: {
        flexShrink: 0
      }
    }, React.createElement('circle', {
      cx: 12,
      cy: 12,
      r: 3,
      fill: 'currentColor'
    }));
  }
  const d = paths[name] || 'M0 0h0';
  return React.createElement('svg', {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: {
      flexShrink: 0
    }
  }, React.createElement('path', {
    d
  }));
}

// Modulo brand mark — 2×2 grid of rectangles.
function ModuloMark({
  size = 16,
  color = 'currentColor'
}) {
  return React.createElement('svg', {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none'
  }, React.createElement('rect', {
    x: 2,
    y: 2,
    width: 9,
    height: 9,
    fill: color
  }), React.createElement('rect', {
    x: 13,
    y: 2,
    width: 9,
    height: 9,
    stroke: color,
    strokeWidth: 2
  }), React.createElement('rect', {
    x: 2,
    y: 13,
    width: 9,
    height: 9,
    stroke: color,
    strokeWidth: 2
  }), React.createElement('rect', {
    x: 13,
    y: 13,
    width: 9,
    height: 9,
    fill: color,
    opacity: 0.4
  }));
}
Object.assign(__ds_scope, { Icon, ModuloMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
// Modulo Stratum — Input / Search field

function Input({
  placeholder,
  value,
  onChange,
  icon,
  type = 'text',
  size = 'md',
  style
}) {
  const sizes = {
    sm: {
      padding: '5px 10px',
      fontSize: 11,
      borderRadius: 6,
      height: 28
    },
    md: {
      padding: '7px 12px',
      fontSize: 12,
      borderRadius: 8,
      height: 34
    },
    lg: {
      padding: '9px 14px',
      fontSize: 13,
      borderRadius: 8,
      height: 40
    }
  };
  const s = sizes[size] || sizes.md;
  const [focused, setFocused] = React.useState(false);
  return React.createElement('div', {
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: '100%',
      ...style
    }
  }, icon && React.createElement('span', {
    style: {
      position: 'absolute',
      left: 10,
      color: 'var(--text-mute)',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none'
    }
  }, React.createElement(Icon, {
    name: icon,
    size: 12
  })), React.createElement('input', {
    type,
    placeholder,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      height: s.height,
      padding: s.padding,
      paddingLeft: icon ? 30 : s.padding.split(' ')[1],
      fontSize: s.fontSize,
      fontFamily: 'var(--font-ui)',
      color: 'var(--text)',
      background: 'var(--surface)',
      border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: s.borderRadius,
      outline: 'none',
      boxShadow: focused ? 'var(--focus-ring)' : 'none',
      transition: 'border-color 0.12s, box-shadow 0.12s'
    }
  }));
}
function SearchBar({
  placeholder = 'Suchen…',
  value,
  onChange,
  width = 220,
  shortcut = '⌘K'
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 12px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      fontSize: 12,
      color: 'var(--text-mute)',
      width,
      cursor: 'text'
    }
  }, React.createElement(Icon, {
    name: 'search',
    size: 12
  }), React.createElement('span', {
    style: {
      flex: 1
    }
  }, value || placeholder), shortcut && React.createElement('span', {
    style: {
      fontFamily: 'var(--font-data)',
      fontSize: 10,
      color: 'var(--text-mute)'
    }
  }, shortcut));
}
Object.assign(__ds_scope, { Input, SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/data/DataViz.jsx
try { (() => {
// Modulo Stratum — Data visualization atoms
// Individual components are exported below; DataViz is a namespace alias.
const DataViz = {}; // namespace placeholder — use named exports directly

// Donut chart — single percentage ring
function Donut({
  pct,
  size = 64,
  stroke = 8,
  color = 'var(--accent)',
  track = 'var(--surface-3)',
  children
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return React.createElement('div', {
    style: {
      position: 'relative',
      width: size,
      height: size
    }
  }, React.createElement('svg', {
    width: size,
    height: size
  }, React.createElement('circle', {
    cx: size / 2,
    cy: size / 2,
    r,
    stroke: track,
    strokeWidth: stroke,
    fill: 'none'
  }), React.createElement('circle', {
    cx: size / 2,
    cy: size / 2,
    r,
    stroke: color,
    strokeWidth: stroke,
    fill: 'none',
    strokeDasharray: c,
    strokeDashoffset: c * (1 - Math.max(0, Math.min(1, pct))),
    transform: `rotate(-90 ${size / 2} ${size / 2})`,
    strokeLinecap: 'butt'
  })), React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, children));
}

// Soll/Ist bar — horizontal progress bar showing planned vs actual hours
function SollIstBar({
  ist,
  soll,
  w = 140,
  h = 6
}) {
  const pct = soll > 0 ? Math.min(1.5, ist / soll) : 0;
  const color = pct > 1.05 ? 'var(--neg)' : pct < 0.85 ? 'var(--accent)' : 'var(--pos)';
  const barW = Math.min(pct, 1) * w;
  const overW = pct > 1 ? Math.min(pct - 1, 0.5) * w : 0;
  return React.createElement('div', {
    style: {
      position: 'relative',
      width: w,
      height: h,
      background: 'var(--surface-3)',
      borderRadius: 1
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: h,
      width: barW,
      background: color,
      borderRadius: 1
    }
  }), overW > 0 && React.createElement('div', {
    style: {
      position: 'absolute',
      left: barW,
      top: 0,
      height: h,
      width: overW,
      background: 'var(--neg)',
      opacity: 0.6,
      borderRadius: 1
    }
  }), React.createElement('div', {
    style: {
      position: 'absolute',
      left: w,
      top: -2,
      height: h + 4,
      width: 1,
      background: 'var(--text-dim)'
    }
  }));
}

// Sparkline — inline SVG polyline from number array
function Sparkline({
  data,
  w = 80,
  h = 22,
  stroke = 'currentColor',
  strokeWidth = 1.4
}) {
  if (!data || !data.length) return null;
  const min = Math.min(...data),
    max = Math.max(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, h - (v - min) / range * (h - 2) - 1]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return React.createElement('svg', {
    width: w,
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    style: {
      display: 'block'
    }
  }, React.createElement('path', {
    d,
    fill: 'none',
    stroke,
    strokeWidth,
    strokeLinejoin: 'round',
    strokeLinecap: 'round'
  }));
}

// Monthly bar chart for hours/revenue series
function MonthBars({
  data,
  w = 380,
  h = 100,
  accent = 'var(--accent)'
}) {
  const max = Math.max(...data.map(d => Math.max(d.ist || 0, d.plan || 0)));
  const bw = w / data.length;
  return React.createElement('svg', {
    width: w,
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    style: {
      display: 'block'
    }
  }, data.map((d, i) => {
    const x = i * bw + 2;
    const istH = max > 0 ? d.ist / max * (h - 18) : 0;
    const planH = max > 0 ? d.plan / max * (h - 18) : 0;
    return React.createElement('g', {
      key: i
    }, React.createElement('line', {
      x1: x,
      x2: x + bw - 4,
      y1: h - 14 - planH,
      y2: h - 14 - planH,
      stroke: 'var(--text-mute)',
      strokeDasharray: '2 2',
      strokeWidth: 1
    }), React.createElement('rect', {
      x: x + 2,
      y: h - 14 - istH,
      width: bw - 8,
      height: istH,
      fill: d.future ? 'var(--surface-3)' : accent,
      opacity: d.future ? 0.4 : 0.85
    }), React.createElement('text', {
      x: x + bw / 2 - 2,
      y: h - 3,
      fontSize: 9,
      fill: 'var(--text-mute)',
      textAnchor: 'middle',
      fontFamily: 'var(--font-data)'
    }, d.m));
  }));
}

// KPI card — eyebrow + big number + subline + optional delta badge
function KpiCard({
  eyebrow,
  value,
  sub,
  delta,
  deltaUp,
  style
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 6,
      boxShadow: 'var(--shadow-card)',
      padding: 14,
      ...style
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-data)',
      fontSize: 10,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-mute)',
      fontWeight: 500
    }
  }, eyebrow), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-data)',
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: '-0.4px',
      marginTop: 4,
      color: 'var(--text)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 6,
      alignItems: 'center'
    }
  }, sub && React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--text-mute)'
    }
  }, sub), delta && React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      padding: '2px 7px',
      borderRadius: 999,
      fontSize: 9,
      fontFamily: 'var(--font-data)',
      letterSpacing: '0.02em',
      background: deltaUp ? 'color-mix(in oklch, var(--pos) 18%, transparent)' : 'color-mix(in oklch, var(--warn) 18%, transparent)',
      color: deltaUp ? 'var(--pos)' : 'var(--warn)'
    }
  }, delta)));
}
Object.assign(__ds_scope, { DataViz, Donut, SollIstBar, Sparkline, MonthBars, KpiCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataViz.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
// Modulo Stratum — Navigation: Sidebar + items

function Sidebar({
  items = [],
  active,
  recentProjects = [],
  user,
  logoLabel = 'Modulo',
  logoSub
}) {
  return React.createElement('div', {
    className: 'm-side',
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      height: '100%'
    }
  },
  // Logo area
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 20,
      padding: '0 4px'
    }
  }, React.createElement('div', {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement(ModuloMark, {
    size: 16,
    color: 'var(--surface)'
  })), React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text)'
    }
  }, logoLabel), logoSub && React.createElement('div', {
    style: {
      fontSize: 10,
      color: 'var(--text-mute)'
    }
  }, logoSub))),
  // Section label
  React.createElement('div', {
    style: {
      fontFamily: 'var(--font-data)',
      fontSize: 10,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-mute)',
      fontWeight: 500,
      padding: '8px 10px 4px'
    }
  }, 'Arbeitsbereich'),
  // Nav items
  items.map(({
    label,
    icon
  }) => {
    const isActive = label === active;
    return React.createElement('div', {
      key: label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 10px',
        background: isActive ? 'var(--surface)' : 'transparent',
        borderRadius: 6,
        fontSize: 13,
        color: isActive ? 'var(--text)' : 'var(--text-dim)',
        fontWeight: isActive ? 600 : 400,
        cursor: 'default',
        boxShadow: isActive ? 'var(--shadow-item)' : 'none'
      }
    }, React.createElement(Icon, {
      name: icon,
      size: 14
    }), React.createElement('span', null, label), isActive && React.createElement('span', {
      style: {
        marginLeft: 'auto',
        width: 4,
        height: 4,
        borderRadius: 2,
        background: 'var(--accent)'
      }
    }));
  }),
  // Recent projects
  recentProjects.length > 0 && React.createElement(React.Fragment, null, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-data)',
      fontSize: 10,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-mute)',
      fontWeight: 500,
      padding: '20px 10px 4px'
    }
  }, 'Letzte Projekte'), recentProjects.map(({
    id,
    name
  }) => React.createElement('div', {
    key: id,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      padding: '6px 10px',
      borderRadius: 6,
      fontSize: 12
    }
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-data)',
      fontSize: 10,
      color: 'var(--text-mute)'
    }
  }, id), React.createElement('span', {
    style: {
      color: 'var(--text-dim)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, name)))),
  // User footer
  user && React.createElement('div', {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: 10,
      background: 'var(--surface)',
      borderRadius: 8
    }
  }, React.createElement('div', {
    style: {
      width: 30,
      height: 30,
      borderRadius: 15,
      background: user.color || '#d97c4a',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 600
    }
  }, user.initials || user.name.split(' ').map(w => w[0]).join('')), React.createElement('div', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement('div', {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--text)'
    }
  }, user.name), React.createElement('div', {
    style: {
      fontSize: 10,
      color: 'var(--text-mute)'
    }
  }, user.role)), React.createElement(Icon, {
    name: 'chevdown',
    size: 12
  })));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// extracted/js/0_942e9caf.jsx
try { (() => {
// Dashboard E — STRATUM
// Warm cream background, layered rounded cards, sage accent.
// Calm hierarchy: hero card (left), supporting cards stacked (right).

// NB: SCard is provided by stratum/shell.jsx — do not redefine here.

const DashboardStratum = () => {
  const d = window.ModuloData;
  return /*#__PURE__*/React.createElement("div", {
    className: "m-app theme-stratum dens-comfy",
    style: {
      width: 1280,
      height: 800,
      display: 'grid',
      gridTemplateColumns: '230px 1fr',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(StratumSidebar, {
    active: "\xDCbersicht"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 28px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: -0.5
    }
  }, "Guten Morgen, Maria"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 12,
      marginTop: 2
    }
  }, "Gesch\xE4ftsjahr 2026 \xB7 KW 43 \xB7 Mittwoch, 25.10.2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 12px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      fontSize: 12,
      color: 'var(--text-mute)',
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 12
  }), /*#__PURE__*/React.createElement("span", null, "Projekte, Rechnungen suchen\u2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-data)',
      fontSize: 10
    }
  }, "\u2318K")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px',
      borderRadius: 8,
      background: 'var(--accent)',
      color: 'var(--surface)',
      fontSize: 12,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 12
  }), " Zeit erfassen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 16,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 22
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Donut, {
    pct: 0.784,
    size: 88,
    stroke: 10,
    color: "var(--accent)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1
    }
  }, "78%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Honorar-Umsatz \xB7 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 30,
      fontWeight: 600,
      letterSpacing: -0.8
    }
  }, "1,84 Mio. \u20AC"), /*#__PURE__*/React.createElement("div", {
    className: "m-pill m-pill-pos"
  }, "\u2191 12,4 % vs. VJ")), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 12,
      marginTop: 4
    }
  }, "Jahresplan ", d.fmtEur(d.kpis.umsatzPlan), " \xB7 Forecast ", d.fmtEur(2_280_000), " (97 %)"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(MonthBars, {
    data: d.monatsstunden,
    w: 400,
    h: 64,
    accent: "var(--accent)"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 12
    }
  }, [{
    eyebrow: 'Deckungsbeitrag',
    value: '34,2 %',
    sub: 'Ziel 32 %',
    delta: '+2,0 Pp',
    up: true
  }, {
    eyebrow: 'Auslastung',
    value: '86 %',
    sub: '268 / 312 h',
    delta: '+4 Pp',
    up: true
  }, {
    eyebrow: 'Offene Forderungen',
    value: '312k €',
    sub: 'DSO 38 T',
    delta: '48k > 30T',
    up: false
  }].map((k, i) => /*#__PURE__*/React.createElement(SCard, {
    key: i,
    padding: 14
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, k.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: -0.4,
      marginTop: 4
    }
  }, k.value), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, k.sub), /*#__PURE__*/React.createElement("div", {
    className: 'm-pill ' + (k.up ? 'm-pill-pos' : 'm-pill-warn'),
    style: {
      fontSize: 9
    }
  }, k.delta))))), /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      flex: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 18px 10px',
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Aktive Projekte"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, d.projects.length), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-pill",
    style: {
      background: 'var(--surface-2)'
    }
  }, "Alle"), /*#__PURE__*/React.createElement("span", {
    className: "m-pill"
  }, "Risiko"), /*#__PURE__*/React.createElement("span", {
    className: "m-pill"
  }, "Akquise"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'hidden'
    }
  }, d.projects.slice(0, 5).map(p => {
    const pct = p.progress.reduce((s, v) => s + v, 0) / 900;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        display: 'grid',
        gridTemplateColumns: '40px 1fr 110px 110px 70px',
        gap: 12,
        padding: '12px 18px',
        borderBottom: '1px solid var(--border)',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 8,
        background: 'var(--surface-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: p.umbau ? 'layers' : 'drawing',
      size: 16
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 500
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 11,
        marginTop: 1
      }
    }, p.id, " \xB7 ", p.client)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "m-eyebrow",
      style: {
        fontSize: 9
      }
    }, "LP ", p.phase, "/9"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 2,
        marginTop: 4
      }
    }, p.progress.map((v, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: 8,
        height: 8,
        borderRadius: 2,
        background: v === 100 ? 'var(--accent)' : v > 0 ? 'color-mix(in oklch, var(--accent) 50%, var(--surface-2))' : 'var(--surface-2)'
      }
    })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SollIstBar, {
      ist: p.hours,
      soll: p.planned * Math.max(0.05, pct),
      w: 100
    }), /*#__PURE__*/React.createElement("div", {
      className: "m-mute m-num",
      style: {
        fontSize: 10,
        marginTop: 3
      }
    }, p.hours, "/", Math.round(p.planned * pct), " h")), /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontSize: 13,
        textAlign: 'right',
        fontWeight: 500
      }
    }, d.fmtEur(p.fee / 1000), "k"));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Mein Tag"), /*#__PURE__*/React.createElement("div", {
    className: "m-num m-mute",
    style: {
      fontSize: 11
    }
  }, "Mi \xB7 25.10.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: -0.6
    }
  }, "8,25"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 13
    }
  }, "/ 8,0 h erfasst")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      height: 6,
      background: 'var(--surface-2)',
      borderRadius: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '103%',
      height: '100%',
      background: 'var(--accent)',
      borderRadius: 3,
      maxWidth: '100%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, d.heute.slice(0, 4).map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '70px 1fr 40px',
      alignItems: 'center',
      gap: 8,
      padding: '8px 0',
      borderTop: i ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, h.time), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--accent)'
    }
  }, h.project), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 11
    }
  }, h.phase)), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 12,
      textAlign: 'right'
    }
  }, h.h.toFixed(2))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      paddingTop: 10,
      borderTop: '1px solid var(--border)',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '8px 12px',
      textAlign: 'center',
      background: 'var(--accent)',
      color: 'var(--surface)',
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 500,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 11
  }), " Timer starten"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 12px',
      background: 'var(--surface-2)',
      borderRadius: 6,
      fontSize: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 11
  }), " Manuell"))), /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Aufmerksamkeit"), /*#__PURE__*/React.createElement("div", {
    className: "m-pill m-pill-warn",
    style: {
      fontSize: 10
    }
  }, d.risiken.length, " offen")), d.risiken.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      padding: '10px 0',
      borderTop: i ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 4,
      alignSelf: 'stretch',
      borderRadius: 2,
      background: r.severity === 'hoch' ? 'var(--neg)' : 'var(--warn)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'baseline',
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 10,
      fontWeight: 600
    }
  }, r.proj), /*#__PURE__*/React.createElement("span", {
    className: "m-eyebrow",
    style: {
      fontSize: 9,
      color: r.severity === 'hoch' ? 'var(--neg)' : 'var(--warn)'
    }
  }, r.severity)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      lineHeight: 1.4
    }
  }, r.label))))), /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 10
    }
  }, "Honorar-Status"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [['Abgerechnet & gezahlt', 2_491_900, 'var(--pos)', 0.55], ['Offen ≤ 30 Tage', 264_600, 'var(--accent)', 0.06], ['Überfällig > 30 Tage', 48_200, 'var(--neg)', 0.01], ['Noch nicht abgerufen', 1_810_400, 'var(--text-mute)', 0.38]].map(([k, v, c, p]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 80px',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11
    }
  }, k)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      height: 4,
      background: 'var(--surface-2)',
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: p * 100 + '%',
      height: '100%',
      background: c,
      borderRadius: 2
    }
  }))), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 12,
      textAlign: 'right',
      color: c,
      fontWeight: 500
    }
  }, d.fmtEur(v / 1000), "k")))))))));
};
Object.assign(window, {
  DashboardStratum
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/0_942e9caf.jsx", error: String((e && e.message) || e) }); }

// extracted/js/10_7d35d784.jsx
try { (() => {
// Stratum — Mitarbeiter · Team & Wer ist online
// Read-only roster. No rates, no utilization. Focus on contact + presence + current activity.

const EmpTeamPage = () => {
  const team = EMP_TEAM;
  const online = team.filter(t => t.status === 'online');
  const busy = team.filter(t => t.status === 'busy');
  const away = team.filter(t => t.status === 'away');
  const off = team.filter(t => t.status === 'vacation' || t.status === 'sick');
  const statusLabel = {
    online: 'verfügbar',
    busy: 'beschäftigt',
    away: 'kurz weg',
    vacation: 'im Urlaub',
    sick: 'krank',
    offline: 'offline'
  };
  return /*#__PURE__*/React.createElement(EmpPage, {
    active: "Team"
  }, /*#__PURE__*/React.createElement(EmpHeader, {
    title: "Team",
    subtitle: `${team.length} Kolleg:innen · ${online.length + busy.length + away.length} jetzt erreichbar · ${off.length} abwesend`,
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }), " Nachricht"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "filter",
      size: 12
    }), " Filter")
  }), /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Jetzt im B\xFCro \xB7 14:35"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "Live-Status \xB7 letzte Aktualisierung gerade eben"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      fontSize: 11
    }
  }, [['online', online.length], ['busy', busy.length], ['away', away.length], ['vacation', off.filter(t => t.status === 'vacation').length], ['sick', off.filter(t => t.status === 'sick').length]].map(([s, n]) => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(PresenceDot, {
    status: s,
    size: 8,
    border: "var(--surface)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute"
  }, n), /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 10
    }
  }, statusLabel[s]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 10
    }
  }, team.map(p => {
    const dimmed = p.status === 'vacation' || p.status === 'sick' || p.status === 'offline';
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        background: p.self ? 'var(--accent-dim)' : 'transparent',
        opacity: dimmed ? 0.5 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 46,
        height: 46,
        borderRadius: 23,
        background: p.color,
        color: '#fff',
        fontSize: 14,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, p.name.split(' ').map(n => n[0]).join('')), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: -2,
        bottom: -2
      }
    }, /*#__PURE__*/React.createElement(PresenceDot, {
      status: p.status,
      size: 12,
      border: "var(--surface)"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        textAlign: 'center',
        lineHeight: 1.2
      }
    }, p.name.replace(/(\w)\w+\s/, '$1. ')), /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 9,
        marginTop: 1
      }
    }, statusLabel[p.status]));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 14,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Alle Kolleg:innen"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "Direktkontakt \xB7 was l\xE4uft gerade"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      background: 'var(--surface-2)',
      borderRadius: 6,
      fontSize: 11,
      color: 'var(--text-mute)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 11
  }), "Name oder Projekt\u2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, team.map(p => {
    const dimmed = p.status === 'vacation' || p.status === 'sick';
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        display: 'grid',
        gridTemplateColumns: '50px 1.4fr 1fr 60px',
        gap: 12,
        padding: '14px 18px',
        alignItems: 'center',
        borderBottom: '1px solid var(--border)',
        background: p.self ? 'color-mix(in oklch, var(--accent) 5%, var(--surface))' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 20,
        background: p.color,
        color: '#fff',
        fontSize: 12,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: dimmed ? 0.55 : 1
      }
    }, p.name.split(' ').map(n => n[0]).join('')), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: -1,
        bottom: -1
      }
    }, /*#__PURE__*/React.createElement(PresenceDot, {
      status: p.status,
      size: 11,
      border: "var(--surface)"
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'baseline',
        gap: 6
      }
    }, p.name, p.self && /*#__PURE__*/React.createElement("span", {
      className: "m-eyebrow",
      style: {
        fontSize: 8,
        color: 'var(--accent)'
      }
    }, "DU")), /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 11,
        marginTop: 1
      }
    }, p.role)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "m-eyebrow",
      style: {
        fontSize: 9
      }
    }, p.status === 'vacation' ? 'ABWESEND' : p.status === 'sick' ? 'KRANK' : p.status === 'busy' ? 'GERADE' : p.status === 'away' ? 'KURZ WEG' : 'AKTIV'), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        marginTop: 2,
        color: dimmed ? 'var(--text-mute)' : 'var(--text)'
      }
    }, p.activity), p.ort && p.ort !== '—' && /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 10,
        marginTop: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 4,
        height: 4,
        borderRadius: 2,
        background: 'var(--text-mute)'
      }
    }), p.ort, p.bis ? ` · bis ${p.bis}` : '')), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4,
        justifyContent: 'flex-end'
      }
    }, !dimmed && !p.self && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      title: "Nachricht",
      style: {
        width: 26,
        height: 26,
        borderRadius: 13,
        background: 'var(--surface-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--text-dim)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "invoice",
      size: 11
    })), /*#__PURE__*/React.createElement("div", {
      title: "Anrufen",
      style: {
        width: 26,
        height: 26,
        borderRadius: 13,
        background: 'var(--surface-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--text-dim)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 11
    })))));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Heute auf Baustelle"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [{
    who: 'M. Hofer',
    ort: 'BÜR-118 · Stuttgart',
    sub: 'Bauherrentermin · zurück 17:30',
    c: '#d97c4a'
  }, {
    who: 'A. Renner',
    ort: 'GEW-441 · Riem',
    sub: 'remote · Abnahmebericht',
    c: '#7a9e6e'
  }, {
    who: 'L. Vogel',
    ort: 'KIT-077 · Augsburg',
    sub: 'morgen vor Ort',
    c: '#6c7bb8'
  }].map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '24px 1fr',
      gap: 10,
      padding: '6px 0',
      alignItems: 'flex-start',
      borderTop: i ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 12,
      background: p.c,
      color: '#fff',
      fontSize: 9,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, p.who.split(' ').map(n => n[0]).join('')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500
    }
  }, p.who, " \xB7 ", p.ort), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10,
      marginTop: 1
    }
  }, p.sub)))))), /*#__PURE__*/React.createElement(SCard, {
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Geburtstage"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [{
    who: 'Tobias Burr',
    d: '02.11.',
    sub: 'in 8 Tagen',
    soon: true
  }, {
    who: 'Maria Hofer',
    d: '18.11.',
    sub: 'in 24 Tagen'
  }, {
    who: 'Elif Çelik',
    d: '03.12.',
    sub: 'in 39 Tagen'
  }].map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 11,
      width: 44
    }
  }, b.d), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      flex: 1,
      fontWeight: b.soon ? 600 : 400
    }
  }, b.who), /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 10
    }
  }, b.sub))))), /*#__PURE__*/React.createElement(SCard, {
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      marginBottom: 8
    }
  }, "Mein Team-Beitrag \xB7 KW 43"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginBottom: 8,
      color: 'var(--text-dim)'
    }
  }, "Du hast diese Woche an ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text)'
    }
  }, "2 Projekten"), " mit", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text)'
    }
  }, " 4 Kolleg:innen "), "zusammengearbeitet."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, [{
    c: '#d97c4a',
    n: 'MH',
    proj: 'BÜR-118 · SAN-302'
  }, {
    c: '#5fa3a8',
    n: 'EC',
    proj: 'BÜR-118'
  }, {
    c: '#9a7eb5',
    n: 'JK',
    proj: 'BÜR-118'
  }, {
    c: '#6c7bb8',
    n: 'LV',
    proj: 'SAN-302'
  }].map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 30,
      height: 30,
      borderRadius: 15,
      background: m.c,
      color: '#fff',
      fontSize: 10,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: i ? -4 : 0,
      border: '2px solid var(--surface)'
    }
  }, m.n)))))));
};
Object.assign(window, {
  EmpTeamPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/10_7d35d784.jsx", error: String((e && e.message) || e) }); }

// extracted/js/11_723871a7.jsx
try { (() => {
// Stratum — Mitarbeiter · Zeiterfassung
// Own time entries only. Timer, today's entries, week calendar, week submission.

const EmpZeit = () => {
  const days = ['Mo 21.10.', 'Di 22.10.', 'Mi 23.10.', 'Do 24.10.', 'Fr 25.10.'];
  const hours = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17'];

  // Sophia's own week (Teilzeit 32h, freier Freitag-Nachmittag)
  // {d, s (start h-offset from 8), l (length h), proj, ph, c, label}
  const blocks = [
  // Mo
  {
    d: 0,
    s: 0.5,
    l: 2.0,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'LV Trockenbau · Vorbereitung'
  }, {
    d: 0,
    s: 2.75,
    l: 1.5,
    proj: 'SAN-302',
    ph: 'LP4',
    c: '#b89065',
    label: 'Bauantrag · Schriftverkehr'
  }, {
    d: 0,
    s: 5.0,
    l: 3.0,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'Detail Fassadenanschluss'
  },
  // Di
  {
    d: 1,
    s: 0.25,
    l: 1.5,
    proj: 'INT',
    ph: '—',
    c: '#a8a8a8',
    label: 'Team-Jour-Fixe'
  }, {
    d: 1,
    s: 2.0,
    l: 2.5,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'LV Trockenbau · Pos 3.10–3.39'
  }, {
    d: 1,
    s: 5.0,
    l: 2.75,
    proj: 'SAN-302',
    ph: 'LP4',
    c: '#b89065',
    label: 'Stellungnahme Denkmalschutz'
  },
  // Mi (heute)
  {
    d: 2,
    s: 0.5,
    l: 1.5,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'Detail Pfosten-Riegel F-12'
  }, {
    d: 2,
    s: 2.25,
    l: 1.75,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'LV Trockenbau · 3.40–3.78'
  }, {
    d: 2,
    s: 5.0,
    l: 1.5,
    proj: 'SAN-302',
    ph: 'LP4',
    c: '#b89065',
    label: 'Stellungnahme · Vorbereitung'
  },
  // Do (geplant, leicht)
  {
    d: 3,
    s: 1.0,
    l: 4.0,
    proj: 'INT',
    ph: 'WB',
    c: '#a8a8a8',
    label: 'Schulung Revit 2026',
    planned: true
  }, {
    d: 3,
    s: 6.0,
    l: 2.0,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'Knoten F-13 · Werkplanung',
    planned: true
  }
  // Fr Vormittag (Brückentag-Urlaub geplant — gar keine Blöcke)
  ];

  // Heute laufender Timer (Mi · 12:20 startend, 02:15 jetzt)
  const liveStart = 4.33; // 12:20 → 4.33 h ab 08:00
  const liveLen = 2.25;
  const daySum = days.map((_, di) => blocks.filter(b => b.d === di && !b.planned).reduce((s, b) => s + b.l, 0) + (di === 2 ? liveLen : 0));
  const dayPlan = [6.4, 6.4, 6.4, 6.4, 6.4]; // 32h / 5
  const weekTotal = daySum.reduce((s, v) => s + v, 0);
  const weekPlan = EMP_USER.weekly;

  // Block colors map for legend
  const projLegend = [{
    id: 'BÜR-118',
    name: 'Bürohaus Stadtkrone',
    c: '#5fa3a8'
  }, {
    id: 'SAN-302',
    name: 'Sanierung Maxvorstadt',
    c: '#b89065'
  }, {
    id: 'INT',
    name: 'Intern · Schulung',
    c: '#a8a8a8'
  }];
  return /*#__PURE__*/React.createElement(EmpPage, {
    active: "Zeiterfassung"
  }, /*#__PURE__*/React.createElement(EmpHeader, {
    title: "Zeiterfassung",
    subtitle: `KW 43 · 21.–25. Oktober 2026 · ${EMP_USER.name}`,
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }), " Eintrag"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 12
    }), " Export")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 18,
    style: {
      background: 'var(--surface)',
      border: '1.5px solid var(--accent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      color: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: 'var(--accent)',
      animation: 'mp-pulse 1.6s infinite',
      display: 'inline-block'
    }
  }), "L\xC4UFT \xB7 seit 12:20"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      marginTop: 6
    }
  }, "B\xDCR-118 \xB7 B\xFCrohaus Stadtkrone"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 12,
      marginTop: 2
    }
  }, "Leistungsphase 6 \xB7 Vorbereitung der Vergabe")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 36,
      fontWeight: 600,
      letterSpacing: -1,
      color: 'var(--accent)'
    }
  }, "02:15:42"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 6,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 16,
      background: 'var(--accent)',
      color: 'var(--surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pause",
    size: 12
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 16,
      background: 'var(--surface-2)',
      color: 'var(--text-dim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14,
    stroke: 2.4
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 16,
      background: 'var(--surface-2)',
      color: 'var(--text-dim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 12
  })))))), /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Heute \xB7 Mi 25.10."), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: -0.5,
      marginTop: 4
    }
  }, daySum[2].toFixed(2), " ", /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 14
    }
  }, "/ 6,4 h")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      height: 5,
      background: 'var(--surface-2)',
      borderRadius: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${Math.min(daySum[2] / 6.4 * 100, 100)}%`,
      height: '100%',
      background: 'var(--accent)',
      borderRadius: 3
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 4
    }
  }, "inkl. laufender Timer \xB7 100 % verrechenbar")), /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Woche \xB7 KW 43"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: -0.5,
      marginTop: 4
    }
  }, weekTotal.toFixed(2), " ", /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 14
    }
  }, "/ ", weekPlan, ",0 h")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: 'flex',
      gap: 4,
      alignItems: 'flex-end',
      height: 22
    }
  }, daySum.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: 22,
      background: 'var(--surface-2)',
      borderRadius: 2,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: `${s / 8 * 100}%`,
      background: i === 4 ? 'color-mix(in oklch, var(--accent) 35%, var(--surface-2))' : 'var(--accent)',
      borderRadius: 2,
      opacity: 0.9
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 4,
      fontSize: 9,
      color: 'var(--text-mute)',
      fontFamily: 'var(--font-data)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Mo"), /*#__PURE__*/React.createElement("span", null, "Di"), /*#__PURE__*/React.createElement("span", null, "Mi"), /*#__PURE__*/React.createElement("span", null, "Do"), /*#__PURE__*/React.createElement("span", null, "Fr")))), /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      flex: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Wochenkalender"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "Eigene Eintr\xE4ge \xB7 Fr Br\xFCckentag geplant"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 10px',
      borderRadius: 4,
      background: 'var(--surface-2)',
      fontSize: 11,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowright",
    size: 10,
    stroke: 2,
    style: {
      transform: 'scaleX(-1)'
    }
  }), " KW 42"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 10px',
      borderRadius: 4,
      background: 'var(--accent-dim)',
      color: 'var(--accent)',
      fontSize: 11,
      fontWeight: 600
    }
  }, "KW 43"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 10px',
      borderRadius: 4,
      background: 'var(--surface-2)',
      fontSize: 11,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, "KW 44 ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrowright",
    size: 10,
    stroke: 2
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 16,
      display: 'grid',
      gridTemplateColumns: '38px repeat(5, 1fr)',
      gridTemplateRows: '26px 1fr',
      gap: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", null), days.map((day, i) => /*#__PURE__*/React.createElement("div", {
    key: day,
    style: {
      padding: '0 8px',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      borderLeft: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: i === 2 ? 'var(--accent)' : 'var(--text)'
    }
  }, day), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10,
      marginLeft: 'auto'
    }
  }, daySum[i].toFixed(1), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.6
    }
  }, "/ ", dayPlan[i])))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderTop: '1px solid var(--border)'
    }
  }, hours.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      position: 'absolute',
      top: `${i / 9 * 100}%`,
      transform: 'translateY(-50%)',
      right: 4,
      fontSize: 9,
      color: 'var(--text-mute)',
      fontFamily: 'var(--font-data)'
    }
  }, h))), days.map((_, di) => /*#__PURE__*/React.createElement("div", {
    key: di,
    style: {
      position: 'relative',
      borderLeft: '1px solid var(--border)',
      borderTop: '1px solid var(--border)'
    }
  }, hours.slice(0, -1).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      top: `${(i + 1) / 9 * 100}%`,
      left: 0,
      right: 0,
      height: 1,
      background: 'var(--border)',
      opacity: 0.6
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: `${4 / 9 * 100}%`,
      height: `${0.5 / 9 * 100}%`,
      left: 0,
      right: 0,
      background: 'var(--surface-2)',
      opacity: 0.4
    }
  }), di === 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: `${(liveStart + liveLen) / 9 * 100}%`,
      left: 0,
      right: 0,
      height: 2,
      background: 'var(--accent)',
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: -5,
      top: -3,
      width: 8,
      height: 8,
      background: 'var(--accent)',
      borderRadius: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 2,
      top: -14,
      fontSize: 9,
      fontFamily: 'var(--font-data)',
      color: 'var(--accent)',
      background: 'var(--surface)',
      padding: '0 4px',
      borderRadius: 2
    }
  }, "14:35")), di === 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: `${liveStart / 9 * 100}%`,
      height: `${liveLen / 9 * 100}%`,
      left: 4,
      right: 4,
      background: 'var(--accent)',
      borderRadius: 4,
      padding: '6px 8px',
      color: '#fff',
      fontSize: 10,
      lineHeight: 1.2,
      boxShadow: '0 0 0 2px var(--surface), 0 0 0 3px var(--accent)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: 3,
      background: '#fff',
      animation: 'mp-pulse 1.6s infinite',
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 11,
      fontWeight: 600
    }
  }, "B\xDCR-118"), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 10,
      opacity: 0.85
    }
  }, "LP6")), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 10,
      opacity: 0.9,
      alignSelf: 'flex-end'
    }
  }, "02:15 \xB7 l\xE4uft")), blocks.filter(b => b.d === di).map((b, bi) => /*#__PURE__*/React.createElement("div", {
    key: bi,
    style: {
      position: 'absolute',
      top: `${b.s / 9 * 100}%`,
      height: `${b.l / 9 * 100}%`,
      left: 4,
      right: 4,
      background: b.planned ? 'transparent' : b.c,
      border: b.planned ? `1.5px dashed ${b.c}` : 'none',
      opacity: 0.93,
      borderRadius: 4,
      padding: '6px 8px',
      color: b.planned ? b.c : '#fff',
      fontSize: 10,
      lineHeight: 1.2,
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 11,
      fontWeight: 600
    }
  }, b.proj), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 10,
      opacity: 0.85
    }
  }, b.ph)), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 10,
      opacity: 0.85,
      alignSelf: 'flex-end'
    }
  }, b.l.toFixed(2), " h"))), di === 4 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: `${0.5 / 9 * 100}%`,
      height: `${4 / 9 * 100}%`,
      left: 4,
      right: 4,
      background: 'repeating-linear-gradient(45deg, color-mix(in oklch, var(--warn) 20%, transparent), color-mix(in oklch, var(--warn) 20%, transparent) 6px, transparent 6px, transparent 12px)',
      border: '1.5px dashed var(--warn)',
      borderRadius: 4,
      padding: '8px 10px',
      color: 'var(--warn)',
      fontSize: 11,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9,
      color: 'var(--warn)'
    }
  }, "URLAUB"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      marginTop: 4
    }
  }, "Br\xFCckentag"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      marginTop: 2,
      opacity: 0.85,
      fontSize: 10
    }
  }, "4,00 h \xB7 geplant"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 18px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, projLegend.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: p.c
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 10,
      fontWeight: 600
    }
  }, p.id), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, p.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      border: '1.5px dashed var(--accent)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "geplant")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "Wochenstunden zur Freigabe einreichen"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '7px 14px',
      borderRadius: 6,
      background: 'var(--accent)',
      color: 'var(--surface)',
      fontSize: 12,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12,
    stroke: 2.4
  }), " Woche abschlie\xDFen")))), /*#__PURE__*/React.createElement("style", null, `@keyframes mp-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.35 } }`));
};
Object.assign(window, {
  EmpZeit
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/11_723871a7.jsx", error: String((e && e.message) || e) }); }

// extracted/js/12_2ceecf03.jsx
try { (() => {
// Stratum — Bauüberwachung · LP 8 Site Supervision (project-level drill-in)
// For KIT-077 Kita Lerchenfeld which is at LP 8.
// Schedule · Trade payments · Defects (Mängel) · Site visits.

const StratumBauueberwachung = () => {
  const d = window.ModuloData;
  const p = d.projects[2]; // KIT-077

  // Trades (Gewerke) with budget vs. abgerechnet
  const gewerke = [{
    name: 'Rohbau',
    fa: 'Brunner GmbH',
    budget: 820_000,
    paid: 820_000,
    status: 'abgeschl.',
    frei: 100
  }, {
    name: 'Dach',
    fa: 'Dachwerk Süd',
    budget: 318_000,
    paid: 318_000,
    status: 'abgeschl.',
    frei: 100
  }, {
    name: 'Fenster · Fassade',
    fa: 'Glas Mayr',
    budget: 412_000,
    paid: 380_000,
    status: 'läuft',
    frei: 92
  }, {
    name: 'HLS',
    fa: 'Wassermann KG',
    budget: 380_000,
    paid: 285_000,
    status: 'läuft',
    frei: 75
  }, {
    name: 'Elektro',
    fa: 'Voltek',
    budget: 245_000,
    paid: 195_000,
    status: 'läuft',
    frei: 80
  }, {
    name: 'Trockenbau',
    fa: 'Innenausbau Renz',
    budget: 198_000,
    paid: 84_000,
    status: 'läuft',
    frei: 42
  }, {
    name: 'Estrich',
    fa: 'BodenPlan',
    budget: 86_000,
    paid: 86_000,
    status: 'abgeschl.',
    frei: 100
  }, {
    name: 'Maler · Boden',
    fa: 'Atelier Lampert',
    budget: 144_000,
    paid: 0,
    status: 'beauftragt',
    frei: 0
  }, {
    name: 'Außenanlagen',
    fa: 'GartenLand',
    budget: 168_000,
    paid: 0,
    status: 'ausschr.',
    frei: 0
  }];
  const budgetTotal = gewerke.reduce((s, g) => s + g.budget, 0);
  const paidTotal = gewerke.reduce((s, g) => s + g.paid, 0);

  // Mängel (defects)
  const maengel = [{
    id: 'M-218',
    fa: 'Glas Mayr',
    where: 'EG · Achse C/3',
    desc: 'Fuge Pfosten-Riegel unsauber gesetzt',
    sev: 'mittel',
    age: 4,
    due: '02.11.'
  }, {
    id: 'M-221',
    fa: 'Wassermann KG',
    where: 'OG · Raum 2.04',
    desc: 'Heizkörperhalterung versetzt — Werkplan F',
    sev: 'hoch',
    age: 2,
    due: '28.10.'
  }, {
    id: 'M-224',
    fa: 'Voltek',
    where: 'UG · Technikraum',
    desc: 'Brandschott unvollständig dokumentiert',
    sev: 'hoch',
    age: 1,
    due: '27.10.'
  }, {
    id: 'M-228',
    fa: 'Innenausbau Renz',
    where: 'EG · Foyer',
    desc: 'Eckschiene Trockenbau verschoben (12 mm)',
    sev: 'gering',
    age: 0,
    due: '04.11.'
  }];

  // Site visits
  const visits = [{
    date: 'Mo 21.10.',
    time: '08:30',
    topic: 'Wöchentlicher Baujour fix',
    present: 'B. Suter (Brunner), M. Hofer, J. Klar',
    minutes: 12
  }, {
    date: 'Mi 23.10.',
    time: '14:00',
    topic: 'Abnahme Estrich · Erdgeschoss',
    present: 'B. Oner (BodenPlan), J. Klar',
    minutes: 4
  }, {
    date: 'Fr 25.10.',
    time: '10:00',
    topic: 'Begehung Mängel KW 42 · Glas Mayr',
    present: 'M. Hofer, M. Pichler (Glas Mayr)',
    minutes: 6
  }, {
    date: 'Mo 28.10.',
    time: '08:30',
    topic: 'Baujour fix KW 44',
    present: '—',
    minutes: 0,
    future: true
  }, {
    date: 'Do 31.10.',
    time: '09:00',
    topic: 'Abnahme Heizung · Hauptstrang',
    present: 'Wassermann KG · M. Hofer',
    minutes: 0,
    future: true
  }];
  const sevColor = {
    hoch: 'var(--neg)',
    mittel: 'var(--warn)',
    gering: 'var(--text-mute)'
  };
  return /*#__PURE__*/React.createElement(StratumPage, {
    active: "Projekte",
    padding: "20px 28px"
  }, /*#__PURE__*/React.createElement(StratumHeader, {
    breadcrumb: ['Projekte', 'KIT-077', 'Bauüberwachung'],
    title: /*#__PURE__*/React.createElement("span", null, "Bau\xFCberwachung ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-mute)',
        fontWeight: 400,
        fontSize: 18
      }
    }, "\xB7 ", p.name)),
    subtitle: `LP 8 · 9 Gewerke · 32 % der Phase erbracht · Inbetriebnahme ${p.deadline}`,
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }), " Begehung anlegen"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 12
    }), " Bautagebuch PDF")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22,
      borderBottom: '1px solid var(--border)',
      marginTop: -8
    }
  }, ['Übersicht', 'Leistungsphasen', 'Zeit', 'Honorare', 'Bauüberwachung', 'Schriftverkehr', 'Dateien'].map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      padding: '10px 0',
      fontSize: 13,
      color: i === 4 ? 'var(--text)' : 'var(--text-dim)',
      fontWeight: i === 4 ? 600 : 400,
      borderBottom: i === 4 ? '2px solid var(--accent)' : '2px solid transparent',
      marginBottom: -1
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 12
    }
  }, [{
    eyebrow: 'Bausumme',
    value: d.fmtEur(budgetTotal / 1_000_000, 2) + ' Mio €',
    sub: '9 Gewerke vergeben'
  }, {
    eyebrow: 'Abgerechnet',
    value: Math.round(paidTotal / budgetTotal * 100) + ' %',
    sub: d.fmtEur(paidTotal / 1000, 0) + 'k von ' + d.fmtEur(budgetTotal / 1000, 0) + 'k',
    tone: 'accent'
  }, {
    eyebrow: 'Offene Mängel',
    value: '12',
    sub: '3 hoch · 5 mittel · 4 gering',
    tone: 'warn'
  }, {
    eyebrow: 'Begehungen KW 43',
    value: '3',
    sub: '1 abgeschlossen, 2 geplant',
    tone: 'default'
  }, {
    eyebrow: 'Bauzeit',
    value: '76 %',
    sub: '37 von 48 Wochen',
    tone: 'pos'
  }].map((k, i) => /*#__PURE__*/React.createElement(SCard, {
    key: i,
    padding: 14
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, k.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: -0.4,
      marginTop: 4
    }
  }, k.value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(STag, {
    tone: k.tone
  }, k.sub))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 14,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Gewerke & Bauzeitenplan"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "Vergabe \xB7 Zahlungsstand \xB7 Terminplan"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, "KW 30 \u2014 KW 78")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-2)'
    }
  }, /*#__PURE__*/React.createElement("th", {
    className: "m-eyebrow",
    style: {
      textAlign: 'left',
      padding: '8px 14px',
      fontWeight: 500,
      fontSize: 9,
      width: 130
    }
  }, "Gewerk"), /*#__PURE__*/React.createElement("th", {
    className: "m-eyebrow",
    style: {
      textAlign: 'left',
      padding: '8px 14px',
      fontWeight: 500,
      fontSize: 9
    }
  }, "Firma"), /*#__PURE__*/React.createElement("th", {
    className: "m-eyebrow",
    style: {
      textAlign: 'right',
      padding: '8px 14px',
      fontWeight: 500,
      fontSize: 9
    }
  }, "Auftrag"), /*#__PURE__*/React.createElement("th", {
    className: "m-eyebrow",
    style: {
      textAlign: 'right',
      padding: '8px 14px',
      fontWeight: 500,
      fontSize: 9
    }
  }, "Abgerechn."), /*#__PURE__*/React.createElement("th", {
    className: "m-eyebrow",
    style: {
      textAlign: 'left',
      padding: '8px 14px',
      fontWeight: 500,
      fontSize: 9,
      width: 280
    }
  }, "Terminbalken (KW)"))), /*#__PURE__*/React.createElement("tbody", null, gewerke.map((g, i) => {
    // synthetic start/length on the 48-week bar
    const start = [0, 2, 6, 14, 16, 22, 24, 28, 36][i];
    const len = [12, 10, 14, 12, 14, 16, 4, 8, 8][i];
    const pct = g.budget > 0 ? g.paid / g.budget : 0;
    const tone = g.status === 'abgeschl.' ? 'pos' : g.status === 'läuft' ? 'accent' : g.status === 'beauftragt' ? 'default' : 'default';
    return /*#__PURE__*/React.createElement("tr", {
      key: g.name,
      style: {
        borderTop: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px',
        fontWeight: 500
      }
    }, g.name), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px',
        color: 'var(--text-dim)'
      }
    }, g.fa), /*#__PURE__*/React.createElement("td", {
      className: "m-num",
      style: {
        padding: '12px 14px',
        textAlign: 'right'
      }
    }, d.fmtEur(g.budget / 1000, 0), "k"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px',
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontWeight: 600
      }
    }, Math.round(pct * 100), " %"), /*#__PURE__*/React.createElement("div", {
      className: "m-num m-mute",
      style: {
        fontSize: 10
      }
    }, d.fmtEur(g.paid / 1000, 0), "k")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 16,
        background: 'var(--surface-2)',
        borderRadius: 3
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: `${37 / 48 * 100}%`,
        top: -3,
        bottom: -3,
        width: 1.5,
        background: 'var(--accent)',
        zIndex: 2
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: `${start / 48 * 100}%`,
        width: `${len / 48 * 100}%`,
        height: '100%',
        borderRadius: 3,
        background: tone === 'pos' ? 'var(--pos)' : tone === 'accent' ? 'var(--accent)' : 'var(--surface-3)'
      }
    }), pct > 0 && pct < 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: `${start / 48 * 100}%`,
        width: `${len / 48 * 100 * pct}%`,
        height: '100%',
        borderRadius: 3,
        background: 'color-mix(in oklch, var(--accent) 80%, black)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "m-num",
      style: {
        position: 'absolute',
        left: `${start / 48 * 100 + 1}%`,
        top: 1,
        fontSize: 9,
        color: '#fff',
        textShadow: '0 0 2px rgba(0,0,0,0.4)'
      }
    }, "KW", 30 + start))));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 18px',
      borderTop: '1px solid var(--border)',
      background: 'var(--surface-2)',
      display: 'flex',
      gap: 18,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9
    }
  }, "Auftragsvolumen"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, d.fmtEur(budgetTotal))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9
    }
  }, "Abgerechnet"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--accent)'
    }
  }, d.fmtEur(paidTotal))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9
    }
  }, "Offen"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, d.fmtEur(budgetTotal - paidTotal))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9
    }
  }, "\u0394 Kostenstand zu KG \xB7 700"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--pos)'
    }
  }, "\u2212 38.400 \u20AC (Einsparung)")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Offene M\xE4ngel"), /*#__PURE__*/React.createElement(STag, {
    tone: "warn"
  }, "12"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 11,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, "Alle ansehen ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 10
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, maengel.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    style: {
      padding: '12px 18px',
      borderTop: i ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: sevColor[m.sev],
      position: 'relative',
      top: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, m.id), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 500
    }
  }, m.fa), /*#__PURE__*/React.createElement(STag, {
    tone: m.sev === 'hoch' ? 'neg' : m.sev === 'mittel' ? 'warn' : 'default',
    style: {
      marginLeft: 'auto',
      fontSize: 9,
      padding: '1px 6px'
    }
  }, m.sev)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 4,
      lineHeight: 1.35
    }
  }, m.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 6,
      fontSize: 10,
      color: 'var(--text-mute)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "dot",
    size: 8
  }), " ", m.where), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      marginLeft: 'auto'
    }
  }, "Frist ", m.due, " ", m.age <= 1 && /*#__PURE__*/React.createElement(STag, {
    tone: "neg",
    style: {
      marginLeft: 4,
      padding: '1px 5px',
      fontSize: 8
    }
  }, "NEU"))))))), /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Begehungen \xB7 KW 43\u201344"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "5 Termine")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'auto'
    }
  }, visits.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '12px 18px',
      borderTop: i ? '1px solid var(--border)' : 'none',
      display: 'grid',
      gridTemplateColumns: '52px 1fr',
      gap: 12,
      opacity: v.future ? 0.72 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '6px 4px',
      background: v.future ? 'var(--surface-2)' : 'var(--accent-dim)',
      border: '1px solid ' + (v.future ? 'var(--border)' : 'var(--accent)'),
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 9,
      color: v.future ? 'var(--text-mute)' : 'var(--accent)'
    }
  }, v.date.split(' ')[0]), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 12,
      fontWeight: 600,
      marginTop: 1
    }
  }, v.date.split(' ')[1].split('.')[0]), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 9,
      color: 'var(--text-mute)',
      marginTop: 1
    }
  }, v.time)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.3
    }
  }, v.topic), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10,
      marginTop: 2
    }
  }, v.present), v.minutes > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(STag, {
    tone: "default",
    style: {
      fontSize: 9
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "invoice",
    size: 9
  }), " Protokoll \xB7 ", v.minutes, " TOPs"))))))))));
};
Object.assign(window, {
  StratumBauueberwachung
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/12_2ceecf03.jsx", error: String((e && e.message) || e) }); }

// extracted/js/13_6360b7a0.jsx
try { (() => {
// HOAI Honorar-Rechner B — WIZARD
// 6-Schritt Wizard mit großen Touch-Targets. Theme: Stratum (warm, calm).
// Linke Spalte: Schritte mit Fortschritt. Mitte: aktiver Schritt (Schritt 4 LP-Auswahl).
// Rechts: laufende Berechnung mit Trail jeder Auswahl.

const HoaiWizard = () => {
  const d = window.ModuloData;
  const steps = [['Projekt-Typ', 'Gebäude · Innenräume · Freianlage'], ['Anrechenbare Kosten', 'Kostenermittlung gem. § 33'], ['Honorarzone', 'Einstufung nach Anforderungen'], ['Leistungsphasen', 'Welche Phasen leistet das Büro?'], ['Zuschläge & NK', 'Umbauzuschlag · Nebenkosten'], ['Honorar bestätigen', 'Angebot generieren']];
  const activeStep = 3;
  const phasen = [1, 2, 3, 4, 5, 6, 7, 8];
  const totalAnteil = phasen.reduce((s, n) => s + d.leistungsphasen[n - 1].anteil, 0);
  return /*#__PURE__*/React.createElement("div", {
    className: "m-app theme-stratum dens-comfy",
    style: {
      width: 1280,
      height: 800,
      display: 'grid',
      gridTemplateColumns: '230px 1fr',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(StratumSidebar, {
    active: "HOAI-Rechner"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      padding: '20px 28px 16px',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 14,
    stroke: 1.4
  }), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 12
    }
  }, "HOAI-Rechner"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 10,
    stroke: 1.4
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: -0.4
    }
  }, "Neues Honorarangebot"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "m-pill",
    style: {
      background: 'var(--surface)',
      padding: '4px 10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-eyebrow"
  }, "Entwurf"), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      marginLeft: 8,
      fontSize: 10
    }
  }, "zuletzt gespeichert 09:38"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: '280px 1fr 340px',
      padding: '0 28px 28px',
      gap: 20,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-card",
    style: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      marginBottom: 12
    }
  }, "Schritte"), steps.map(([title, sub], i) => {
    const done = i < activeStep;
    const active = i === activeStep;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'grid',
        gridTemplateColumns: '28px 1fr',
        gap: 10,
        padding: '10px 6px',
        background: active ? 'var(--surface-2)' : 'transparent',
        borderRadius: 8,
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 24,
        height: 24,
        borderRadius: 12,
        background: done ? 'var(--accent)' : active ? 'var(--text)' : 'var(--surface-2)',
        color: done || active ? 'var(--surface)' : 'var(--text-mute)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-data)',
        fontSize: 11,
        fontWeight: 600,
        flexShrink: 0
      }
    }, done ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 12
    }) : i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: active ? 600 : 500,
        color: done || active ? 'var(--text)' : 'var(--text-dim)'
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 10,
        marginTop: 1
      }
    }, sub)), i < steps.length - 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 17,
        top: 34,
        bottom: -4,
        width: 1,
        background: done ? 'var(--accent)' : 'var(--border)'
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    className: "m-card",
    style: {
      padding: 28,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Schritt 4 von 6"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: -0.5,
      marginTop: 4
    }
  }, "Welche Leistungsphasen leistet das B\xFCro?"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 13,
      marginTop: 6,
      maxWidth: 540
    }
  }, "W\xE4hlen Sie alle Leistungsphasen aus, die im Honorarangebot enthalten sind. Die Prozents\xE4tze ergeben das Honorar gem\xE4\xDF \xA7 34 HOAI f\xFCr Geb\xE4udeplanung."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 10
    }
  }, d.leistungsphasen.map(lp => {
    const sel = phasen.includes(lp.nr);
    return /*#__PURE__*/React.createElement("div", {
      key: lp.nr,
      style: {
        padding: 14,
        border: '1.5px solid ' + (sel ? 'var(--accent)' : 'var(--border)'),
        borderRadius: 8,
        background: sel ? color_mix(0.05) : 'var(--surface)',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: sel ? '0 1px 0 rgba(0,0,0,0.04)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "m-eyebrow",
      style: {
        color: sel ? 'var(--accent)' : 'var(--text-mute)'
      }
    }, "LP ", lp.nr), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 18,
        height: 18,
        borderRadius: 4,
        background: sel ? 'var(--accent)' : 'transparent',
        border: '1.5px solid ' + (sel ? 'var(--accent)' : 'var(--border-strong)'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--surface)'
      }
    }, sel && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 11,
      stroke: 2.6
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 500,
        marginTop: 8,
        lineHeight: 1.3
      }
    }, lp.name), /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontSize: 18,
        marginTop: 8,
        fontWeight: 500,
        color: sel ? 'var(--accent)' : 'var(--text-mute)'
      }
    }, lp.anteil, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11
      }
    }, "%")));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      padding: 14,
      background: 'var(--surface-2)',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert",
    size: 16
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 12
    }
  }, "LP 9 (Objektbetreuung) ist nicht ausgew\xE4hlt. Soll diese sp\xE4ter optional angeboten werden?"), /*#__PURE__*/React.createElement("div", {
    className: "m-pill",
    style: {
      background: 'var(--surface)',
      padding: '4px 10px',
      cursor: 'pointer'
    }
  }, "Als Option hinzuf\xFCgen")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '10px 16px',
      background: 'var(--surface-2)',
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowright",
    size: 12,
    stroke: 2,
    style: {
      transform: 'scaleX(-1)'
    }
  }), " Zur\xFCck"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "\u03A3 ausgew\xE4hlt"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 16,
      fontWeight: 600
    }
  }, totalAnteil, /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, " % \xB7 8 von 9 Phasen"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '10px 22px',
      background: 'var(--accent)',
      color: 'var(--surface)',
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 600
    }
  }, "Weiter ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrowright",
    size: 13,
    stroke: 2.4
  })))), /*#__PURE__*/React.createElement("div", {
    className: "m-card",
    style: {
      padding: 22,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Honorar \xB7 live"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 32,
      fontWeight: 600,
      letterSpacing: -1,
      marginTop: 6,
      color: 'var(--accent)'
    }
  }, d.fmtEur(218_400)), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 12,
      marginTop: 2
    }
  }, "Grundleistungen netto \xB7 98 % von Vollhonorar"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [['Gebäudeplanung gem. §34', '', true], ['Anrechenbare Kosten', d.fmtEur(1_850_000)], ['Honorarzone III · Mittelsatz', d.fmtEur(222_858)], ['Leistungsphasen 1–8', '98 %'], ['Umbauzuschlag', '— %', false, 'mute'], ['Nebenkosten 6,0 %', d.fmtEur(13_104), false, 'mute']].map(([k, v, head, dim], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: head ? '8px 0 4px' : '0',
      borderBottom: head ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: head ? 600 : 400,
      color: head ? 'var(--text)' : dim === 'mute' ? 'var(--text-mute)' : 'var(--text-dim)'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: dim === 'mute' ? 'var(--text-mute)' : 'var(--text)'
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      padding: 14,
      background: 'var(--surface-2)',
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Endbetrag inkl. USt 19 %"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 22,
      fontWeight: 600,
      marginTop: 4
    }
  }, d.fmtEur((218_400 + 13_104) * 1.19)), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10,
      marginTop: 2
    }
  }, "Wird mit jedem Schritt aktualisiert")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 14,
      borderTop: '1px solid var(--border)',
      fontSize: 11,
      color: 'var(--text-dim)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert",
    size: 11
  }), "Honorarvereinbarung gem. \xA7 7 erforderlich")))));
};

// helper for in-line transparent-accent backgrounds — inline style doesn't
// support color-mix in some webviews, so just compute lightened sage.
function color_mix(opacity) {
  return `rgba(94, 124, 100, ${opacity})`;
}
Object.assign(window, {
  HoaiWizard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/13_6360b7a0.jsx", error: String((e && e.message) || e) }); }

// extracted/js/14_bb58fff3.jsx
try { (() => {
// Stratum — Zeiterfassung (Time tracking)
// Running timer at top, today's entries, week calendar grid.

const StratumZeit = () => {
  const d = window.ModuloData;

  // Week grid data — 5 days × 10 hours each, blocks of project work.
  const days = ['Mo 21.10.', 'Di 22.10.', 'Mi 23.10.', 'Do 24.10.', 'Fr 25.10.'];
  const hours = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

  // Each block: {day, startH, lengthH, project, phase, color, label}
  const blocks = [{
    d: 0,
    s: 0.25,
    l: 2.25,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'Detailknoten Fassade'
  }, {
    d: 0,
    s: 2.75,
    l: 1.5,
    proj: 'WHB-204',
    ph: 'LP5',
    c: '#d97c4a',
    label: 'Holzfenster'
  }, {
    d: 0,
    s: 5,
    l: 2.5,
    proj: 'KIT-077',
    ph: 'LP8',
    c: '#7a9e6e',
    label: 'Bauleitung Augsb.'
  }, {
    d: 0,
    s: 7.5,
    l: 1.5,
    proj: 'INT',
    ph: '—',
    c: '#a8a8a8',
    label: 'Team-Meeting'
  }, {
    d: 1,
    s: 0.5,
    l: 3,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'LV Trockenbau'
  }, {
    d: 1,
    s: 4,
    l: 2,
    proj: 'SAN-302',
    ph: 'LP4',
    c: '#b89065',
    label: 'Denkmalschutz'
  }, {
    d: 1,
    s: 6.25,
    l: 2,
    proj: 'WHB-204',
    ph: 'LP5',
    c: '#d97c4a',
    label: 'Detail W-04'
  }, {
    d: 2,
    s: 0,
    l: 3.5,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'LV Fassade'
  }, {
    d: 2,
    s: 4,
    l: 2,
    proj: 'GEW-441',
    ph: 'LP9',
    c: '#6c7bb8',
    label: 'Abnahme Mieter 3'
  }, {
    d: 2,
    s: 6.5,
    l: 2.5,
    proj: 'WHB-204',
    ph: 'LP5',
    c: '#d97c4a',
    label: 'Werkplanung EG'
  }, {
    d: 3,
    s: 0,
    l: 1.5,
    proj: 'INT',
    ph: '—',
    c: '#a8a8a8',
    label: 'Akquise SCH-088'
  }, {
    d: 3,
    s: 1.75,
    l: 3,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'LV HLS'
  }, {
    d: 3,
    s: 5,
    l: 1.75,
    proj: 'WHB-204',
    ph: 'LP5',
    c: '#d97c4a',
    label: 'Treppe Holz'
  }, {
    d: 3,
    s: 7,
    l: 1.5,
    proj: 'SAN-302',
    ph: 'LP4',
    c: '#b89065',
    label: 'Bauantrag-Mappe'
  }, {
    d: 4,
    s: 0.25,
    l: 2.25,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'Vorbereitung Pakete'
  }, {
    d: 4,
    s: 2.75,
    l: 1.25,
    proj: 'WHB-204',
    ph: 'LP5',
    c: '#d97c4a',
    label: 'Knoten W-04'
  }, {
    d: 4,
    s: 5,
    l: 2.5,
    proj: 'SAN-302',
    ph: 'LP4',
    c: '#b89065',
    label: 'Stellungnahme'
  }, {
    d: 4,
    s: 7.5,
    l: 2.25,
    proj: 'BÜR-118',
    ph: 'LP6',
    c: '#5fa3a8',
    label: 'LV TB Pos 3.40–3.78'
  }];

  // Sum per day
  const daySum = days.map((_, di) => blocks.filter(b => b.d === di).reduce((s, b) => s + b.l, 0));
  const weekTotal = daySum.reduce((s, v) => s + v, 0);
  return /*#__PURE__*/React.createElement(StratumPage, {
    active: "Zeiterfassung"
  }, /*#__PURE__*/React.createElement(StratumHeader, {
    title: "Zeiterfassung",
    subtitle: "Woche 43 \xB7 21.\u201327. Oktober 2026",
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }), " Eintrag hinzuf\xFCgen"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "calc",
      size: 12
    }), " Auswerten")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 18,
    style: {
      background: 'var(--surface)',
      border: '1.5px solid var(--accent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      color: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: 'var(--accent)',
      animation: 'pulse 1.6s infinite',
      display: 'inline-block'
    }
  }), "L\xC4UFT \xB7 seit 15:30"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      marginTop: 6
    }
  }, "B\xDCR-118 \xB7 B\xFCrohaus Stadtkrone"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 12,
      marginTop: 2
    }
  }, "Leistungsphase 6 \xB7 Vorbereitung der Vergabe")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 36,
      fontWeight: 600,
      letterSpacing: -1,
      color: 'var(--accent)'
    }
  }, "02:14:38"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 16,
      background: 'var(--accent)',
      color: 'var(--surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pause",
    size: 12
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 16,
      background: 'var(--surface-2)',
      color: 'var(--text-dim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14,
    stroke: 2.4
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 16,
      background: 'var(--surface-2)',
      color: 'var(--text-dim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 12
  })))))), /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Heute \xB7 Mi 25.10."), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: -0.5,
      marginTop: 4
    }
  }, "8,25 ", /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 14
    }
  }, "/ 8,0 h")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      height: 5,
      background: 'var(--surface-2)',
      borderRadius: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: 'var(--accent)',
      borderRadius: 3
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 4
    }
  }, "+0,25 h Mehrarbeit \xB7 100 % verrechenbar")), /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Woche"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: -0.5,
      marginTop: 4
    }
  }, weekTotal.toFixed(2), " ", /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 14
    }
  }, "/ 40,0 h")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: 'flex',
      gap: 4
    }
  }, daySum.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: 22,
      background: 'var(--surface-2)',
      borderRadius: 3,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: `${s / 10 * 100}%`,
      background: 'var(--accent)',
      borderRadius: 3,
      opacity: 0.85
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 4,
      fontSize: 9,
      color: 'var(--text-mute)',
      fontFamily: 'var(--font-data)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Mo"), /*#__PURE__*/React.createElement("span", null, "Di"), /*#__PURE__*/React.createElement("span", null, "Mi"), /*#__PURE__*/React.createElement("span", null, "Do"), /*#__PURE__*/React.createElement("span", null, "Fr")))), /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      flex: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Wochenkalender"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "Klicken Sie und ziehen Sie, um neue Eintr\xE4ge anzulegen"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 10px',
      borderRadius: 4,
      background: 'var(--surface-2)',
      fontSize: 11,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowright",
    size: 10,
    stroke: 2,
    style: {
      transform: 'scaleX(-1)'
    }
  }), " KW 42"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 10px',
      borderRadius: 4,
      background: 'var(--accent-dim)',
      color: 'var(--accent)',
      fontSize: 11,
      fontWeight: 600
    }
  }, "KW 43"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 10px',
      borderRadius: 4,
      background: 'var(--surface-2)',
      fontSize: 11,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, "KW 44 ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrowright",
    size: 10,
    stroke: 2
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 16,
      display: 'grid',
      gridTemplateColumns: '38px repeat(5, 1fr)',
      gridTemplateRows: '24px 1fr',
      gap: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", null), days.map((day, i) => /*#__PURE__*/React.createElement("div", {
    key: day,
    style: {
      padding: '0 8px',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      borderLeft: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: i === 4 ? 'var(--accent)' : 'var(--text)'
    }
  }, day), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10,
      marginLeft: 'auto'
    }
  }, daySum[i].toFixed(1), " h"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderTop: '1px solid var(--border)'
    }
  }, hours.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      position: 'absolute',
      top: `${i / 10 * 100}%`,
      transform: 'translateY(-50%)',
      right: 4,
      fontSize: 9,
      color: 'var(--text-mute)',
      fontFamily: 'var(--font-data)'
    }
  }, h))), days.map((_, di) => /*#__PURE__*/React.createElement("div", {
    key: di,
    style: {
      position: 'relative',
      borderLeft: '1px solid var(--border)',
      borderTop: '1px solid var(--border)'
    }
  }, hours.slice(0, -1).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      top: `${(i + 1) / 10 * 100}%`,
      left: 0,
      right: 0,
      height: 1,
      background: 'var(--border)',
      opacity: 0.6
    }
  })), di === 4 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: `${(9.75 - 8) / 10 * 100}%`,
      left: 0,
      right: 0,
      height: 2,
      background: 'var(--accent)',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: -5,
      top: -3,
      width: 8,
      height: 8,
      background: 'var(--accent)',
      borderRadius: 4
    }
  })), blocks.filter(b => b.d === di).map((b, bi) => /*#__PURE__*/React.createElement("div", {
    key: bi,
    style: {
      position: 'absolute',
      top: `${b.s / 10 * 100}%`,
      height: `${b.l / 10 * 100}%`,
      left: 4,
      right: 4,
      background: b.c,
      opacity: 0.92,
      borderRadius: 4,
      padding: '6px 8px',
      color: '#fff',
      fontSize: 10,
      lineHeight: 1.2,
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 11,
      fontWeight: 600
    }
  }, b.proj), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 10,
      opacity: 0.85
    }
  }, b.ph)), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 10,
      opacity: 0.85,
      alignSelf: 'flex-end'
    }
  }, b.l.toFixed(2), " h")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 18px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, [['BÜR-118 · Bürohaus Stadtkrone', '#5fa3a8'], ['WHB-204 · Wohnhaus Bergmann', '#d97c4a'], ['SAN-302 · Sanierung Maxvorstadt', '#b89065'], ['KIT-077 · Kita Lerchenfeld', '#7a9e6e'], ['GEW-441 · Gewerbehof Riem', '#6c7bb8'], ['Intern · Akquise · Meetings', '#a8a8a8']].map(([label, c]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: c
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, label))))), /*#__PURE__*/React.createElement("style", null, `@keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }`));
};
Object.assign(window, {
  StratumZeit
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/14_bb58fff3.jsx", error: String((e && e.message) || e) }); }

// extracted/js/15_1cd42158.jsx
try { (() => {
// Stratum — Projekt-Detail (single project view).
// Hero header + tabs + LP grid + activity feed + supporting cards.

const StratumProjektDetail = () => {
  const d = window.ModuloData;
  const p = d.projects[1]; // BÜR-118 Bürohaus Stadtkrone
  const phasePct = p.progress.reduce((s, v) => s + v, 0) / 900;
  return /*#__PURE__*/React.createElement(StratumPage, {
    active: "Projekte",
    padding: "20px 28px"
  }, /*#__PURE__*/React.createElement(StratumHeader, {
    breadcrumb: ['Projekte', 'Aktiv', p.id],
    title: /*#__PURE__*/React.createElement("span", null, p.name, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-mute)',
        fontWeight: 400,
        fontSize: 18
      }
    }, "\xB7 ", p.id)),
    subtitle: `${p.type} · ${p.client} · ${p.city} · HZ ${p.zone} Mittelsatz`,
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }), " Zeit erfassen"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "euro",
      size: 12
    }), " Abschlag A 5")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22,
      borderBottom: '1px solid var(--border)',
      marginTop: -8,
      paddingBottom: 0
    }
  }, ['Übersicht', 'Leistungsphasen', 'Zeit', 'Honorare', 'Vertrag', 'Schriftverkehr', 'Dateien'].map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      padding: '10px 0',
      fontSize: 13,
      color: i === 1 ? 'var(--text)' : 'var(--text-dim)',
      fontWeight: i === 1 ? 600 : 400,
      borderBottom: i === 1 ? '2px solid var(--accent)' : '2px solid transparent',
      marginBottom: -1
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr) 200px',
      gap: 14,
      alignItems: 'stretch'
    }
  }, [{
    eyebrow: 'Anrechenb. Kosten',
    value: d.fmtEur(p.costs / 1000, 0) + 'k €',
    sub: 'netto · KG 200–600'
  }, {
    eyebrow: 'Honorar',
    value: d.fmtEur(p.fee / 1000, 0) + 'k €',
    sub: 'HZ III · 8 von 9 LP'
  }, {
    eyebrow: 'Abgerechnet',
    value: Math.round(p.billed / p.fee * 100) + ' %',
    sub: d.fmtEur(p.billed / 1000, 0) + 'k von ' + d.fmtEur(p.fee / 1000, 0) + 'k'
  }, {
    eyebrow: 'Stunden Ist',
    value: d.fmtNum(p.hours) + ' h',
    sub: '77 % von ' + d.fmtNum(p.planned) + ' geplant'
  }, {
    eyebrow: 'DB · aktuell',
    value: '32,4 %',
    sub: 'Ziel 30 % · + 2,4 Pp',
    tone: 'pos'
  }].map((k, i) => /*#__PURE__*/React.createElement(SCard, {
    key: i,
    padding: 14
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, k.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: -0.4,
      marginTop: 2,
      color: k.tone === 'pos' ? 'var(--pos)' : 'var(--text)'
    }
  }, k.value), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10.5,
      marginTop: 2
    }
  }, k.sub))), /*#__PURE__*/React.createElement(SCard, {
    padding: 14,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Donut, {
    pct: phasePct,
    size: 56,
    stroke: 7,
    color: "var(--accent)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 12,
      fontWeight: 600
    }
  }, Math.round(phasePct * 100), "%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Fortschritt"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      marginTop: 2
    }
  }, "LP ", p.phase, " l\xE4uft"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10
    }
  }, "Abnahme ", p.deadline)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 14,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Leistungsphasen · §34 HOAI',
      subtitle: `${Math.round(phasePct * 100)} % erbracht`
    },
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 10
    }
  }, d.leistungsphasen.map((lp, i) => {
    const prog = p.progress[i];
    const fee = p.fee * lp.anteil / 100;
    const planH = p.planned * lp.anteil / 100;
    const usedH = prog > 0 ? planH * (prog / 100) * (lp.nr === 6 ? 1.18 : 0.95) : 0;
    const isActive = lp.nr === p.phase;
    const done = prog === 100;
    const future = prog === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: lp.nr,
      style: {
        padding: 12,
        borderRadius: 6,
        border: '1px solid ' + (isActive ? 'var(--accent)' : 'var(--border)'),
        background: isActive ? 'var(--accent-dim)' : future ? 'var(--surface-2)' : 'var(--surface)',
        opacity: future ? 0.55 : 1,
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 11,
        background: done ? 'var(--pos)' : isActive ? 'var(--accent)' : 'var(--surface-3)',
        color: done || isActive ? 'var(--surface)' : 'var(--text-mute)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-data)',
        fontSize: 10,
        fontWeight: 600
      }
    }, done ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 10,
      stroke: 2.6
    }) : lp.nr), /*#__PURE__*/React.createElement("span", {
      className: "m-eyebrow",
      style: {
        fontSize: 9,
        color: isActive ? 'var(--accent)' : 'var(--text-mute)'
      }
    }, "LP ", lp.nr, " \xB7 ", lp.anteil, " %")), /*#__PURE__*/React.createElement("span", {
      className: "m-num",
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: done ? 'var(--pos)' : isActive ? 'var(--accent)' : 'var(--text-mute)'
      }
    }, prog, " %")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 500,
        marginTop: 8,
        lineHeight: 1.25
      }
    }, lp.name), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        height: 4,
        background: future ? 'var(--surface-3)' : 'var(--surface-2)',
        borderRadius: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${prog}%`,
        height: '100%',
        background: done ? 'var(--pos)' : 'var(--accent)',
        borderRadius: 2
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "m-eyebrow",
      style: {
        fontSize: 9
      }
    }, "HONORAR"), /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontSize: 12,
        fontWeight: 600,
        marginTop: 1
      }
    }, d.fmtEur(fee / 1000, 0), "k")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "m-eyebrow",
      style: {
        fontSize: 9
      }
    }, "STD IST/SOLL"), /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontSize: 11,
        fontWeight: 500,
        marginTop: 1,
        color: usedH > planH * 1.1 ? 'var(--neg)' : 'var(--text)'
      }
    }, prog > 0 ? `${Math.round(usedH)}/${Math.round(planH)}` : `—/${Math.round(planH)}`))));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Team · diese Woche'
    },
    padding: 18
  }, d.team.slice(0, 4).map((m, i) => {
    const h = [42, 28, 18, 12][i];
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      style: {
        display: 'grid',
        gridTemplateColumns: '32px 1fr 60px 50px',
        gap: 10,
        alignItems: 'center',
        padding: '8px 0',
        borderTop: i ? '1px solid var(--border)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 28,
        height: 28,
        borderRadius: 14,
        background: m.color,
        color: '#fff',
        fontSize: 10,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, m.name.split(' ').map(n => n[0]).join('')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 500
      }
    }, m.name), /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 10,
        marginTop: 1
      }
    }, m.role.split(' · ')[0])), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 5,
        background: 'var(--surface-2)',
        borderRadius: 3,
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${h / 42 * 100}%`,
        height: '100%',
        background: 'var(--accent)',
        borderRadius: 3
      }
    })), /*#__PURE__*/React.createElement("span", {
      className: "m-num",
      style: {
        fontSize: 11,
        textAlign: 'right',
        fontWeight: 500
      }
    }, h, " h"));
  })), /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Letzte Aktivität'
    },
    padding: 18,
    style: {
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [{
    who: 'A. Renner',
    when: 'heute · 10:24',
    action: 'LV Fassade · Position 4.1 — 4.18 für Anfrage freigegeben.',
    tag: 'LP 6'
  }, {
    who: 'M. Hofer',
    when: 'heute · 09:12',
    action: 'Honorarabschlag A 5 vorbereitet — Versand 17.11.',
    tag: 'Honorar'
  }, {
    who: 'E. Çelik',
    when: 'Di · 14:38',
    action: 'BIM-Modell IFC v0.7 an TGA-Planer übergeben.',
    tag: 'LP 5'
  }, {
    who: 'J. Klar',
    when: 'Mo · 16:02',
    action: 'Werkpläne EG-Geschoss aktualisiert (Rev. F).',
    tag: 'LP 5'
  }].map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '32px 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 14,
      background: d.team.find(t => t.name === a.who)?.color || 'var(--text-mute)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, a.who.split(' ').map(n => n[0]).join('')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, a.who), /*#__PURE__*/React.createElement(STag, {
    tone: "outline",
    style: {
      fontSize: 9,
      padding: '1px 6px'
    }
  }, a.tag), /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 10,
      marginLeft: 'auto'
    }
  }, a.when)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 3,
      lineHeight: 1.4
    }
  }, a.action)))))))));
};
Object.assign(window, {
  StratumProjektDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/15_1cd42158.jsx", error: String((e && e.message) || e) }); }

// extracted/js/16_26742bc6.jsx
try { (() => {
// Shared German architecture-firm controlling data for Modulo mockups.
// HOAI 2021 Honorartafel §35 (Gebäudeplanung) — Honorarzone III Mittelsatz.
// All numbers are realistic placeholders; nothing wired to a real backend.

window.ModuloData = (() => {
  const projects = [{
    id: 'WHB-204',
    name: 'Wohnhaus Bergmann',
    city: 'München',
    client: 'Familie Bergmann',
    lead: 'M. Hofer',
    zone: 'III',
    costs: 1_850_000,
    fee: 218_400,
    billed: 156_900,
    hours: 1_240,
    planned: 1_980,
    phase: 5,
    status: 'aktiv',
    umbau: false,
    nk: 6.0,
    progress: [100, 100, 100, 100, 68, 0, 0, 0, 0],
    deadline: '12.09.2026',
    type: 'Neubau · Einfamilienhaus'
  }, {
    id: 'BÜR-118',
    name: 'Bürohaus Stadtkrone',
    city: 'Stuttgart',
    client: 'Süd Invest GmbH',
    lead: 'A. Renner',
    zone: 'IV',
    costs: 12_400_000,
    fee: 1_412_300,
    billed: 982_400,
    hours: 4_810,
    planned: 6_200,
    phase: 6,
    status: 'aktiv',
    umbau: false,
    nk: 5.0,
    progress: [100, 100, 100, 100, 100, 72, 0, 0, 0],
    deadline: '04.03.2027',
    type: 'Neubau · Verwaltung'
  }, {
    id: 'KIT-077',
    name: 'Kita Lerchenfeld',
    city: 'Augsburg',
    client: 'Stadt Augsburg',
    lead: 'L. Vogel',
    zone: 'III',
    costs: 3_200_000,
    fee: 401_200,
    billed: 401_200,
    hours: 2_140,
    planned: 2_100,
    phase: 8,
    status: 'aktiv',
    umbau: false,
    nk: 7.0,
    progress: [100, 100, 100, 100, 100, 100, 100, 32, 0],
    deadline: '20.11.2025',
    type: 'Neubau · Öffentlich'
  }, {
    id: 'SAN-302',
    name: 'Sanierung Altbau Maxvorstadt',
    city: 'München',
    client: 'Eigentümergemeinschaft',
    lead: 'M. Hofer',
    zone: 'IV',
    costs: 2_700_000,
    fee: 412_800,
    billed: 218_500,
    hours: 1_680,
    planned: 2_400,
    phase: 4,
    status: 'aktiv',
    umbau: true,
    nk: 8.0,
    progress: [100, 100, 100, 54, 0, 0, 0, 0, 0],
    deadline: '30.06.2027',
    type: 'Umbau · 33 % Zuschlag'
  }, {
    id: 'GEW-441',
    name: 'Gewerbehof Riem',
    city: 'München',
    client: 'Riem Immobilien KG',
    lead: 'A. Renner',
    zone: 'III',
    costs: 8_900_000,
    fee: 904_600,
    billed: 904_600,
    hours: 5_240,
    planned: 5_100,
    phase: 9,
    status: 'abschluss',
    umbau: false,
    nk: 5.0,
    progress: [100, 100, 100, 100, 100, 100, 100, 100, 84],
    deadline: '15.02.2026',
    type: 'Neubau · Gewerbe'
  }, {
    id: 'EFH-512',
    name: 'Doppelhaus Grünwald',
    city: 'Grünwald',
    client: 'Schaller / Wiesner',
    lead: 'L. Vogel',
    zone: 'III',
    costs: 1_240_000,
    fee: 156_700,
    billed: 28_400,
    hours: 320,
    planned: 1_400,
    phase: 2,
    status: 'aktiv',
    umbau: false,
    nk: 6.0,
    progress: [100, 46, 0, 0, 0, 0, 0, 0, 0],
    deadline: '08.10.2027',
    type: 'Neubau · Wohnen'
  }, {
    id: 'SCH-088',
    name: 'Schulerweiterung Pasing',
    city: 'München',
    client: 'LBB Bayern',
    lead: 'M. Hofer',
    zone: 'IV',
    costs: 6_400_000,
    fee: 824_300,
    billed: 0,
    hours: 0,
    planned: 4_800,
    phase: 1,
    status: 'akquise',
    umbau: false,
    nk: 6.0,
    progress: [12, 0, 0, 0, 0, 0, 0, 0, 0],
    deadline: '—',
    type: 'Neubau · Öffentlich'
  }];

  // HOAI 2021 §35 Honorartafel — abbreviated. Values in €.
  // Rows: anrechenbare Kosten · Cols: Honorarzonen I-V (Mittelsatz).
  const honorartafel = [{
    kosten: 25_000,
    I: 3_120,
    II: 3_897,
    III: 4_675,
    IV: 5_452,
    V: 6_230
  }, {
    kosten: 50_000,
    I: 5_641,
    II: 7_052,
    III: 8_462,
    IV: 9_873,
    V: 11_283
  }, {
    kosten: 100_000,
    I: 9_799,
    II: 12_249,
    III: 14_699,
    IV: 17_149,
    V: 19_599
  }, {
    kosten: 250_000,
    I: 21_233,
    II: 26_542,
    III: 31_850,
    IV: 37_158,
    V: 42_466
  }, {
    kosten: 500_000,
    I: 38_360,
    II: 47_950,
    III: 57_540,
    IV: 67_130,
    V: 76_720
  }, {
    kosten: 1_000_000,
    I: 68_590,
    II: 85_738,
    III: 102_886,
    IV: 120_033,
    V: 137_181
  }, {
    kosten: 1_500_000,
    I: 96_550,
    II: 120_688,
    III: 144_826,
    IV: 168_963,
    V: 193_101
  }, {
    kosten: 2_500_000,
    I: 148_770,
    II: 185_963,
    III: 223_155,
    IV: 260_348,
    V: 297_541
  }, {
    kosten: 5_000_000,
    I: 268_390,
    II: 335_488,
    III: 402_585,
    IV: 469_683,
    V: 536_780
  }, {
    kosten: 10_000_000,
    I: 481_220,
    II: 601_525,
    III: 721_830,
    IV: 842_135,
    V: 962_440
  }, {
    kosten: 25_000_000,
    I: 1_055_960,
    II: 1_319_950,
    III: 1_583_940,
    IV: 1_847_930,
    V: 2_111_920
  }];

  // Leistungsphasen §34 HOAI Gebäudeplanung.
  const leistungsphasen = [{
    nr: 1,
    name: 'Grundlagenermittlung',
    anteil: 2
  }, {
    nr: 2,
    name: 'Vorplanung',
    anteil: 7
  }, {
    nr: 3,
    name: 'Entwurfsplanung',
    anteil: 15
  }, {
    nr: 4,
    name: 'Genehmigungsplanung',
    anteil: 3
  }, {
    nr: 5,
    name: 'Ausführungsplanung',
    anteil: 25
  }, {
    nr: 6,
    name: 'Vorbereitung der Vergabe',
    anteil: 10
  }, {
    nr: 7,
    name: 'Mitwirkung bei der Vergabe',
    anteil: 4
  }, {
    nr: 8,
    name: 'Objektüberwachung — Bauleitung',
    anteil: 32
  }, {
    nr: 9,
    name: 'Objektbetreuung',
    anteil: 2
  }];
  const team = [{
    id: 'mh',
    name: 'Maria Hofer',
    role: 'Partnerin · Projektleitung',
    rate: 125,
    avg: 7.8,
    color: '#d97c4a'
  }, {
    id: 'ar',
    name: 'Andreas Renner',
    role: 'Partner · Projektleitung',
    rate: 125,
    avg: 8.4,
    color: '#7a9e6e'
  }, {
    id: 'lv',
    name: 'Lukas Vogel',
    role: 'Architekt',
    rate: 95,
    avg: 8.1,
    color: '#6c7bb8'
  }, {
    id: 'sn',
    name: 'Sophia Nowak',
    role: 'Architektin',
    rate: 95,
    avg: 7.2,
    color: '#b89065'
  }, {
    id: 'jk',
    name: 'Jonas Klar',
    role: 'Bauzeichner',
    rate: 72,
    avg: 8.0,
    color: '#9a7eb5'
  }, {
    id: 'ec',
    name: 'Elif Çelik',
    role: 'Architektin · BIM',
    rate: 95,
    avg: 7.6,
    color: '#5fa3a8'
  }, {
    id: 'tb',
    name: 'Tobias Burr',
    role: 'Praktikant',
    rate: 28,
    avg: 6.9,
    color: '#a8a8a8'
  }];
  const kpis = {
    umsatzYTD: 1_842_400,
    umsatzPlan: 2_350_000,
    deckungsbeitragYTD: 0.34,
    deckungsbeitragPlan: 0.32,
    offeneRechnungen: 312_800,
    überfälligeRechnungen: 48_200,
    auslastung: 0.86,
    auslastungZiel: 0.82,
    stundenWoche: 268,
    stundenPlanWoche: 280,
    aktivProjekte: 12,
    risikoProjekte: 2
  };

  // Monthly hours bar series for current year + previous year reference.
  const monatsstunden = [{
    m: 'Jan',
    ist: 1180,
    plan: 1240,
    prev: 1110
  }, {
    m: 'Feb',
    ist: 1090,
    plan: 1240,
    prev: 1180
  }, {
    m: 'Mär',
    ist: 1240,
    plan: 1240,
    prev: 1200
  }, {
    m: 'Apr',
    ist: 1280,
    plan: 1240,
    prev: 1090
  }, {
    m: 'Mai',
    ist: 1340,
    plan: 1240,
    prev: 1310
  }, {
    m: 'Jun',
    ist: 1200,
    plan: 1240,
    prev: 1280
  }, {
    m: 'Jul',
    ist: 980,
    plan: 1100,
    prev: 1020
  }, {
    m: 'Aug',
    ist: 920,
    plan: 1100,
    prev: 980
  }, {
    m: 'Sep',
    ist: 1310,
    plan: 1240,
    prev: 1170
  }, {
    m: 'Okt',
    ist: 1190,
    plan: 1240,
    prev: 1290
  }, {
    m: 'Nov',
    ist: 0,
    plan: 1240,
    prev: 1260,
    future: true
  }, {
    m: 'Dez',
    ist: 0,
    plan: 1100,
    prev: 1080,
    future: true
  }];

  // Today's time entries (Stundenerfassung).
  const heute = [{
    time: '08:15–10:30',
    project: 'BÜR-118',
    phase: 'LP6',
    user: 'M. Hofer',
    task: 'Ausschreibung Fassade · Vorbereitung Pakete',
    h: 2.25
  }, {
    time: '10:45–12:00',
    project: 'WHB-204',
    phase: 'LP5',
    user: 'M. Hofer',
    task: 'Detail Holzfenster · Knoten W-04',
    h: 1.25
  }, {
    time: '13:00–15:30',
    project: 'SAN-302',
    phase: 'LP4',
    user: 'M. Hofer',
    task: 'Bauantrag · Stellungnahme Denkmalschutz',
    h: 2.50
  }, {
    time: '15:30–17:45',
    project: 'BÜR-118',
    phase: 'LP6',
    user: 'M. Hofer',
    task: 'LV Trockenbau · Position 3.40–3.78',
    h: 2.25
  }];
  const risiken = [{
    proj: 'SAN-302',
    label: 'Stunden 70 % über Plan in LP4 — Bauantrag verzögert',
    severity: 'hoch'
  }, {
    proj: 'BÜR-118',
    label: 'Honorarabschlag 4 seit 38 Tagen offen (€ 184.500)',
    severity: 'mittel'
  }, {
    proj: 'EFH-512',
    label: 'Vertrag noch nicht unterzeichnet — LP2 läuft',
    severity: 'mittel'
  }];
  const fmtEur = (n, frac = 0) => new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: frac,
    maximumFractionDigits: frac
  }).format(n);
  const fmtNum = (n, frac = 0) => new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac
  }).format(n);
  const fmtPct = (n, frac = 0) => `${(n * 100).toFixed(frac).replace('.', ',')}\u00a0%`;
  return {
    projects,
    honorartafel,
    leistungsphasen,
    team,
    kpis,
    monatsstunden,
    heute,
    risiken,
    fmtEur,
    fmtNum,
    fmtPct
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/16_26742bc6.jsx", error: String((e && e.message) || e) }); }

// extracted/js/17_90237563.jsx
try { (() => {
// Stratum shared shell — sidebar, topbar, page wrapper used by every screen.
// Each screen passes `active` to highlight the right tab.

const StratumSidebar = ({
  active = 'Übersicht'
}) => {
  const items = [['Übersicht', 'dashboard'], ['Projekte', 'project'], ['Akquise', 'folder'], ['Zeiterfassung', 'clock'], ['HOAI-Rechner', 'calc'], ['Honorare', 'euro'], ['Team', 'team'], ['Auswertungen', 'reports']];
  return /*#__PURE__*/React.createElement("div", {
    className: "m-side",
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 20,
      padding: '0 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(ModuloMark, {
    size: 16,
    color: "var(--surface)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Modulo"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10
    }
  }, "Hofer \xB7 Renner"))), /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      padding: '8px 10px 4px'
    }
  }, "Arbeitsbereich"), items.map(([label, icon]) => {
    const isActive = label === active;
    return /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 10px',
        background: isActive ? 'var(--surface)' : 'transparent',
        borderRadius: 6,
        fontSize: 13,
        color: isActive ? 'var(--text)' : 'var(--text-dim)',
        fontWeight: isActive ? 600 : 400,
        boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 14
    }), /*#__PURE__*/React.createElement("span", null, label), isActive && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        width: 4,
        height: 4,
        borderRadius: 2,
        background: 'var(--accent)'
      }
    }));
  }), /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      padding: '20px 10px 4px'
    }
  }, "Letzte Projekte"), [['BÜR-118', 'Bürohaus Stadtkrone'], ['WHB-204', 'Wohnhaus Bergmann'], ['SAN-302', 'Sanierung Maxvorstadt']].map(([id, name]) => /*#__PURE__*/React.createElement("div", {
    key: id,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      padding: '6px 10px',
      borderRadius: 6,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, id), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-dim)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, name))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px',
      background: 'var(--surface)',
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 15,
      background: '#d97c4a',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 600
    }
  }, "MH"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500
    }
  }, "Maria Hofer"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10
    }
  }, "Partnerin")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevdown",
    size: 12
  })));
};

// Page header — title, subtitle, search, primary action.
const StratumHeader = ({
  title,
  subtitle,
  breadcrumb,
  action,
  secondary,
  search = true
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 14,
    marginBottom: 4
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0
  }
}, breadcrumb && /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 6,
    fontSize: 11,
    marginBottom: 4
  }
}, breadcrumb.map((b, i) => /*#__PURE__*/React.createElement(React.Fragment, {
  key: i
}, /*#__PURE__*/React.createElement("span", {
  className: i === breadcrumb.length - 1 ? '' : 'm-mute',
  style: {
    color: i === breadcrumb.length - 1 ? 'var(--text)' : 'var(--text-dim)'
  }
}, b), i < breadcrumb.length - 1 && /*#__PURE__*/React.createElement(Icon, {
  name: "chevron",
  size: 9
})))), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: -0.5
  }
}, title), subtitle && /*#__PURE__*/React.createElement("div", {
  className: "m-mute",
  style: {
    fontSize: 12,
    marginTop: 2
  }
}, subtitle)), search && /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    fontSize: 12,
    color: 'var(--text-mute)',
    width: 220
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: "search",
  size: 12
}), /*#__PURE__*/React.createElement("span", null, "Suchen\u2026"), /*#__PURE__*/React.createElement("span", {
  style: {
    marginLeft: 'auto',
    fontFamily: 'var(--font-data)',
    fontSize: 10
  }
}, "\u2318K")), secondary && /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '8px 14px',
    borderRadius: 8,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    fontSize: 12,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer'
  }
}, secondary), action && /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '8px 16px',
    borderRadius: 8,
    background: 'var(--accent)',
    color: 'var(--surface)',
    fontSize: 12,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer'
  }
}, action));

// Card wrapper for Stratum.
const SCard = ({
  children,
  style,
  padding = 18,
  header,
  headerAction
}) => /*#__PURE__*/React.createElement("div", {
  className: "m-card",
  style: {
    padding: header ? 0 : padding,
    ...style
  }
}, header && /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '16px 18px 10px',
    display: 'flex',
    alignItems: 'baseline',
    gap: 10,
    borderBottom: '1px solid var(--border)'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 14,
    fontWeight: 600
  }
}, header.title), header.subtitle && /*#__PURE__*/React.createElement("div", {
  className: "m-mute",
  style: {
    fontSize: 11
  }
}, header.subtitle), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1
  }
}), headerAction), /*#__PURE__*/React.createElement("div", {
  style: {
    padding: header ? padding : 0
  }
}, children));

// Pill-style tag (rounded full on Stratum).
const STag = ({
  children,
  tone = 'default',
  style
}) => {
  const tones = {
    default: {
      bg: 'var(--surface-2)',
      fg: 'var(--text-dim)'
    },
    accent: {
      bg: 'var(--accent-dim)',
      fg: 'var(--accent)'
    },
    pos: {
      bg: 'color-mix(in oklch, var(--pos) 18%, transparent)',
      fg: 'var(--pos)'
    },
    neg: {
      bg: 'color-mix(in oklch, var(--neg) 18%, transparent)',
      fg: 'var(--neg)'
    },
    warn: {
      bg: 'color-mix(in oklch, var(--warn) 22%, transparent)',
      fg: 'var(--warn)'
    },
    outline: {
      bg: 'transparent',
      fg: 'var(--text-dim)',
      border: '1px solid var(--border)'
    }
  };
  const t = tones[tone] || tones.default;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '3px 9px',
      borderRadius: 999,
      fontSize: 11,
      fontFamily: 'var(--font-data)',
      letterSpacing: 0.02,
      background: t.bg,
      color: t.fg,
      border: t.border,
      ...style
    }
  }, children);
};

// Page layout — sidebar + main with padding.
const StratumPage = ({
  active,
  children,
  padding = '24px 28px'
}) => /*#__PURE__*/React.createElement("div", {
  className: "m-app theme-stratum dens-comfy",
  style: {
    width: 1280,
    height: 800,
    display: 'grid',
    gridTemplateColumns: '230px 1fr',
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement(StratumSidebar, {
  active: active
}), /*#__PURE__*/React.createElement("div", {
  style: {
    padding,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    overflow: 'hidden'
  }
}, children));
Object.assign(window, {
  StratumSidebar,
  StratumHeader,
  StratumPage,
  SCard,
  STag
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/17_90237563.jsx", error: String((e && e.message) || e) }); }

// extracted/js/18_fee6c38e.jsx
try { (() => {
// Soll/Ist B — STRATUM
// Soll/Ist als Heatmap matrix: Projekte × Leistungsphasen.
// Cells show ratio Ist/Soll der Stunden; click reveals details.

const BudgetStratum = () => {
  const d = window.ModuloData;

  // Heatmap data: for each project, each LP, return ratio of ist/soll.
  const matrix = d.projects.map(p => {
    return d.leistungsphasen.map(lp => {
      const prog = p.progress[lp.nr - 1];
      if (prog === 0) return null;
      const sollH = p.planned * (lp.anteil / 100) * (prog / 100);
      const istH = sollH * (0.7 + Math.random() * 0.7);
      // make sure SAN-302 LP4 is overrun
      let ratio = istH / Math.max(1, sollH);
      if (p.id === 'SAN-302' && lp.nr === 4) ratio = 1.7;
      if (p.id === 'BÜR-118' && lp.nr === 6) ratio = 1.18;
      return ratio;
    });
  });
  const colorFor = r => {
    if (r == null) return 'var(--surface-2)';
    if (r < 0.85) return 'color-mix(in oklch, var(--accent) 60%, var(--surface))';
    if (r < 1.0) return 'var(--pos)';
    if (r < 1.05) return 'color-mix(in oklch, var(--pos) 60%, var(--surface))';
    if (r < 1.15) return 'var(--warn)';
    return 'var(--neg)';
  };
  const textFor = r => r != null && r > 0.85 && r < 1.15 ? 'var(--surface)' : 'var(--text)';
  return /*#__PURE__*/React.createElement("div", {
    className: "m-app theme-stratum dens-comfy",
    style: {
      width: 1280,
      height: 800,
      display: 'grid',
      gridTemplateColumns: '230px 1fr',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(StratumSidebar, {
    active: "Auswertungen"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Auswertungen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: -0.5,
      marginTop: 2
    }
  }, "Soll/Ist-Heatmap"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 12,
      marginTop: 2
    }
  }, "Stundenverbrauch je Projekt und Leistungsphase \xB7 Ist \xF7 Soll")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, ['2024', '2025', '2026', 'YTD'].map((y, i) => /*#__PURE__*/React.createElement("div", {
    key: y,
    className: "m-pill",
    style: {
      padding: '6px 12px',
      fontSize: 11,
      background: i === 3 ? 'var(--accent)' : 'var(--surface)',
      color: i === 3 ? 'var(--surface)' : 'var(--text-dim)',
      borderColor: 'transparent'
    }
  }, y)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, [{
    eyebrow: 'Stunden Σ Ist',
    value: d.fmtNum(15_430) + ' h',
    sub: 'Soll: 14.620 h · +5,5 %',
    warn: false
  }, {
    eyebrow: 'Mehraufwand Stunden',
    value: '+ 810 h',
    sub: '~ 68.040 € interne Kosten',
    warn: true
  }, {
    eyebrow: 'Phasen mit Überschreitung',
    value: '6 / 47',
    sub: 'aktive LP-Zellen',
    warn: true
  }, {
    eyebrow: 'Phasen unter Soll',
    value: '23 / 47',
    sub: 'Effizienzgewinn',
    warn: false
  }].map((k, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "m-card",
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, k.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 22,
      fontWeight: 600,
      marginTop: 4,
      letterSpacing: -0.4,
      color: k.warn ? 'var(--neg)' : 'var(--text)'
    }
  }, k.value), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 4
    }
  }, k.sub)))), /*#__PURE__*/React.createElement("div", {
    className: "m-card",
    style: {
      flex: 1,
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600
    }
  }, "Portfolio \xB7 Stunden Soll/Ist je Phase"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 12,
      marginTop: 2
    }
  }, "Klicken Sie eine Zelle, um Details zu \xF6ffnen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "Skala"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      alignItems: 'center'
    }
  }, [['unter 85 %', 'color-mix(in oklch, var(--accent) 60%, var(--surface))'], ['85–100 %', 'var(--pos)'], ['100–105 %', 'color-mix(in oklch, var(--pos) 60%, var(--surface))'], ['105–115 %', 'var(--warn)'], ['> 115 %', 'var(--neg)']].map(([label, c]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 14,
      background: c,
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 10
    }
  }, label)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 70px repeat(9, 1fr) 100px',
      gap: 4,
      alignItems: 'center',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      textAlign: 'right',
      fontSize: 9
    }
  }, "Honorar"), d.leistungsphasen.map(lp => /*#__PURE__*/React.createElement("div", {
    key: lp.nr,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 12,
      fontWeight: 600
    }
  }, "LP", lp.nr), /*#__PURE__*/React.createElement("div", {
    className: "m-mute m-num",
    style: {
      fontSize: 9
    }
  }, lp.anteil, "%"))), /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      textAlign: 'right',
      fontSize: 9
    }
  }, "\u03A3 \u0394"), d.projects.map((p, pi) => {
    const row = matrix[pi];
    const totalSoll = row.reduce((s, r, i) => r != null ? s + p.planned * d.leistungsphasen[i].anteil / 100 : s, 0);
    const totalIst = row.reduce((s, r, i) => r != null ? s + r * p.planned * d.leistungsphasen[i].anteil / 100 : s, 0);
    const delta = totalIst - totalSoll;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: p.id
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        paddingRight: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 500
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 10,
        marginTop: 1
      }
    }, p.id, " \xB7 LP", p.phase)), /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        textAlign: 'right',
        fontSize: 11
      }
    }, d.fmtEur(p.fee / 1000, 0), "k"), row.map((r, ci) => /*#__PURE__*/React.createElement("div", {
      key: ci,
      style: {
        aspectRatio: '1',
        maxHeight: 44,
        background: colorFor(r),
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: textFor(r),
        position: 'relative'
      }
    }, r != null && /*#__PURE__*/React.createElement("span", {
      className: "m-num",
      style: {
        fontSize: 10,
        fontWeight: 600
      }
    }, Math.round(r * 100)))), /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        textAlign: 'right',
        fontSize: 11,
        color: delta > 0 ? 'var(--neg)' : 'var(--pos)',
        fontWeight: 600
      }
    }, delta > 0 ? '+' : '', Math.round(delta), " h"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 16,
      display: 'flex',
      alignItems: 'center',
      fontSize: 11,
      color: 'var(--text-dim)',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert",
    size: 12
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "SAN-302 LP4"), " liegt bei 170 % \u2014 Bauantrag verz\xF6gert sich, Umbauzuschlag pr\xFCfen."), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      color: 'var(--accent)',
      cursor: 'pointer'
    }
  }, "Heatmap exportieren \u2197")))));
};
Object.assign(window, {
  BudgetStratum
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/18_fee6c38e.jsx", error: String((e && e.message) || e) }); }

// extracted/js/19_6de7acc9.jsx
try { (() => {
// Stratum — Team & Auslastung
// Team grid with utilization, individual workload, current capacity chart.

const StratumTeam = () => {
  const d = window.ModuloData;
  const utilByMember = {
    mh: {
      week: 0.91,
      target: 0.85,
      billable: 0.78,
      projects: ['BÜR-118', 'WHB-204', 'SAN-302']
    },
    ar: {
      week: 0.86,
      target: 0.85,
      billable: 0.82,
      projects: ['BÜR-118', 'GEW-441']
    },
    lv: {
      week: 0.92,
      target: 0.90,
      billable: 0.88,
      projects: ['KIT-077', 'EFH-512']
    },
    sn: {
      week: 0.78,
      target: 0.90,
      billable: 0.72,
      projects: ['BÜR-118', 'SAN-302']
    },
    jk: {
      week: 0.94,
      target: 0.90,
      billable: 0.91,
      projects: ['BÜR-118', 'WHB-204', 'GEW-441']
    },
    ec: {
      week: 0.83,
      target: 0.85,
      billable: 0.78,
      projects: ['BÜR-118', 'SAN-302']
    },
    tb: {
      week: 0.62,
      target: 0.70,
      billable: 0.45,
      projects: ['Schulung', 'EFH-512']
    }
  };

  // Weekly utilization sparkline (last 8 weeks).
  const series = base => Array.from({
    length: 8
  }, (_, i) => base + Math.sin(i * 0.7 + base * 10) * 0.06 + i * 0.005);
  return /*#__PURE__*/React.createElement(StratumPage, {
    active: "Team"
  }, /*#__PURE__*/React.createElement(StratumHeader, {
    title: "Team & Auslastung",
    subtitle: "7 Mitarbeitende \xB7 280 Plan-Stunden pro Woche",
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }), " Mitarbeiter*in"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "filter",
      size: 12
    }), " Filter")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14
    }
  }, [{
    eyebrow: 'Ø Auslastung · KW 43',
    value: '86 %',
    sub: 'Ziel 82 % · + 4 Pp',
    tone: 'pos'
  }, {
    eyebrow: 'Verrechenbar',
    value: '78 %',
    sub: '8 % intern · 14 % Akquise',
    tone: 'accent'
  }, {
    eyebrow: 'Ø Stundensatz',
    value: '95 €/h',
    sub: 'gemischt · alle Rollen',
    tone: 'default'
  }, {
    eyebrow: 'Überlast > 95 %',
    value: '2 Personen',
    sub: 'J. Klar · L. Vogel',
    tone: 'warn'
  }].map((k, i) => /*#__PURE__*/React.createElement(SCard, {
    key: i,
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, k.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: -0.5,
      marginTop: 4
    }
  }, k.value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(STag, {
    tone: k.tone
  }, k.sub))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 14,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Mitarbeitende"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "Auslastung \xB7 Verrechenbarkeit \xB7 aktive Projekte")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, d.team.map(m => {
    const u = utilByMember[m.id];
    const over = u.week > 0.95;
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      style: {
        display: 'grid',
        gridTemplateColumns: '40px 1.2fr 100px 1fr 100px 1fr',
        gap: 14,
        padding: '16px 18px',
        borderBottom: '1px solid var(--border)',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 18,
        background: m.color,
        color: '#fff',
        fontSize: 12,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, m.name.split(' ').map(n => n[0]).join('')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600
      }
    }, m.name), /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 11,
        marginTop: 1
      }
    }, m.role)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "m-eyebrow",
      style: {
        fontSize: 9
      }
    }, "Auslastung"), /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontSize: 16,
        fontWeight: 600,
        marginTop: 2,
        color: over ? 'var(--neg)' : 'var(--text)'
      }
    }, Math.round(u.week * 100), " %")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8,
        background: 'var(--surface-2)',
        borderRadius: 4,
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${Math.min(u.week * 100, 100)}%`,
        height: '100%',
        background: over ? 'var(--neg)' : 'var(--accent)',
        borderRadius: 4
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: `${u.target * 100}%`,
        top: -2,
        bottom: -2,
        width: 1,
        background: 'var(--text-dim)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "m-mute",
      style: {
        fontSize: 10
      }
    }, "Ziel ", Math.round(u.target * 100), "%"), /*#__PURE__*/React.createElement("span", {
      className: "m-num m-mute",
      style: {
        fontSize: 10
      }
    }, "verr. ", Math.round(u.billable * 100), " %"))), /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontSize: 13,
        fontWeight: 500
      }
    }, m.rate, " \u20AC/h"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4
      }
    }, u.projects.map(p => /*#__PURE__*/React.createElement(STag, {
      key: p,
      tone: "outline",
      style: {
        fontSize: 9,
        padding: '2px 7px'
      }
    }, p)))));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Kapazität · nächste 4 Wochen',
      subtitle: 'Plan vs. zugesagte Stunden'
    },
    padding: 18
  }, /*#__PURE__*/React.createElement(CapacityChart, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: 'var(--accent)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "Zugesagt")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: 'color-mix(in oklch, var(--accent) 30%, var(--surface-2))',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "Frei")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 1,
      background: 'var(--neg)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "Kapazit\xE4ts\xADgrenze")))), /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Skills im Team'
    },
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [['BIM · Revit', 5, 7], ['ArchiCAD', 3, 7], ['Bauleitung LP8', 4, 7], ['HOAI-Vertragsrecht', 2, 7], ['Bestand · Sanierung', 3, 7], ['Denkmalschutz', 1, 7]].map(([skill, have, total], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 80px 40px',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, skill), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 3
    }
  }, Array.from({
    length: total
  }).map((_, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    style: {
      flex: 1,
      height: 12,
      borderRadius: 2,
      background: j < have ? 'var(--accent)' : 'var(--surface-2)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "m-num m-mute",
    style: {
      fontSize: 11,
      textAlign: 'right'
    }
  }, have, "/", total))))))));
};
const CapacityChart = () => {
  const w = 320,
    h = 100,
    padL = 26,
    padR = 8,
    padT = 8,
    padB = 22;
  const weeks = ['KW43', 'KW44', 'KW45', 'KW46', 'KW47'];
  const capacity = 280; // h/week
  const planned = [240, 268, 295, 312, 274];
  const committed = [240, 240, 220, 240, 200];
  const x = i => padL + i / (weeks.length - 1) * (w - padL - padR);
  const y = v => h - padB - v / 350 * (h - padT - padB);
  const bw = (w - padL - padR) / weeks.length * 0.5;
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: h + 12,
    viewBox: `0 0 ${w} ${h + 12}`,
    style: {
      display: 'block'
    }
  }, [100, 200, 280, 350].map(v => /*#__PURE__*/React.createElement("g", {
    key: v
  }, /*#__PURE__*/React.createElement("line", {
    x1: padL,
    x2: w - padR,
    y1: y(v),
    y2: y(v),
    stroke: "var(--border)",
    strokeDasharray: "2 3"
  }), /*#__PURE__*/React.createElement("text", {
    x: padL - 4,
    y: y(v) + 3,
    fontSize: "9",
    fill: "var(--text-mute)",
    fontFamily: "var(--font-data)",
    textAnchor: "end"
  }, v, "h"))), /*#__PURE__*/React.createElement("line", {
    x1: padL,
    x2: w - padR,
    y1: y(capacity),
    y2: y(capacity),
    stroke: "var(--neg)",
    strokeWidth: "1.5"
  }), weeks.map((wk, i) => {
    const px = x(i) - bw / 2;
    const overplan = planned[i] > capacity;
    return /*#__PURE__*/React.createElement("g", {
      key: wk
    }, /*#__PURE__*/React.createElement("rect", {
      x: px,
      y: y(planned[i]),
      width: bw,
      height: Math.max(0, y(committed[i]) - y(planned[i])),
      fill: "color-mix(in oklch, var(--accent) 30%, var(--surface-2))"
    }), /*#__PURE__*/React.createElement("rect", {
      x: px,
      y: y(committed[i]),
      width: bw,
      height: h - padB - y(committed[i]),
      fill: "var(--accent)"
    }), overplan && /*#__PURE__*/React.createElement("text", {
      x: px + bw / 2,
      y: y(planned[i]) - 4,
      fontSize: "9",
      fill: "var(--neg)",
      fontWeight: "600",
      fontFamily: "var(--font-data)",
      textAnchor: "middle"
    }, "+", planned[i] - capacity, "h"), /*#__PURE__*/React.createElement("text", {
      x: x(i),
      y: h - 8,
      fontSize: "9",
      fill: "var(--text-mute)",
      fontFamily: "var(--font-data)",
      textAnchor: "middle"
    }, wk));
  }));
};
Object.assign(window, {
  StratumTeam
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/19_6de7acc9.jsx", error: String((e && e.message) || e) }); }

// extracted/js/1_8b153bfe.jsx
try { (() => {
// Shared atoms for Modulo mockups — icons, sparkline, mini bar chart, donut.
// All take `currentColor` so they inherit the theme.

const Icon = ({
  name,
  size = 14,
  stroke = 1.6
}) => {
  const p = {
    dashboard: 'M3 3h7v7H3zM14 3h7v4h-7zM14 11h7v10h-7zM3 14h7v7H3zM3 21h0',
    project: 'M3 6h18M3 12h18M3 18h12',
    clock: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
    euro: 'M18 6a8 8 0 1 0 0 12M3 10h10M3 14h10',
    invoice: 'M5 3h10l4 4v14H5zM15 3v4h4M8 12h8M8 16h5',
    team: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c.5-3 3-5 6-5s5.5 2 6 5M17 11a3 3 0 1 0 0-6M22 20c-.3-2-1.6-3.6-3.4-4.4',
    reports: 'M4 19V5M4 19h16M8 15v-5M12 15V8M16 15v-7',
    settings: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
    search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
    chevron: 'M9 6l6 6-6 6',
    chevdown: 'M6 9l6 6 6-6',
    plus: 'M12 5v14M5 12h14',
    play: 'M6 4l14 8-14 8V4z',
    pause: 'M6 5h4v14H6zM14 5h4v14h-4z',
    timer: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 1h6',
    folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    alert: 'M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
    download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
    filter: 'M3 4h18l-7 9v7l-4-2v-5z',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    list: 'M3 6h18M3 12h18M3 18h18',
    arrowup: 'M12 19V5M5 12l7-7 7 7',
    arrowdown: 'M12 5v14M5 12l7 7 7-7',
    arrowright: 'M5 12h14M13 5l7 7-7 7',
    check: 'M5 12l5 5L20 7',
    x: 'M6 6l12 12M18 6L6 18',
    dot: 'M12 12h.01',
    drawing: 'M3 3h18v18H3zM3 9h18M9 3v18',
    calc: 'M5 3h14v18H5zM8 7h8M8 11h2M12 11h2M16 11h-.01M8 15h2M12 15h2M16 15h-.01M8 19h6',
    layers: 'M12 2 2 8l10 6 10-6zM2 14l10 6 10-6M2 11l10 6 10-6'
  }[name] || 'M0 0h0';
  const isFilled = name === 'dot';
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: isFilled ? 'none' : 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0
    }
  }, isFilled ? /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3",
    fill: "currentColor"
  }) : /*#__PURE__*/React.createElement("path", {
    d: p
  }));
};

// Sparkline — accepts array of numbers, returns inline SVG.
const Sparkline = ({
  data,
  w = 80,
  h = 22,
  stroke = 'currentColor',
  fill = 'none',
  strokeWidth = 1.4
}) => {
  if (!data || !data.length) return null;
  const min = Math.min(...data),
    max = Math.max(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, h - (v - min) / range * (h - 2) - 1]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = fill === 'none' ? null : d + ` L ${w} ${h} L 0 ${h} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    style: {
      display: 'block'
    }
  }, area && /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: fill
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }));
};

// Mini horizontal bar showing soll/ist.
const SollIstBar = ({
  ist,
  soll,
  w = 140,
  h = 6,
  good = 'var(--pos)',
  bad = 'var(--neg)',
  neutral = 'var(--accent)'
}) => {
  const pct = Math.min(1.5, ist / soll);
  const color = pct > 1.05 ? bad : pct < 0.85 ? neutral : good;
  const barW = Math.min(pct, 1) * w;
  const overW = pct > 1 ? Math.min(pct - 1, 0.5) * w : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: w,
      height: h,
      background: 'var(--surface-3)',
      borderRadius: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: h,
      width: barW,
      background: color,
      borderRadius: 1
    }
  }), overW > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: barW,
      top: 0,
      height: h,
      width: overW,
      background: 'var(--neg)',
      opacity: 0.6,
      borderRadius: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: w,
      top: -2,
      height: h + 4,
      width: 1,
      background: 'var(--text-dim)'
    }
  }));
};

// Donut showing single percentage (0–1).
const Donut = ({
  pct,
  size = 64,
  stroke = 8,
  color = 'var(--accent)',
  track = 'var(--surface-3)',
  children
}) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    stroke: track,
    strokeWidth: stroke,
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    stroke: color,
    strokeWidth: stroke,
    fill: "none",
    strokeDasharray: c,
    strokeDashoffset: c * (1 - pct),
    transform: `rotate(-90 ${size / 2} ${size / 2})`,
    strokeLinecap: "butt"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, children));
};

// Vertical bar chart for monthly hours.
const MonthBars = ({
  data,
  w = 380,
  h = 110,
  accent = 'var(--accent)'
}) => {
  const max = Math.max(...data.map(d => Math.max(d.ist, d.plan, d.prev || 0)));
  const bw = w / data.length;
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    style: {
      display: 'block'
    }
  }, data.map((d, i) => {
    const x = i * bw + 2;
    const istH = d.ist / max * (h - 18);
    const planH = d.plan / max * (h - 18);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: x,
      x2: x + bw - 4,
      y1: h - 14 - planH,
      y2: h - 14 - planH,
      stroke: "var(--text-mute)",
      strokeDasharray: "2 2",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: x + 2,
      y: h - 14 - istH,
      width: bw - 8,
      height: istH,
      fill: d.future ? 'var(--surface-3)' : accent,
      opacity: d.future ? 0.4 : 0.85
    }), /*#__PURE__*/React.createElement("text", {
      x: x + bw / 2 - 2,
      y: h - 3,
      fontSize: "9",
      fill: "var(--text-mute)",
      textAnchor: "middle",
      fontFamily: "var(--font-data)"
    }, d.m));
  }));
};

// Status dot.
const StatusDot = ({
  status
}) => {
  const map = {
    aktiv: 'var(--pos)',
    abschluss: 'var(--accent)',
    akquise: 'var(--text-mute)',
    pause: 'var(--neg)'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: map[status] || 'var(--text-mute)',
      display: 'inline-block',
      flexShrink: 0
    }
  });
};

// Logo (wordmark + grid mark) — Modulo's brand
const ModuloMark = ({
  size = 16,
  color = 'currentColor'
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("rect", {
  x: "2",
  y: "2",
  width: "9",
  height: "9",
  fill: color
}), /*#__PURE__*/React.createElement("rect", {
  x: "13",
  y: "2",
  width: "9",
  height: "9",
  stroke: color,
  strokeWidth: "2"
}), /*#__PURE__*/React.createElement("rect", {
  x: "2",
  y: "13",
  width: "9",
  height: "9",
  stroke: color,
  strokeWidth: "2"
}), /*#__PURE__*/React.createElement("rect", {
  x: "13",
  y: "13",
  width: "9",
  height: "9",
  fill: color,
  opacity: "0.4"
}));
Object.assign(window, {
  Icon,
  Sparkline,
  SollIstBar,
  Donut,
  MonthBars,
  StatusDot,
  ModuloMark
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/1_8b153bfe.jsx", error: String((e && e.message) || e) }); }

// extracted/js/20_3147d609.jsx
try { (() => {
// Stratum — Mitarbeiter · Mein Tag
// Personal home for a non-admin employee (Sophia Nowak).
// Running timer, today's entries, week summary, who's online, my next absence.

const EmpHome = () => {
  const d = window.ModuloData;
  const me = EMP_USER;

  // Sophia's entries for today (Mi 25.10.) — nur Projekt + Leistungsphase
  const heute = [{
    time: '08:30–10:00',
    proj: 'BÜR-118',
    phase: 'LP6',
    phaseLong: 'Vorbereitung der Vergabe',
    h: 1.50,
    c: '#5fa3a8'
  }, {
    time: '10:15–12:00',
    proj: 'BÜR-118',
    phase: 'LP6',
    phaseLong: 'Vorbereitung der Vergabe',
    h: 1.75,
    c: '#5fa3a8'
  }, {
    time: '13:00–14:30',
    proj: 'SAN-302',
    phase: 'LP4',
    phaseLong: 'Genehmigungsplanung',
    h: 1.50,
    c: '#b89065'
  }];
  const heuteSum = heute.reduce((s, e) => s + e.h, 0);

  // Diese Woche so far (Mo–Mi)
  const week = [{
    d: 'Mo',
    h: 6.5
  }, {
    d: 'Di',
    h: 6.75
  }, {
    d: 'Mi',
    h: heuteSum + 2.25 /* timer running */
  }, {
    d: 'Do',
    h: 0,
    future: true
  }, {
    d: 'Fr',
    h: 0,
    future: true
  }];
  const weekSum = week.reduce((s, e) => s + e.h, 0);
  const weekPlan = me.weekly;
  const onlineNow = EMP_TEAM.filter(t => t.status === 'online' || t.status === 'busy' || t.status === 'away');
  const abwesendHeute = EMP_TEAM.filter(t => t.status === 'vacation' || t.status === 'sick');
  return /*#__PURE__*/React.createElement(EmpPage, {
    active: "Mein Tag"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: -0.5
    }
  }, "Guten Morgen, Sophia"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 12,
      marginTop: 2
    }
  }, "Mittwoch, 25.10.2026 \xB7 KW 43 \xB7 14:35 Uhr")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 12px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      fontSize: 12,
      color: 'var(--text-mute)',
      width: 220
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 12
  }), /*#__PURE__*/React.createElement("span", null, "Projekte, Kolleg:innen\u2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-data)',
      fontSize: 10
    }
  }, "\u2318K")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px',
      borderRadius: 8,
      background: 'var(--accent)',
      color: 'var(--surface)',
      fontSize: 12,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 12
  }), " Zeit erfassen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 16,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 20,
    style: {
      background: 'var(--surface)',
      border: '1.5px solid var(--accent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      color: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: 'var(--accent)',
      animation: 'mp-pulse 1.6s infinite',
      display: 'inline-block'
    }
  }), "TIMER L\xC4UFT \xB7 seit 12:20"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      marginTop: 8
    }
  }, "B\xDCR-118 \xB7 B\xFCrohaus Stadtkrone"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 12,
      marginTop: 2
    }
  }, "Leistungsphase 6 \xB7 Vorbereitung der Vergabe")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 38,
      fontWeight: 600,
      letterSpacing: -1,
      color: 'var(--accent)',
      lineHeight: 1
    }
  }, "02:15:42"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 10,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 17,
      background: 'var(--accent)',
      color: 'var(--surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pause",
    size: 12
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 17,
      background: 'var(--surface-2)',
      color: 'var(--text-dim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    stroke: 2.4
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 17,
      background: 'var(--surface-2)',
      color: 'var(--text-dim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 12
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Heute \xB7 Mi 25.10."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: -0.5
    }
  }, (heuteSum + 2.25).toFixed(2)), /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 13
    }
  }, "/ 6,4 h Soll")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      height: 5,
      background: 'var(--surface-2)',
      borderRadius: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: 'var(--accent)',
      borderRadius: 3
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 6
    }
  }, "+1,1 h \xFCber Soll \xB7 100 % verrechenbar")), /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Diese Woche"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: -0.5
    }
  }, weekSum.toFixed(2)), /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 13
    }
  }, "/ ", weekPlan, ",0 h")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: 'flex',
      gap: 4,
      alignItems: 'flex-end',
      height: 28
    }
  }, week.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 22,
      background: 'var(--surface-2)',
      borderRadius: 2,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: `${w.h / 9 * 100}%`,
      background: w.future ? 'color-mix(in oklch, var(--accent) 25%, var(--surface-2))' : 'var(--accent)',
      borderRadius: 2
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 9
    }
  }, w.d)))))), /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      flex: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Heutige Eintr\xE4ge"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, heute.length, " \xB7 ohne laufenden Timer"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 11,
      color: 'var(--accent)',
      cursor: 'pointer'
    }
  }, "Zur Wochenansicht ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrowright",
    size: 10,
    stroke: 2
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, heute.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '4px 90px 1fr 80px',
      gap: 14,
      padding: '13px 18px',
      alignItems: 'center',
      borderBottom: i < heute.length - 1 ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 4,
      height: 28,
      background: e.c,
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "m-num m-mute",
    style: {
      fontSize: 11
    }
  }, e.time), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: e.c
    }
  }, e.proj), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 11,
      color: 'var(--text-dim)'
    }
  }, e.phase)), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, e.phaseLong)), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 14,
      textAlign: 'right',
      fontWeight: 500
    }
  }, e.h.toFixed(2), " h")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 18px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-eyebrow"
  }, "Summe"), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, heuteSum.toFixed(2), " h"), /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "+ Timer 02:15 = ", (heuteSum + 2.25).toFixed(2), " h"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 12px',
      borderRadius: 6,
      background: 'var(--surface-2)',
      fontSize: 11,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 11
  }), " Manueller Eintrag")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Wer ist da?"), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 11
    }
  }, onlineNow.length, " von ", EMP_TEAM.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, onlineNow.slice(0, 5).map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 14,
      background: p.color,
      color: '#fff',
      fontSize: 10,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, p.name.split(' ').map(n => n[0]).join('')), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -1,
      bottom: -1
    }
  }, /*#__PURE__*/React.createElement(PresenceDot, {
    status: p.status
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, p.name.replace(/(\w)\w+\s/, '$1. ')), p.self && /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 9
    }
  }, "du")), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, p.activity)), p.bis && /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, "bis ", p.bis)))), abwesendHeute.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      paddingTop: 12,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Heute abwesend"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, abwesendHeute.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 11,
      background: p.color,
      color: '#fff',
      fontSize: 9,
      fontWeight: 600,
      opacity: 0.65,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, p.name.split(' ').map(n => n[0]).join('')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11
    }
  }, p.name), /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginLeft: 'auto'
    }
  }, p.activity)))))), /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Diese Woche"), /*#__PURE__*/React.createElement("span", {
    className: "m-eyebrow",
    style: {
      fontSize: 9,
      cursor: 'pointer',
      color: 'var(--accent)'
    }
  }, "KALENDER \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, [{
    tag: 'HEUTE',
    uhr: '15:30',
    label: 'Jour fixe BÜR-118',
    sub: 'mit M. Hofer · Konfraum 2',
    tone: 'accent'
  }, {
    tag: 'DO 26.',
    uhr: '09:00',
    label: 'Werkstatttermin Holz',
    sub: 'WHB-204 · Schreinerei Aigner',
    tone: 'default'
  }, {
    tag: 'DO 26.',
    uhr: '14:00',
    label: 'Schulung Revit 2026',
    sub: '4 h · interne Weiterbildung',
    tone: 'default'
  }, {
    tag: 'FR 27.',
    uhr: 'ganztägig',
    label: 'Brückentag · Urlaub geplant',
    sub: 'noch nicht eingereicht',
    tone: 'warn'
  }].map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '60px 1fr',
      gap: 10,
      padding: '8px 0',
      alignItems: 'flex-start',
      borderTop: i ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9,
      color: it.tone === 'accent' ? 'var(--accent)' : 'var(--text-mute)'
    }
  }, it.tag), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 11,
      marginTop: 1
    }
  }, it.uhr)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500
    }
  }, it.label), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 1
    }
  }, it.sub)))))), /*#__PURE__*/React.createElement(SCard, {
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Donut, {
    pct: me.urlaub.rest / me.urlaub.jahr,
    size: 56,
    stroke: 6,
    color: "var(--accent)",
    track: "var(--surface-2)"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, me.urlaub.rest)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Urlaub \xB7 Resttage"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontWeight: 600
    }
  }, me.urlaub.rest, " Tage"), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, " + ", me.urlaub.geplant, " geplant")), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 1
    }
  }, "bis 31.12.2026 \xB7 28 Tage Anspruch")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '7px 12px',
      borderRadius: 6,
      background: 'var(--accent)',
      color: 'var(--surface)',
      fontSize: 11,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "Antrag stellen"))))), /*#__PURE__*/React.createElement("style", null, `@keyframes mp-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.35 } }`));
};
Object.assign(window, {
  EmpHome
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/20_3147d609.jsx", error: String((e && e.message) || e) }); }

// extracted/js/2_b3b77a21.jsx
try { (() => {
// Stratum — Einstellungen (Settings)
// Settings sub-nav + HOAI defaults form + hourly rates table + integrations.

const StratumSettings = () => {
  const d = window.ModuloData;
  const settingsNav = [['user', 'Konto', false], ['folder', 'Büro & Steuer', false], ['calc', 'HOAI-Standards', true], ['euro', 'Stundensätze & Tarife', false], ['team', 'Benutzer & Rollen', false], ['layers', 'Integrationen', false], ['download', 'Export & Datenschutz', false]];
  return /*#__PURE__*/React.createElement(StratumPage, {
    active: "\xDCbersicht",
    padding: "24px 28px"
  }, /*#__PURE__*/React.createElement(StratumHeader, {
    title: "Einstellungen",
    subtitle: "Standardwerte f\xFCr Honorarberechnung, Stundens\xE4tze, Team-Zugriff",
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 12,
      stroke: 2.4
    }), " \xC4nderungen speichern"),
    search: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '240px 1fr',
      gap: 18,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 12
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      padding: '8px 12px 4px'
    }
  }, "Bereiche"), settingsNav.map(([icon, label, active]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      borderRadius: 6,
      marginBottom: 2,
      background: active ? 'var(--surface-2)' : 'transparent',
      color: active ? 'var(--text)' : 'var(--text-dim)',
      fontSize: 13,
      fontWeight: active ? 600 : 400
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon === 'user' ? 'team' : icon,
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, label), active && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      width: 4,
      height: 4,
      borderRadius: 2,
      background: 'var(--accent)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Honorarberechnung · Standards',
      subtitle: 'Werte werden in neuen Projekten als Voreinstellung übernommen'
    },
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(SettingField, {
    label: "Standard-Honorarzone",
    hint: "bei neuen Projekten"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, ['I', 'II', 'III', 'IV', 'V'].map(z => /*#__PURE__*/React.createElement("div", {
    key: z,
    style: {
      flex: 1,
      padding: '10px 0',
      textAlign: 'center',
      borderRadius: 6,
      background: z === 'III' ? 'var(--accent)' : 'var(--surface-2)',
      color: z === 'III' ? 'var(--surface)' : 'var(--text-dim)',
      fontFamily: 'var(--font-data)',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, z)))), /*#__PURE__*/React.createElement(SettingField, {
    label: "Honorarsatz",
    hint: "\xA7 7 Vereinbarung"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, ['Mindest', 'Mittel', 'Höchst'].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      flex: 1,
      padding: '10px 0',
      textAlign: 'center',
      borderRadius: 6,
      background: i === 1 ? 'var(--accent)' : 'var(--surface-2)',
      color: i === 1 ? 'var(--surface)' : 'var(--text-dim)',
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, s, "satz")))), /*#__PURE__*/React.createElement(SettingField, {
    label: "Nebenkosten \xB7 \xA7 14",
    hint: "pauschal in % vom Honorar"
  }, /*#__PURE__*/React.createElement(ValueInput, {
    value: "6,00",
    suffix: "%"
  })), /*#__PURE__*/React.createElement(SettingField, {
    label: "Umbauzuschlag \xB7 \xA7 6",
    hint: "bei Umbau-Projekten"
  }, /*#__PURE__*/React.createElement(ValueInput, {
    value: "33",
    suffix: "%"
  })), /*#__PURE__*/React.createElement(SettingField, {
    label: "MwSt.",
    hint: "Umsatzsteuer"
  }, /*#__PURE__*/React.createElement(ValueInput, {
    value: "19",
    suffix: "%"
  })), /*#__PURE__*/React.createElement(SettingField, {
    label: "Zahlungsziel \xB7 Abschl\xE4ge",
    hint: "ab Rechnungsdatum"
  }, /*#__PURE__*/React.createElement(ValueInput, {
    value: "14",
    suffix: "Tage"
  })))), /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Leistungsphasen · Standardprozente §34',
      subtitle: 'Voreingestellte Phasen für neue Gebäudeplanungsprojekte'
    },
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(9, 1fr)',
      gap: 6
    }
  }, d.leistungsphasen.map(lp => /*#__PURE__*/React.createElement("div", {
    key: lp.nr,
    style: {
      padding: 12,
      borderRadius: 6,
      background: 'var(--surface-2)',
      textAlign: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9
    }
  }, "LP ", lp.nr), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--accent)',
      marginTop: 2
    }
  }, lp.anteil), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 9
    }
  }, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      lineHeight: 1.2,
      marginTop: 4,
      color: 'var(--text-dim)'
    }
  }, lp.name.split(' ').slice(0, 2).join(' '))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: 12,
      background: 'var(--accent-dim)',
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert",
    size: 14,
    stroke: 2
  }), "\u03A3 100 % gem\xE4\xDF HOAI 2021 \xA734 \u2014 angepasste Phasenverteilungen werden im Honorar\xADangebot dokumentiert.")), /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Interne Stundensätze · Kostenermittlung',
      subtitle: 'Zur Berechnung von Deckungsbeitrag und Soll/Ist'
    },
    padding: 0
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-2)'
    }
  }, ['Rolle', 'Interner Satz', 'Verrechnungssatz Min.', 'Verrechnungssatz Mittel', 'Verrechnungssatz Max.', 'Multiplikator'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    className: "m-eyebrow",
    style: {
      textAlign: h === 'Rolle' ? 'left' : 'right',
      padding: '10px 16px',
      fontWeight: 500,
      fontSize: 9.5
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, [['Partner*in', 120, 145, 165, 195], ['Architekt*in (Senior)', 92, 115, 125, 140], ['Architekt*in', 78, 98, 110, 125], ['Bauzeichner*in', 58, 72, 84, 95], ['Praktikant*in', 28, 45, 52, 62]].map(([role, intern, min, mid, max], i) => /*#__PURE__*/React.createElement("tr", {
    key: role,
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 16px',
      fontWeight: 500
    }
  }, role), /*#__PURE__*/React.createElement("td", {
    className: "m-num",
    style: {
      padding: '12px 16px',
      textAlign: 'right'
    }
  }, intern, " \u20AC/h"), /*#__PURE__*/React.createElement("td", {
    className: "m-num m-mute",
    style: {
      padding: '12px 16px',
      textAlign: 'right'
    }
  }, min, " \u20AC/h"), /*#__PURE__*/React.createElement("td", {
    className: "m-num",
    style: {
      padding: '12px 16px',
      textAlign: 'right',
      color: 'var(--accent)',
      fontWeight: 600
    }
  }, mid, " \u20AC/h"), /*#__PURE__*/React.createElement("td", {
    className: "m-num m-mute",
    style: {
      padding: '12px 16px',
      textAlign: 'right'
    }
  }, max, " \u20AC/h"), /*#__PURE__*/React.createElement("td", {
    className: "m-num",
    style: {
      padding: '12px 16px',
      textAlign: 'right'
    }
  }, "\xD7", (mid / intern).toFixed(2))))))), /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Integrationen'
    },
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12
    }
  }, [['DATEV', 'Buchhaltung · Rechnungsexport', true, 'verbunden'], ['lexoffice', 'Alternative Buchhaltung', false, 'verfügbar'], ['Outlook 365', 'Kalender & Mail', true, 'verbunden'], ['Bauantragsportal Bayern', 'BayBauPortal', false, 'verfügbar'], ['Capmo', 'Bautagebuch · Mängel', true, 'verbunden'], ['Revit', 'BIM-Stundenübertragung', false, 'in Beta']].map(([name, sub, connected, status], i) => /*#__PURE__*/React.createElement("div", {
    key: name,
    style: {
      padding: 12,
      border: '1px solid var(--border)',
      borderRadius: 6,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: 'var(--surface-2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-dim)',
      fontSize: 10,
      fontWeight: 600,
      fontFamily: 'var(--font-data)',
      flexShrink: 0
    }
  }, name.slice(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 1
    }
  }, sub), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(STag, {
    tone: connected ? 'pos' : 'outline'
  }, connected && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: 3,
      background: 'var(--pos)'
    }
  }), status))))))))));
};
const SettingField = ({
  label,
  hint,
  children
}) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 8
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    fontWeight: 600
  }
}, label), hint && /*#__PURE__*/React.createElement("div", {
  className: "m-mute",
  style: {
    fontSize: 11
  }
}, hint)), children);
const ValueInput = ({
  value,
  suffix
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    background: 'var(--surface-2)',
    borderRadius: 6,
    border: '1px solid var(--border)'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "m-num",
  style: {
    fontSize: 16,
    fontWeight: 600
  }
}, value), /*#__PURE__*/React.createElement("span", {
  className: "m-mute",
  style: {
    fontSize: 11
  }
}, suffix), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1
  }
}), /*#__PURE__*/React.createElement(Icon, {
  name: "chevdown",
  size: 12
}));
Object.assign(window, {
  StratumSettings
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/2_b3b77a21.jsx", error: String((e && e.message) || e) }); }

// extracted/js/3_94e3e103.jsx
try { (() => {
// Stratum — Honorare (Fees / Invoices)
// Pipeline visualisation + table of all Abschläge.

const StratumHonorare = () => {
  const d = window.ModuloData;

  // Synthetic invoice list across projects.
  const rechnungen = [{
    nr: '2026-A4-WHB204',
    proj: 'WHB-204',
    name: 'Wohnhaus Bergmann',
    abschlag: 'A 4',
    amount: 57_894,
    date: '25.10.',
    due: '08.11.',
    status: 'entwurf'
  }, {
    nr: '2026-A5-BÜR118',
    proj: 'BÜR-118',
    name: 'Bürohaus Stadtkrone',
    abschlag: 'A 5',
    amount: 184_500,
    date: '17.09.',
    due: '17.10.',
    status: 'überfällig',
    days: 38
  }, {
    nr: '2026-A8-KIT077',
    proj: 'KIT-077',
    name: 'Kita Lerchenfeld',
    abschlag: 'A 8',
    amount: 64_180,
    date: '02.10.',
    due: '02.11.',
    status: 'versendet',
    days: 23
  }, {
    nr: '2026-S1-GEW441',
    proj: 'GEW-441',
    name: 'Gewerbehof Riem',
    abschlag: 'S 1',
    amount: 88_900,
    date: '18.09.',
    due: '02.10.',
    status: 'bezahlt'
  }, {
    nr: '2026-A3-SAN302',
    proj: 'SAN-302',
    name: 'Sanierung Maxvorst.',
    abschlag: 'A 3',
    amount: 72_400,
    date: '10.09.',
    due: '24.09.',
    status: 'bezahlt'
  }, {
    nr: '2026-A1-EFH512',
    proj: 'EFH-512',
    name: 'Doppelhaus Grünwald',
    abschlag: 'A 1',
    amount: 28_400,
    date: '20.08.',
    due: '03.09.',
    status: 'bezahlt'
  }, {
    nr: '2026-A4-BÜR118',
    proj: 'BÜR-118',
    name: 'Bürohaus Stadtkrone',
    abschlag: 'A 4',
    amount: 305_700,
    date: '20.04.',
    due: '04.05.',
    status: 'bezahlt'
  }, {
    nr: '2026-A7-KIT077',
    proj: 'KIT-077',
    name: 'Kita Lerchenfeld',
    abschlag: 'A 7',
    amount: 58_300,
    date: '12.05.',
    due: '26.05.',
    status: 'bezahlt'
  }];
  const statusMap = {
    entwurf: {
      tone: 'default',
      label: 'Entwurf'
    },
    versendet: {
      tone: 'accent',
      label: 'Versendet'
    },
    überfällig: {
      tone: 'neg',
      label: 'Überfällig'
    },
    bezahlt: {
      tone: 'pos',
      label: 'Bezahlt'
    }
  };
  return /*#__PURE__*/React.createElement(StratumPage, {
    active: "Honorare"
  }, /*#__PURE__*/React.createElement(StratumHeader, {
    title: "Honorare & Rechnungen",
    subtitle: "Gesch\xE4ftsjahr 2026 \xB7 Stand 25.10.",
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }), " Abschlagsrechnung"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 12
    }), " DATEV-Export")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14
    }
  }, [{
    eyebrow: 'Abgerechnet YTD',
    value: d.fmtEur(2_491_900),
    sub: '23 Rechnungen',
    tone: 'pos'
  }, {
    eyebrow: 'Offene Forderungen',
    value: d.fmtEur(312_800),
    sub: '4 Rechnungen offen',
    tone: 'accent'
  }, {
    eyebrow: 'Überfällig > 30 T.',
    value: d.fmtEur(184_500),
    sub: 'BÜR-118 · A 5 · 38 T.',
    tone: 'neg'
  }, {
    eyebrow: 'DSO',
    value: '38 Tage',
    sub: 'Ziel ≤ 30 · ↑ 4 T. vs. Q2',
    tone: 'warn'
  }].map((k, i) => /*#__PURE__*/React.createElement(SCard, {
    key: i,
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, k.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: -0.5,
      marginTop: 4
    }
  }, k.value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(STag, {
    tone: k.tone
  }, k.sub))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 14,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 18px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Honorar-Pipeline \xB7 Portfolio"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "\u03A3 ", d.fmtEur(4_650_000), " Vertragsvolumen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 18,
      borderRadius: 4,
      overflow: 'hidden',
      gap: 2
    }
  }, [['Bezahlt', 2_491_900, 'var(--pos)'], ['Offen ≤ 30 T.', 128_300, 'var(--accent)'], ['Überfällig > 30 T.', 184_500, 'var(--neg)'], ['In Vorbereitung', 235_000, 'color-mix(in oklch, var(--accent) 35%, var(--surface-2))'], ['Noch nicht abgerufen', 1_610_300, 'var(--surface-3)']].map(([k, v, c], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: v,
      background: c,
      position: 'relative'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8,
      fontSize: 10
    }
  }, [['Bezahlt', '2.491,9k €', 'var(--pos)'], ['Offen ≤ 30 T.', '128,3k €', 'var(--accent)'], ['Überfällig', '184,5k €', 'var(--neg)'], ['In Vorbereitung', '235,0k €', 'color-mix(in oklch, var(--accent) 35%, var(--surface-2))'], ['Noch nicht abgerufen', '1.610,3k €', 'var(--surface-3)']].map(([k, v, c], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: c
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 11
    }
  }, v)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", {
    style: {
      position: 'sticky',
      top: 0,
      background: 'var(--surface)',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid var(--border)'
    }
  }, ['Rechnung', 'Projekt', 'Abschlag', 'Datum', 'Fällig', 'Betrag', 'Status'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    className: "m-eyebrow",
    style: {
      textAlign: h === 'Betrag' ? 'right' : 'left',
      padding: '10px 14px',
      fontWeight: 500,
      fontSize: 9.5
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rechnungen.map((r, i) => {
    const st = statusMap[r.status];
    return /*#__PURE__*/React.createElement("tr", {
      key: r.nr,
      style: {
        borderBottom: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontSize: 11,
        fontWeight: 500
      }
    }, r.nr)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12
      }
    }, r.name), /*#__PURE__*/React.createElement("div", {
      className: "m-num m-mute",
      style: {
        fontSize: 10
      }
    }, r.proj)), /*#__PURE__*/React.createElement("td", {
      className: "m-num",
      style: {
        padding: '12px 14px',
        fontSize: 12,
        fontWeight: 600
      }
    }, r.abschlag), /*#__PURE__*/React.createElement("td", {
      className: "m-num m-mute",
      style: {
        padding: '12px 14px',
        fontSize: 11
      }
    }, r.date), /*#__PURE__*/React.createElement("td", {
      className: "m-num",
      style: {
        padding: '12px 14px',
        fontSize: 11,
        color: r.status === 'überfällig' ? 'var(--neg)' : 'var(--text-dim)'
      }
    }, r.due, r.days && r.status === 'überfällig' && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 4
      }
    }, "+", r.days, "T")), /*#__PURE__*/React.createElement("td", {
      className: "m-num",
      style: {
        padding: '12px 14px',
        textAlign: 'right',
        fontSize: 13,
        fontWeight: 600
      }
    }, d.fmtEur(r.amount)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 14px'
      }
    }, /*#__PURE__*/React.createElement(STag, {
      tone: st.tone
    }, st.label)));
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 18,
    style: {
      border: '1.5px solid var(--neg)',
      background: 'color-mix(in oklch, var(--neg) 4%, var(--surface))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert",
    size: 14,
    stroke: 2
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Mahnstufe-1 f\xE4llig")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, "B\xDCR-118 \xB7 A 4 \xB7 seit 38 Tagen"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 22,
      fontWeight: 600,
      marginTop: 4,
      letterSpacing: -0.4,
      color: 'var(--neg)'
    }
  }, d.fmtEur(184_500)), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 2
    }
  }, "S\xFCd Invest GmbH \xB7 CFO Wilfried Brandt")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '8px 12px',
      background: 'var(--neg)',
      color: 'var(--surface)',
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 500,
      textAlign: 'center',
      cursor: 'pointer'
    }
  }, "Mahnung erstellen"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 12px',
      background: 'var(--surface-2)',
      borderRadius: 6,
      fontSize: 12,
      cursor: 'pointer'
    }
  }, "Anrufen"))), /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Cash-Forecast',
      subtitle: '30 Tage'
    },
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: -0.5,
      color: 'var(--pos)'
    }
  }, "+ 241k \u20AC"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 2
    }
  }, "Eingang prognostiziert"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [['25.10.', 'WHB-204 · A 4', 57_894, 'entwurf'], ['08.11.', 'WHB-204 · A 4 fällig', 57_894, 'erwartet'], ['02.11.', 'KIT-077 · A 8 fällig', 64_180, 'erwartet'], ['15.11.', 'BÜR-118 · A 5 vorber.', 184_500, 'plan']].map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '50px 1fr auto',
      gap: 10,
      padding: '6px 0',
      borderTop: i ? '1px solid var(--border)' : 'none',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, row[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, row[1]), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 12,
      fontWeight: 500
    }
  }, d.fmtEur(row[2] / 1000, 1), "k"))))), /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Honorareingang \xB7 12 Monate"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Sparkline, {
    data: [180, 220, 140, 260, 310, 290, 250, 240, 290, 310, 260, 290],
    w: 260,
    h: 50,
    stroke: "var(--accent)",
    fill: "color-mix(in oklch, var(--accent) 12%, transparent)",
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 10,
      marginTop: 4,
      color: 'var(--text-mute)',
      fontFamily: 'var(--font-data)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Nov 25"), /*#__PURE__*/React.createElement("span", null, "Okt 26"))))));
};
Object.assign(window, {
  StratumHonorare
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/3_94e3e103.jsx", error: String((e && e.message) || e) }); }

// extracted/js/4_98dece45.jsx
try { (() => {
// Stratum — Mitarbeiter-Shell (Employee view)
// Restricted sidebar: Mein Tag · Zeiterfassung · Kalender · Team · Abwesenheit.
// User identity: Sophia Nowak (Architektin, non-admin).

const EMP_USER = {
  id: 'sn',
  initials: 'SN',
  name: 'Sophia Nowak',
  role: 'Architektin',
  color: '#b89065',
  weekly: 32,
  // Teilzeit 32h
  urlaub: {
    jahr: 28,
    genommen: 16,
    geplant: 5,
    rest: 7
  }
};

// Inline calendar icon (sidebar) — not in shared atoms.
const CalIcon = ({
  size = 14,
  stroke = 1.6
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: {
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "5",
  width: "18",
  height: "16",
  rx: "1.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 10h18M8 3v4M16 3v4"
}));
const AwayIcon = ({
  size = 14,
  stroke = 1.6
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: {
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M4 21V10l8-5 8 5v11"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 21v-7h6v7"
}));
const EmpSidebar = ({
  active = 'Mein Tag'
}) => {
  const items = [{
    label: 'Mein Tag',
    icon: 'dashboard'
  }, {
    label: 'Zeiterfassung',
    icon: 'clock'
  }, {
    label: 'Kalender',
    icon: 'calendar'
  }, {
    label: 'Team',
    icon: 'team'
  }, {
    label: 'Abwesenheit',
    icon: 'away'
  }];
  const renderIcon = icon => {
    if (icon === 'calendar') return /*#__PURE__*/React.createElement(CalIcon, {
      size: 14
    });
    if (icon === 'away') return /*#__PURE__*/React.createElement(AwayIcon, {
      size: 14
    });
    return /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 14
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "m-side",
    style: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 20,
      padding: '0 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(ModuloMark, {
    size: 16,
    color: "var(--surface)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Modulo"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10
    }
  }, "Hofer \xB7 Renner"))), /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      padding: '8px 10px 4px'
    }
  }, "Mein Arbeitsplatz"), items.map(({
    label,
    icon
  }) => {
    const isActive = label === active;
    return /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 10px',
        background: isActive ? 'var(--surface)' : 'transparent',
        borderRadius: 6,
        fontSize: 13,
        color: isActive ? 'var(--text)' : 'var(--text-dim)',
        fontWeight: isActive ? 600 : 400,
        boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
      }
    }, renderIcon(icon), /*#__PURE__*/React.createElement("span", null, label), isActive && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        width: 4,
        height: 4,
        borderRadius: 2,
        background: 'var(--accent)'
      }
    }));
  }), /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      padding: '20px 10px 4px'
    }
  }, "Meine Projekte"), [['BÜR-118', 'Bürohaus Stadtkrone'], ['SAN-302', 'Sanierung Maxvorstadt']].map(([id, name]) => /*#__PURE__*/React.createElement("div", {
    key: id,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      padding: '6px 10px',
      borderRadius: 6,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, id), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-dim)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, name))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: '10px 12px',
      borderRadius: 8,
      background: 'var(--surface)',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9
    }
  }, "Urlaubskonto \xB7 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 4,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 18,
      fontWeight: 600
    }
  }, EMP_USER.urlaub.rest), /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 10
    }
  }, "/ ", EMP_USER.urlaub.jahr, " Tage frei")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      marginTop: 6
    }
  }, Array.from({
    length: EMP_USER.urlaub.jahr
  }).map((_, i) => {
    const isGenommen = i < EMP_USER.urlaub.genommen;
    const isGeplant = i >= EMP_USER.urlaub.genommen && i < EMP_USER.urlaub.genommen + EMP_USER.urlaub.geplant;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        height: 4,
        borderRadius: 1,
        background: isGenommen ? 'var(--accent)' : isGeplant ? 'color-mix(in oklch, var(--accent) 45%, var(--surface-2))' : 'var(--surface-2)'
      }
    });
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px',
      background: 'var(--surface)',
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 15,
      background: EMP_USER.color,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 600
    }
  }, EMP_USER.initials), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -1,
      bottom: -1,
      width: 9,
      height: 9,
      borderRadius: 5,
      background: 'var(--pos)',
      border: '2px solid var(--surface)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500
    }
  }, EMP_USER.name), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10
    }
  }, EMP_USER.role)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevdown",
    size: 12
  })));
};

// Page layout — sidebar + main with padding.
const EmpPage = ({
  active,
  children,
  padding = '24px 28px'
}) => /*#__PURE__*/React.createElement("div", {
  className: "m-app theme-stratum dens-comfy",
  style: {
    width: 1280,
    height: 800,
    display: 'grid',
    gridTemplateColumns: '230px 1fr',
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement(EmpSidebar, {
  active: active
}), /*#__PURE__*/React.createElement("div", {
  style: {
    padding,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    overflow: 'hidden'
  }
}, children));

// Shared employee header (reuses StratumHeader vocabulary, no search by default)
const EmpHeader = ({
  title,
  subtitle,
  action,
  secondary,
  search = true
}) => /*#__PURE__*/React.createElement(StratumHeader, {
  title: title,
  subtitle: subtitle,
  action: action,
  secondary: secondary,
  search: search
});

// Tiny presence dot — used in Team views and avatars
const PresenceDot = ({
  status = 'online',
  size = 9,
  border = 'var(--surface)'
}) => {
  const map = {
    online: 'var(--pos)',
    busy: 'var(--neg)',
    away: 'var(--warn)',
    offline: 'var(--text-mute)'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: size / 2,
      background: map[status],
      border: `2px solid ${border}`
    }
  });
};

// Team roster with presence status (shared by Mein Tag, Team, and Kalender)
// Used statuses: online · busy · away · offline · vacation · sick
const EMP_TEAM = [{
  id: 'mh',
  name: 'Maria Hofer',
  role: 'Partnerin',
  color: '#d97c4a',
  status: 'busy',
  activity: 'Bauherrentermin BÜR-118',
  ort: 'Stuttgart',
  bis: '17:30'
}, {
  id: 'ar',
  name: 'Andreas Renner',
  role: 'Partner',
  color: '#7a9e6e',
  status: 'online',
  activity: 'GEW-441 · Abnahmebericht',
  ort: 'Büro',
  bis: null
}, {
  id: 'lv',
  name: 'Lukas Vogel',
  role: 'Architekt',
  color: '#6c7bb8',
  status: 'online',
  activity: 'KIT-077 · Bauleitung remote',
  ort: 'Home',
  bis: null
}, {
  id: 'sn',
  name: 'Sophia Nowak',
  role: 'Architektin',
  color: '#b89065',
  status: 'online',
  activity: 'BÜR-118 · LP6 Trockenbau',
  ort: 'Büro',
  bis: null,
  self: true
}, {
  id: 'jk',
  name: 'Jonas Klar',
  role: 'Bauzeichner',
  color: '#9a7eb5',
  status: 'away',
  activity: 'Mittagspause',
  ort: 'Büro',
  bis: '13:00'
}, {
  id: 'ec',
  name: 'Elif Çelik',
  role: 'Architektin · BIM',
  color: '#5fa3a8',
  status: 'vacation',
  activity: 'Urlaub bis 03.11.',
  ort: '—',
  bis: null
}, {
  id: 'tb',
  name: 'Tobias Burr',
  role: 'Praktikant',
  color: '#a8a8a8',
  status: 'sick',
  activity: 'Krank gemeldet',
  ort: '—',
  bis: null
}];
Object.assign(window, {
  EMP_USER,
  EMP_TEAM,
  EmpSidebar,
  EmpPage,
  EmpHeader,
  PresenceDot,
  CalIcon,
  AwayIcon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/4_98dece45.jsx", error: String((e && e.message) || e) }); }

// extracted/js/5_3f1c7887.jsx
try { (() => {
// Stratum — Projekte (project list)
// KPI strip + filter chips + grid of project cards w/ LP progress.

const StratumProjekte = () => {
  const d = window.ModuloData;
  return /*#__PURE__*/React.createElement(StratumPage, {
    active: "Projekte"
  }, /*#__PURE__*/React.createElement(StratumHeader, {
    title: "Projekte",
    subtitle: "12 aktiv \xB7 3 in Akquise \xB7 2 mit Risiko",
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }), " Neues Projekt"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 12
    }), " Export")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14
    }
  }, [{
    eyebrow: 'Aktive Projekte',
    value: '12',
    sub: '+ 2 vs. Q2',
    tone: 'pos'
  }, {
    eyebrow: 'Honorarvolumen offen',
    value: '4,33 Mio €',
    sub: 'aus 7 laufenden',
    tone: 'accent'
  }, {
    eyebrow: 'Stunden offen LP1–9',
    value: '14.820 h',
    sub: '~ 64 Personen-Wochen',
    tone: 'default'
  }, {
    eyebrow: 'Risiko-Projekte',
    value: '2',
    sub: 'SAN-302 · BÜR-118',
    tone: 'warn'
  }].map((k, i) => /*#__PURE__*/React.createElement(SCard, {
    key: i,
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, k.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: -0.5,
      marginTop: 4
    }
  }, k.value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(STag, {
    tone: k.tone
  }, k.sub))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      background: 'var(--surface)',
      padding: 4,
      borderRadius: 8,
      border: '1px solid var(--border)'
    }
  }, ['Alle', 'Aktiv', 'Akquise', 'Abschluss', 'Pause'].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      padding: '6px 12px',
      borderRadius: 5,
      fontSize: 12,
      background: i === 1 ? 'var(--accent)' : 'transparent',
      color: i === 1 ? 'var(--surface)' : 'var(--text-dim)',
      fontWeight: i === 1 ? 600 : 400,
      cursor: 'pointer'
    }
  }, s))), [['Projektleitung', 'Alle'], ['Honorarzone', 'Alle'], ['Region', 'Alle'], ['Bauherr', 'Alle']].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 12px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, k, ":"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500
    }
  }, v), /*#__PURE__*/React.createElement(Icon, {
    name: "chevdown",
    size: 11
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      background: 'var(--surface)',
      padding: 4,
      borderRadius: 8,
      border: '1px solid var(--border)'
    }
  }, [['grid', true], ['list', false]].map(([icon, active]) => /*#__PURE__*/React.createElement("div", {
    key: icon,
    style: {
      padding: '6px 8px',
      borderRadius: 5,
      background: active ? 'var(--surface-2)' : 'transparent',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 14
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14,
      alignContent: 'start'
    }
  }, d.projects.map(p => {
    const phasePct = p.progress.reduce((s, v) => s + v, 0) / 900;
    const sollH = p.planned * Math.max(0.05, phasePct);
    const overrun = p.hours / Math.max(1, sollH);
    const statusTone = p.status === 'aktiv' ? 'pos' : p.status === 'akquise' ? 'default' : 'accent';
    const billedPct = p.billed / p.fee;
    return /*#__PURE__*/React.createElement(SCard, {
      key: p.id,
      padding: 0,
      style: {
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '14px 16px 12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "m-num m-mute",
      style: {
        fontSize: 10
      }
    }, p.id), /*#__PURE__*/React.createElement(STag, {
      tone: statusTone
    }, p.status), p.umbau && /*#__PURE__*/React.createElement(STag, {
      tone: "warn"
    }, "UMBAU"), /*#__PURE__*/React.createElement("span", {
      className: "m-mute",
      style: {
        fontSize: 10,
        marginLeft: 'auto'
      }
    }, "HZ ", p.zone)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        lineHeight: 1.25
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 11,
        marginTop: 2
      }
    }, p.client, " \xB7 ", p.city)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '8px 16px 12px',
        background: 'var(--surface-2)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "m-eyebrow",
      style: {
        fontSize: 9
      }
    }, "LP ", p.phase, "/9"), /*#__PURE__*/React.createElement("span", {
      className: "m-num m-mute",
      style: {
        fontSize: 10
      }
    }, Math.round(phasePct * 100), " % Honorar erbracht")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 2,
        height: 8
      }
    }, p.progress.map((v, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: d.leistungsphasen[i].anteil,
        background: v === 100 ? 'var(--accent)' : v > 0 ? 'color-mix(in oklch, var(--accent) 50%, var(--surface))' : 'var(--surface-3)',
        borderRadius: 2
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '12px 16px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        fontSize: 11
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "m-eyebrow",
      style: {
        fontSize: 9
      }
    }, "Honorar"), /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontSize: 14,
        fontWeight: 600,
        marginTop: 2
      }
    }, d.fmtEur(p.fee / 1000, 0), "k \u20AC"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4,
        height: 3,
        background: 'var(--surface-2)',
        borderRadius: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${billedPct * 100}%`,
        height: '100%',
        background: 'var(--accent)',
        borderRadius: 2
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "m-num m-mute",
      style: {
        fontSize: 10,
        marginTop: 3
      }
    }, Math.round(billedPct * 100), " % abgerechnet")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "m-eyebrow",
      style: {
        fontSize: 9
      }
    }, "Stunden Ist/Soll"), /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontSize: 14,
        fontWeight: 600,
        marginTop: 2,
        color: overrun > 1.1 ? 'var(--neg)' : overrun > 1 ? 'var(--warn)' : 'var(--text)'
      }
    }, Math.round(overrun * 100), " %"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(SollIstBar, {
      ist: p.hours,
      soll: sollH,
      w: 100,
      h: 3
    })), /*#__PURE__*/React.createElement("div", {
      className: "m-num m-mute",
      style: {
        fontSize: 10,
        marginTop: 3
      }
    }, d.fmtNum(p.hours), " / ", d.fmtNum(sollH, 0), " h"))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 16px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--surface)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: -4
      }
    }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: 18,
        height: 18,
        borderRadius: 9,
        background: d.team[i].color,
        color: '#fff',
        fontSize: 8,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1.5px solid var(--surface)',
        marginLeft: i > 0 ? -6 : 0
      }
    }, d.team[i].name.split(' ').map(n => n[0]).join('')))), /*#__PURE__*/React.createElement("span", {
      className: "m-mute",
      style: {
        fontSize: 10
      }
    }, p.lead), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "m-mute",
      style: {
        fontSize: 10
      }
    }, "Abnahme ", p.deadline), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron",
      size: 11
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1.5px dashed var(--border)',
      borderRadius: 6,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      color: 'var(--text-mute)',
      cursor: 'pointer',
      minHeight: 280
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, "Projekt anlegen"))));
};
Object.assign(window, {
  StratumProjekte
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/5_3f1c7887.jsx", error: String((e && e.message) || e) }); }

// extracted/js/6_6dcf60de.jsx
try { (() => {
// Stratum — Mitarbeiter · Kalender
// Month view (October 2026) with multiple event layers:
//  · Own time blocks (LP work) — small dots
//  · Team absences (vacation/sickness)
//  · Project deadlines / milestones
//  · Bayern holidays
//  · Personal meetings

const EmpKalender = () => {
  const month = 'Oktober 2026';
  const today = 25;
  // 1.10.2026 ist Donnerstag — DE Mo–So
  // Grid: 5 weeks, Mo–So
  const weeks = [[null, null, null, 1, 2, 3, 4],
  // KW40
  [5, 6, 7, 8, 9, 10, 11],
  // KW41
  [12, 13, 14, 15, 16, 17, 18],
  // KW42
  [19, 20, 21, 22, 23, 24, 25],
  // KW43 (heute Mi 21)
  [26, 27, 28, 29, 30, 31, null] // KW44
  ];
  const kw = [40, 41, 42, 43, 44];

  // Event bag — multi-day spans + single-day items
  // type: 'work' | 'absence' | 'deadline' | 'holiday' | 'meeting' | 'planned'
  const events = {
    1: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.5
    }, {
      type: 'meeting',
      label: 'Kick-Off SAN-302'
    }],
    2: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 7.0
    }],
    5: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.5
    }, {
      type: 'meeting',
      label: 'Jour fixe'
    }],
    6: [{
      type: 'work',
      proj: 'SAN-302',
      c: '#b89065',
      h: 7.0
    }],
    7: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 5.5
    }, {
      type: 'deadline',
      label: 'BÜR-118 · LP5 Abgabe',
      urgent: true
    }],
    8: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.0
    }],
    9: [{
      type: 'work',
      proj: 'SAN-302',
      c: '#b89065',
      h: 6.5
    }],
    12: [{
      type: 'work',
      proj: 'SAN-302',
      c: '#b89065',
      h: 6.5
    }],
    13: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.5
    }, {
      type: 'meeting',
      label: 'Vergabegespräch Trockenbau'
    }],
    14: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 7.5
    }],
    15: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.0
    }],
    16: [{
      type: 'work',
      proj: 'SAN-302',
      c: '#b89065',
      h: 5.5
    }],
    19: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.5
    }],
    20: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 7.0
    }, {
      type: 'deadline',
      label: 'SAN-302 · Bauantrag',
      urgent: false
    }],
    21: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.5
    }],
    22: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.75
    }],
    23: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.5
    }, {
      type: 'meeting',
      label: 'Schulung Revit 09–13'
    }],
    26: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.5
    }, {
      type: 'meeting',
      label: 'Werkstatttermin Holz'
    }],
    27: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.0
    }, {
      type: 'deadline',
      label: 'BÜR-118 · Vergabe LP6',
      urgent: true
    }],
    28: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.5
    }],
    29: [{
      type: 'work',
      proj: 'SAN-302',
      c: '#b89065',
      h: 6.5
    }],
    30: [{
      type: 'work',
      proj: 'SAN-302',
      c: '#b89065',
      h: 7.0
    }],
    31: [{
      type: 'holiday',
      label: 'Reformationstag (nicht in BY)'
    }],
    // info-only
    3: [{
      type: 'holiday',
      label: 'Tag der Deutschen Einheit'
    }],
    23: [{
      type: 'work',
      proj: 'BÜR-118',
      c: '#5fa3a8',
      h: 6.5
    }, {
      type: 'meeting',
      label: 'Schulung Revit 09–13'
    }]
  };

  // Multi-day absence spans
  const absences = [{
    who: 'E. Çelik',
    from: 19,
    to: 25,
    color: '#5fa3a8',
    kind: 'vacation'
  },
  // Mo–So
  {
    who: 'T. Burr',
    from: 22,
    to: 23,
    color: '#a8a8a8',
    kind: 'sick'
  }, {
    who: 'A. Renner',
    from: 12,
    to: 16,
    color: '#7a9e6e',
    kind: 'vacation'
  }, {
    who: 'Du',
    from: 27,
    to: 30,
    color: '#b89065',
    kind: 'planned'
  },
  // geplanter Urlaub
  {
    who: 'L. Vogel',
    from: 30,
    to: 31,
    color: '#6c7bb8',
    kind: 'bauleitung'
  }];
  const holidays = {
    3: 'Einheit',
    31: 'Reformation'
  };

  // For each day cell: get absences that touch it
  const absencesOn = day => absences.filter(a => day >= a.from && day <= a.to);
  return /*#__PURE__*/React.createElement(EmpPage, {
    active: "Kalender",
    padding: "20px 24px"
  }, /*#__PURE__*/React.createElement(EmpHeader, {
    title: "Kalender",
    subtitle: `${month} · 5 Wochen-Übersicht · eigene Zeiten · Team · Projekte`,
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }), " Termin"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 12
    }), " .ics")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 240px',
      gap: 14,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 4,
      background: 'var(--surface-2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowright",
    size: 11,
    stroke: 2,
    style: {
      transform: 'scaleX(-1)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '5px 12px',
      borderRadius: 4,
      background: 'var(--surface-2)',
      fontSize: 11,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    }
  }, "Heute"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 4,
      background: 'var(--surface-2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowright",
    size: 11,
    stroke: 2
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, month), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: 'var(--surface-2)',
      borderRadius: 4,
      padding: 2
    }
  }, ['Monat', 'Woche', 'Tag', 'Agenda'].map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m,
    style: {
      padding: '4px 12px',
      fontSize: 11,
      background: i === 0 ? 'var(--surface)' : 'transparent',
      color: i === 0 ? 'var(--text)' : 'var(--text-dim)',
      fontWeight: i === 0 ? 600 : 400,
      borderRadius: 3,
      cursor: 'pointer',
      boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
    }
  }, m)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '32px repeat(7, 1fr)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", null), ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      padding: '8px 10px',
      fontSize: 10,
      fontFamily: 'var(--font-data)',
      letterSpacing: 0.08,
      color: i >= 5 ? 'var(--text-mute)' : 'var(--text-dim)',
      fontWeight: 600,
      textTransform: 'uppercase'
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, weeks.map((week, wi) => /*#__PURE__*/React.createElement("div", {
    key: wi,
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: '32px repeat(7, 1fr)',
      borderBottom: wi < weeks.length - 1 ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-2)',
      fontSize: 9,
      fontFamily: 'var(--font-data)',
      color: 'var(--text-mute)',
      fontWeight: 600
    }
  }, "KW", /*#__PURE__*/React.createElement("br", null), kw[wi]), week.map((day, di) => {
    if (!day) return /*#__PURE__*/React.createElement("div", {
      key: di,
      style: {
        background: 'var(--surface-2)',
        opacity: 0.4
      }
    });
    const isToday = day === today;
    const isWeekend = di >= 5;
    const dayEvents = events[day] || [];
    const dayAbs = absencesOn(day);
    const holiday = holidays[day];
    return /*#__PURE__*/React.createElement("div", {
      key: di,
      style: {
        borderLeft: '1px solid var(--border)',
        padding: 5,
        minHeight: 88,
        background: isToday ? 'color-mix(in oklch, var(--accent) 6%, var(--surface))' : isWeekend ? 'var(--surface-2)' : 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        marginBottom: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "m-num",
      style: {
        fontSize: 12,
        fontWeight: isToday ? 700 : 500,
        color: isToday ? 'var(--surface)' : isWeekend ? 'var(--text-mute)' : 'var(--text)',
        background: isToday ? 'var(--accent)' : 'transparent',
        borderRadius: 10,
        padding: isToday ? '1px 6px' : 0,
        minWidth: 18,
        textAlign: 'center'
      }
    }, day), holiday && /*#__PURE__*/React.createElement("span", {
      className: "m-num",
      style: {
        fontSize: 8,
        color: 'var(--neg)',
        fontWeight: 600,
        letterSpacing: 0.04
      }
    }, "\u2605 ", holiday.toUpperCase())), dayAbs.map((a, ai) => {
      const isStart = day === a.from;
      const isEnd = day === a.to;
      return /*#__PURE__*/React.createElement("div", {
        key: ai,
        style: {
          background: a.kind === 'planned' ? `repeating-linear-gradient(45deg, ${a.color}, ${a.color} 3px, color-mix(in oklch, ${a.color} 50%, transparent) 3px, color-mix(in oklch, ${a.color} 50%, transparent) 6px)` : a.color,
          opacity: a.kind === 'sick' ? 0.7 : 0.92,
          color: '#fff',
          fontSize: 9,
          padding: '1px 5px',
          marginLeft: isStart ? 0 : -6,
          marginRight: isEnd ? 0 : -6,
          borderTopLeftRadius: isStart ? 3 : 0,
          borderBottomLeftRadius: isStart ? 3 : 0,
          borderTopRightRadius: isEnd ? 3 : 0,
          borderBottomRightRadius: isEnd ? 3 : 0,
          fontWeight: 600,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, isStart ? `${a.who} · ${a.kind === 'vacation' ? 'Urlaub' : a.kind === 'sick' ? 'Krank' : a.kind === 'planned' ? 'Urlaub (geplant)' : a.kind === 'bauleitung' ? 'Bauleitung' : ''}` : '\u00A0');
    }), dayEvents.filter(e => e.type === 'deadline').map((e, ei) => /*#__PURE__*/React.createElement("div", {
      key: 'd' + ei,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '1px 4px',
        borderRadius: 3,
        background: e.urgent ? 'color-mix(in oklch, var(--neg) 12%, transparent)' : 'color-mix(in oklch, var(--warn) 14%, transparent)',
        color: e.urgent ? 'var(--neg)' : 'var(--warn)',
        fontSize: 9,
        fontWeight: 600,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, "\u25B2 ", e.label)), dayEvents.filter(e => e.type === 'meeting').map((e, ei) => /*#__PURE__*/React.createElement("div", {
      key: 'm' + ei,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        fontSize: 9,
        color: 'var(--text-dim)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 5,
        height: 5,
        borderRadius: 1,
        background: 'var(--text-dim)'
      }
    }), e.label)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        paddingTop: 2
      }
    }, dayEvents.filter(e => e.type === 'work').map((e, ei) => /*#__PURE__*/React.createElement("span", {
      key: 'w' + ei,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: 1,
        background: e.c
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "m-num",
      style: {
        fontSize: 9,
        color: 'var(--text-dim)'
      }
    }, e.h, "h")))));
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Anzeigen"), [{
    c: '#5fa3a8',
    label: 'Meine Zeiten · BÜR-118',
    on: true
  }, {
    c: '#b89065',
    label: 'Meine Zeiten · SAN-302',
    on: true
  }, {
    c: 'var(--accent)',
    label: 'Team-Abwesenheiten',
    on: true
  }, {
    c: 'var(--neg)',
    label: 'Projekt-Deadlines',
    on: true
  }, {
    c: 'var(--text-dim)',
    label: 'Termine & Meetings',
    on: true
  }, {
    c: 'var(--warn)',
    label: 'Feiertage Bayern',
    on: true
  }].map((f, i) => /*#__PURE__*/React.createElement("label", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '5px 0',
      fontSize: 11,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: 2,
      background: f.on ? f.c : 'transparent',
      border: f.on ? 'none' : '1.5px solid var(--border-strong)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff'
    }
  }, f.on && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 9,
    stroke: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: f.on ? 'var(--text)' : 'var(--text-mute)'
    }
  }, f.label)))), /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      flex: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 8px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, "Kommende 14 Tage"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 1
    }
  }, "ab heute \xB7 gefiltert nach Bedeutung")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '4px 0'
    }
  }, [{
    tag: 'HEUTE',
    d: 'Mi 25.',
    items: [{
      c: 'var(--accent)',
      label: 'Jour fixe BÜR-118',
      sub: '15:30 · Konfraum 2'
    }]
  }, {
    tag: 'MORGEN',
    d: 'Do 26.',
    items: [{
      c: '#5fa3a8',
      label: 'Werkstatttermin Holz',
      sub: '09:00 · WHB-204'
    }, {
      c: 'var(--text-dim)',
      label: 'Schulung Revit 2026',
      sub: '14:00 · 4 h intern'
    }]
  }, {
    tag: 'FR 27.',
    d: 'Fr 27.',
    items: [{
      c: 'var(--neg)',
      label: '▲ Vergabe LP6 BÜR-118',
      sub: 'Abgabe Trockenbau · überfällig wenn nicht'
    }, {
      c: 'var(--warn)',
      label: 'Brückentag · Urlaub geplant',
      sub: 'Antrag offen'
    }]
  }, {
    tag: 'KW 44',
    d: 'Mo 30.10. – Mo 02.11.',
    items: [{
      c: 'var(--warn)',
      label: 'Urlaub geplant',
      sub: '4 Tage · Antrag noch offen'
    }, {
      c: 'var(--neg)',
      label: '★ Reformationstag',
      sub: 'Sa 31.10. — kein gesetzl. Feiertag in BY'
    }]
  }].map((g, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '10px 16px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-eyebrow",
    style: {
      fontSize: 9,
      color: g.tag === 'HEUTE' ? 'var(--accent)' : 'var(--text-mute)'
    }
  }, g.tag), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, g.d)), g.items.map((it, ii) => /*#__PURE__*/React.createElement("div", {
    key: ii,
    style: {
      display: 'grid',
      gridTemplateColumns: '3px 1fr',
      gap: 8,
      padding: '4px 0',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 3,
      alignSelf: 'stretch',
      background: it.c,
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      lineHeight: 1.3
    }
  }, it.label), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10,
      marginTop: 1
    }
  }, it.sub)))))))))));
};
Object.assign(window, {
  EmpKalender
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/6_6dcf60de.jsx", error: String((e && e.message) || e) }); }

// extracted/js/7_30a415ac.jsx
try { (() => {
// Stratum — Mitarbeiter · Abwesenheit
// Personal vacation balance, request history, team overview (who's out when).

const EmpAbwesenheit = () => {
  const me = EMP_USER;

  // Monatsstreifen für ein Jahr (mein eigenes 2026)
  // Pro Monat: Tage mit Abwesenheits-Markierung
  const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // {month-idx 0..11, day 1..31, kind}
  const myAbs = [
  // Februar — Ski-Urlaub
  ...range(15, 19).map(d => ({
    m: 1,
    d,
    kind: 'vacation'
  })),
  // Mai — verlängertes WE
  ...range(7, 8).map(d => ({
    m: 4,
    d,
    kind: 'vacation'
  })),
  // Juli — Krank
  {
    m: 6,
    d: 14,
    kind: 'sick'
  }, {
    m: 6,
    d: 15,
    kind: 'sick'
  },
  // August — Sommer-Urlaub
  ...range(3, 21).map(d => ({
    m: 7,
    d,
    kind: 'vacation'
  })),
  // Geplant: Brückentag Okt
  {
    m: 9,
    d: 27,
    kind: 'planned'
  }, {
    m: 9,
    d: 28,
    kind: 'planned'
  }, {
    m: 9,
    d: 29,
    kind: 'planned'
  }, {
    m: 9,
    d: 30,
    kind: 'planned'
  },
  // Weihnachten geplant
  ...range(23, 31).map(d => ({
    m: 11,
    d,
    kind: 'planned'
  }))];
  const today = {
    m: 9,
    d: 25
  };
  function range(a, b) {
    return Array.from({
      length: b - a + 1
    }, (_, i) => a + i);
  }
  const kindMap = {
    vacation: {
      color: 'var(--accent)',
      label: 'Urlaub'
    },
    sick: {
      color: 'var(--neg)',
      label: 'Krank'
    },
    planned: {
      color: 'var(--warn)',
      label: 'beantragt'
    }
  };
  const cellKind = (m, d) => {
    const found = myAbs.find(a => a.m === m && a.d === d);
    return found ? found.kind : null;
  };

  // Anträge
  const requests = [{
    kind: 'planned',
    from: '27.10.',
    to: '30.10.',
    days: 4,
    label: 'Brückentag Allerheiligen',
    status: 'offen',
    sub: 'eingereicht 18.10. · Genehmigerin: M. Hofer'
  }, {
    kind: 'planned',
    from: '23.12.',
    to: '31.12.',
    days: 5,
    label: 'Weihnachten',
    status: 'genehmigt',
    sub: 'genehmigt 02.10. · M. Hofer'
  }, {
    kind: 'sick',
    from: '14.07.',
    to: '15.07.',
    days: 2,
    label: 'Krankheit',
    status: 'abgelegt',
    sub: 'AU eingereicht · automatisch verbucht'
  }, {
    kind: 'vacation',
    from: '03.08.',
    to: '21.08.',
    days: 15,
    label: 'Sommerurlaub Kroatien',
    status: 'abgelegt',
    sub: 'genommen Aug 2026'
  }];

  // Team-Abwesenheiten (nächste 30 Tage Streifen)
  const teamAbs = [{
    who: 'E. Çelik',
    role: 'Architektin · BIM',
    from: 'Mo 19.10.',
    to: 'So 01.11.',
    days: 14,
    kind: 'vacation',
    initials: 'EC',
    c: '#5fa3a8'
  }, {
    who: 'A. Renner',
    role: 'Partner',
    from: 'Mo 02.11.',
    to: 'Mi 04.11.',
    days: 3,
    kind: 'vacation',
    initials: 'AR',
    c: '#7a9e6e'
  }, {
    who: 'T. Burr',
    role: 'Praktikant',
    from: 'Mi 22.10.',
    to: 'Do 23.10.',
    days: 2,
    kind: 'sick',
    initials: 'TB',
    c: '#a8a8a8'
  }, {
    who: 'L. Vogel',
    role: 'Architekt',
    from: 'Mo 09.11.',
    to: 'Fr 13.11.',
    days: 5,
    kind: 'vacation',
    initials: 'LV',
    c: '#6c7bb8'
  }, {
    who: 'M. Hofer',
    role: 'Partnerin',
    from: 'Mo 16.11.',
    to: 'Di 17.11.',
    days: 2,
    kind: 'fortbildung',
    initials: 'MH',
    c: '#d97c4a'
  }];
  return /*#__PURE__*/React.createElement(EmpPage, {
    active: "Abwesenheit"
  }, /*#__PURE__*/React.createElement(EmpHeader, {
    title: "Abwesenheit",
    subtitle: `${me.name} · Urlaubsanspruch ${me.urlaub.jahr} Tage · ${me.urlaub.rest} frei`,
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }), " Antrag stellen"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 12
    }), " \xDCbersicht 2026")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Anspruch 2026"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 26,
      fontWeight: 600,
      marginTop: 4
    }
  }, me.urlaub.jahr, /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 14
    }
  }, " Tage")), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 6
    }
  }, "+ 0 Resttage aus 2025")), /*#__PURE__*/React.createElement(SCard, {
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Bereits genommen"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 26,
      fontWeight: 600,
      marginTop: 4,
      color: 'var(--accent)'
    }
  }, me.urlaub.genommen, /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 14
    }
  }, " Tage")), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 6
    }
  }, "Feb \xB7 Mai \xB7 Aug")), /*#__PURE__*/React.createElement(SCard, {
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Beantragt \xB7 offen"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 26,
      fontWeight: 600,
      marginTop: 4,
      color: 'var(--warn)'
    }
  }, me.urlaub.geplant, /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 14
    }
  }, " Tage")), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 6
    }
  }, "Br\xFCckentag 4 \xB7 Weihnachten genehmigt")), /*#__PURE__*/React.createElement(SCard, {
    padding: 16,
    style: {
      background: 'color-mix(in oklch, var(--accent) 6%, var(--surface))',
      borderColor: 'var(--accent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      color: 'var(--accent)'
    }
  }, "Noch frei verf\xFCgbar"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 26,
      fontWeight: 600,
      marginTop: 4,
      color: 'var(--accent)'
    }
  }, me.urlaub.rest, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--accent)',
      opacity: 0.7
    }
  }, " Tage")), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 6
    }
  }, "verfallen 31.03.2027"))), /*#__PURE__*/React.createElement(SCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Mein Jahr \xB7 2026"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "Tageweise \xB7 Wochenenden ausgeblendet"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      fontSize: 10
    }
  }, Object.entries(kindMap).map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: v.color,
      opacity: k === 'planned' ? 0.6 : 1,
      border: k === 'planned' ? `1px dashed ${v.color}` : 'none',
      backgroundImage: k === 'planned' ? `repeating-linear-gradient(45deg, ${'var(--warn)'} 0 2px, transparent 2px 4px)` : 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, v.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, months.map((m, mi) => /*#__PURE__*/React.createElement("div", {
    key: m,
    style: {
      display: 'grid',
      gridTemplateColumns: '32px 1fr 56px',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 10,
      color: mi === today.m ? 'var(--accent)' : 'var(--text-mute)',
      fontWeight: mi === today.m ? 700 : 500
    }
  }, m), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(31, 1fr)',
      gap: 2
    }
  }, Array.from({
    length: 31
  }, (_, di) => {
    const day = di + 1;
    const inMonth = day <= daysInMonth[mi];
    if (!inMonth) return /*#__PURE__*/React.createElement("div", {
      key: di
    });
    // Determine weekday roughly — for visual differentiation only
    // 1.1.2026 is Donnerstag (4). Compute day-of-week as 0..6 (0=Mo).
    const daysBefore = daysInMonth.slice(0, mi).reduce((s, n) => s + n, 0);
    const dowJan1 = 3; // 0=Mo … so Thursday Jan 1 = 3
    const dow = (dowJan1 + daysBefore + di) % 7;
    const isWeekend = dow >= 5;
    const k = cellKind(mi, day);
    const isToday = mi === today.m && day === today.d;
    const baseBg = isWeekend ? 'var(--surface-2)' : 'var(--surface-3)';
    let bg = baseBg;
    if (k === 'vacation') bg = 'var(--accent)';
    if (k === 'sick') bg = 'var(--neg)';
    if (k === 'planned') bg = `repeating-linear-gradient(45deg, var(--warn), var(--warn) 2px, color-mix(in oklch, var(--warn) 35%, transparent) 2px, color-mix(in oklch, var(--warn) 35%, transparent) 4px)`;
    return /*#__PURE__*/React.createElement("div", {
      key: di,
      title: `${day}.${mi + 1}.${k ? ' · ' + kindMap[k].label : ''}`,
      style: {
        height: 14,
        borderRadius: 2,
        background: bg,
        opacity: isWeekend && !k ? 0.4 : 1,
        border: isToday ? '1.5px solid var(--text)' : 'none',
        boxShadow: isToday ? '0 0 0 1px var(--surface)' : 'none'
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "m-num m-mute",
    style: {
      fontSize: 10,
      textAlign: 'right'
    }
  }, (() => {
    const taken = myAbs.filter(a => a.m === mi && (a.kind === 'vacation' || a.kind === 'planned')).length;
    return taken ? `${taken} Tg.` : '';
  })()))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 14,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Meine Antr\xE4ge"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11
    }
  }, "2026 \xB7 ", requests.length, " Eintr\xE4ge"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '5px 12px',
      borderRadius: 6,
      background: 'var(--accent)',
      color: 'var(--surface)',
      fontSize: 11,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 11
  }), " Neuer Antrag")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, requests.map((r, i) => {
    const statusTone = r.status === 'genehmigt' ? 'pos' : r.status === 'offen' ? 'warn' : 'default';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'grid',
        gridTemplateColumns: '4px 1fr 90px 90px',
        gap: 12,
        padding: '14px 18px',
        borderBottom: i < requests.length - 1 ? '1px solid var(--border)' : 'none',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 4,
        alignSelf: 'stretch',
        borderRadius: 2,
        background: kindMap[r.kind] ? kindMap[r.kind].color : 'var(--text-dim)'
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 500
      }
    }, r.label), /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 11,
        marginTop: 2
      }
    }, r.sub)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontSize: 11
      }
    }, r.from, " \u2013 ", r.to), /*#__PURE__*/React.createElement("div", {
      className: "m-num m-mute",
      style: {
        fontSize: 10,
        marginTop: 1
      }
    }, r.days, " Arbeitstage")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement(STag, {
      tone: statusTone
    }, r.status)));
  }))), /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "Team \xB7 n\xE4chste 30 Tage"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 1
    }
  }, "wer ist wann nicht da \xB7 damit du planen kannst")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, teamAbs.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '28px 1fr 70px',
      gap: 10,
      padding: '12px 18px',
      borderBottom: i < teamAbs.length - 1 ? '1px solid var(--border)' : 'none',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 14,
      background: t.c,
      color: '#fff',
      fontSize: 10,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, t.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, t.who, /*#__PURE__*/React.createElement("span", {
    className: "m-mute",
    style: {
      fontSize: 10
    }
  }, t.role)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      marginTop: 2,
      color: 'var(--text-dim)'
    }
  }, t.from, " \u2192 ", t.to)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(STag, {
    tone: t.kind === 'sick' ? 'neg' : t.kind === 'fortbildung' ? 'default' : 'accent'
  }, t.kind === 'vacation' ? 'Urlaub' : t.kind === 'sick' ? 'Krank' : 'Fortb.'), /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, t.days, " Tg."))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 18px',
      borderTop: '1px solid var(--border)',
      background: 'var(--surface-2)',
      fontSize: 11,
      color: 'var(--text-dim)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Tipp:"), " Ende KW43 / Anfang KW44 sind viele weg \u2014 f\xFCr deine Br\xFCckentag-Anfrage wahrscheinlich kein Problem."))));
};
Object.assign(window, {
  EmpAbwesenheit
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/7_30a415ac.jsx", error: String((e && e.message) || e) }); }

// extracted/js/8_abe1f3de.jsx
try { (() => {
// Stratum — Akquise · Opportunity Pipeline (Kanban)
// Pre-contract opportunities through 5 stages, with a detail panel for the selected card.

const StratumAkquise = () => {
  const d = window.ModuloData;

  // Stages: Anfrage → Qualifizierung → Angebot → Verhandlung → Vertrag/Verloren
  const stages = [{
    id: 'anfrage',
    title: 'Anfrage',
    hint: 'Erstkontakt',
    color: 'var(--text-mute)'
  }, {
    id: 'qualifizierung',
    title: 'Qualifizierung',
    hint: 'Bauherr/Aufgabe geklärt',
    color: 'var(--text-dim)'
  }, {
    id: 'angebot',
    title: 'Angebot',
    hint: 'Honorarangebot raus',
    color: 'var(--accent)'
  }, {
    id: 'verhandlung',
    title: 'Verhandlung',
    hint: 'Klärung HOAI/Leistung',
    color: 'var(--warn)'
  }, {
    id: 'vertrag',
    title: 'Vertrag',
    hint: 'unterzeichnet',
    color: 'var(--pos)'
  }];

  // Synthetic opportunities — anrechenbare Kosten in k€, Honorar geschätzt, Wahrscheinlichkeit.
  const opps = [{
    id: 'SCH-088',
    name: 'Schulerweiterung Pasing',
    client: 'LBB Bayern',
    city: 'München',
    type: 'Öffentlich',
    kosten: 6_400_000,
    fee: 824_300,
    hz: 'IV',
    stage: 'angebot',
    prob: 65,
    owner: 'mh',
    age: 14,
    deadline: '12.11.',
    active: true
  }, {
    id: 'MFH-901',
    name: 'MFH Kapellenweg',
    client: 'Bauherr Privat',
    city: 'Wolfratshausen',
    type: 'Wohnen',
    kosten: 4_200_000,
    fee: 511_700,
    hz: 'III',
    stage: 'anfrage',
    prob: 25,
    owner: 'lv',
    age: 4,
    deadline: '—'
  }, {
    id: 'HOT-126',
    name: 'Hotel Lerchenstein',
    client: 'Lerchen Hospitality',
    city: 'Garmisch',
    type: 'Hotellerie',
    kosten: 18_900_000,
    fee: 2_178_400,
    hz: 'IV',
    stage: 'qualifizierung',
    prob: 35,
    owner: 'ar',
    age: 9,
    deadline: '—'
  }, {
    id: 'PRX-055',
    name: 'Praxisgebäude Dr. Mehl',
    client: 'GbR Mehl/Sturm',
    city: 'Augsburg',
    type: 'Gesundheit',
    kosten: 2_100_000,
    fee: 268_400,
    hz: 'III',
    stage: 'qualifizierung',
    prob: 40,
    owner: 'lv',
    age: 11,
    deadline: '—'
  }, {
    id: 'KGA-208',
    name: 'Kindergarten Vaterstetten',
    client: 'Gemeinde Vaterstetten',
    city: 'Vaterstetten',
    type: 'Öffentlich',
    kosten: 3_950_000,
    fee: 470_300,
    hz: 'III',
    stage: 'angebot',
    prob: 55,
    owner: 'mh',
    age: 21,
    deadline: '30.10.'
  }, {
    id: 'GEW-552',
    name: 'Logistikzentrum Allach',
    client: 'NordSüd Logistik AG',
    city: 'München',
    type: 'Gewerbe',
    kosten: 12_400_000,
    fee: 1_184_600,
    hz: 'II',
    stage: 'verhandlung',
    prob: 70,
    owner: 'ar',
    age: 32,
    deadline: '05.11.'
  }, {
    id: 'WHB-318',
    name: 'Reihenhausanlage Süd',
    client: 'Stadtbau eG',
    city: 'Augsburg',
    type: 'Wohnen',
    kosten: 5_400_000,
    fee: 658_900,
    hz: 'III',
    stage: 'verhandlung',
    prob: 80,
    owner: 'mh',
    age: 18,
    deadline: '08.11.'
  }, {
    id: 'BÜR-411',
    name: 'Co-Working Quartier 4',
    client: 'Quartier4 GmbH',
    city: 'München',
    type: 'Verwaltung',
    kosten: 7_200_000,
    fee: 891_200,
    hz: 'IV',
    stage: 'vertrag',
    prob: 100,
    owner: 'ar',
    age: 64,
    deadline: '24.10.'
  }];
  const byStage = id => opps.filter(o => o.stage === id);
  const sumStage = id => byStage(id).reduce((s, o) => s + o.fee * (o.prob / 100), 0);
  const totalGewichtet = opps.reduce((s, o) => s + o.fee * (o.prob / 100), 0);
  const totalBrutto = opps.reduce((s, o) => s + o.fee, 0);
  const selected = opps.find(o => o.active);
  return /*#__PURE__*/React.createElement(StratumPage, {
    active: "Akquise",
    padding: "20px 24px"
  }, /*#__PURE__*/React.createElement(StratumHeader, {
    title: "Akquise",
    subtitle: "8 Opportunit\xE4ten \xB7 3 Angebote drau\xDFen \xB7 Pipeline gewichtet 4,1 Mio \u20AC",
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }), " Neue Anfrage"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "reports",
      size: 12
    }), " Auswertung")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 12
    }
  }, [{
    eyebrow: 'Pipeline · brutto',
    value: d.fmtEur(totalBrutto / 1_000_000, 2) + ' Mio €',
    sub: '8 aktiv',
    tone: 'default'
  }, {
    eyebrow: 'Pipeline · gewichtet',
    value: d.fmtEur(totalGewichtet / 1_000_000, 2) + ' Mio €',
    sub: 'nach Wahrscheinlichk.',
    tone: 'accent'
  }, {
    eyebrow: 'Win-Rate · 12 M.',
    value: '54 %',
    sub: '15 von 28 gewonnen',
    tone: 'pos'
  }, {
    eyebrow: 'Ø Time-to-Close',
    value: '42 Tage',
    sub: 'Anfrage → Vertrag',
    tone: 'default'
  }, {
    eyebrow: 'Heißeste Lead',
    value: 'WHB-318',
    sub: '80 % · 659k €',
    tone: 'warn'
  }].map((k, i) => /*#__PURE__*/React.createElement(SCard, {
    key: i,
    padding: 14
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, k.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: -0.4,
      marginTop: 4
    }
  }, k.value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(STag, {
    tone: k.tone
  }, k.sub))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      gap: 14,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 8,
      overflow: 'hidden'
    }
  }, stages.map(stg => {
    const items = byStage(stg.id);
    return /*#__PURE__*/React.createElement("div", {
      key: stg.id,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 12px',
        background: 'var(--surface)',
        borderRadius: 6,
        border: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 4,
        background: stg.color
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 600
      }
    }, stg.title), /*#__PURE__*/React.createElement("span", {
      className: "m-num m-mute",
      style: {
        fontSize: 11,
        marginLeft: 'auto'
      }
    }, items.length)), /*#__PURE__*/React.createElement("div", {
      className: "m-num",
      style: {
        fontSize: 13,
        fontWeight: 600,
        marginTop: 4
      }
    }, d.fmtEur(sumStage(stg.id) / 1000, 0), "k \u20AC"), /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 10,
        marginTop: 1
      }
    }, stg.hint)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        overflow: 'auto',
        paddingRight: 2
      }
    }, items.map(o => {
      const owner = d.team.find(t => t.id === o.owner);
      const isSel = o.active;
      const probTone = o.prob >= 70 ? 'pos' : o.prob >= 40 ? 'accent' : 'default';
      return /*#__PURE__*/React.createElement("div", {
        key: o.id,
        style: {
          padding: 10,
          borderRadius: 6,
          background: 'var(--surface)',
          border: '1px solid ' + (isSel ? 'var(--accent)' : 'var(--border)'),
          boxShadow: isSel ? '0 0 0 3px var(--accent-dim)' : 'none',
          cursor: 'pointer'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 4
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "m-num m-mute",
        style: {
          fontSize: 9
        }
      }, o.id), /*#__PURE__*/React.createElement(STag, {
        tone: probTone,
        style: {
          marginLeft: 'auto',
          fontSize: 9,
          padding: '1px 6px'
        }
      }, o.prob, " %")), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          lineHeight: 1.25
        }
      }, o.name), /*#__PURE__*/React.createElement("div", {
        className: "m-mute",
        style: {
          fontSize: 10,
          marginTop: 2
        }
      }, o.client), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 8,
          display: 'flex',
          alignItems: 'baseline',
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "m-num",
        style: {
          fontSize: 13,
          fontWeight: 600
        }
      }, d.fmtEur(o.fee / 1000, 0), "k"), /*#__PURE__*/React.createElement("span", {
        className: "m-mute",
        style: {
          fontSize: 9
        }
      }, "\xB7 HZ ", o.hz)), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 8,
          paddingTop: 8,
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 16,
          height: 16,
          borderRadius: 8,
          background: owner.color,
          color: '#fff',
          fontSize: 8,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, owner.name.split(' ').map(n => n[0]).join('')), /*#__PURE__*/React.createElement("span", {
        className: "m-mute",
        style: {
          fontSize: 9
        }
      }, o.age, " T."), o.deadline !== '—' && /*#__PURE__*/React.createElement("span", {
        className: "m-num",
        style: {
          fontSize: 9,
          marginLeft: 'auto',
          color: 'var(--warn)'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "clock",
        size: 9
      }), " ", o.deadline)));
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 60,
        border: '1.5px dashed var(--border)',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-mute)',
        fontSize: 11,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    }))));
  })), /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--accent-dim)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, selected.id), /*#__PURE__*/React.createElement(STag, {
    tone: "accent"
  }, "in Bearbeitung")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.3
    }
  }, selected.name), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 2
    }
  }, selected.client, " \xB7 ", selected.city)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      marginBottom: 8
    }
  }, "Honorar-Vorkalkulation \xB7 HOAI \xA735"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '6px 10px',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "Anrechenb. Kosten"), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      textAlign: 'right'
    }
  }, d.fmtEur(selected.kosten)), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "Honorarzone"), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      textAlign: 'right'
    }
  }, selected.hz, " \xB7 Mittelsatz"), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "Grundhonorar"), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      textAlign: 'right'
    }
  }, d.fmtEur(selected.fee * 0.94)), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "Nebenkosten \xB7 6 %"), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      textAlign: 'right'
    }
  }, d.fmtEur(selected.fee * 0.06)), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      height: 1,
      background: 'var(--border)',
      margin: '4px 0'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Honorar gesamt"), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      textAlign: 'right',
      fontWeight: 600,
      fontSize: 14
    }
  }, d.fmtEur(selected.fee)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-eyebrow"
  }, "Wahrscheinlichkeit"), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--accent)'
    }
  }, selected.prob, " %")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--surface-2)',
      borderRadius: 3,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${selected.prob}%`,
      height: '100%',
      background: 'var(--accent)',
      borderRadius: 3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${selected.prob}%`,
      top: -4,
      width: 14,
      height: 14,
      background: 'var(--surface)',
      border: '2px solid var(--accent)',
      borderRadius: 7,
      transform: 'translateX(-50%)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "m-num m-mute",
    style: {
      fontSize: 10,
      marginTop: 8
    }
  }, "Gewichtet: ", d.fmtEur(selected.fee * selected.prob / 100), " \u20AC")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      marginBottom: 8
    }
  }, "Verlauf"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [['12.10.', 'Erstanfrage per Mail · LBB Bayern · Frau Lechner', true], ['16.10.', 'Vor-Ort-Termin Bestandsschule', true], ['22.10.', 'Honorarangebot v1 versendet · 824 k €', true], ['—', 'Antwort erwartet · Frist 12.11.', false], ['—', 'Vertragsentwurf vorbereiten', false]].map(([when, what, done], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '46px 14px 1fr',
      gap: 8,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-num m-mute",
    style: {
      fontSize: 10
    }
  }, when), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginTop: 3,
      background: done ? 'var(--accent)' : 'var(--surface-2)',
      border: done ? 'none' : '1.5px solid var(--border)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: done ? 'var(--text)' : 'var(--text-mute)',
      lineHeight: 1.35
    }
  }, what))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      marginBottom: 8
    }
  }, "Notiz \xB7 Maria Hofer \xB7 22.10."), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 10,
      background: 'var(--surface-2)',
      borderRadius: 6,
      fontSize: 11.5,
      lineHeight: 1.45,
      color: 'var(--text-dim)'
    }
  }, "Frau Lechner m\xF6chte Verl\xE4ngerung der Frist auf 19.11. \u2014 abgestimmt mit AR. Konkurrenzangebot von Steidle & Partner wahrscheinlich, Preisgespr\xE4ch erforderlich."))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      borderTop: '1px solid var(--border)',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '9px 12px',
      background: 'var(--accent)',
      color: 'var(--surface)',
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 500,
      textAlign: 'center',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12,
    stroke: 2.4
  }), " Stage vorr\xFCcken"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '9px 12px',
      background: 'var(--surface-2)',
      borderRadius: 6,
      fontSize: 12,
      cursor: 'pointer',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "invoice",
    size: 12
  }))))));
};
Object.assign(window, {
  StratumAkquise
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/8_abe1f3de.jsx", error: String((e && e.message) || e) }); }

// extracted/js/9_59627a1e.jsx
try { (() => {
// Stratum — Mahnwesen · Dunning workflow for one overdue invoice
// Drill-in from Honorare → "Mahnung erstellen" for BÜR-118 · A 5 (184.500 € · 38 Tage überfällig).
// Three columns: timeline · letter preview · action panel.

const StratumMahnwesen = () => {
  const d = window.ModuloData;
  return /*#__PURE__*/React.createElement(StratumPage, {
    active: "Honorare",
    padding: "20px 28px"
  }, /*#__PURE__*/React.createElement(StratumHeader, {
    breadcrumb: ['Honorare', 'Überfällig', '2026-A5-BÜR118'],
    title: /*#__PURE__*/React.createElement("span", null, "Mahnwesen ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-mute)',
        fontWeight: 400,
        fontSize: 18
      }
    }, "\xB7 B\xDCR-118 \xB7 A 5")),
    subtitle: "S\xFCd Invest GmbH \xB7 Rechnung 184.500 \u20AC \xB7 38 Tage \xFCberf\xE4llig",
    action: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "invoice",
      size: 12
    }), " Mahnung versenden"),
    secondary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 12
    }), " Fristverl\xE4ngerung")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr 320px',
      gap: 14,
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow"
  }, "Forderung"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: -0.5,
      marginTop: 4,
      color: 'var(--neg)'
    }
  }, d.fmtEur(184_500)), /*#__PURE__*/React.createElement("div", {
    className: "m-num m-mute",
    style: {
      fontSize: 11,
      marginTop: 2
    }
  }, "+ 4,2 % Verzugszinsen p.a."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 14,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Schuldner"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, "S\xFCd Invest GmbH"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 2,
      lineHeight: 1.45
    }
  }, "Wilfried Brandt \xB7 CFO", /*#__PURE__*/React.createElement("br", null), "K\xF6nigstra\xDFe 28 \xB7 70173 Stuttgart", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "m-num"
  }, "+49 711 4880-122"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "w.brandt@suedinvest.de"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 14,
      borderTop: '1px solid var(--border)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9
    }
  }, "Beziehung"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontWeight: 600,
      marginTop: 2
    }
  }, "seit 2019")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9
    }
  }, "\xD8 DSO"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontWeight: 600,
      marginTop: 2
    }
  }, "52 T.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9
    }
  }, "Bisheriges Vol."), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontWeight: 600,
      marginTop: 2
    }
  }, "2,18 Mio \u20AC")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      fontSize: 9
    }
  }, "Bonit\xE4t \xB7 Creditreform"), /*#__PURE__*/React.createElement("div", {
    className: "m-num",
    style: {
      fontWeight: 600,
      marginTop: 2,
      color: 'var(--warn)'
    }
  }, "238 (213\u2191)")))), /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Eskalationsstufen'
    },
    padding: 16,
    style: {
      flex: 1,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 11,
      top: 8,
      bottom: 8,
      width: 2,
      background: 'var(--surface-2)'
    }
  }), [{
    stage: 'Rechnungseingang',
    when: '17.09.',
    state: 'done',
    body: 'A 5 · BÜR-118 für LP 5 abgeschlossen.'
  }, {
    stage: 'Zahlungserinnerung',
    when: '21.10.',
    state: 'done',
    body: 'Freundliche Erinnerung per E-Mail an Buchhaltung.'
  }, {
    stage: '1. Mahnung · Stufe 1',
    when: '25.10.',
    state: 'now',
    body: 'Schriftliche Mahnung, neue Frist + 7 Tage.'
  }, {
    stage: '2. Mahnung · Stufe 2',
    when: '+ 14 T.',
    state: 'plan',
    body: 'Verzugszinsen + Mahngebühr 5 €.'
  }, {
    stage: '3. Mahnung · gerichtl.',
    when: '+ 28 T.',
    state: 'plan',
    body: 'Mahnbescheid · Amtsgericht Stuttgart.'
  }, {
    stage: 'Inkasso · Anwalt',
    when: '+ 42 T.',
    state: 'plan',
    body: 'Abtretung an Rechtsanwalt Drösler &amp; Klein.'
  }].map((s, i) => {
    const ring = s.state === 'done' ? 'var(--pos)' : s.state === 'now' ? 'var(--neg)' : 'var(--surface-3)';
    const fill = s.state === 'done' ? 'var(--pos)' : s.state === 'now' ? 'var(--neg)' : 'var(--surface)';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'grid',
        gridTemplateColumns: '24px 1fr',
        gap: 12,
        padding: '8px 0',
        alignItems: 'baseline',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginTop: 2,
        border: '2px solid ' + ring,
        background: fill,
        zIndex: 1
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: s.state === 'now' ? 700 : 500,
        color: s.state === 'plan' ? 'var(--text-mute)' : 'var(--text)'
      }
    }, s.stage), /*#__PURE__*/React.createElement("span", {
      className: "m-num m-mute",
      style: {
        fontSize: 10,
        marginLeft: 'auto'
      }
    }, s.when)), /*#__PURE__*/React.createElement("div", {
      className: "m-mute",
      style: {
        fontSize: 10.5,
        marginTop: 2,
        lineHeight: 1.4
      }
    }, s.body)));
  })))), /*#__PURE__*/React.createElement(SCard, {
    padding: 0,
    style: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 18px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface-2)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, "Mahnung \xB7 Stufe 1"), /*#__PURE__*/React.createElement(STag, {
    tone: "default"
  }, "Entwurf"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, ['Stufe 1', 'Stufe 2', 'Mahnbescheid'].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      padding: '4px 10px',
      borderRadius: 4,
      fontSize: 10,
      background: i === 0 ? 'var(--accent)' : 'var(--surface)',
      color: i === 0 ? 'var(--surface)' : 'var(--text-dim)',
      border: i === 0 ? 'none' : '1px solid var(--border)',
      cursor: 'pointer'
    }
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '24px 8px',
      background: 'var(--surface-2)',
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 440,
      background: '#fff',
      padding: '36px 40px',
      boxShadow: '0 4px 16px rgba(50,40,30,0.10)',
      borderRadius: 2,
      fontSize: 10,
      lineHeight: 1.55,
      color: '#1f1f1c',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      paddingBottom: 12,
      borderBottom: '0.5px solid #ccc'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 0.5
    }
  }, "HOFER \xB7 RENNER"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: '#666',
      marginTop: 2
    }
  }, "Architekten BDA \xB7 M\xFCnchen")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 8,
      color: '#888',
      textAlign: 'right'
    }
  }, "Schwere-Reiter-Str. 14", /*#__PURE__*/React.createElement("br", null), "80637 M\xFCnchen", /*#__PURE__*/React.createElement("br", null), "+49 89 12 30 45 60")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontFamily: 'var(--font-mono)',
      fontSize: 8,
      color: '#999',
      borderBottom: '0.5px solid #eee',
      paddingBottom: 3
    }
  }, "Hofer \xB7 Renner Architekten BDA \xB7 Schwere-Reiter-Str. 14 \xB7 80637 M\xFCnchen"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, "S\xFCd Invest GmbH", /*#__PURE__*/React.createElement("br", null), "Wilfried Brandt \xB7 Kaufm\xE4nnische Leitung", /*#__PURE__*/React.createElement("br", null), "K\xF6nigstra\xDFe 28", /*#__PURE__*/React.createElement("br", null), "70173 Stuttgart"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 9
    }
  }, "M\xFCnchen, 25. Oktober 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontWeight: 700,
      fontSize: 11
    }
  }, "Zahlungserinnerung \xB7 Rechnung Nr. 2026-A5-B\xDCR118"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, "Sehr geehrter Herr Brandt,"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, "bei der Durchsicht unserer Unterlagen ist uns aufgefallen, dass der unten genannte Rechnungsbetrag noch nicht beglichen wurde. Wir m\xF6chten Sie h\xF6flich daran erinnern."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: 'var(--font-mono)',
      fontSize: 9.5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 4,
      paddingBottom: 6,
      borderBottom: '0.5px solid #ccc',
      color: '#555'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Beleg"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Betrag")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 4,
      padding: '6px 0'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "2026-A5-B\xDCR118"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#888',
      fontSize: 8.5
    }
  }, "Honorar B\xDCR-118 \xB7 LP 5 Abschlag"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#888',
      fontSize: 8.5
    }
  }, "Datum 17.09. \xB7 f\xE4llig 17.10.")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontWeight: 600
    }
  }, "184.500,00 \u20AC")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 4,
      padding: '6px 0',
      borderTop: '0.5px solid #eee',
      color: '#888'
    }
  }, /*#__PURE__*/React.createElement("span", null, "+ Verzugszinsen 4,2 % \xB7 38 T."), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "805,42 \u20AC")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 4,
      padding: '8px 0',
      borderTop: '0.5px solid #ccc',
      fontWeight: 700,
      fontSize: 10.5
    }
  }, /*#__PURE__*/React.createElement("span", null, "Gesamtforderung"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "185.305,42 \u20AC"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, "Wir bitten Sie, den offenen Betrag bis zum ", /*#__PURE__*/React.createElement("strong", null, "01. November 2026"), " auf unser bekanntes Konto zu \xFCberweisen. Sollte sich Ihre Zahlung mit diesem Schreiben gekreuzt haben, betrachten Sie dieses bitte als gegenstandslos."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, "Mit freundlichen Gr\xFC\xDFen"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      paddingTop: 4,
      borderTop: '0.5px solid #aaa',
      width: 160
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 600
    }
  }, "Maria Hofer"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: '#888'
    }
  }, "Partnerin"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SCard, {
    padding: 16,
    style: {
      background: 'color-mix(in oklch, var(--accent) 6%, var(--surface))',
      border: '1.5px solid var(--accent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert",
    size: 13,
    stroke: 2
  }), /*#__PURE__*/React.createElement("div", {
    className: "m-eyebrow",
    style: {
      color: 'var(--accent)'
    }
  }, "Empfehlung")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      marginTop: 6,
      lineHeight: 1.35
    }
  }, "Vor der Mahnung anrufen"), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 11,
      marginTop: 4,
      lineHeight: 1.45
    }
  }, "S\xFCd Invest ist langj\xE4hriger Kunde mit \xD8-DSO 52 T. \u2014 direkte Kl\xE4rung mit Herrn Brandt erh\xE4lt die Beziehung. Vorlage: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "Anrufprotokoll-Skript"), ".")), /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Forderungsaufstellung'
    },
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '6px 8px',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "Hauptforderung"), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      textAlign: 'right'
    }
  }, "184.500,00 \u20AC"), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "Verzugszinsen 4,2 % \xB7 38 T."), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      textAlign: 'right'
    }
  }, "805,42 \u20AC"), /*#__PURE__*/React.createElement("span", {
    className: "m-mute"
  }, "Mahngeb\xFChr Stufe 1"), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      textAlign: 'right'
    }
  }, "5,00 \u20AC"), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      height: 1,
      background: 'var(--border)',
      margin: '4px 0'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Gesamt"), /*#__PURE__*/React.createElement("span", {
    className: "m-num",
    style: {
      textAlign: 'right',
      fontWeight: 600,
      fontSize: 14
    }
  }, "185.310,42 \u20AC"))), /*#__PURE__*/React.createElement(SCard, {
    header: {
      title: 'Versand'
    },
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [['E-Mail · w.brandt@suedinvest.de', true, 'als PDF-Anhang'], ['Postversand · Einschreiben', true, '+ 5,99 € Porto'], ['DATEV · automatisch buchen', false, 'als Mahnung markieren']].map(([label, on, sub], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 10px',
      border: '1px solid ' + (on ? 'var(--accent)' : 'var(--border)'),
      borderRadius: 6,
      background: on ? 'var(--accent-dim)' : 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 3,
      background: on ? 'var(--accent)' : 'var(--surface)',
      border: on ? 'none' : '1.5px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--surface)'
    }
  }, on && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 10,
    stroke: 3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "m-mute",
    style: {
      fontSize: 10,
      marginTop: 1
    }
  }, sub)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '11px 14px',
      background: 'var(--accent)',
      color: 'var(--surface)',
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 500,
      textAlign: 'center',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13,
    stroke: 2.4
  }), " Mahnung versenden"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '9px 12px',
      background: 'var(--surface-2)',
      borderRadius: 6,
      fontSize: 12,
      textAlign: 'center',
      cursor: 'pointer',
      border: '1px solid var(--border)'
    }
  }, "Erst anrufen"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '9px 12px',
      background: 'var(--surface-2)',
      borderRadius: 6,
      fontSize: 12,
      textAlign: 'center',
      cursor: 'pointer',
      border: '1px solid var(--border)'
    }
  }, "Frist verl\xE4ngern"))))));
};
Object.assign(window, {
  StratumMahnwesen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "extracted/js/9_59627a1e.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ModuloMark = __ds_scope.ModuloMark;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SearchBar = __ds_scope.SearchBar;

__ds_ns.DataViz = __ds_scope.DataViz;

__ds_ns.Donut = __ds_scope.Donut;

__ds_ns.SollIstBar = __ds_scope.SollIstBar;

__ds_ns.Sparkline = __ds_scope.Sparkline;

__ds_ns.MonthBars = __ds_scope.MonthBars;

__ds_ns.KpiCard = __ds_scope.KpiCard;

__ds_ns.Sidebar = __ds_scope.Sidebar;

})();
