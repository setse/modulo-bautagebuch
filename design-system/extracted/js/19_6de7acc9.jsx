// Stratum — Team & Auslastung
// Team grid with utilization, individual workload, current capacity chart.

const StratumTeam = () => {
  const d = window.ModuloData;

  const utilByMember = {
    mh: { week: 0.91, target: 0.85, billable: 0.78, projects: ['BÜR-118','WHB-204','SAN-302'] },
    ar: { week: 0.86, target: 0.85, billable: 0.82, projects: ['BÜR-118','GEW-441'] },
    lv: { week: 0.92, target: 0.90, billable: 0.88, projects: ['KIT-077','EFH-512'] },
    sn: { week: 0.78, target: 0.90, billable: 0.72, projects: ['BÜR-118','SAN-302'] },
    jk: { week: 0.94, target: 0.90, billable: 0.91, projects: ['BÜR-118','WHB-204','GEW-441'] },
    ec: { week: 0.83, target: 0.85, billable: 0.78, projects: ['BÜR-118','SAN-302'] },
    tb: { week: 0.62, target: 0.70, billable: 0.45, projects: ['Schulung','EFH-512'] },
  };

  // Weekly utilization sparkline (last 8 weeks).
  const series = (base) => Array.from({ length: 8 }, (_, i) => base + (Math.sin(i * 0.7 + base * 10) * 0.06) + (i * 0.005));

  return (
    <StratumPage active="Team">
      <StratumHeader
        title="Team & Auslastung"
        subtitle="7 Mitarbeitende · 280 Plan-Stunden pro Woche"
        action={<><Icon name="plus" size={12} /> Mitarbeiter*in</>}
        secondary={<><Icon name="filter" size={12} /> Filter</>}
      />

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { eyebrow: 'Ø Auslastung · KW 43', value: '86 %',     sub: 'Ziel 82 % · + 4 Pp',          tone: 'pos' },
          { eyebrow: 'Verrechenbar',         value: '78 %',     sub: '8 % intern · 14 % Akquise',   tone: 'accent' },
          { eyebrow: 'Ø Stundensatz',        value: '95 €/h',   sub: 'gemischt · alle Rollen',     tone: 'default' },
          { eyebrow: 'Überlast > 95 %',      value: '2 Personen', sub: 'J. Klar · L. Vogel',         tone: 'warn' },
        ].map((k, i) => (
          <SCard key={i} padding={16}>
            <div className="m-eyebrow">{k.eyebrow}</div>
            <div className="m-num" style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.5, marginTop: 4 }}>{k.value}</div>
            <div style={{ marginTop: 6 }}><STag tone={k.tone}>{k.sub}</STag></div>
          </SCard>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, flex: 1, overflow: 'hidden' }}>

        {/* Team list */}
        <SCard padding={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)',
                          display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Mitarbeitende</div>
            <div className="m-mute" style={{ fontSize: 11 }}>Auslastung · Verrechenbarkeit · aktive Projekte</div>
          </div>

          <div style={{ flex: 1, overflow: 'auto' }}>
            {d.team.map((m) => {
              const u = utilByMember[m.id];
              const over = u.week > 0.95;
              return (
                <div key={m.id} style={{ display: 'grid',
                                          gridTemplateColumns: '40px 1.2fr 100px 1fr 100px 1fr',
                                          gap: 14, padding: '16px 18px',
                                          borderBottom: '1px solid var(--border)',
                                          alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: m.color,
                                  color: '#fff', fontSize: 12, fontWeight: 600,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                    <div className="m-mute" style={{ fontSize: 11, marginTop: 1 }}>{m.role}</div>
                  </div>
                  <div>
                    <div className="m-eyebrow" style={{ fontSize: 9 }}>Auslastung</div>
                    <div className="m-num" style={{ fontSize: 16, fontWeight: 600, marginTop: 2,
                                                       color: over ? 'var(--neg)' : 'var(--text)' }}>
                      {Math.round(u.week * 100)} %
                    </div>
                  </div>
                  <div>
                    <div style={{ height: 8, background: 'var(--surface-2)', borderRadius: 4, position: 'relative' }}>
                      <div style={{ width: `${Math.min(u.week * 100, 100)}%`, height: '100%',
                                      background: over ? 'var(--neg)' : 'var(--accent)', borderRadius: 4 }} />
                      {/* target marker */}
                      <div style={{ position: 'absolute', left: `${u.target * 100}%`, top: -2, bottom: -2, width: 1,
                                      background: 'var(--text-dim)' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <span className="m-mute" style={{ fontSize: 10 }}>Ziel {Math.round(u.target * 100)}%</span>
                      <span className="m-num m-mute" style={{ fontSize: 10 }}>
                        verr. {Math.round(u.billable * 100)} %
                      </span>
                    </div>
                  </div>
                  <div className="m-num" style={{ fontSize: 13, fontWeight: 500 }}>{m.rate} €/h</div>
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {u.projects.map((p) => (
                        <STag key={p} tone="outline" style={{ fontSize: 9, padding: '2px 7px' }}>{p}</STag>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SCard>

        {/* Right column: chart + details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>

          <SCard header={{ title: 'Kapazität · nächste 4 Wochen', subtitle: 'Plan vs. zugesagte Stunden' }} padding={18}>
            {/* Stacked area-like chart with simple SVG */}
            <CapacityChart />

            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: 2 }} />
                <span className="m-mute">Zugesagt</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, background: 'color-mix(in oklch, var(--accent) 30%, var(--surface-2))', borderRadius: 2 }} />
                <span className="m-mute">Frei</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 1, background: 'var(--neg)' }} />
                <span className="m-mute">Kapazitäts­grenze</span>
              </div>
            </div>
          </SCard>

          <SCard header={{ title: 'Skills im Team' }} padding={18}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['BIM · Revit',         5, 7],
                ['ArchiCAD',            3, 7],
                ['Bauleitung LP8',      4, 7],
                ['HOAI-Vertragsrecht',  2, 7],
                ['Bestand · Sanierung', 3, 7],
                ['Denkmalschutz',       1, 7],
              ].map(([skill, have, total], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 40px',
                                        gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12 }}>{skill}</span>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {Array.from({ length: total }).map((_, j) => (
                      <div key={j} style={{ flex: 1, height: 12, borderRadius: 2,
                                              background: j < have ? 'var(--accent)' : 'var(--surface-2)' }} />
                    ))}
                  </div>
                  <div className="m-num m-mute" style={{ fontSize: 11, textAlign: 'right' }}>{have}/{total}</div>
                </div>
              ))}
            </div>
          </SCard>
        </div>
      </div>
    </StratumPage>
  );
};

