// Stratum — Akquise · Opportunity Pipeline (Kanban)
// Pre-contract opportunities through 5 stages, with a detail panel for the selected card.

const StratumAkquise = () => {
  const d = window.ModuloData;

  // Stages: Anfrage → Qualifizierung → Angebot → Verhandlung → Vertrag/Verloren
  const stages = [
    { id: 'anfrage',       title: 'Anfrage',         hint: 'Erstkontakt', color: 'var(--text-mute)' },
    { id: 'qualifizierung',title: 'Qualifizierung',  hint: 'Bauherr/Aufgabe geklärt', color: 'var(--text-dim)' },
    { id: 'angebot',       title: 'Angebot',         hint: 'Honorarangebot raus', color: 'var(--accent)' },
    { id: 'verhandlung',   title: 'Verhandlung',     hint: 'Klärung HOAI/Leistung', color: 'var(--warn)' },
    { id: 'vertrag',       title: 'Vertrag',         hint: 'unterzeichnet', color: 'var(--pos)' },
  ];

  // Synthetic opportunities — anrechenbare Kosten in k€, Honorar geschätzt, Wahrscheinlichkeit.
  const opps = [
    { id: 'SCH-088', name: 'Schulerweiterung Pasing', client: 'LBB Bayern', city: 'München', type: 'Öffentlich',
      kosten: 6_400_000, fee: 824_300, hz: 'IV', stage: 'angebot', prob: 65, owner: 'mh', age: 14, deadline: '12.11.', active: true },
    { id: 'MFH-901', name: 'MFH Kapellenweg', client: 'Bauherr Privat', city: 'Wolfratshausen', type: 'Wohnen',
      kosten: 4_200_000, fee: 511_700, hz: 'III', stage: 'anfrage', prob: 25, owner: 'lv', age: 4, deadline: '—' },
    { id: 'HOT-126', name: 'Hotel Lerchenstein', client: 'Lerchen Hospitality', city: 'Garmisch', type: 'Hotellerie',
      kosten: 18_900_000, fee: 2_178_400, hz: 'IV', stage: 'qualifizierung', prob: 35, owner: 'ar', age: 9, deadline: '—' },
    { id: 'PRX-055', name: 'Praxisgebäude Dr. Mehl', client: 'GbR Mehl/Sturm', city: 'Augsburg', type: 'Gesundheit',
      kosten: 2_100_000, fee: 268_400, hz: 'III', stage: 'qualifizierung', prob: 40, owner: 'lv', age: 11, deadline: '—' },
    { id: 'KGA-208', name: 'Kindergarten Vaterstetten', client: 'Gemeinde Vaterstetten', city: 'Vaterstetten', type: 'Öffentlich',
      kosten: 3_950_000, fee: 470_300, hz: 'III', stage: 'angebot', prob: 55, owner: 'mh', age: 21, deadline: '30.10.' },
    { id: 'GEW-552', name: 'Logistikzentrum Allach', client: 'NordSüd Logistik AG', city: 'München', type: 'Gewerbe',
      kosten: 12_400_000, fee: 1_184_600, hz: 'II', stage: 'verhandlung', prob: 70, owner: 'ar', age: 32, deadline: '05.11.' },
    { id: 'WHB-318', name: 'Reihenhausanlage Süd', client: 'Stadtbau eG', city: 'Augsburg', type: 'Wohnen',
      kosten: 5_400_000, fee: 658_900, hz: 'III', stage: 'verhandlung', prob: 80, owner: 'mh', age: 18, deadline: '08.11.' },
    { id: 'BÜR-411', name: 'Co-Working Quartier 4', client: 'Quartier4 GmbH', city: 'München', type: 'Verwaltung',
      kosten: 7_200_000, fee: 891_200, hz: 'IV', stage: 'vertrag', prob: 100, owner: 'ar', age: 64, deadline: '24.10.' },
  ];

  const byStage = (id) => opps.filter(o => o.stage === id);
  const sumStage = (id) => byStage(id).reduce((s, o) => s + o.fee * (o.prob / 100), 0);
  const totalGewichtet = opps.reduce((s, o) => s + o.fee * (o.prob / 100), 0);
  const totalBrutto = opps.reduce((s, o) => s + o.fee, 0);

  const selected = opps.find(o => o.active);

  return (
    <StratumPage active="Akquise" padding="20px 24px">
      <StratumHeader
        title="Akquise"
        subtitle="8 Opportunitäten · 3 Angebote draußen · Pipeline gewichtet 4,1 Mio €"
        action={<><Icon name="plus" size={12} /> Neue Anfrage</>}
        secondary={<><Icon name="reports" size={12} /> Auswertung</>}
      />

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {[
          { eyebrow: 'Pipeline · brutto',    value: d.fmtEur(totalBrutto/1_000_000, 2)+' Mio €', sub: '8 aktiv',          tone: 'default' },
          { eyebrow: 'Pipeline · gewichtet', value: d.fmtEur(totalGewichtet/1_000_000, 2)+' Mio €', sub: 'nach Wahrscheinlichk.', tone: 'accent' },
          { eyebrow: 'Win-Rate · 12 M.',     value: '54 %',          sub: '15 von 28 gewonnen',  tone: 'pos' },
          { eyebrow: 'Ø Time-to-Close',      value: '42 Tage',       sub: 'Anfrage → Vertrag',   tone: 'default' },
          { eyebrow: 'Heißeste Lead',        value: 'WHB-318',       sub: '80 % · 659k €',       tone: 'warn' },
        ].map((k, i) => (
          <SCard key={i} padding={14}>
            <div className="m-eyebrow">{k.eyebrow}</div>
            <div className="m-num" style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.4, marginTop: 4 }}>{k.value}</div>
            <div style={{ marginTop: 6 }}><STag tone={k.tone}>{k.sub}</STag></div>
          </SCard>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 14, flex: 1, overflow: 'hidden' }}>

        {/* Kanban */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, overflow: 'hidden' }}>
          {stages.map((stg) => {
            const items = byStage(stg.id);
            return (
              <div key={stg.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
                <div style={{ padding: '10px 12px', background: 'var(--surface)', borderRadius: 6,
                                border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 4, background: stg.color }} />
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{stg.title}</span>
                    <span className="m-num m-mute" style={{ fontSize: 11, marginLeft: 'auto' }}>{items.length}</span>
                  </div>
                  <div className="m-num" style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>
                    {d.fmtEur(sumStage(stg.id)/1000, 0)}k €
                  </div>
                  <div className="m-mute" style={{ fontSize: 10, marginTop: 1 }}>{stg.hint}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, overflow: 'auto', paddingRight: 2 }}>
                  {items.map((o) => {
                    const owner = d.team.find(t => t.id === o.owner);
                    const isSel = o.active;
                    const probTone = o.prob >= 70 ? 'pos' : o.prob >= 40 ? 'accent' : 'default';
                    return (
                      <div key={o.id} style={{ padding: 10, borderRadius: 6,
                                                background: 'var(--surface)',
                                                border: '1px solid ' + (isSel ? 'var(--accent)' : 'var(--border)'),
                                                boxShadow: isSel ? '0 0 0 3px var(--accent-dim)' : 'none',
                                                cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <span className="m-num m-mute" style={{ fontSize: 9 }}>{o.id}</span>
                          <STag tone={probTone} style={{ marginLeft: 'auto', fontSize: 9, padding: '1px 6px' }}>{o.prob} %</STag>
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.25 }}>{o.name}</div>
                        <div className="m-mute" style={{ fontSize: 10, marginTop: 2 }}>{o.client}</div>

                        <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                          <span className="m-num" style={{ fontSize: 13, fontWeight: 600 }}>{d.fmtEur(o.fee/1000, 0)}k</span>
                          <span className="m-mute" style={{ fontSize: 9 }}>· HZ {o.hz}</span>
                        </div>

                        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)',
                                        display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 16, height: 16, borderRadius: 8, background: owner.color,
                                          color: '#fff', fontSize: 8, fontWeight: 600,
                                          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {owner.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="m-mute" style={{ fontSize: 9 }}>{o.age} T.</span>
                          {o.deadline !== '—' && (
                            <span className="m-num" style={{ fontSize: 9, marginLeft: 'auto',
                                                              color: 'var(--warn)' }}>
                              <Icon name="clock" size={9} /> {o.deadline}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Empty placeholder */}
                  <div style={{ minHeight: 60, border: '1.5px dashed var(--border)', borderRadius: 6,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  color: 'var(--text-mute)', fontSize: 11, cursor: 'pointer' }}>
                    <Icon name="plus" size={12} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel — selected opportunity */}
        <SCard padding={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)',
                          background: 'var(--accent-dim)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span className="m-num m-mute" style={{ fontSize: 10 }}>{selected.id}</span>
              <STag tone="accent">in Bearbeitung</STag>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{selected.name}</div>
            <div className="m-mute" style={{ fontSize: 11, marginTop: 2 }}>
              {selected.client} · {selected.city}
            </div>
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Honorar-Vorkalkulation */}
            <div>
              <div className="m-eyebrow" style={{ marginBottom: 8 }}>Honorar-Vorkalkulation · HOAI §35</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '6px 10px', fontSize: 11 }}>
                <span className="m-mute">Anrechenb. Kosten</span>
                <span className="m-num" style={{ textAlign: 'right' }}>{d.fmtEur(selected.kosten)}</span>
                <span className="m-mute">Honorarzone</span>
                <span className="m-num" style={{ textAlign: 'right' }}>{selected.hz} · Mittelsatz</span>
                <span className="m-mute">Grundhonorar</span>
                <span className="m-num" style={{ textAlign: 'right' }}>{d.fmtEur(selected.fee * 0.94)}</span>
                <span className="m-mute">Nebenkosten · 6 %</span>
                <span className="m-num" style={{ textAlign: 'right' }}>{d.fmtEur(selected.fee * 0.06)}</span>
                <div style={{ gridColumn: '1 / -1', height: 1, background: 'var(--border)', margin: '4px 0' }} />
                <span style={{ fontWeight: 600 }}>Honorar gesamt</span>
                <span className="m-num" style={{ textAlign: 'right', fontWeight: 600, fontSize: 14 }}>{d.fmtEur(selected.fee)}</span>
              </div>
            </div>

            {/* Probability slider */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                <span className="m-eyebrow">Wahrscheinlichkeit</span>
                <span className="m-num" style={{ fontSize: 18, fontWeight: 600, color: 'var(--accent)' }}>{selected.prob} %</span>
              </div>
              <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 3, position: 'relative' }}>
                <div style={{ width: `${selected.prob}%`, height: '100%', background: 'var(--accent)', borderRadius: 3 }} />
                <div style={{ position: 'absolute', left: `${selected.prob}%`, top: -4, width: 14, height: 14,
                                background: 'var(--surface)', border: '2px solid var(--accent)', borderRadius: 7,
                                transform: 'translateX(-50%)' }} />
              </div>
              <div className="m-num m-mute" style={{ fontSize: 10, marginTop: 8 }}>
                Gewichtet: {d.fmtEur(selected.fee * selected.prob / 100)} €
              </div>
            </div>

            {/* Timeline */}
            <div>
              <div className="m-eyebrow" style={{ marginBottom: 8 }}>Verlauf</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['12.10.', 'Erstanfrage per Mail · LBB Bayern · Frau Lechner', true],
                  ['16.10.', 'Vor-Ort-Termin Bestandsschule', true],
                  ['22.10.', 'Honorarangebot v1 versendet · 824 k €', true],
                  ['—',      'Antwort erwartet · Frist 12.11.', false],
                  ['—',      'Vertragsentwurf vorbereiten', false],
                ].map(([when, what, done], i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '46px 14px 1fr', gap: 8, fontSize: 11 }}>
                    <span className="m-num m-mute" style={{ fontSize: 10 }}>{when}</span>
                    <div style={{ width: 10, height: 10, borderRadius: 5, marginTop: 3,
                                    background: done ? 'var(--accent)' : 'var(--surface-2)',
                                    border: done ? 'none' : '1.5px solid var(--border)' }} />
                    <span style={{ color: done ? 'var(--text)' : 'var(--text-mute)', lineHeight: 1.35 }}>{what}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <div className="m-eyebrow" style={{ marginBottom: 8 }}>Notiz · Maria Hofer · 22.10.</div>
              <div style={{ padding: 10, background: 'var(--surface-2)', borderRadius: 6, fontSize: 11.5,
                              lineHeight: 1.45, color: 'var(--text-dim)' }}>
                Frau Lechner möchte Verlängerung der Frist auf 19.11. — abgestimmt mit AR.
                Konkurrenzangebot von Steidle &amp; Partner wahrscheinlich, Preisgespräch erforderlich.
              </div>
            </div>
          </div>

          <div style={{ padding: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, padding: '9px 12px', background: 'var(--accent)', color: 'var(--surface)',
                            borderRadius: 6, fontSize: 12, fontWeight: 500, textAlign: 'center', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Icon name="check" size={12} stroke={2.4} /> Stage vorrücken
            </div>
            <div style={{ padding: '9px 12px', background: 'var(--surface-2)', borderRadius: 6,
                            fontSize: 12, cursor: 'pointer', border: '1px solid var(--border)' }}>
              <Icon name="invoice" size={12} />
            </div>
          </div>
        </SCard>
      </div>
    </StratumPage>
  );
};

Object.assign(window, { StratumAkquise });
