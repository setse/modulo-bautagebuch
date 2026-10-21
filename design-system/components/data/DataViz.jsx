// Modulo Stratum — Data visualization atoms
// Individual components are exported below; DataViz is a namespace alias.
export const DataViz = {}; // namespace placeholder — use named exports directly

// Donut chart — single percentage ring
export function Donut({ pct, size = 64, stroke = 8, color = 'var(--accent)', track = 'var(--surface-3)', children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return React.createElement('div', { style: { position: 'relative', width: size, height: size } },
    React.createElement('svg', { width: size, height: size },
      React.createElement('circle', { cx: size/2, cy: size/2, r, stroke: track, strokeWidth: stroke, fill: 'none' }),
      React.createElement('circle', {
        cx: size/2, cy: size/2, r, stroke: color, strokeWidth: stroke, fill: 'none',
        strokeDasharray: c, strokeDashoffset: c * (1 - Math.max(0, Math.min(1, pct))),
        transform: `rotate(-90 ${size/2} ${size/2})`, strokeLinecap: 'butt',
      })
    ),
    React.createElement('div', {
      style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    }, children)
  );
}

// Soll/Ist bar — horizontal progress bar showing planned vs actual hours
export function SollIstBar({ ist, soll, w = 140, h = 6 }) {
  const pct = soll > 0 ? Math.min(1.5, ist / soll) : 0;
  const color = pct > 1.05 ? 'var(--neg)' : pct < 0.85 ? 'var(--accent)' : 'var(--pos)';
  const barW = Math.min(pct, 1) * w;
  const overW = pct > 1 ? Math.min(pct - 1, 0.5) * w : 0;
  return React.createElement('div', {
    style: { position: 'relative', width: w, height: h, background: 'var(--surface-3)', borderRadius: 1 },
  },
    React.createElement('div', { style: { position: 'absolute', left: 0, top: 0, height: h, width: barW, background: color, borderRadius: 1 } }),
    overW > 0 && React.createElement('div', {
      style: { position: 'absolute', left: barW, top: 0, height: h, width: overW, background: 'var(--neg)', opacity: 0.6, borderRadius: 1 },
    }),
    React.createElement('div', { style: { position: 'absolute', left: w, top: -2, height: h + 4, width: 1, background: 'var(--text-dim)' } })
  );
}

// Sparkline — inline SVG polyline from number array
export function Sparkline({ data, w = 80, h = 22, stroke = 'currentColor', strokeWidth = 1.4 }) {
  if (!data || !data.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, h - ((v - min) / range) * (h - 2) - 1]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return React.createElement('svg', { width: w, height: h, viewBox: `0 0 ${w} ${h}`, style: { display: 'block' } },
    React.createElement('path', { d, fill: 'none', stroke, strokeWidth, strokeLinejoin: 'round', strokeLinecap: 'round' })
  );
}

// Monthly bar chart for hours/revenue series
export function MonthBars({ data, w = 380, h = 100, accent = 'var(--accent)' }) {
  const max = Math.max(...data.map(d => Math.max(d.ist || 0, d.plan || 0)));
  const bw = w / data.length;
  return React.createElement('svg', { width: w, height: h, viewBox: `0 0 ${w} ${h}`, style: { display: 'block' } },
    data.map((d, i) => {
      const x = i * bw + 2;
      const istH = max > 0 ? (d.ist / max) * (h - 18) : 0;
      const planH = max > 0 ? (d.plan / max) * (h - 18) : 0;
      return React.createElement('g', { key: i },
        React.createElement('line', { x1: x, x2: x + bw - 4, y1: h - 14 - planH, y2: h - 14 - planH, stroke: 'var(--text-mute)', strokeDasharray: '2 2', strokeWidth: 1 }),
        React.createElement('rect', { x: x + 2, y: h - 14 - istH, width: bw - 8, height: istH, fill: d.future ? 'var(--surface-3)' : accent, opacity: d.future ? 0.4 : 0.85 }),
        React.createElement('text', { x: x + bw / 2 - 2, y: h - 3, fontSize: 9, fill: 'var(--text-mute)', textAnchor: 'middle', fontFamily: 'var(--font-data)' }, d.m)
      );
    })
  );
}

// KPI card — eyebrow + big number + subline + optional delta badge
export function KpiCard({ eyebrow, value, sub, delta, deltaUp, style }) {
  return React.createElement('div', {
    style: {
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6,
      boxShadow: 'var(--shadow-card)', padding: 14, ...style,
    },
  },
    React.createElement('div', {
      style: { fontFamily: 'var(--font-data)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-mute)', fontWeight: 500 },
    }, eyebrow),
    React.createElement('div', {
      style: { fontFamily: 'var(--font-data)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.4px', marginTop: 4, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' },
    }, value),
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' } },
      sub && React.createElement('div', { style: { fontSize: 11, color: 'var(--text-mute)' } }, sub),
      delta && React.createElement('span', {
        style: {
          display: 'inline-flex', alignItems: 'center', gap: 3,
          padding: '2px 7px', borderRadius: 999, fontSize: 9,
          fontFamily: 'var(--font-data)', letterSpacing: '0.02em',
          background: deltaUp
            ? 'color-mix(in oklch, var(--pos) 18%, transparent)'
            : 'color-mix(in oklch, var(--warn) 18%, transparent)',
          color: deltaUp ? 'var(--pos)' : 'var(--warn)',
        },
      }, delta)
    )
  );
}
