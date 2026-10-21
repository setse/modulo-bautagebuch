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
      const sollH = p.planned * (lp.anteil/100) * (prog/100);
      const istH = sollH * (0.7 + Math.random() * 0.7);
      // make sure SAN-302 LP4 is overrun
      let ratio = istH / Math.max(1, sollH);
      if (p.id === 'SAN-302' && lp.nr === 4) ratio = 1.7;
      if (p.id === 'BÜR-118' && lp.nr === 6) ratio = 1.18;
      return ratio;
    });
  });

  const colorFor = (r) => {
    if (r == null) return 'var(--surface-2)';
    if (r < 0.85) return 'color-mix(in oklch, var(--accent) 60%, var(--surface))';
    if (r < 1.0) return 'var(--pos)';
    if (r < 1.05) return 'color-mix(in oklch, var(--pos) 60%, var(--surface))';
    if (r < 1.15) return 'var(--warn)';
    return 'var(--neg)';
  };
  const textFor = (r) => r != null && r > 0.85 && r < 1.15 ? 'var(--surface)' : 'var(--text)';

  return (
    <div className="m-app theme-stratum dens-comfy"
         style={{ width: 1280, height: 800, display: 'grid', gridTemplateColumns: '230px 1fr', overflow: 'hidden' }}>

      <StratumSidebar active="Auswertungen" />

      <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <div>
            <div className="m-eyebrow">Auswertungen</div>
            <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.5, marginTop: 2 }}>Soll/Ist-Heatmap</div>
            <div className="m-mute" style={{ fontSize: 12, marginTop: 2 }}>
              Stundenverbrauch je Projekt und Leistungsphase · Ist ÷ Soll
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 6 }}>
            {['2024','2025','2026','YTD'].map((y, i) => (
              <div key={y} className="m-pill" style={{ padding: '6px 12px', fontSize: 11,
                                                          background: i === 3 ? 'var(--accent)' : 'var(--surface)',
                                                          color: i === 3 ? 'var(--surface)' : 'var(--text-dim)',
                                                          borderColor: 'transparent' }}>{y}</div>
            ))}
          </div>
        </div>

        {/* KPI strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { eyebrow: 'Stunden Σ Ist', value: d.fmtNum(15_430)+' h', sub: 'Soll: 14.620 h · +5,5 %', warn: false },
            { eyebrow: 'Mehraufwand Stunden', value: '+ 810 h', sub: '~ 68.040 € interne Kosten', warn: true },
            { eyebrow: 'Phasen mit Überschreitung', value: '6 / 47', sub: 'aktive LP-Zellen', warn: true },
            { eyebrow: 'Phasen unter Soll', value: '23 / 47', sub: 'Effizienzgewinn', warn: false },
          ].map((k, i) => (
            <div key={i} className="m-card" style={{ padding: 14 }}>
              <div className="m-eyebrow">{k.eyebrow}</div>
              <div className="m-num" style={{ fontSize: 22, fontWeight: 600, marginTop: 4, letterSpacing: -0.4,
                                                 color: k.warn ? 'var(--neg)' : 'var(--text)' }}>{k.value}</div>
              <div className="m-mute" style={{ fontSize: 11, marginTop: 4 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Heatmap card */}
        <div className="m-card" style={{ flex: 1, padding: 22, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Portfolio · Stunden Soll/Ist je Phase</div>
              <div className="m-mute" style={{ fontSize: 12, marginTop: 2 }}>Klicken Sie eine Zelle, um Details zu öffnen</div>
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11 }}>
              <span className="m-mute">Skala</span>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[
                  ['unter 85 %', 'color-mix(in oklch, var(--accent) 60%, var(--surface))'],
                  ['85–100 %', 'var(--pos)'],
                  ['100–105 %', 'color-mix(in oklch, var(--pos) 60%, var(--surface))'],
                  ['105–115 %', 'var(--warn)'],
                  ['> 115 %', 'var(--neg)'],
                ].map(([label, c]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 14, height: 14, background: c, borderRadius: 2 }} />
                    <span className="m-mute" style={{ fontSize: 10 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '180px 70px repeat(9, 1fr) 100px', gap: 4,
                          alignItems: 'center', fontSize: 11 }}>
            {/* Header */}
            <div></div>
            <div className="m-eyebrow" style={{ textAlign: 'right', fontSize: 9 }}>Honorar</div>
            {d.leistungsphasen.map(lp => (
              <div key={lp.nr} style={{ textAlign: 'center' }}>
                <div className="m-num" style={{ fontSize: 12, fontWeight: 600 }}>LP{lp.nr}</div>
                <div className="m-mute m-num" style={{ fontSize: 9 }}>{lp.anteil}%</div>
              </div>
            ))}
            <div className="m-eyebrow" style={{ textAlign: 'right', fontSize: 9 }}>Σ Δ</div>

            {/* Rows */}
            {d.projects.map((p, pi) => {
              const row = matrix[pi];
              const totalSoll = row.reduce((s, r, i) => r != null ? s + p.planned * d.leistungsphasen[i].anteil/100 : s, 0);
              const totalIst = row.reduce((s, r, i) => r != null ? s + r * p.planned * d.leistungsphasen[i].anteil/100 : s, 0);
              const delta = totalIst - totalSoll;
              return (
                <React.Fragment key={p.id}>
                  <div style={{ paddingRight: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{p.name}</div>
                    <div className="m-mute" style={{ fontSize: 10, marginTop: 1 }}>{p.id} · LP{p.phase}</div>
                  </div>
                  <div className="m-num" style={{ textAlign: 'right', fontSize: 11 }}>{d.fmtEur(p.fee/1000, 0)}k</div>
                  {row.map((r, ci) => (
                    <div key={ci} style={{ aspectRatio: '1', maxHeight: 44, background: colorFor(r),
                                              borderRadius: 4, display: 'flex',
                                              alignItems: 'center', justifyContent: 'center',
                                              color: textFor(r), position: 'relative' }}>
                      {r != null && (
                        <span className="m-num" style={{ fontSize: 10, fontWeight: 600 }}>
                          {Math.round(r * 100)}
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="m-num" style={{ textAlign: 'right', fontSize: 11,
                                                     color: delta > 0 ? 'var(--neg)' : 'var(--pos)', fontWeight: 600 }}>
                    {delta > 0 ? '+' : ''}{Math.round(delta)} h
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', alignItems: 'center',
                          fontSize: 11, color: 'var(--text-dim)', gap: 18 }}>
            <Icon name="alert" size={12} />
            <span><b>SAN-302 LP4</b> liegt bei 170 % — Bauantrag verzögert sich, Umbauzuschlag prüfen.</span>
            <span style={{ marginLeft: 'auto', color: 'var(--accent)', cursor: 'pointer' }}>Heatmap exportieren ↗</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { BudgetStratum });
