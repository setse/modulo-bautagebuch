// Modulo Stratum — Icon atom
// Inline SVG icons using path data from the app's icon vocabulary.
// All icons use stroke: currentColor, so they inherit surrounding text color.

export function Icon({ name, size = 14, stroke = 1.6 }) {
  const paths = {
    dashboard:  'M3 3h7v7H3zM14 3h7v4h-7zM14 11h7v10h-7zM3 14h7v7H3z',
    project:    'M3 6h18M3 12h18M3 18h12',
    clock:      'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
    euro:       'M18 6a8 8 0 1 0 0 12M3 10h10M3 14h10',
    invoice:    'M5 3h10l4 4v14H5zM15 3v4h4M8 12h8M8 16h5',
    team:       'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c.5-3 3-5 6-5s5.5 2 6 5M17 11a3 3 0 1 0 0-6M22 20c-.3-2-1.6-3.6-3.4-4.4',
    reports:    'M4 19V5M4 19h16M8 15v-5M12 15V8M16 15v-7',
    settings:   'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
    search:     'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
    chevron:    'M9 6l6 6-6 6',
    chevdown:   'M6 9l6 6 6-6',
    chevup:     'M18 15l-6-6-6 6',
    plus:       'M12 5v14M5 12h14',
    play:       'M6 4l14 8-14 8V4z',
    pause:      'M6 5h4v14H6zM14 5h4v14h-4z',
    timer:      'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 1h6',
    folder:     'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    alert:      'M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
    download:   'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
    filter:     'M3 4h18l-7 9v7l-4-2v-5z',
    grid:       'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    list:       'M3 6h18M3 12h18M3 18h18',
    arrowup:    'M12 19V5M5 12l7-7 7 7',
    arrowdown:  'M12 5v14M5 12l7 7 7-7',
    arrowright: 'M5 12h14M13 5l7 7-7 7',
    arrowleft:  'M19 12H5M11 19l-7-7 7-7',
    check:      'M5 12l5 5L20 7',
    x:          'M6 6l12 12M18 6L6 18',
    drawing:    'M3 3h18v18H3zM3 9h18M9 3v18',
    calc:       'M5 3h14v18H5zM8 7h8M8 11h2M12 11h2M16 11h-.01M8 15h2M12 15h2M16 15h-.01M8 19h6',
    layers:     'M12 2 2 8l10 6 10-6zM2 14l10 6 10-6M2 11l10 6 10-6',
    dot:        null, // handled specially
    calc2:      'M5 3h14v18H5z',
  };

  if (name === 'dot') {
    return React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', style: { flexShrink: 0 } },
      React.createElement('circle', { cx: 12, cy: 12, r: 3, fill: 'currentColor' })
    );
  }

  const d = paths[name] || 'M0 0h0';
  return React.createElement('svg', {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { flexShrink: 0 },
  }, React.createElement('path', { d }));
}

// Modulo brand mark — 2×2 grid of rectangles.
export function ModuloMark({ size = 16, color = 'currentColor' }) {
  return React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none' },
    React.createElement('rect', { x: 2, y: 2, width: 9, height: 9, fill: color }),
    React.createElement('rect', { x: 13, y: 2, width: 9, height: 9, stroke: color, strokeWidth: 2 }),
    React.createElement('rect', { x: 2, y: 13, width: 9, height: 9, stroke: color, strokeWidth: 2 }),
    React.createElement('rect', { x: 13, y: 13, width: 9, height: 9, fill: color, opacity: 0.4 })
  );
}
