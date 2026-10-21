// Stratum — Mitarbeiter · Zeiterfassung
// Own time entries only. Timer, today's entries, week calendar, week submission.

const EmpZeit = () => {
  const days  = ['Mo 21.10.', 'Di 22.10.', 'Mi 23.10.', 'Do 24.10.', 'Fr 25.10.'];
  const hours = ['08','09','10','11','12','13','14','15','16','17'];

  // Sophia's own week (Teilzeit 32h, freier Freitag-Nachmittag)
  // {d, s (start h-offset from 8), l (length h), proj, ph, c, label}
  const blocks = [
    // Mo
    { d: 0, s: 0.5,  l: 2.0, proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'LV Trockenbau · Vorbereitung' },
    { d: 0, s: 2.75, l: 1.5, proj: 'SAN-302', ph: 'LP4', c: '#b89065', label: 'Bauantrag · Schriftverkehr' },
    { d: 0, s: 5.0,  l: 3.0, proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'Detail Fassadenanschluss' },
    // Di
    { d: 1, s: 0.25, l: 1.5, proj: 'INT',     ph: '—',   c: '#a8a8a8', label: 'Team-Jour-Fixe' },
    { d: 1, s: 2.0,  l: 2.5, proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'LV Trockenbau · Pos 3.10–3.39' },
    { d: 1, s: 5.0,  l: 2.75, proj: 'SAN-302', ph: 'LP4', c: '#b89065', label: 'Stellungnahme Denkmalschutz' },
    // Mi (heute)
    { d: 2, s: 0.5,  l: 1.5, proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'Detail Pfosten-Riegel F-12' },
    { d: 2, s: 2.25, l: 1.75, proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'LV Trockenbau · 3.40–3.78' },
    { d: 2, s: 5.0,  l: 1.5, proj: 'SAN-302', ph: 'LP4', c: '#b89065', label: 'Stellungnahme · Vorbereitung' },
    // Do (geplant, leicht)
    { d: 3, s: 1.0,  l: 4.0, proj: 'INT',     ph: 'WB',  c: '#a8a8a8', label: 'Schulung Revit 2026', planned: true },
    { d: 3, s: 6.0,  l: 2.0, proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'Knoten F-13 · Werkplanung', planned: true },
    // Fr Vormittag (Brückentag-Urlaub geplant — gar keine Blöcke)
  ];

  // Heute laufender Timer (Mi · 12:20 startend, 02:15 jetzt)
  const liveStart = 4.33; // 12:20 → 4.33 h ab 08:00
  const liveLen   = 2.25;

  const daySum = days.map((_, di) =>
    blocks.filter(b => b.d === di && !b.planned).reduce((s, b) => s + b.l, 0)
      + (di === 2 ? liveLen : 0)
  );
  const dayPlan = [6.4, 6.4, 6.4, 6.4, 6.4]; // 32h / 5
  const weekTotal = daySum.reduce((s, v) => s + v, 0);
  const weekPlan  = EMP_USER.weekly;

  // Block colors map for legend
  const projLegend = [
    { id: 'BÜR-118', name: 'Bürohaus Stadtkrone',   c: '#5fa3a8' },
    { id: 'SAN-302', name: 'Sanierung Maxvorstadt', c: '#b89065' },
    { id: 'INT',     name: 'Intern · Schulung',     c: '#a8a8a8' },
  ];

  return (
    <EmpPage active="Zeiterfassung">
      <EmpHeader
        title="Zeiterfassung"
        subtitle={`KW 43 · 21.–25. Oktober 2026 · ${EMP_USER.name}`}
        action={<><Icon name="plus" size={12} /> Eintrag</>}
        secondary={<><Icon name="download" size={12} /> Export</>}
      />

      {/* Top row: Timer + numbers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 14 }}>
        <SCard padding={18} style={{ background: 'var(--surface)', border: '1.5px solid var(--accent)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div>
              <div className="m-eyebrow" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--accent)',
                                  animation: 'mp-pulse 1.6s infinite', display: 'inline-block' }} />
                LÄUFT · seit 12:20
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>BÜR-118 · Bürohaus Stadtkrone</div>
              <div className="m-mute" style={{ fontSize: 12, marginTop: 2 }}>
                Leistungsphase 6 · Vorbereitung der Vergabe
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="m-num" style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1, color: 'var(--accent)' }}>
                02:15:42
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6, justifyContent: 'flex-end' }}>
                <div style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--accent)',
                                color: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="pause" size={12} />
                </div>
                <div style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--surface-2)',
                                color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check" size={14} stroke={2.4} />
                </div>
                <div style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--surface-2)',
                                color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="x" size={12} />
                </div>
              </div>
            </div>
          </div>
        </SCard>

        <SCard padding={18}>
          <div className="m-eyebrow">Heute · Mi 25.10.</div>
          <div className="m-num" style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5, marginTop: 4 }}>
            {daySum[2].toFixed(2)} <span className="m-mute" style={{ fontSize: 14 }}>/ 6,4 h</span>
          </div>
          <div style={{ marginTop: 8, height: 5, background: 'var(--surface-2)', borderRadius: 3 }}>
            <div style={{ width: `${Math.min((daySum[2] / 6.4) * 100, 100)}%`, height: '100%',
                            background: 'var(--accent)', borderRadius: 3 }} />
          </div>
          <div className="m-mute" style={{ fontSize: 11, marginTop: 4 }}>
            inkl. laufender Timer · 100 % verrechenbar
          </div>
        </SCard>

        <SCard padding={18}>
          <div className="m-eyebrow">Woche · KW 43</div>
          <div className="m-num" style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5, marginTop: 4 }}>
            {weekTotal.toFixed(2)} <span className="m-mute" style={{ fontSize: 14 }}>/ {weekPlan},0 h</span>
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 4, alignItems: 'flex-end', height: 22 }}>
            {daySum.map((s, i) => (
              <div key={i} style={{ flex: 1, height: 22, background: 'var(--surface-2)', borderRadius: 2, position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
                                height: `${(s / 8) * 100}%`,
                                background: i === 4 ? 'color-mix(in oklch, var(--accent) 35%, var(--surface-2))' : 'var(--accent)',
                                borderRadius: 2, opacity: 0.9 }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 9, color: 'var(--text-mute)', fontFamily: 'var(--font-data)' }}>
            <span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span>
          </div>
        </SCard>
      </div>

      {/* Week calendar */}
      <SCard padding={0} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'baseline', gap: 12,
                        borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Wochenkalender</div>
          <div className="m-mute" style={{ fontSize: 11 }}>Eigene Einträge · Fr Brückentag geplant</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ padding: '4px 10px', borderRadius: 4, background: 'var(--surface-2)',
                            fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="arrowright" size={10} stroke={2} style={{ transform: 'scaleX(-1)' }} /> KW 42
            </div>
            <div style={{ padding: '4px 10px', borderRadius: 4, background: 'var(--accent-dim)',
                            color: 'var(--accent)', fontSize: 11, fontWeight: 600 }}>KW 43</div>
            <div style={{ padding: '4px 10px', borderRadius: 4, background: 'var(--surface-2)',
                            fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              KW 44 <Icon name="arrowright" size={10} stroke={2} />
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: 16, display: 'grid',
                        gridTemplateColumns: '38px repeat(5, 1fr)',
                        gridTemplateRows: '26px 1fr', gap: 0, overflow: 'hidden' }}>
          <div></div>
          {days.map((day, i) => (
            <div key={day} style={{ padding: '0 8px', display: 'flex', alignItems: 'center', gap: 6,
                                     borderLeft: '1px solid var(--border)' }}>
              <span className="m-num" style={{ fontSize: 11, fontWeight: 600, color: i === 2 ? 'var(--accent)' : 'var(--text)' }}>
                {day}
              </span>
              <span className="m-num m-mute" style={{ fontSize: 10, marginLeft: 'auto' }}>
                {daySum[i].toFixed(1)} <span style={{ opacity: 0.6 }}>/ {dayPlan[i]}</span>
              </span>
            </div>
          ))}

          {/* Hour gutter */}
          <div style={{ position: 'relative', borderTop: '1px solid var(--border)' }}>
            {hours.map((h, i) => (
              <div key={h} style={{ position: 'absolute', top: `${(i/9)*100}%`,
                                      transform: 'translateY(-50%)', right: 4,
                                      fontSize: 9, color: 'var(--text-mute)', fontFamily: 'var(--font-data)' }}>
                {h}
              </div>
            ))}
          </div>

          {days.map((_, di) => (
            <div key={di} style={{ position: 'relative', borderLeft: '1px solid var(--border)',
                                     borderTop: '1px solid var(--border)' }}>
              {hours.slice(0, -1).map((_, i) => (
                <div key={i} style={{ position: 'absolute', top: `${(i+1)/9 * 100}%`, left: 0, right: 0,
                                        height: 1, background: 'var(--border)', opacity: 0.6 }} />
              ))}
              {/* Lunch band */}
              <div style={{ position: 'absolute', top: `${4/9*100}%`, height: `${0.5/9*100}%`,
                              left: 0, right: 0, background: 'var(--surface-2)', opacity: 0.4 }} />
              {/* Now line on Wed */}
              {di === 2 && (
                <div style={{ position: 'absolute', top: `${((liveStart + liveLen)/9)*100}%`,
                                left: 0, right: 0, height: 2, background: 'var(--accent)', zIndex: 3 }}>
                  <div style={{ position: 'absolute', left: -5, top: -3, width: 8, height: 8,
                                  background: 'var(--accent)', borderRadius: 4 }} />
                  <div style={{ position: 'absolute', right: 2, top: -14,
                                  fontSize: 9, fontFamily: 'var(--font-data)', color: 'var(--accent)',
                                  background: 'var(--surface)', padding: '0 4px', borderRadius: 2 }}>
                    14:35
                  </div>
                </div>
              )}
              {/* Live timer block */}
              {di === 2 && (
                <div style={{ position: 'absolute',
                                top: `${(liveStart/9)*100}%`,
                                height: `${(liveLen/9)*100}%`,
                                left: 4, right: 4,
                                background: 'var(--accent)',
                                borderRadius: 4, padding: '6px 8px',
                                color: '#fff', fontSize: 10, lineHeight: 1.2,
                                boxShadow: '0 0 0 2px var(--surface), 0 0 0 3px var(--accent)',
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ width: 5, height: 5, borderRadius: 3, background: '#fff',
                                      animation: 'mp-pulse 1.6s infinite', alignSelf: 'center' }} />
                    <span className="m-num" style={{ fontSize: 11, fontWeight: 600 }}>BÜR-118</span>
                    <span className="m-num" style={{ fontSize: 10, opacity: 0.85 }}>LP6</span>
                  </div>
                  <div className="m-num" style={{ fontSize: 10, opacity: 0.9, alignSelf: 'flex-end' }}>
                    02:15 · läuft
                  </div>
                </div>
              )}
              {blocks.filter(b => b.d === di).map((b, bi) => (
                <div key={bi} style={{ position: 'absolute',
                                         top: `${(b.s/9)*100}%`,
                                         height: `${(b.l/9)*100}%`,
                                         left: 4, right: 4,
                                         background: b.planned ? 'transparent' : b.c,
                                         border: b.planned ? `1.5px dashed ${b.c}` : 'none',
                                         opacity: 0.93,
                                         borderRadius: 4, padding: '6px 8px',
                                         color: b.planned ? b.c : '#fff', fontSize: 10, lineHeight: 1.2,
                                         overflow: 'hidden', cursor: 'pointer',
                                         display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span className="m-num" style={{ fontSize: 11, fontWeight: 600 }}>{b.proj}</span>
                    <span className="m-num" style={{ fontSize: 10, opacity: 0.85 }}>{b.ph}</span>
                  </div>
                  <div className="m-num" style={{ fontSize: 10, opacity: 0.85, alignSelf: 'flex-end' }}>
                    {b.l.toFixed(2)} h
                  </div>
                </div>
              ))}
              {/* Friday placeholder — Urlaub geplant */}
              {di === 4 && (
                <div style={{ position: 'absolute',
                                top: `${(0.5/9)*100}%`,
                                height: `${(4/9)*100}%`,
                                left: 4, right: 4,
                                background: 'repeating-linear-gradient(45deg, color-mix(in oklch, var(--warn) 20%, transparent), color-mix(in oklch, var(--warn) 20%, transparent) 6px, transparent 6px, transparent 12px)',
                                border: '1.5px dashed var(--warn)',
                                borderRadius: 4, padding: '8px 10px',
                                color: 'var(--warn)', fontSize: 11,
                                display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="m-eyebrow" style={{ fontSize: 9, color: 'var(--warn)' }}>URLAUB</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>Brückentag</div>
                  <div className="m-num" style={{ marginTop: 2, opacity: 0.85, fontSize: 10 }}>4,00 h · geplant</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer: legend + submit */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {projLegend.map((p) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: p.c }} />
              <span className="m-num" style={{ fontSize: 10, fontWeight: 600 }}>{p.id}</span>
              <span className="m-mute">{p.name}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2,
                            border: '1.5px dashed var(--accent)' }} />
            <span className="m-mute">geplant</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="m-mute" style={{ fontSize: 11 }}>Wochenstunden zur Freigabe einreichen</span>
            <div style={{ padding: '7px 14px', borderRadius: 6, background: 'var(--accent)', color: 'var(--surface)',
                            fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <Icon name="check" size={12} stroke={2.4} /> Woche abschließen
            </div>
          </div>
        </div>
      </SCard>

      <style>{`@keyframes mp-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.35 } }`}</style>
    </EmpPage>
  );
};

Object.assign(window, { EmpZeit });
