// Stratum — Mitarbeiter · Kalender
// Month view (October 2026) with multiple event layers:
//  · Own time blocks (LP work) — small dots
//  · Team absences (vacation/sickness)
//  · Project deadlines / milestones
//  · Bayern holidays
//  · Personal meetings

const EmpKalender = () => {
  const month = 'Oktober 2026';
  const today = 25;
  // 1.10.2026 ist Donnerstag — DE Mo–So
  // Grid: 5 weeks, Mo–So
  const weeks = [
    [null,null,null, 1, 2, 3, 4],   // KW40
    [   5,   6,   7, 8, 9,10,11],   // KW41
    [  12,  13,  14,15,16,17,18],   // KW42
    [  19,  20,  21,22,23,24,25],   // KW43 (heute Mi 21)
    [  26,  27,  28,29,30,31,null], // KW44
  ];
  const kw = [40, 41, 42, 43, 44];

  // Event bag — multi-day spans + single-day items
  // type: 'work' | 'absence' | 'deadline' | 'holiday' | 'meeting' | 'planned'
  const events = {
     1: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.5}, {type:'meeting', label:'Kick-Off SAN-302'}],
     2: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 7.0}],
     5: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.5}, {type:'meeting', label:'Jour fixe'}],
     6: [{type:'work', proj:'SAN-302', c:'#b89065', h: 7.0}],
     7: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 5.5}, {type:'deadline', label:'BÜR-118 · LP5 Abgabe', urgent: true}],
     8: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.0}],
     9: [{type:'work', proj:'SAN-302', c:'#b89065', h: 6.5}],
    12: [{type:'work', proj:'SAN-302', c:'#b89065', h: 6.5}],
    13: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.5}, {type:'meeting', label:'Vergabegespräch Trockenbau'}],
    14: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 7.5}],
    15: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.0}],
    16: [{type:'work', proj:'SAN-302', c:'#b89065', h: 5.5}],
    19: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.5}],
    20: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 7.0}, {type:'deadline', label:'SAN-302 · Bauantrag', urgent: false}],
    21: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.5}],
    22: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.75}],
    23: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.5}, {type:'meeting', label:'Schulung Revit 09–13'}],
    26: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.5}, {type:'meeting', label:'Werkstatttermin Holz'}],
    27: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.0}, {type:'deadline', label:'BÜR-118 · Vergabe LP6', urgent: true}],
    28: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.5}],
    29: [{type:'work', proj:'SAN-302', c:'#b89065', h: 6.5}],
    30: [{type:'work', proj:'SAN-302', c:'#b89065', h: 7.0}],
    31: [{type:'holiday', label:'Reformationstag (nicht in BY)'}], // info-only
     3: [{type:'holiday', label:'Tag der Deutschen Einheit'}],
    23: [{type:'work', proj:'BÜR-118', c:'#5fa3a8', h: 6.5}, {type:'meeting', label:'Schulung Revit 09–13'}],
  };

  // Multi-day absence spans
  const absences = [
    { who: 'E. Çelik',  from: 19, to: 25, color: '#5fa3a8', kind: 'vacation' }, // Mo–So
    { who: 'T. Burr',   from: 22, to: 23, color: '#a8a8a8', kind: 'sick' },
    { who: 'A. Renner', from: 12, to: 16, color: '#7a9e6e', kind: 'vacation' },
    { who: 'Du',        from: 27, to: 30, color: '#b89065', kind: 'planned' }, // geplanter Urlaub
    { who: 'L. Vogel',  from: 30, to: 31, color: '#6c7bb8', kind: 'bauleitung' },
  ];

  const holidays = { 3: 'Einheit', 31: 'Reformation' };

  // For each day cell: get absences that touch it
  const absencesOn = (day) => absences.filter(a => day >= a.from && day <= a.to);

  return (
    <EmpPage active="Kalender" padding="20px 24px">
      <EmpHeader
        title="Kalender"
        subtitle={`${month} · 5 Wochen-Übersicht · eigene Zeiten · Team · Projekte`}
        action={<><Icon name="plus" size={12} /> Termin</>}
        secondary={<><Icon name="download" size={12} /> .ics</>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 14, flex: 1, overflow: 'hidden' }}>

        {/* Month grid */}
        <SCard padding={0} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Toolbar */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)',
                          display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={{ width: 26, height: 26, borderRadius: 4, background: 'var(--surface-2)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Icon name="arrowright" size={11} stroke={2} style={{ transform: 'scaleX(-1)' }} />
              </div>
              <div style={{ padding: '5px 12px', borderRadius: 4, background: 'var(--surface-2)',
                              fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                Heute
              </div>
              <div style={{ width: 26, height: 26, borderRadius: 4, background: 'var(--surface-2)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Icon name="arrowright" size={11} stroke={2} />
              </div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3 }}>{month}</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', background: 'var(--surface-2)', borderRadius: 4, padding: 2 }}>
              {['Monat', 'Woche', 'Tag', 'Agenda'].map((m, i) => (
                <div key={m} style={{ padding: '4px 12px', fontSize: 11,
                                         background: i === 0 ? 'var(--surface)' : 'transparent',
                                         color: i === 0 ? 'var(--text)' : 'var(--text-dim)',
                                         fontWeight: i === 0 ? 600 : 400, borderRadius: 3, cursor: 'pointer',
                                         boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}>
                  {m}
                </div>
              ))}
            </div>
          </div>

          {/* Day-of-week header */}
          <div style={{ display: 'grid', gridTemplateColumns: '32px repeat(7, 1fr)',
                          borderBottom: '1px solid var(--border)' }}>
            <div></div>
            {['Mo','Di','Mi','Do','Fr','Sa','So'].map((d, i) => (
              <div key={d} style={{ padding: '8px 10px', fontSize: 10, fontFamily: 'var(--font-data)',
                                     letterSpacing: 0.08, color: i >= 5 ? 'var(--text-mute)' : 'var(--text-dim)',
                                     fontWeight: 600, textTransform: 'uppercase' }}>{d}</div>
            ))}
          </div>

          {/* Weeks */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ flex: 1, display: 'grid',
                                       gridTemplateColumns: '32px repeat(7, 1fr)',
                                       borderBottom: wi < weeks.length - 1 ? '1px solid var(--border)' : 'none' }}>
                {/* KW gutter */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'var(--surface-2)',
                                fontSize: 9, fontFamily: 'var(--font-data)',
                                color: 'var(--text-mute)', fontWeight: 600 }}>
                  KW<br/>{kw[wi]}
                </div>
                {week.map((day, di) => {
                  if (!day) return <div key={di} style={{ background: 'var(--surface-2)', opacity: 0.4 }} />;
                  const isToday = day === today;
                  const isWeekend = di >= 5;
                  const dayEvents = events[day] || [];
                  const dayAbs = absencesOn(day);
                  const holiday = holidays[day];

                  return (
                    <div key={di} style={{ borderLeft: '1px solid var(--border)',
                                             padding: 5, minHeight: 88,
                                             background: isToday ? 'color-mix(in oklch, var(--accent) 6%, var(--surface))'
                                                                   : isWeekend ? 'var(--surface-2)' : 'var(--surface)',
                                             display: 'flex', flexDirection: 'column', gap: 2,
                                             position: 'relative', overflow: 'hidden' }}>
                      {/* Day number */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 1 }}>
                        <span className="m-num" style={{
                            fontSize: 12,
                            fontWeight: isToday ? 700 : 500,
                            color: isToday ? 'var(--surface)' : isWeekend ? 'var(--text-mute)' : 'var(--text)',
                            background: isToday ? 'var(--accent)' : 'transparent',
                            borderRadius: 10, padding: isToday ? '1px 6px' : 0,
                            minWidth: 18, textAlign: 'center' }}>
                          {day}
                        </span>
                        {holiday && (
                          <span className="m-num" style={{ fontSize: 8, color: 'var(--neg)',
                                                              fontWeight: 600, letterSpacing: 0.04 }}>
                            ★ {holiday.toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Absences (multi-day pills) */}
                      {dayAbs.map((a, ai) => {
                        const isStart = day === a.from;
                        const isEnd   = day === a.to;
                        return (
                          <div key={ai} style={{
                              background: a.kind === 'planned'
                                ? `repeating-linear-gradient(45deg, ${a.color}, ${a.color} 3px, color-mix(in oklch, ${a.color} 50%, transparent) 3px, color-mix(in oklch, ${a.color} 50%, transparent) 6px)`
                                : a.color,
                              opacity: a.kind === 'sick' ? 0.7 : 0.92,
                              color: '#fff', fontSize: 9,
                              padding: '1px 5px',
                              marginLeft: isStart ? 0 : -6, marginRight: isEnd ? 0 : -6,
                              borderTopLeftRadius:  isStart ? 3 : 0,
                              borderBottomLeftRadius: isStart ? 3 : 0,
                              borderTopRightRadius: isEnd ? 3 : 0,
                              borderBottomRightRadius: isEnd ? 3 : 0,
                              fontWeight: 600,
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {isStart ? `${a.who} · ${
                              a.kind === 'vacation' ? 'Urlaub' :
                              a.kind === 'sick'     ? 'Krank'  :
                              a.kind === 'planned'  ? 'Urlaub (geplant)' :
                              a.kind === 'bauleitung' ? 'Bauleitung' : ''
                            }` : '\u00A0'}
                          </div>
                        );
                      })}

                      {/* Deadlines */}
                      {dayEvents.filter(e => e.type === 'deadline').map((e, ei) => (
                        <div key={'d'+ei} style={{
                            display: 'flex', alignItems: 'center', gap: 4,
                            padding: '1px 4px', borderRadius: 3,
                            background: e.urgent ? 'color-mix(in oklch, var(--neg) 12%, transparent)' : 'color-mix(in oklch, var(--warn) 14%, transparent)',
                            color: e.urgent ? 'var(--neg)' : 'var(--warn)',
                            fontSize: 9, fontWeight: 600,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          ▲ {e.label}
                        </div>
                      ))}

                      {/* Meetings */}
                      {dayEvents.filter(e => e.type === 'meeting').map((e, ei) => (
                        <div key={'m'+ei} style={{
                            display: 'flex', alignItems: 'center', gap: 3,
                            fontSize: 9, color: 'var(--text-dim)',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <span style={{ width: 5, height: 5, borderRadius: 1, background: 'var(--text-dim)' }} />
                          {e.label}
                        </div>
                      ))}

                      {/* Own work — bottom row of project dots + hours */}
                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 3, paddingTop: 2 }}>
                        {dayEvents.filter(e => e.type === 'work').map((e, ei) => (
                          <span key={'w'+ei} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <span style={{ width: 6, height: 6, borderRadius: 1, background: e.c }} />
                            <span className="m-num" style={{ fontSize: 9, color: 'var(--text-dim)' }}>{e.h}h</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </SCard>

        {/* Right column: filters + agenda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>

          <SCard padding={16}>
            <div className="m-eyebrow" style={{ marginBottom: 10 }}>Anzeigen</div>
            {[
              { c: '#5fa3a8', label: 'Meine Zeiten · BÜR-118',  on: true },
              { c: '#b89065', label: 'Meine Zeiten · SAN-302',  on: true },
              { c: 'var(--accent)', label: 'Team-Abwesenheiten', on: true },
              { c: 'var(--neg)', label: 'Projekt-Deadlines',     on: true },
              { c: 'var(--text-dim)', label: 'Termine & Meetings', on: true },
              { c: 'var(--warn)', label: 'Feiertage Bayern',     on: true },
            ].map((f, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0',
                                        fontSize: 11, cursor: 'pointer' }}>
                <span style={{ width: 12, height: 12, borderRadius: 2, background: f.on ? f.c : 'transparent',
                                  border: f.on ? 'none' : '1.5px solid var(--border-strong)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  {f.on && <Icon name="check" size={9} stroke={3} />}
                </span>
                <span style={{ color: f.on ? 'var(--text)' : 'var(--text-mute)' }}>{f.label}</span>
              </label>
            ))}
          </SCard>

          <SCard padding={0} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 16px 8px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Kommende 14 Tage</div>
              <div className="m-mute" style={{ fontSize: 11, marginTop: 1 }}>
                ab heute · gefiltert nach Bedeutung
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '4px 0' }}>
              {[
                { tag: 'HEUTE', d: 'Mi 25.', items: [
                  { c: 'var(--accent)', label: 'Jour fixe BÜR-118', sub: '15:30 · Konfraum 2' },
                ]},
                { tag: 'MORGEN', d: 'Do 26.', items: [
                  { c: '#5fa3a8', label: 'Werkstatttermin Holz', sub: '09:00 · WHB-204' },
                  { c: 'var(--text-dim)', label: 'Schulung Revit 2026', sub: '14:00 · 4 h intern' },
                ]},
                { tag: 'FR 27.', d: 'Fr 27.', items: [
                  { c: 'var(--neg)', label: '▲ Vergabe LP6 BÜR-118', sub: 'Abgabe Trockenbau · überfällig wenn nicht' },
                  { c: 'var(--warn)', label: 'Brückentag · Urlaub geplant', sub: 'Antrag offen' },
                ]},
                { tag: 'KW 44', d: 'Mo 30.10. – Mo 02.11.', items: [
                  { c: 'var(--warn)', label: 'Urlaub geplant', sub: '4 Tage · Antrag noch offen' },
                  { c: 'var(--neg)', label: '★ Reformationstag', sub: 'Sa 31.10. — kein gesetzl. Feiertag in BY' },
                ]},
              ].map((g, i) => (
                <div key={i} style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                    <span className="m-eyebrow" style={{ fontSize: 9, color: g.tag === 'HEUTE' ? 'var(--accent)' : 'var(--text-mute)' }}>
                      {g.tag}
                    </span>
                    <span className="m-num m-mute" style={{ fontSize: 10 }}>{g.d}</span>
                  </div>
                  {g.items.map((it, ii) => (
                    <div key={ii} style={{ display: 'grid', gridTemplateColumns: '3px 1fr',
                                              gap: 8, padding: '4px 0', alignItems: 'flex-start' }}>
                      <div style={{ width: 3, alignSelf: 'stretch', background: it.c, borderRadius: 2 }} />
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.3 }}>{it.label}</div>
                        <div className="m-mute" style={{ fontSize: 10, marginTop: 1 }}>{it.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </SCard>
        </div>
      </div>
    </EmpPage>
  );
};

Object.assign(window, { EmpKalender });
