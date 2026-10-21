// Stratum — Bauüberwachung · LP 8 Site Supervision (project-level drill-in)
// For KIT-077 Kita Lerchenfeld which is at LP 8.
// Schedule · Trade payments · Defects (Mängel) · Site visits.

const StratumBauueberwachung = () => {
  const d = window.ModuloData;
  const p = d.projects[2]; // KIT-077

  // Trades (Gewerke) with budget vs. abgerechnet
  const gewerke = [
    { name: 'Rohbau',              fa: 'Brunner GmbH',       budget: 820_000, paid: 820_000, status: 'abgeschl.', frei: 100 },
    { name: 'Dach',                fa: 'Dachwerk Süd',       budget: 318_000, paid: 318_000, status: 'abgeschl.', frei: 100 },
    { name: 'Fenster · Fassade',   fa: 'Glas Mayr',          budget: 412_000, paid: 380_000, status: 'läuft',     frei: 92  },
    { name: 'HLS',                 fa: 'Wassermann KG',      budget: 380_000, paid: 285_000, status: 'läuft',     frei: 75  },
    { name: 'Elektro',             fa: 'Voltek',             budget: 245_000, paid: 195_000, status: 'läuft',     frei: 80  },
    { name: 'Trockenbau',          fa: 'Innenausbau Renz',   budget: 198_000, paid: 84_000,  status: 'läuft',     frei: 42  },
    { name: 'Estrich',             fa: 'BodenPlan',          budget: 86_000,  paid: 86_000,  status: 'abgeschl.', frei: 100 },
    { name: 'Maler · Boden',       fa: 'Atelier Lampert',    budget: 144_000, paid: 0,       status: 'beauftragt',frei: 0   },
    { name: 'Außenanlagen',        fa: 'GartenLand',         budget: 168_000, paid: 0,       status: 'ausschr.',  frei: 0   },
  ];
  const budgetTotal = gewerke.reduce((s, g) => s + g.budget, 0);
  const paidTotal   = gewerke.reduce((s, g) => s + g.paid,   0);

  // Mängel (defects)
  const maengel = [
    { id: 'M-218', fa: 'Glas Mayr',         where: 'EG · Achse C/3',  desc: 'Fuge Pfosten-Riegel unsauber gesetzt',        sev: 'mittel',  age: 4,  due: '02.11.' },
    { id: 'M-221', fa: 'Wassermann KG',     where: 'OG · Raum 2.04',  desc: 'Heizkörperhalterung versetzt — Werkplan F',   sev: 'hoch',    age: 2,  due: '28.10.' },
    { id: 'M-224', fa: 'Voltek',            where: 'UG · Technikraum',desc: 'Brandschott unvollständig dokumentiert',     sev: 'hoch',    age: 1,  due: '27.10.' },
    { id: 'M-228', fa: 'Innenausbau Renz',  where: 'EG · Foyer',      desc: 'Eckschiene Trockenbau verschoben (12 mm)',   sev: 'gering',  age: 0,  due: '04.11.' },
  ];

  // Site visits
  const visits = [
    { date: 'Mo 21.10.', time: '08:30', topic: 'Wöchentlicher Baujour fix', present: 'B. Suter (Brunner), M. Hofer, J. Klar', minutes: 12 },
    { date: 'Mi 23.10.', time: '14:00', topic: 'Abnahme Estrich · Erdgeschoss', present: 'B. Oner (BodenPlan), J. Klar', minutes: 4 },
    { date: 'Fr 25.10.', time: '10:00', topic: 'Begehung Mängel KW 42 · Glas Mayr', present: 'M. Hofer, M. Pichler (Glas Mayr)', minutes: 6 },
    { date: 'Mo 28.10.', time: '08:30', topic: 'Baujour fix KW 44', present: '—', minutes: 0, future: true },
    { date: 'Do 31.10.', time: '09:00', topic: 'Abnahme Heizung · Hauptstrang', present: 'Wassermann KG · M. Hofer', minutes: 0, future: true },
  ];

  const sevColor = { hoch: 'var(--neg)', mittel: 'var(--warn)', gering: 'var(--text-mute)' };

  return (
    <StratumPage active="Projekte" padding="20px 28px">
      <StratumHeader
        breadcrumb={['Projekte', 'KIT-077', 'Bauüberwachung']}
        title={<span>Bauüberwachung <span style={{ color: 'var(--text-mute)', fontWeight: 400, fontSize: 18 }}>· {p.name}</span></span>}
        subtitle={`LP 8 · 9 Gewerke · 32 % der Phase erbracht · Inbetriebnahme ${p.deadline}`}
        action={<><Icon name="plus" size={12} /> Begehung anlegen</>}
        secondary={<><Icon name="download" size={12} /> Bautagebuch PDF</>}
      />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 22, borderBottom: '1px solid var(--border)', marginTop: -8 }}>
        {['Übersicht','Leistungsphasen','Zeit','Honorare','Bauüberwachung','Schriftverkehr','Dateien'].map((t, i) => (
          <div key={t} style={{ padding: '10px 0', fontSize: 13,
                                  color: i === 4 ? 'var(--text)' : 'var(--text-dim)',
                                  fontWeight: i === 4 ? 600 : 400,
                                  borderBottom: i === 4 ? '2px solid var(--accent)' : '2px solid transparent',
                                  marginBottom: -1 }}>{t}</div>
        ))}
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {[
          { eyebrow: 'Bausumme',          value: d.fmtEur(budgetTotal/1_000_000, 2)+' Mio €', sub: '9 Gewerke vergeben' },
          { eyebrow: 'Abgerechnet',       value: Math.round(paidTotal/budgetTotal*100)+' %',  sub: d.fmtEur(paidTotal/1000, 0)+'k von '+d.fmtEur(budgetTotal/1000, 0)+'k', tone: 'accent' },
          { eyebrow: 'Offene Mängel',     value: '12',         sub: '3 hoch · 5 mittel · 4 gering', tone: 'warn' },
          { eyebrow: 'Begehungen KW 43',  value: '3',          sub: '1 abgeschlossen, 2 geplant',  tone: 'default' },
          { eyebrow: 'Bauzeit',           value: '76 %',       sub: '37 von 48 Wochen',            tone: 'pos' },
        ].map((k, i) => (
          <SCard key={i} padding={14}>
            <div className="m-eyebrow">{k.eyebrow}</div>
            <div className="m-num" style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.4, marginTop: 4 }}>{k.value}</div>
            <div style={{ marginTop: 6 }}><STag tone={k.tone}>{k.sub}</STag></div>
          </SCard>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, flex: 1, overflow: 'hidden' }}>

        {/* Gewerke + Bauzeitenplan */}
        <SCard padding={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)',
                          display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Gewerke &amp; Bauzeitenplan</div>
            <div className="m-mute" style={{ fontSize: 11 }}>Vergabe · Zahlungsstand · Terminplan</div>
            <div style={{ flex: 1 }} />
            <span className="m-num m-mute" style={{ fontSize: 10 }}>KW 30 — KW 78</span>
          </div>

          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr style={{ background: 'var(--surface-2)' }}>
                  <th className="m-eyebrow" style={{ textAlign: 'left',  padding: '8px 14px', fontWeight: 500, fontSize: 9, width: 130 }}>Gewerk</th>
                  <th className="m-eyebrow" style={{ textAlign: 'left',  padding: '8px 14px', fontWeight: 500, fontSize: 9 }}>Firma</th>
                  <th className="m-eyebrow" style={{ textAlign: 'right', padding: '8px 14px', fontWeight: 500, fontSize: 9 }}>Auftrag</th>
                  <th className="m-eyebrow" style={{ textAlign: 'right', padding: '8px 14px', fontWeight: 500, fontSize: 9 }}>Abgerechn.</th>
                  <th className="m-eyebrow" style={{ textAlign: 'left',  padding: '8px 14px', fontWeight: 500, fontSize: 9, width: 280 }}>Terminbalken (KW)</th>
                </tr>
              </thead>
              <tbody>
                {gewerke.map((g, i) => {
                  // synthetic start/length on the 48-week bar
                  const start = [0, 2, 6, 14, 16, 22, 24, 28, 36][i];
                  const len   = [12, 10, 14, 12, 14, 16, 4, 8, 8][i];
                  const pct = g.budget > 0 ? g.paid / g.budget : 0;
                  const tone = g.status === 'abgeschl.' ? 'pos' : g.status === 'läuft' ? 'accent' :
                                 g.status === 'beauftragt' ? 'default' : 'default';
                  return (
                    <tr key={g.name} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 500 }}>{g.name}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--text-dim)' }}>{g.fa}</td>
                      <td className="m-num" style={{ padding: '12px 14px', textAlign: 'right' }}>{d.fmtEur(g.budget/1000, 0)}k</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <div className="m-num" style={{ fontWeight: 600 }}>{Math.round(pct * 100)} %</div>
                        <div className="m-num m-mute" style={{ fontSize: 10 }}>{d.fmtEur(g.paid/1000, 0)}k</div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ position: 'relative', height: 16, background: 'var(--surface-2)', borderRadius: 3 }}>
                          {/* current week marker */}
                          <div style={{ position: 'absolute', left: `${(37/48)*100}%`, top: -3, bottom: -3, width: 1.5,
                                          background: 'var(--accent)', zIndex: 2 }} />
                          <div style={{ position: 'absolute', left: `${(start/48)*100}%`, width: `${(len/48)*100}%`,
                                          height: '100%', borderRadius: 3,
                                          background: tone === 'pos' ? 'var(--pos)'
                                                    : tone === 'accent' ? 'var(--accent)'
                                                    : 'var(--surface-3)' }} />
                          {/* progress overlay */}
                          {pct > 0 && pct < 1 && (
                            <div style={{ position: 'absolute', left: `${(start/48)*100}%`,
                                            width: `${(len/48)*100*pct}%`, height: '100%', borderRadius: 3,
                                            background: 'color-mix(in oklch, var(--accent) 80%, black)' }} />
                          )}
                          <span className="m-num" style={{ position: 'absolute',
                                                              left: `${(start/48)*100 + 1}%`,
                                                              top: 1, fontSize: 9, color: '#fff',
                                                              textShadow: '0 0 2px rgba(0,0,0,0.4)' }}>
                            KW{30+start}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer summary */}
          <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)',
                          background: 'var(--surface-2)', display: 'flex', gap: 18, fontSize: 11 }}>
            <div>
              <div className="m-eyebrow" style={{ fontSize: 9 }}>Auftragsvolumen</div>
              <div className="m-num" style={{ fontSize: 13, fontWeight: 600 }}>{d.fmtEur(budgetTotal)}</div>
            </div>
            <div>
              <div className="m-eyebrow" style={{ fontSize: 9 }}>Abgerechnet</div>
              <div className="m-num" style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>{d.fmtEur(paidTotal)}</div>
            </div>
            <div>
              <div className="m-eyebrow" style={{ fontSize: 9 }}>Offen</div>
              <div className="m-num" style={{ fontSize: 13, fontWeight: 600 }}>{d.fmtEur(budgetTotal - paidTotal)}</div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ textAlign: 'right' }}>
              <div className="m-eyebrow" style={{ fontSize: 9 }}>Δ Kostenstand zu KG · 700</div>
              <div className="m-num" style={{ fontSize: 13, fontWeight: 600, color: 'var(--pos)' }}>− 38.400 € (Einsparung)</div>
            </div>
          </div>
        </SCard>

        {/* Right column: Mängel + Begehungen */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>

          {/* Mängel */}
          <SCard padding={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)',
                            display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Offene Mängel</div>
              <STag tone="warn">12</STag>
              <div style={{ flex: 1 }} />
              <span className="m-mute" style={{ fontSize: 11, cursor: 'pointer',
                                                 display: 'flex', alignItems: 'center', gap: 4 }}>
                Alle ansehen <Icon name="chevron" size={10} />
              </span>
            </div>

            <div style={{ flex: 1, overflow: 'auto' }}>
              {maengel.map((m, i) => (
                <div key={m.id} style={{ padding: '12px 18px', borderTop: i ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 4, background: sevColor[m.sev],
                                     position: 'relative', top: 1 }} />
                    <span className="m-num m-mute" style={{ fontSize: 10 }}>{m.id}</span>
                    <span style={{ fontSize: 11, fontWeight: 500 }}>{m.fa}</span>
                    <STag tone={m.sev === 'hoch' ? 'neg' : m.sev === 'mittel' ? 'warn' : 'default'}
                            style={{ marginLeft: 'auto', fontSize: 9, padding: '1px 6px' }}>
                      {m.sev}
                    </STag>
                  </div>
                  <div style={{ fontSize: 12, marginTop: 4, lineHeight: 1.35 }}>{m.desc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6,
                                  fontSize: 10, color: 'var(--text-mute)' }}>
                    <span className="m-num"><Icon name="dot" size={8} /> {m.where}</span>
                    <span className="m-num m-mute" style={{ marginLeft: 'auto' }}>
                      Frist {m.due} {m.age <= 1 && <STag tone="neg" style={{ marginLeft: 4, padding: '1px 5px', fontSize: 8 }}>NEU</STag>}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SCard>

          {/* Begehungen */}
          <SCard padding={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)',
                            display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Begehungen · KW 43–44</div>
              <div style={{ flex: 1 }} />
              <span className="m-mute" style={{ fontSize: 11 }}>5 Termine</span>
            </div>

            <div style={{ overflow: 'auto' }}>
              {visits.map((v, i) => (
                <div key={i} style={{ padding: '12px 18px', borderTop: i ? '1px solid var(--border)' : 'none',
                                        display: 'grid', gridTemplateColumns: '52px 1fr', gap: 12,
                                        opacity: v.future ? 0.72 : 1 }}>
                  <div style={{ textAlign: 'center', padding: '6px 4px',
                                  background: v.future ? 'var(--surface-2)' : 'var(--accent-dim)',
                                  border: '1px solid ' + (v.future ? 'var(--border)' : 'var(--accent)'),
                                  borderRadius: 4 }}>
                    <div className="m-num" style={{ fontSize: 9, color: v.future ? 'var(--text-mute)' : 'var(--accent)' }}>
                      {v.date.split(' ')[0]}
                    </div>
                    <div className="m-num" style={{ fontSize: 12, fontWeight: 600, marginTop: 1 }}>
                      {v.date.split(' ')[1].split('.')[0]}
                    </div>
                    <div className="m-num" style={{ fontSize: 9, color: 'var(--text-mute)', marginTop: 1 }}>
                      {v.time}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>{v.topic}</div>
                    <div className="m-mute" style={{ fontSize: 10, marginTop: 2 }}>{v.present}</div>
                    {v.minutes > 0 && (
                      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <STag tone="default" style={{ fontSize: 9 }}>
                          <Icon name="invoice" size={9} /> Protokoll · {v.minutes} TOPs
                        </STag>
                      </div>
                    )}
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

Object.assign(window, { StratumBauueberwachung });
