// Stratum — Mitarbeiter · Mein Tag
// Personal home for a non-admin employee (Sophia Nowak).
// Running timer, today's entries, week summary, who's online, my next absence.

const EmpHome = () => {
  const d = window.ModuloData;
  const me = EMP_USER;

  // Sophia's entries for today (Mi 25.10.) — nur Projekt + Leistungsphase
  const heute = [
    { time: '08:30–10:00', proj: 'BÜR-118', phase: 'LP6', phaseLong: 'Vorbereitung der Vergabe',     h: 1.50, c: '#5fa3a8' },
    { time: '10:15–12:00', proj: 'BÜR-118', phase: 'LP6', phaseLong: 'Vorbereitung der Vergabe',     h: 1.75, c: '#5fa3a8' },
    { time: '13:00–14:30', proj: 'SAN-302', phase: 'LP4', phaseLong: 'Genehmigungsplanung',            h: 1.50, c: '#b89065' },
  ];
  const heuteSum = heute.reduce((s, e) => s + e.h, 0);

  // Diese Woche so far (Mo–Mi)
  const week = [
    { d: 'Mo', h: 6.5 },
    { d: 'Di', h: 6.75 },
    { d: 'Mi', h: heuteSum + 2.25 /* timer running */ },
    { d: 'Do', h: 0, future: true },
    { d: 'Fr', h: 0, future: true },
  ];
  const weekSum = week.reduce((s, e) => s + e.h, 0);
  const weekPlan = me.weekly;

  const onlineNow = EMP_TEAM.filter(t => t.status === 'online' || t.status === 'busy' || t.status === 'away');
  const abwesendHeute = EMP_TEAM.filter(t => t.status === 'vacation' || t.status === 'sick');

  return (
    <EmpPage active="Mein Tag">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.5 }}>Guten Morgen, Sophia</div>
          <div className="m-mute" style={{ fontSize: 12, marginTop: 2 }}>
            Mittwoch, 25.10.2026 · KW 43 · 14:35 Uhr
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
                        fontSize: 12, color: 'var(--text-mute)', width: 220 }}>
          <Icon name="search" size={12} />
          <span>Projekte, Kolleg:innen…</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-data)', fontSize: 10 }}>⌘K</span>
        </div>
        <div style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--accent)', color: 'var(--surface)',
                        fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="plus" size={12} /> Zeit erfassen
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, flex: 1, overflow: 'hidden' }}>

        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>

          {/* Running timer */}
          <SCard padding={20} style={{ background: 'var(--surface)', border: '1.5px solid var(--accent)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div className="m-eyebrow" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--accent)',
                                    animation: 'mp-pulse 1.6s infinite', display: 'inline-block' }} />
                  TIMER LÄUFT · seit 12:20
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>BÜR-118 · Bürohaus Stadtkrone</div>
                <div className="m-mute" style={{ fontSize: 12, marginTop: 2 }}>
                  Leistungsphase 6 · Vorbereitung der Vergabe
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="m-num" style={{ fontSize: 38, fontWeight: 600, letterSpacing: -1, color: 'var(--accent)', lineHeight: 1 }}>
                  02:15:42
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10, justifyContent: 'flex-end' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 17, background: 'var(--accent)',
                                  color: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="pause" size={12} />
                  </div>
                  <div style={{ width: 34, height: 34, borderRadius: 17, background: 'var(--surface-2)',
                                  color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="check" size={15} stroke={2.4} />
                  </div>
                  <div style={{ width: 34, height: 34, borderRadius: 17, background: 'var(--surface-2)',
                                  color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="x" size={12} />
                  </div>
                </div>
              </div>
            </div>
          </SCard>

          {/* Today + Week metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <SCard padding={18}>
              <div className="m-eyebrow">Heute · Mi 25.10.</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                <span className="m-num" style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>{(heuteSum + 2.25).toFixed(2)}</span>
                <span className="m-mute" style={{ fontSize: 13 }}>/ 6,4 h Soll</span>
              </div>
              <div style={{ marginTop: 8, height: 5, background: 'var(--surface-2)', borderRadius: 3 }}>
                <div style={{ width: '100%', height: '100%', background: 'var(--accent)', borderRadius: 3 }} />
              </div>
              <div className="m-mute" style={{ fontSize: 11, marginTop: 6 }}>+1,1 h über Soll · 100 % verrechenbar</div>
            </SCard>

            <SCard padding={18}>
              <div className="m-eyebrow">Diese Woche</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                <span className="m-num" style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>{weekSum.toFixed(2)}</span>
                <span className="m-mute" style={{ fontSize: 13 }}>/ {weekPlan},0 h</span>
              </div>
              <div style={{ marginTop: 8, display: 'flex', gap: 4, alignItems: 'flex-end', height: 28 }}>
                {week.map((w, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: '100%', height: 22, background: 'var(--surface-2)', borderRadius: 2, position: 'relative' }}>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${(w.h / 9) * 100}%`,
                                      background: w.future ? 'color-mix(in oklch, var(--accent) 25%, var(--surface-2))' : 'var(--accent)',
                                      borderRadius: 2 }} />
                    </div>
                    <span className="m-num m-mute" style={{ fontSize: 9 }}>{w.d}</span>
                  </div>
                ))}
              </div>
            </SCard>
          </div>

          {/* Today's entries */}
          <SCard padding={0} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'baseline', gap: 10,
                            borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Heutige Einträge</div>
              <div className="m-mute" style={{ fontSize: 11 }}>{heute.length} · ohne laufenden Timer</div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11,
                              color: 'var(--accent)', cursor: 'pointer' }}>
                Zur Wochenansicht <Icon name="arrowright" size={10} stroke={2} />
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              {heute.map((e, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '4px 90px 1fr 80px',
                                       gap: 14, padding: '13px 18px', alignItems: 'center',
                                       borderBottom: i < heute.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 4, height: 28, background: e.c, borderRadius: 2 }} />
                  <div className="m-num m-mute" style={{ fontSize: 11 }}>{e.time}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ color: e.c }}>{e.proj}</span>
                      <span className="m-num" style={{ fontSize: 11, color: 'var(--text-dim)' }}>{e.phase}</span>
                    </div>
                    <div className="m-mute" style={{ fontSize: 11, marginTop: 2,
                                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.phaseLong}</div>
                  </div>
                  <div className="m-num" style={{ fontSize: 14, textAlign: 'right', fontWeight: 500 }}>{e.h.toFixed(2)} h</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)',
                            display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span className="m-eyebrow">Summe</span>
              <span className="m-num" style={{ fontSize: 14, fontWeight: 600 }}>{heuteSum.toFixed(2)} h</span>
              <span className="m-mute" style={{ fontSize: 11 }}>+ Timer 02:15 = {(heuteSum + 2.25).toFixed(2)} h</span>
              <div style={{ flex: 1 }} />
              <div style={{ padding: '6px 12px', borderRadius: 6, background: 'var(--surface-2)',
                              fontSize: 11, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <Icon name="plus" size={11} /> Manueller Eintrag
              </div>
            </div>
          </SCard>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>

          {/* Wer ist online */}
          <SCard padding={18}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Wer ist da?</div>
              <span className="m-num m-mute" style={{ fontSize: 11 }}>{onlineNow.length} von {EMP_TEAM.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {onlineNow.slice(0, 5).map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 14, background: p.color,
                                    color: '#fff', fontSize: 10, fontWeight: 600,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ position: 'absolute', right: -1, bottom: -1 }}>
                      <PresenceDot status={p.status} />
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span>{p.name.replace(/(\w)\w+\s/, '$1. ')}</span>
                      {p.self && <span className="m-mute" style={{ fontSize: 9 }}>du</span>}
                    </div>
                    <div className="m-mute" style={{ fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.activity}
                    </div>
                  </div>
                  {p.bis && (
                    <span className="m-num m-mute" style={{ fontSize: 10 }}>bis {p.bis}</span>
                  )}
                </div>
              ))}
            </div>

            {abwesendHeute.length > 0 && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                <div className="m-eyebrow" style={{ marginBottom: 6 }}>Heute abwesend</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {abwesendHeute.map(p => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 11, background: p.color,
                                      color: '#fff', fontSize: 9, fontWeight: 600, opacity: 0.65,
                                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {p.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span style={{ fontSize: 11 }}>{p.name}</span>
                      <span className="m-mute" style={{ fontSize: 11, marginLeft: 'auto' }}>{p.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SCard>

          {/* Kommende Termine */}
          <SCard padding={18}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Diese Woche</div>
              <span className="m-eyebrow" style={{ fontSize: 9, cursor: 'pointer', color: 'var(--accent)' }}>
                KALENDER →
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { tag: 'HEUTE', uhr: '15:30', label: 'Jour fixe BÜR-118', sub: 'mit M. Hofer · Konfraum 2', tone: 'accent' },
                { tag: 'DO 26.', uhr: '09:00', label: 'Werkstatttermin Holz', sub: 'WHB-204 · Schreinerei Aigner', tone: 'default' },
                { tag: 'DO 26.', uhr: '14:00', label: 'Schulung Revit 2026', sub: '4 h · interne Weiterbildung', tone: 'default' },
                { tag: 'FR 27.', uhr: 'ganztägig', label: 'Brückentag · Urlaub geplant', sub: 'noch nicht eingereicht', tone: 'warn' },
              ].map((it, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 10,
                                       padding: '8px 0', alignItems: 'flex-start',
                                       borderTop: i ? '1px solid var(--border)' : 'none' }}>
                  <div>
                    <div className="m-eyebrow" style={{ fontSize: 9, color: it.tone === 'accent' ? 'var(--accent)' : 'var(--text-mute)' }}>
                      {it.tag}
                    </div>
                    <div className="m-num" style={{ fontSize: 11, marginTop: 1 }}>{it.uhr}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{it.label}</div>
                    <div className="m-mute" style={{ fontSize: 11, marginTop: 1 }}>{it.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </SCard>

          {/* Urlaubskonto Aktion */}
          <SCard padding={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Donut pct={me.urlaub.rest / me.urlaub.jahr} size={56} stroke={6}
                      color="var(--accent)" track="var(--surface-2)">
                <div className="m-num" style={{ fontSize: 13, fontWeight: 600 }}>{me.urlaub.rest}</div>
              </Donut>
              <div style={{ flex: 1 }}>
                <div className="m-eyebrow">Urlaub · Resttage</div>
                <div style={{ fontSize: 12, marginTop: 2 }}>
                  <span className="m-num" style={{ fontWeight: 600 }}>{me.urlaub.rest} Tage</span>
                  <span className="m-mute"> + {me.urlaub.geplant} geplant</span>
                </div>
                <div className="m-mute" style={{ fontSize: 11, marginTop: 1 }}>
                  bis 31.12.2026 · 28 Tage Anspruch
                </div>
              </div>
              <div style={{ padding: '7px 12px', borderRadius: 6, background: 'var(--accent)', color: 'var(--surface)',
                              fontSize: 11, fontWeight: 500, cursor: 'pointer' }}>
                Antrag stellen
              </div>
            </div>
          </SCard>
        </div>
      </div>

      <style>{`@keyframes mp-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.35 } }`}</style>
    </EmpPage>
  );
};

Object.assign(window, { EmpHome });
