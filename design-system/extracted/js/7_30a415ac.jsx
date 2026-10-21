// Stratum — Mitarbeiter · Abwesenheit
// Personal vacation balance, request history, team overview (who's out when).

const EmpAbwesenheit = () => {
  const me = EMP_USER;

  // Monatsstreifen für ein Jahr (mein eigenes 2026)
  // Pro Monat: Tage mit Abwesenheits-Markierung
  const months = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // {month-idx 0..11, day 1..31, kind}
  const myAbs = [
    // Februar — Ski-Urlaub
    ...range(15, 19).map(d => ({ m: 1, d, kind: 'vacation' })),
    // Mai — verlängertes WE
    ...range(7, 8).map(d => ({ m: 4, d, kind: 'vacation' })),
    // Juli — Krank
    { m: 6, d: 14, kind: 'sick' },
    { m: 6, d: 15, kind: 'sick' },
    // August — Sommer-Urlaub
    ...range(3, 21).map(d => ({ m: 7, d, kind: 'vacation' })),
    // Geplant: Brückentag Okt
    { m: 9, d: 27, kind: 'planned' },
    { m: 9, d: 28, kind: 'planned' },
    { m: 9, d: 29, kind: 'planned' },
    { m: 9, d: 30, kind: 'planned' },
    // Weihnachten geplant
    ...range(23, 31).map(d => ({ m: 11, d, kind: 'planned' })),
  ];

  const today = { m: 9, d: 25 };

  function range(a, b) { return Array.from({ length: b - a + 1 }, (_, i) => a + i); }

  const kindMap = {
    vacation: { color: 'var(--accent)', label: 'Urlaub' },
    sick:     { color: 'var(--neg)',    label: 'Krank' },
    planned:  { color: 'var(--warn)',   label: 'beantragt' },
  };

  const cellKind = (m, d) => {
    const found = myAbs.find(a => a.m === m && a.d === d);
    return found ? found.kind : null;
  };

  // Anträge
  const requests = [
    { kind: 'planned',  from: '27.10.', to: '30.10.', days: 4, label: 'Brückentag Allerheiligen', status: 'offen',    sub: 'eingereicht 18.10. · Genehmigerin: M. Hofer' },
    { kind: 'planned',  from: '23.12.', to: '31.12.', days: 5, label: 'Weihnachten',              status: 'genehmigt', sub: 'genehmigt 02.10. · M. Hofer' },
    { kind: 'sick',     from: '14.07.', to: '15.07.', days: 2, label: 'Krankheit',                status: 'abgelegt',  sub: 'AU eingereicht · automatisch verbucht' },
    { kind: 'vacation', from: '03.08.', to: '21.08.', days: 15, label: 'Sommerurlaub Kroatien',   status: 'abgelegt',  sub: 'genommen Aug 2026' },
  ];

  // Team-Abwesenheiten (nächste 30 Tage Streifen)
  const teamAbs = [
    { who: 'E. Çelik',   role: 'Architektin · BIM', from: 'Mo 19.10.', to: 'So 01.11.', days: 14, kind: 'vacation', initials: 'EC', c: '#5fa3a8' },
    { who: 'A. Renner',  role: 'Partner',           from: 'Mo 02.11.', to: 'Mi 04.11.', days: 3,  kind: 'vacation', initials: 'AR', c: '#7a9e6e' },
    { who: 'T. Burr',    role: 'Praktikant',        from: 'Mi 22.10.', to: 'Do 23.10.', days: 2,  kind: 'sick',     initials: 'TB', c: '#a8a8a8' },
    { who: 'L. Vogel',   role: 'Architekt',         from: 'Mo 09.11.', to: 'Fr 13.11.', days: 5,  kind: 'vacation', initials: 'LV', c: '#6c7bb8' },
    { who: 'M. Hofer',   role: 'Partnerin',         from: 'Mo 16.11.', to: 'Di 17.11.', days: 2,  kind: 'fortbildung', initials: 'MH', c: '#d97c4a' },
  ];

  return (
    <EmpPage active="Abwesenheit">
      <EmpHeader
        title="Abwesenheit"
        subtitle={`${me.name} · Urlaubsanspruch ${me.urlaub.jahr} Tage · ${me.urlaub.rest} frei`}
        action={<><Icon name="plus" size={12} /> Antrag stellen</>}
        secondary={<><Icon name="download" size={12} /> Übersicht 2026</>}
      />

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        <SCard padding={16}>
          <div className="m-eyebrow">Anspruch 2026</div>
          <div className="m-num" style={{ fontSize: 26, fontWeight: 600, marginTop: 4 }}>{me.urlaub.jahr}<span className="m-mute" style={{ fontSize: 14 }}> Tage</span></div>
          <div className="m-mute" style={{ fontSize: 11, marginTop: 6 }}>+ 0 Resttage aus 2025</div>
        </SCard>
        <SCard padding={16}>
          <div className="m-eyebrow">Bereits genommen</div>
          <div className="m-num" style={{ fontSize: 26, fontWeight: 600, marginTop: 4, color: 'var(--accent)' }}>
            {me.urlaub.genommen}<span className="m-mute" style={{ fontSize: 14 }}> Tage</span>
          </div>
          <div className="m-mute" style={{ fontSize: 11, marginTop: 6 }}>Feb · Mai · Aug</div>
        </SCard>
        <SCard padding={16}>
          <div className="m-eyebrow">Beantragt · offen</div>
          <div className="m-num" style={{ fontSize: 26, fontWeight: 600, marginTop: 4, color: 'var(--warn)' }}>
            {me.urlaub.geplant}<span className="m-mute" style={{ fontSize: 14 }}> Tage</span>
          </div>
          <div className="m-mute" style={{ fontSize: 11, marginTop: 6 }}>Brückentag 4 · Weihnachten genehmigt</div>
        </SCard>
        <SCard padding={16} style={{ background: 'color-mix(in oklch, var(--accent) 6%, var(--surface))', borderColor: 'var(--accent)' }}>
          <div className="m-eyebrow" style={{ color: 'var(--accent)' }}>Noch frei verfügbar</div>
          <div className="m-num" style={{ fontSize: 26, fontWeight: 600, marginTop: 4, color: 'var(--accent)' }}>
            {me.urlaub.rest}<span style={{ fontSize: 14, color: 'var(--accent)', opacity: 0.7 }}> Tage</span>
          </div>
          <div className="m-mute" style={{ fontSize: 11, marginTop: 6 }}>verfallen 31.03.2027</div>
        </SCard>
      </div>

      {/* Mein Jahr 2026 — Heatmap */}
      <SCard padding={18}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Mein Jahr · 2026</div>
          <div className="m-mute" style={{ fontSize: 11 }}>Tageweise · Wochenenden ausgeblendet</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 12, fontSize: 10 }}>
            {Object.entries(kindMap).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: v.color, opacity: k === 'planned' ? 0.6 : 1,
                                  border: k === 'planned' ? `1px dashed ${v.color}` : 'none',
                                  backgroundImage: k === 'planned'
                                    ? `repeating-linear-gradient(45deg, ${'var(--warn)'} 0 2px, transparent 2px 4px)`
                                    : 'none' }} />
                <span className="m-mute">{v.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {months.map((m, mi) => (
            <div key={m} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 56px', gap: 8, alignItems: 'center' }}>
              <div className="m-num" style={{ fontSize: 10, color: mi === today.m ? 'var(--accent)' : 'var(--text-mute)',
                                                  fontWeight: mi === today.m ? 700 : 500 }}>{m}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(31, 1fr)', gap: 2 }}>
                {Array.from({ length: 31 }, (_, di) => {
                  const day = di + 1;
                  const inMonth = day <= daysInMonth[mi];
                  if (!inMonth) return <div key={di} />;
                  // Determine weekday roughly — for visual differentiation only
                  // 1.1.2026 is Donnerstag (4). Compute day-of-week as 0..6 (0=Mo).
                  const daysBefore = daysInMonth.slice(0, mi).reduce((s, n) => s + n, 0);
                  const dowJan1 = 3; // 0=Mo … so Thursday Jan 1 = 3
                  const dow = (dowJan1 + daysBefore + di) % 7;
                  const isWeekend = dow >= 5;
                  const k = cellKind(mi, day);
                  const isToday = mi === today.m && day === today.d;

                  const baseBg = isWeekend ? 'var(--surface-2)' : 'var(--surface-3)';
                  let bg = baseBg;
                  if (k === 'vacation') bg = 'var(--accent)';
                  if (k === 'sick')     bg = 'var(--neg)';
                  if (k === 'planned')  bg = `repeating-linear-gradient(45deg, var(--warn), var(--warn) 2px, color-mix(in oklch, var(--warn) 35%, transparent) 2px, color-mix(in oklch, var(--warn) 35%, transparent) 4px)`;

                  return (
                    <div key={di} title={`${day}.${mi + 1}.${k ? ' · ' + kindMap[k].label : ''}`}
                          style={{ height: 14, borderRadius: 2,
                                  background: bg,
                                  opacity: isWeekend && !k ? 0.4 : 1,
                                  border: isToday ? '1.5px solid var(--text)' : 'none',
                                  boxShadow: isToday ? '0 0 0 1px var(--surface)' : 'none' }} />
                  );
                })}
              </div>
              <div className="m-num m-mute" style={{ fontSize: 10, textAlign: 'right' }}>
                {(() => {
                  const taken = myAbs.filter(a => a.m === mi && (a.kind === 'vacation' || a.kind === 'planned')).length;
                  return taken ? `${taken} Tg.` : '';
                })()}
              </div>
            </div>
          ))}
        </div>
      </SCard>

      {/* Anträge & Team */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14, flex: 1, overflow: 'hidden' }}>

        {/* Meine Anträge */}
        <SCard padding={0} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)',
                          display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Meine Anträge</div>
            <div className="m-mute" style={{ fontSize: 11 }}>2026 · {requests.length} Einträge</div>
            <div style={{ flex: 1 }} />
            <div style={{ padding: '5px 12px', borderRadius: 6, background: 'var(--accent)', color: 'var(--surface)',
                            fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <Icon name="plus" size={11} /> Neuer Antrag
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {requests.map((r, i) => {
              const statusTone = r.status === 'genehmigt' ? 'pos'
                              : r.status === 'offen'     ? 'warn'
                              : 'default';
              return (
                <div key={i} style={{ display: 'grid',
                                         gridTemplateColumns: '4px 1fr 90px 90px',
                                         gap: 12, padding: '14px 18px',
                                         borderBottom: i < requests.length - 1 ? '1px solid var(--border)' : 'none',
                                         alignItems: 'center' }}>
                  <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 2,
                                  background: kindMap[r.kind] ? kindMap[r.kind].color : 'var(--text-dim)' }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{r.label}</div>
                    <div className="m-mute" style={{ fontSize: 11, marginTop: 2 }}>{r.sub}</div>
                  </div>
                  <div>
                    <div className="m-num" style={{ fontSize: 11 }}>{r.from} – {r.to}</div>
                    <div className="m-num m-mute" style={{ fontSize: 10, marginTop: 1 }}>{r.days} Arbeitstage</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <STag tone={statusTone}>{r.status}</STag>
                  </div>
                </div>
              );
            })}
          </div>
        </SCard>

        {/* Team-Abwesenheiten */}
        <SCard padding={0} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Team · nächste 30 Tage</div>
            <div className="m-mute" style={{ fontSize: 11, marginTop: 1 }}>wer ist wann nicht da · damit du planen kannst</div>
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {teamAbs.map((t, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 70px',
                                       gap: 10, padding: '12px 18px',
                                       borderBottom: i < teamAbs.length - 1 ? '1px solid var(--border)' : 'none',
                                       alignItems: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, background: t.c,
                                color: '#fff', fontSize: 10, fontWeight: 600,
                                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    {t.who}
                    <span className="m-mute" style={{ fontSize: 10 }}>{t.role}</span>
                  </div>
                  <div style={{ fontSize: 11, marginTop: 2, color: 'var(--text-dim)' }}>
                    {t.from} → {t.to}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                  <STag tone={t.kind === 'sick' ? 'neg' : t.kind === 'fortbildung' ? 'default' : 'accent'}>
                    {t.kind === 'vacation' ? 'Urlaub' : t.kind === 'sick' ? 'Krank' : 'Fortb.'}
                  </STag>
                  <span className="m-num m-mute" style={{ fontSize: 10 }}>{t.days} Tg.</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border)',
                          background: 'var(--surface-2)', fontSize: 11, color: 'var(--text-dim)' }}>
            <span style={{ fontWeight: 600 }}>Tipp:</span> Ende KW43 / Anfang KW44 sind viele weg —
            für deine Brückentag-Anfrage wahrscheinlich kein Problem.
          </div>
        </SCard>
      </div>
    </EmpPage>
  );
};

Object.assign(window, { EmpAbwesenheit });
