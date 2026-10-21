Inline SVG icon atom — use for any iconographic element in Stratum UI.

```jsx
<Icon name="clock" size={16} />
<Icon name="alert" size={14} stroke={2} />
<ModuloMark size={24} color="var(--accent)" />
```

Available names: dashboard, project, clock, euro, invoice, team, reports, settings, search,
chevron, chevdown, chevup, plus, play, pause, timer, folder, alert, download, filter, grid,
list, arrowup, arrowdown, arrowright, arrowleft, check, x, drawing, calc, layers, dot.

- All icons use `stroke: currentColor` — inherit color from parent
- `size` controls both width and height (square)
- Default stroke-width 1.6 — use 2.0–2.4 for emphasis or small sizes
