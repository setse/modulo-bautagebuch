// Dashboard E — STRATUM
// Warm cream background, layered rounded cards, sage accent.
// Calm hierarchy: hero card (left), supporting cards stacked (right).

// NB: SCard is provided by stratum/shell.jsx — do not redefine here.

const DashboardStratum = () => {
  const d = window.ModuloData;
  return (
    <div className="m-app theme-stratum dens-comfy"
         style={{ width: 1280, height: 800, display: 'grid',
                  gridTemplateColumns: '230px 1fr', overflow: 'hidden' }}>

      {/* Sidebar — shared shell */}
      <StratumSidebar active="Übersicht" />

      {/* Main */}
      <div style={{ padding: '24px 28px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.5 }}>Guten Morgen, Maria</div>
            <div className="m-mute" style={{ fontSize: 12, marginTop: 2 }}>
              Geschäftsjahr 2026 · KW 43 · Mittwoch, 25.10.2026
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
                          fontSize: 12, color: 'var(--text-mute)', width: 240 }}>
            <Icon name="search" size={12} />
            <span>Projekte, Rechnungen suchen…</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-data)', fontSize: 10 }}>⌘K</span>
          </div>
          <div style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--accent)', color: 'var(--surface)',
                          fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="plus" size={12} /> Zeit erfassen
          </div>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16,
                       flex: 1, overflow: 'hidden' }}>

          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>

            {/* Hero metric */}
            <SCard padding={22}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <Donut pct={0.784} size={88} stroke={10} color="var(--accent)">
                  <div style={{ textAlign: 'center' }}>
                    <div className="m-num" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1 }}>78%</div>
                  </div>
                </Donut>
                <div style={{ flex: 1 }}>
                  <div className="m-eyebrow">Honorar-Umsatz · 2026</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
                    <div className="m-num" style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.8 }}>
                      1,84 Mio. €
                    </div>
                    <div className="m-pill m-pill-pos">↑ 12,4 % vs. VJ</div>
                  </div>
                  <div className="m-mute" style={{ fontSize: 12, marginTop: 4 }}>
                    Jahresplan {d.fmtEur(d.kpis.umsatzPlan)} · Forecast {d.fmtEur(2_280_000)} (97 %)
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <MonthBars data={d.monatsstunden} w={400} h={64} accent="var(--accent)" />
                  </div>
                </div>
              </div>
            </SCard>

            {/* 3 metric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                { eyebrow: 'Deckungsbeitrag', value: '34,2 %', sub: 'Ziel 32 %', delta: '+2,0 Pp', up: true },
                { eyebrow: 'Auslastung', value: '86 %', sub: '268 / 312 h', delta: '+4 Pp', up: true },
                { eyebrow: 'Offene Forderungen', value: '312k €', sub: 'DSO 38 T', delta: '48k > 30T', up: false },
              ].map((k, i) => (
                <SCard key={i} padding={14}>
                  <div className="m-eyebrow">{k.eyebrow}</div>
                  <div className="m-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.4, marginTop: 4 }}>{k.value}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <div className="m-mute" style={{ fontSize: 11 }}>{k.sub}</div>
                    <div className={'m-pill ' + (k.up ? 'm-pill-pos' : 'm-pill-warn')} style={{ fontSize: 9 }}>{k.delta}</div>
                  </div>
                </SCard>
              ))}
            </div>

            {/* Projects */}
            <SCard padding={0} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '16px 18px 10px', display: 'flex', alignItems: 'baseline', gap: 10,
                             borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Aktive Projekte</div>
                <div className="m-mute" style={{ fontSize: 11 }}>{d.projects.length}</div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                  <span className="m-pill" style={{ background: 'var(--surface-2)' }}>Alle</span>
                  <span className="m-pill">Risiko</span>
                  <span className="m-pill">Akquise</span>
                </div>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                {d.projects.slice(0, 5).map((p) => {
                  const pct = p.progress.reduce((s, v) => s + v, 0) / 900;
                  return (
                    <div key={p.id} style={{ display: 'grid',
                                              gridTemplateColumns: '40px 1fr 110px 110px 70px',
                                              gap: 12, padding: '12px 18px',
                                              borderBottom: '1px solid var(--border)',
                                              alignItems: 'center' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface-2)',
                                     display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={p.umbau ? 'layers' : 'drawing'} size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                        <div className="m-mute" style={{ fontSize: 11, marginTop: 1 }}>
                          {p.id} · {p.client}
                        </div>
                      </div>
                      <div>
                        <div className="m-eyebrow" style={{ fontSize: 9 }}>LP {p.phase}/9</div>
                        <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                          {p.progress.map((v, i) => (
                            <div key={i} style={{ width: 8, height: 8, borderRadius: 2,
                                                    background: v === 100 ? 'var(--accent)' : v > 0 ? 'color-mix(in oklch, var(--accent) 50%, var(--surface-2))' : 'var(--surface-2)' }} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <SollIstBar ist={p.hours} soll={p.planned * Math.max(0.05, pct)} w={100} />
                        <div className="m-mute m-num" style={{ fontSize: 10, marginTop: 3 }}>
                          {p.hours}/{Math.round(p.planned * pct)} h
                        </div>
                      </div>
                      <div className="m-num" style={{ fontSize: 13, textAlign: 'right', fontWeight: 500 }}>
                        {d.fmtEur(p.fee/1000)}k
                      </div>
                    </div>
                  );
                })}
              </div>
            </SCard>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>

            <SCard padding={18}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Mein Tag</div>
                <div className="m-num m-mute" style={{ fontSize: 11 }}>Mi · 25.10.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
                <div className="m-num" style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.6 }}>8,25</div>
                <div className="m-mute" style={{ fontSize: 13 }}>/ 8,0 h erfasst</div>
              </div>
              <div style={{ marginTop: 8, height: 6, background: 'var(--surface-2)', borderRadius: 3 }}>
                <div style={{ width: '103%', height: '100%', background: 'var(--accent)', borderRadius: 3, maxWidth: '100%' }} />
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {d.heute.slice(0, 4).map((h, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 40px',
                                          alignItems: 'center', gap: 8, padding: '8px 0',
                                          borderTop: i ? '1px solid var(--border)' : 'none' }}>
                    <div className="m-num m-mute" style={{ fontSize: 10 }}>{h.time}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span className="m-num" style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>{h.project}</span>
                      <span className="m-num m-mute" style={{ fontSize: 11 }}>{h.phase}</span>
                    </div>
                    <div className="m-num" style={{ fontSize: 12, textAlign: 'right' }}>{h.h.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, paddingTop: 10, borderTop: '1px solid var(--border)',
                              display: 'flex', gap: 8 }}>
                <div style={{ flex: 1, padding: '8px 12px', textAlign: 'center',
                                background: 'var(--accent)', color: 'var(--surface)', borderRadius: 6,
                                fontSize: 12, fontWeight: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                  <Icon name="play" size={11} /> Timer starten
                </div>
                <div style={{ padding: '8px 12px', background: 'var(--surface-2)', borderRadius: 6,
                                fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="plus" size={11} /> Manuell
                </div>
              </div>
            </SCard>

            <SCard padding={18}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Aufmerksamkeit</div>
                <div className="m-pill m-pill-warn" style={{ fontSize: 10 }}>{d.risiken.length} offen</div>
              </div>
              {d.risiken.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0',
                                       borderTop: i ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 2,
                                  background: r.severity === 'hoch' ? 'var(--neg)' : 'var(--warn)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 2 }}>
                      <span className="m-num" style={{ fontSize: 10, fontWeight: 600 }}>{r.proj}</span>
                      <span className="m-eyebrow" style={{ fontSize: 9, color: r.severity === 'hoch' ? 'var(--neg)' : 'var(--warn)' }}>
                        {r.severity}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.4 }}>{r.label}</div>
                  </div>
                </div>
              ))}
            </SCard>

            {/* Honorar pipeline */}
            <SCard padding={18}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Honorar-Status</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['Abgerechnet & gezahlt', 2_491_900, 'var(--pos)', 0.55],
                  ['Offen ≤ 30 Tage', 264_600, 'var(--accent)', 0.06],
                  ['Überfällig > 30 Tage', 48_200, 'var(--neg)', 0.01],
                  ['Noch nicht abgerufen', 1_810_400, 'var(--text-mute)', 0.38],
                ].map(([k, v, c, p]) => (
                  <div key={k} style={{ display: 'grid', gridTemplateColumns: '1fr 80px',
                                          gap: 10, alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11 }}>{k}</span>
                      </div>
                      <div style={{ marginTop: 4, height: 4, background: 'var(--surface-2)', borderRadius: 2 }}>
                        <div style={{ width: (p * 100) + '%', height: '100%', background: c, borderRadius: 2 }} />
                      </div>
                    </div>
                    <span className="m-num" style={{ fontSize: 12, textAlign: 'right', color: c, fontWeight: 500 }}>
                      {d.fmtEur(v/1000)}k
                    </span>
                  </div>
                ))}
              </div>
            </SCard>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { DashboardStratum });
