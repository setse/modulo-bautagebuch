// Stratum — Projekte (project list)
// KPI strip + filter chips + grid of project cards w/ LP progress.

const StratumProjekte = () => {
  const d = window.ModuloData;

  return (
    <StratumPage active="Projekte">
      <StratumHeader
        title="Projekte"
        subtitle="12 aktiv · 3 in Akquise · 2 mit Risiko"
        action={<><Icon name="plus" size={12} /> Neues Projekt</>}
        secondary={<><Icon name="download" size={12} /> Export</>}
      />

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { eyebrow: 'Aktive Projekte',     value: '12',         sub: '+ 2 vs. Q2',           tone: 'pos' },
          { eyebrow: 'Honorarvolumen offen',value: '4,33 Mio €', sub: 'aus 7 laufenden',      tone: 'accent' },
          { eyebrow: 'Stunden offen LP1–9', value: '14.820 h',   sub: '~ 64 Personen-Wochen', tone: 'default' },
          { eyebrow: 'Risiko-Projekte',     value: '2',          sub: 'SAN-302 · BÜR-118',    tone: 'warn' },
        ].map((k, i) => (
          <SCard key={i} padding={16}>
            <div className="m-eyebrow">{k.eyebrow}</div>
            <div className="m-num" style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.5, marginTop: 4 }}>{k.value}</div>
            <div style={{ marginTop: 6 }}>
              <STag tone={k.tone}>{k.sub}</STag>
            </div>
          </SCard>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', padding: 4, borderRadius: 8,
                        border: '1px solid var(--border)' }}>
          {['Alle','Aktiv','Akquise','Abschluss','Pause'].map((s, i) => (
            <div key={s} style={{ padding: '6px 12px', borderRadius: 5, fontSize: 12,
                                    background: i === 1 ? 'var(--accent)' : 'transparent',
                                    color: i === 1 ? 'var(--surface)' : 'var(--text-dim)',
                                    fontWeight: i === 1 ? 600 : 400, cursor: 'pointer' }}>{s}</div>
          ))}
        </div>
        {[['Projektleitung','Alle'],['Honorarzone','Alle'],['Region','Alle'],['Bauherr','Alle']].map(([k, v], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
                                  fontSize: 12 }}>
            <span className="m-mute">{k}:</span>
            <span style={{ fontWeight: 500 }}>{v}</span>
            <Icon name="chevdown" size={11} />
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', padding: 4, borderRadius: 8,
                        border: '1px solid var(--border)' }}>
          {[['grid', true], ['list', false]].map(([icon, active]) => (
            <div key={icon} style={{ padding: '6px 8px', borderRadius: 5,
                                       background: active ? 'var(--surface-2)' : 'transparent', cursor: 'pointer' }}>
              <Icon name={icon} size={14} />
            </div>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, alignContent: 'start' }}>
        {d.projects.map((p) => {
          const phasePct = p.progress.reduce((s, v) => s + v, 0) / 900;
          const sollH = p.planned * Math.max(0.05, phasePct);
          const overrun = p.hours / Math.max(1, sollH);
          const statusTone = p.status === 'aktiv' ? 'pos' : p.status === 'akquise' ? 'default' : 'accent';
          const billedPct = p.billed / p.fee;

          return (
            <SCard key={p.id} padding={0} style={{ overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span className="m-num m-mute" style={{ fontSize: 10 }}>{p.id}</span>
                  <STag tone={statusTone}>{p.status}</STag>
                  {p.umbau && <STag tone="warn">UMBAU</STag>}
                  <span className="m-mute" style={{ fontSize: 10, marginLeft: 'auto' }}>HZ {p.zone}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.25 }}>{p.name}</div>
                <div className="m-mute" style={{ fontSize: 11, marginTop: 2 }}>{p.client} · {p.city}</div>
              </div>

              {/* LP progress visual */}
              <div style={{ padding: '8px 16px 12px', background: 'var(--surface-2)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                  <span className="m-eyebrow" style={{ fontSize: 9 }}>LP {p.phase}/9</span>
                  <span className="m-num m-mute" style={{ fontSize: 10 }}>{Math.round(phasePct * 100)} % Honorar erbracht</span>
                </div>
                <div style={{ display: 'flex', gap: 2, height: 8 }}>
                  {p.progress.map((v, i) => (
                    <div key={i} style={{ flex: d.leistungsphasen[i].anteil,
                                            background: v === 100 ? 'var(--accent)'
                                                       : v > 0 ? 'color-mix(in oklch, var(--accent) 50%, var(--surface))'
                                                       : 'var(--surface-3)',
                                            borderRadius: 2 }} />
                  ))}
                </div>
              </div>

              {/* Numbers */}
              <div style={{ padding: '12px 16px', display: 'grid',
                              gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 11 }}>
                <div>
                  <div className="m-eyebrow" style={{ fontSize: 9 }}>Honorar</div>
                  <div className="m-num" style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{d.fmtEur(p.fee/1000, 0)}k €</div>
                  <div style={{ marginTop: 4, height: 3, background: 'var(--surface-2)', borderRadius: 2 }}>
                    <div style={{ width: `${billedPct * 100}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
                  </div>
                  <div className="m-num m-mute" style={{ fontSize: 10, marginTop: 3 }}>
                    {Math.round(billedPct * 100)} % abgerechnet
                  </div>
                </div>
                <div>
                  <div className="m-eyebrow" style={{ fontSize: 9 }}>Stunden Ist/Soll</div>
                  <div className="m-num" style={{ fontSize: 14, fontWeight: 600, marginTop: 2,
                                                       color: overrun > 1.1 ? 'var(--neg)' : overrun > 1 ? 'var(--warn)' : 'var(--text)' }}>
                    {Math.round(overrun * 100)} %
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <SollIstBar ist={p.hours} soll={sollH} w={100} h={3} />
                  </div>
                  <div className="m-num m-mute" style={{ fontSize: 10, marginTop: 3 }}>
                    {d.fmtNum(p.hours)} / {d.fmtNum(sollH, 0)} h
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)',
                              display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)' }}>
                <div style={{ display: 'flex', gap: -4 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 18, height: 18, borderRadius: 9,
                                            background: d.team[i].color,
                                            color: '#fff', fontSize: 8, fontWeight: 600,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: '1.5px solid var(--surface)', marginLeft: i > 0 ? -6 : 0 }}>
                      {d.team[i].name.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                </div>
                <span className="m-mute" style={{ fontSize: 10 }}>{p.lead}</span>
                <div style={{ flex: 1 }} />
                <span className="m-mute" style={{ fontSize: 10 }}>Abnahme {p.deadline}</span>
                <Icon name="chevron" size={11} />
              </div>
            </SCard>
          );
        })}

        {/* Add card */}
        <div style={{ border: '1.5px dashed var(--border)', borderRadius: 6,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: 6, color: 'var(--text-mute)', cursor: 'pointer', minHeight: 280 }}>
          <Icon name="plus" size={18} />
          <span style={{ fontSize: 12 }}>Projekt anlegen</span>
        </div>
      </div>
    </StratumPage>
  );
};

Object.assign(window, { StratumProjekte });
