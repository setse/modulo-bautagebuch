// Stratum — Zeiterfassung (Time tracking)
// Running timer at top, today's entries, week calendar grid.

const StratumZeit = () => {
  const d = window.ModuloData;

  // Week grid data — 5 days × 10 hours each, blocks of project work.
  const days = ['Mo 21.10.','Di 22.10.','Mi 23.10.','Do 24.10.','Fr 25.10.'];
  const hours = ['08','09','10','11','12','13','14','15','16','17','18'];

  // Each block: {day, startH, lengthH, project, phase, color, label}
  const blocks = [
    { d: 0, s: 0.25, l: 2.25, proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'Detailknoten Fassade' },
    { d: 0, s: 2.75, l: 1.5,  proj: 'WHB-204', ph: 'LP5', c: '#d97c4a', label: 'Holzfenster' },
    { d: 0, s: 5,    l: 2.5,  proj: 'KIT-077', ph: 'LP8', c: '#7a9e6e', label: 'Bauleitung Augsb.' },
    { d: 0, s: 7.5,  l: 1.5,  proj: 'INT',     ph: '—',   c: '#a8a8a8', label: 'Team-Meeting' },

    { d: 1, s: 0.5,  l: 3,    proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'LV Trockenbau' },
    { d: 1, s: 4,    l: 2,    proj: 'SAN-302', ph: 'LP4', c: '#b89065', label: 'Denkmalschutz' },
    { d: 1, s: 6.25, l: 2,    proj: 'WHB-204', ph: 'LP5', c: '#d97c4a', label: 'Detail W-04' },

    { d: 2, s: 0,    l: 3.5,  proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'LV Fassade' },
    { d: 2, s: 4,    l: 2,    proj: 'GEW-441', ph: 'LP9', c: '#6c7bb8', label: 'Abnahme Mieter 3' },
    { d: 2, s: 6.5,  l: 2.5,  proj: 'WHB-204', ph: 'LP5', c: '#d97c4a', label: 'Werkplanung EG' },

    { d: 3, s: 0,    l: 1.5,  proj: 'INT',     ph: '—',   c: '#a8a8a8', label: 'Akquise SCH-088' },
    { d: 3, s: 1.75, l: 3,    proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'LV HLS' },
    { d: 3, s: 5,    l: 1.75, proj: 'WHB-204', ph: 'LP5', c: '#d97c4a', label: 'Treppe Holz' },
    { d: 3, s: 7,    l: 1.5,  proj: 'SAN-302', ph: 'LP4', c: '#b89065', label: 'Bauantrag-Mappe' },

    { d: 4, s: 0.25, l: 2.25, proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'Vorbereitung Pakete' },
    { d: 4, s: 2.75, l: 1.25, proj: 'WHB-204', ph: 'LP5', c: '#d97c4a', label: 'Knoten W-04' },
    { d: 4, s: 5,    l: 2.5,  proj: 'SAN-302', ph: 'LP4', c: '#b89065', label: 'Stellungnahme' },
    { d: 4, s: 7.5,  l: 2.25, proj: 'BÜR-118', ph: 'LP6', c: '#5fa3a8', label: 'LV TB Pos 3.40–3.78' },
  ];

  // Sum per day
  const daySum = days.map((_, di) => blocks.filter(b => b.d === di).reduce((s, b) => s + b.l, 0));
  const weekTotal = daySum.reduce((s, v) => s + v, 0);

  return (
    <StratumPage active="Zeiterfassung">
      <StratumHeader
        title="Zeiterfassung"
        subtitle="Woche 43 · 21.–27. Oktober 2026"
        action={<><Icon name="plus" size={12} /> Eintrag hinzufügen</>}
        secondary={<><Icon name="calc" size={12} /> Auswerten</>}
      />

      {/* Running timer + week summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 14 }}>
        {/* Active timer */}
        <SCard padding={18} style={{ background: 'var(--surface)',
                                       border: '1.5px solid var(--accent)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div>
              <div className="m-eyebrow" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--accent)',
                                  animation: 'pulse 1.6s infinite', display: 'inline-block' }} />
                LÄUFT · seit 15:30
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>BÜR-118 · Bürohaus Stadtkrone</div>
              <div className="m-mute" style={{ fontSize: 12, marginTop: 2 }}>
                Leistungsphase 6 · Vorbereitung der Vergabe
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="m-num" style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1, color: 'var(--accent)' }}>
                02:14:38
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
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

        {/* Today + week numbers */}
        <SCard padding={18}>
          <div className="m-eyebrow">Heute · Mi 25.10.</div>
          <div className="m-num" style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5, marginTop: 4 }}>
            8,25 <span className="m-mute" style={{ fontSize: 14 }}>/ 8,0 h</span>
          </div>
          <div style={{ marginTop: 8, height: 5, background: 'var(--surface-2)', borderRadius: 3 }}>
            <div style={{ width: '100%', height: '100%', background: 'var(--accent)', borderRadius: 3 }} />
          </div>
          <div className="m-mute" style={{ fontSize: 11, marginTop: 4 }}>+0,25 h Mehrarbeit · 100 % verrechenbar</div>
        </SCard>

        <SCard padding={18}>
          <div className="m-eyebrow">Woche</div>
          <div className="m-num" style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5, marginTop: 4 }}>
            {weekTotal.toFixed(2)} <span className="m-mute" style={{ fontSize: 14 }}>/ 40,0 h</span>
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
            {daySum.map((s, i) => (
              <div key={i} style={{ flex: 1, height: 22, background: 'var(--surface-2)', borderRadius: 3, position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${(s/10)*100}%`,
                                  background: 'var(--accent)', borderRadius: 3, opacity: 0.85 }} />
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
          <div className="m-mute" style={{ fontSize: 11 }}>Klicken Sie und ziehen Sie, um neue Einträge anzulegen</div>
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

        <div style={{ flex: 1, padding: 16, display: 'grid', gridTemplateColumns: '38px repeat(5, 1fr)',
                        gridTemplateRows: '24px 1fr', gap: 0, overflow: 'hidden' }}>
          {/* Empty corner */}
          <div></div>
          {/* Day headers */}
          {days.map((day, i) => (
            <div key={day} style={{ padding: '0 8px', display: 'flex', alignItems: 'center', gap: 6,
                                     borderLeft: '1px solid var(--border)' }}>
              <span className="m-num" style={{ fontSize: 11, fontWeight: 600, color: i === 4 ? 'var(--accent)' : 'var(--text)' }}>
                {day}
              </span>
              <span className="m-num m-mute" style={{ fontSize: 10, marginLeft: 'auto' }}>
                {daySum[i].toFixed(1)} h
              </span>
            </div>
          ))}

          {/* Hour gutter */}
          <div style={{ position: 'relative', borderTop: '1px solid var(--border)' }}>
            {hours.map((h, i) => (
              <div key={h} style={{ position: 'absolute', top: `${(i/10)*100}%`,
                                      transform: 'translateY(-50%)', right: 4,
                                      fontSize: 9, color: 'var(--text-mute)', fontFamily: 'var(--font-data)' }}>
                {h}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((_, di) => (
            <div key={di} style={{ position: 'relative', borderLeft: '1px solid var(--border)',
                                     borderTop: '1px solid var(--border)' }}>
              {/* Hour lines */}
              {hours.slice(0, -1).map((_, i) => (
                <div key={i} style={{ position: 'absolute', top: `${(i+1)/10 * 100}%`, left: 0, right: 0,
                                        height: 1, background: 'var(--border)', opacity: 0.6 }} />
              ))}
              {/* Now line on Fri */}
              {di === 4 && (
                <div style={{ position: 'absolute', top: `${((9.75 - 8)/10)*100}%`, left: 0, right: 0,
                                height: 2, background: 'var(--accent)', zIndex: 2 }}>
                  <div style={{ position: 'absolute', left: -5, top: -3, width: 8, height: 8,
                                  background: 'var(--accent)', borderRadius: 4 }} />
                </div>
              )}
              {/* Blocks */}
              {blocks.filter(b => b.d === di).map((b, bi) => (
                <div key={bi} style={{ position: 'absolute',
                                         top: `${(b.s/10)*100}%`,
                                         height: `${(b.l/10)*100}%`,
                                         left: 4, right: 4,
                                         background: b.c, opacity: 0.92,
                                         borderRadius: 4, padding: '6px 8px',
                                         color: '#fff', fontSize: 10, lineHeight: 1.2,
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
            </div>
          ))}
        </div>

        {/* Project legend */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {[
            ['BÜR-118 · Bürohaus Stadtkrone', '#5fa3a8'],
            ['WHB-204 · Wohnhaus Bergmann', '#d97c4a'],
            ['SAN-302 · Sanierung Maxvorstadt', '#b89065'],
            ['KIT-077 · Kita Lerchenfeld', '#7a9e6e'],
            ['GEW-441 · Gewerbehof Riem', '#6c7bb8'],
            ['Intern · Akquise · Meetings', '#a8a8a8'],
          ].map(([label, c]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
              <span className="m-mute">{label}</span>
            </div>
          ))}
        </div>
      </SCard>

      <style>{`@keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }`}</style>
    </StratumPage>
  );
};

Object.assign(window, { StratumZeit });
