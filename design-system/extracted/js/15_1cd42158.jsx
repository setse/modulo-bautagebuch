// Stratum — Projekt-Detail (single project view).
// Hero header + tabs + LP grid + activity feed + supporting cards.

const StratumProjektDetail = () => {
  const d = window.ModuloData;
  const p = d.projects[1]; // BÜR-118 Bürohaus Stadtkrone
  const phasePct = p.progress.reduce((s, v) => s + v, 0) / 900;

  return (
    <StratumPage active="Projekte" padding="20px 28px">

      <StratumHeader
        breadcrumb={['Projekte', 'Aktiv', p.id]}
        title={<span>{p.name} <span style={{ color: 'var(--text-mute)', fontWeight: 400, fontSize: 18 }}>· {p.id}</span></span>}
        subtitle={`${p.type} · ${p.client} · ${p.city} · HZ ${p.zone} Mittelsatz`}
        action={<><Icon name="plus" size={12} /> Zeit erfassen</>}
        secondary={<><Icon name="euro" size={12} /> Abschlag A 5</>}
      />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 22, borderBottom: '1px solid var(--border)',
                      marginTop: -8, paddingBottom: 0 }}>
        {['Übersicht','Leistungsphasen','Zeit','Honorare','Vertrag','Schriftverkehr','Dateien'].map((t, i) => (
          <div key={t} style={{ padding: '10px 0', fontSize: 13,
                                  color: i === 1 ? 'var(--text)' : 'var(--text-dim)',
                                  fontWeight: i === 1 ? 600 : 400,
                                  borderBottom: i === 1 ? '2px solid var(--accent)' : '2px solid transparent',
                                  marginBottom: -1 }}>
            {t}
          </div>
        ))}
      </div>

      {/* Hero KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) 200px', gap: 14, alignItems: 'stretch' }}>
        {[
          { eyebrow: 'Anrechenb. Kosten', value: d.fmtEur(p.costs/1000, 0)+'k €', sub: 'netto · KG 200–600' },
          { eyebrow: 'Honorar',           value: d.fmtEur(p.fee/1000, 0)+'k €',   sub: 'HZ III · 8 von 9 LP' },
          { eyebrow: 'Abgerechnet',       value: Math.round(p.billed/p.fee*100)+' %', sub: d.fmtEur(p.billed/1000,0)+'k von '+d.fmtEur(p.fee/1000,0)+'k' },
          { eyebrow: 'Stunden Ist',       value: d.fmtNum(p.hours)+' h',           sub: '77 % von '+d.fmtNum(p.planned)+' geplant' },
          { eyebrow: 'DB · aktuell',      value: '32,4 %',                         sub: 'Ziel 30 % · + 2,4 Pp', tone: 'pos' },
        ].map((k, i) => (
          <SCard key={i} padding={14}>
            <div className="m-eyebrow">{k.eyebrow}</div>
            <div className="m-num" style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.4, marginTop: 2,
                                              color: k.tone === 'pos' ? 'var(--pos)' : 'var(--text)' }}>{k.value}</div>
            <div className="m-mute" style={{ fontSize: 10.5, marginTop: 2 }}>{k.sub}</div>
          </SCard>
        ))}
        <SCard padding={14} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Donut pct={phasePct} size={56} stroke={7} color="var(--accent)">
            <span className="m-num" style={{ fontSize: 12, fontWeight: 600 }}>{Math.round(phasePct*100)}%</span>
          </Donut>
          <div>
            <div className="m-eyebrow">Fortschritt</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>LP {p.phase} läuft</div>
            <div className="m-mute" style={{ fontSize: 10 }}>Abnahme {p.deadline}</div>
          </div>
        </SCard>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, flex: 1, overflow: 'hidden' }}>

        {/* LP grid */}
        <SCard header={{ title: 'Leistungsphasen · §34 HOAI', subtitle: `${Math.round(phasePct*100)} % erbracht` }}
                  padding={16}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {d.leistungsphasen.map((lp, i) => {
              const prog = p.progress[i];
              const fee = p.fee * lp.anteil / 100;
              const planH = p.planned * lp.anteil / 100;
              const usedH = prog > 0 ? planH * (prog/100) * (lp.nr === 6 ? 1.18 : 0.95) : 0;
              const isActive = lp.nr === p.phase;
              const done = prog === 100;
              const future = prog === 0;
              return (
                <div key={lp.nr} style={{ padding: 12, borderRadius: 6,
                                            border: '1px solid ' + (isActive ? 'var(--accent)' : 'var(--border)'),
                                            background: isActive ? 'var(--accent-dim)' : future ? 'var(--surface-2)' : 'var(--surface)',
                                            opacity: future ? 0.55 : 1,
                                            position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 11,
                                      background: done ? 'var(--pos)' : isActive ? 'var(--accent)' : 'var(--surface-3)',
                                      color: done || isActive ? 'var(--surface)' : 'var(--text-mute)',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      fontFamily: 'var(--font-data)', fontSize: 10, fontWeight: 600 }}>
                        {done ? <Icon name="check" size={10} stroke={2.6} /> : lp.nr}
                      </div>
                      <span className="m-eyebrow" style={{ fontSize: 9, color: isActive ? 'var(--accent)' : 'var(--text-mute)' }}>
                        LP {lp.nr} · {lp.anteil} %
                      </span>
                    </div>
                    <span className="m-num" style={{ fontSize: 11, fontWeight: 600,
                                                       color: done ? 'var(--pos)' : isActive ? 'var(--accent)' : 'var(--text-mute)' }}>
                      {prog} %
                    </span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500, marginTop: 8, lineHeight: 1.25 }}>{lp.name}</div>
                  <div style={{ marginTop: 8, height: 4, background: future ? 'var(--surface-3)' : 'var(--surface-2)', borderRadius: 2 }}>
                    <div style={{ width: `${prog}%`, height: '100%',
                                    background: done ? 'var(--pos)' : 'var(--accent)', borderRadius: 2 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                    <div>
                      <div className="m-eyebrow" style={{ fontSize: 9 }}>HONORAR</div>
                      <div className="m-num" style={{ fontSize: 12, fontWeight: 600, marginTop: 1 }}>
                        {d.fmtEur(fee/1000, 0)}k
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="m-eyebrow" style={{ fontSize: 9 }}>STD IST/SOLL</div>
                      <div className="m-num" style={{ fontSize: 11, fontWeight: 500, marginTop: 1,
                                                         color: usedH > planH * 1.1 ? 'var(--neg)' : 'var(--text)' }}>
                        {prog > 0 ? `${Math.round(usedH)}/${Math.round(planH)}` : `—/${Math.round(planH)}`}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SCard>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>

          {/* Team on project */}
          <SCard header={{ title: 'Team · diese Woche' }} padding={18}>
            {d.team.slice(0, 4).map((m, i) => {
              const h = [42, 28, 18, 12][i];
              return (
                <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 60px 50px',
                                          gap: 10, alignItems: 'center', padding: '8px 0',
                                          borderTop: i ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, background: m.color,
                                  color: '#fff', fontSize: 10, fontWeight: 600,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{m.name}</div>
                    <div className="m-mute" style={{ fontSize: 10, marginTop: 1 }}>{m.role.split(' · ')[0]}</div>
                  </div>
                  <div style={{ height: 5, background: 'var(--surface-2)', borderRadius: 3, position: 'relative' }}>
                    <div style={{ width: `${(h/42)*100}%`, height: '100%', background: 'var(--accent)', borderRadius: 3 }} />
                  </div>
                  <span className="m-num" style={{ fontSize: 11, textAlign: 'right', fontWeight: 500 }}>{h} h</span>
                </div>
              );
            })}
          </SCard>

          {/* Recent activity */}
          <SCard header={{ title: 'Letzte Aktivität' }} padding={18} style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { who: 'A. Renner', when: 'heute · 10:24', action: 'LV Fassade · Position 4.1 — 4.18 für Anfrage freigegeben.', tag: 'LP 6' },
                { who: 'M. Hofer',  when: 'heute · 09:12', action: 'Honorarabschlag A 5 vorbereitet — Versand 17.11.', tag: 'Honorar' },
                { who: 'E. Çelik',  when: 'Di · 14:38',    action: 'BIM-Modell IFC v0.7 an TGA-Planer übergeben.', tag: 'LP 5' },
                { who: 'J. Klar',   when: 'Mo · 16:02',    action: 'Werkpläne EG-Geschoss aktualisiert (Rev. F).', tag: 'LP 5' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, background: d.team.find(t => t.name === a.who)?.color || 'var(--text-mute)',
                                  color: '#fff', fontSize: 10, fontWeight: 600,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {a.who.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontSize: 11 }}>
                      <span style={{ fontWeight: 600 }}>{a.who}</span>
                      <STag tone="outline" style={{ fontSize: 9, padding: '1px 6px' }}>{a.tag}</STag>
                      <span className="m-mute" style={{ fontSize: 10, marginLeft: 'auto' }}>{a.when}</span>
                    </div>
                    <div style={{ fontSize: 12, marginTop: 3, lineHeight: 1.4 }}>{a.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </SCard>
        </div>
      </div>
    </StratumPage>
  );
};

Object.assign(window, { StratumProjektDetail });