const CapacityChart = () => {
  const w = 320, h = 100, padL = 26, padR = 8, padT = 8, padB = 22;
  const weeks = ['KW43','KW44','KW45','KW46','KW47'];
  const capacity = 280; // h/week
  const planned = [240, 268, 295, 312, 274];
  const committed = [240, 240, 220, 240, 200];
  const x = i => padL + (i / (weeks.length - 1)) * (w - padL - padR);
  const y = v => h - padB - (v / 350) * (h - padT - padB);
  const bw = (w - padL - padR) / weeks.length * 0.5;

  return (
    <svg width={w} height={h+12} viewBox={`0 0 ${w} ${h+12}`} style={{ display: 'block' }}>
      {/* grid */}
      {[100, 200, 280, 350].map(v => (
        <g key={v}>
          <line x1={padL} x2={w-padR} y1={y(v)} y2={y(v)} stroke="var(--border)" strokeDasharray="2 3" />
          <text x={padL-4} y={y(v)+3} fontSize="9" fill="var(--text-mute)"
                 fontFamily="var(--font-data)" textAnchor="end">{v}h</text>
        </g>
      ))}
      {/* capacity line */}
      <line x1={padL} x2={w-padR} y1={y(capacity)} y2={y(capacity)} stroke="var(--neg)" strokeWidth="1.5" />
      {/* bars */}
      {weeks.map((wk, i) => {
        const px = x(i) - bw / 2;
        const overplan = planned[i] > capacity;
        return (
          <g key={wk}>
            {/* free */}
            <rect x={px} y={y(planned[i])} width={bw}
                  height={Math.max(0, y(committed[i]) - y(planned[i]))}
                  fill="color-mix(in oklch, var(--accent) 30%, var(--surface-2))" />
            {/* committed */}
            <rect x={px} y={y(committed[i])} width={bw} height={h - padB - y(committed[i])}
                  fill="var(--accent)" />
            {overplan && (
              <text x={px + bw/2} y={y(planned[i]) - 4} fontSize="9" fill="var(--neg)"
                     fontWeight="600" fontFamily="var(--font-data)" textAnchor="middle">+{planned[i] - capacity}h</text>
            )}
            <text x={x(i)} y={h-8} fontSize="9" fill="var(--text-mute)"
                   fontFamily="var(--font-data)" textAnchor="middle">{wk}</text>
          </g>
        );
      })}
    </svg>
  );
};

Object.assign(window, { StratumTeam });
