// Stratum — Honorare (Fees / Invoices)
// Pipeline visualisation + table of all Abschläge.

const StratumHonorare = () => {
  const d = window.ModuloData;

  // Synthetic invoice list across projects.
  const rechnungen = [
    { nr: '2026-A4-WHB204', proj: 'WHB-204', name: 'Wohnhaus Bergmann',  abschlag: 'A 4', amount: 57_894,  date: '25.10.', due: '08.11.', status: 'entwurf' },
    { nr: '2026-A5-BÜR118', proj: 'BÜR-118', name: 'Bürohaus Stadtkrone',abschlag: 'A 5', amount: 184_500, date: '17.09.', due: '17.10.', status: 'überfällig', days: 38 },
    { nr: '2026-A8-KIT077', proj: 'KIT-077', name: 'Kita Lerchenfeld',   abschlag: 'A 8', amount: 64_180,  date: '02.10.', due: '02.11.', status: 'versendet', days: 23 },
    { nr: '2026-S1-GEW441', proj: 'GEW-441', name: 'Gewerbehof Riem',    abschlag: 'S 1', amount: 88_900,  date: '18.09.', due: '02.10.', status: 'bezahlt' },
    { nr: '2026-A3-SAN302', proj: 'SAN-302', name: 'Sanierung Maxvorst.', abschlag: 'A 3', amount: 72_400,  date: '10.09.', due: '24.09.', status: 'bezahlt' },
    { nr: '2026-A1-EFH512', proj: 'EFH-512', name: 'Doppelhaus Grünwald',abschlag: 'A 1', amount: 28_400,  date: '20.08.', due: '03.09.', status: 'bezahlt' },
    { nr: '2026-A4-BÜR118', proj: 'BÜR-118', name: 'Bürohaus Stadtkrone',abschlag: 'A 4', amount: 305_700, date: '20.04.', due: '04.05.', status: 'bezahlt' },
    { nr: '2026-A7-KIT077', proj: 'KIT-077', name: 'Kita Lerchenfeld',   abschlag: 'A 7', amount: 58_300,  date: '12.05.', due: '26.05.', status: 'bezahlt' },
  ];

  const statusMap = {
    entwurf:    { tone: 'default', label: 'Entwurf'    },
    versendet:  { tone: 'accent',  label: 'Versendet'  },
    überfällig: { tone: 'neg',     label: 'Überfällig' },
    bezahlt:    { tone: 'pos',     label: 'Bezahlt'    },
  };

  return (
    <StratumPage active="Honorare">
      <StratumHeader
        title="Honorare & Rechnungen"
        subtitle="Geschäftsjahr 2026 · Stand 25.10."
        action={<><Icon name="plus" size={12} /> Abschlagsrechnung</>}
        secondary={<><Icon name="download" size={12} /> DATEV-Export</>}
      />

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { eyebrow: 'Abgerechnet YTD',     value: d.fmtEur(2_491_900),  sub: '23 Rechnungen', tone: 'pos' },
          { eyebrow: 'Offene Forderungen',  value: d.fmtEur(312_800),    sub: '4 Rechnungen offen', tone: 'accent' },
          { eyebrow: 'Überfällig > 30 T.',  value: d.fmtEur(184_500),    sub: 'BÜR-118 · A 5 · 38 T.', tone: 'neg' },
          { eyebrow: 'DSO',                 value: '38 Tage',            sub: 'Ziel ≤ 30 · ↑ 4 T. vs. Q2', tone: 'warn' },
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

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, flex: 1, overflow: 'hidden' }}>

        {/* Pipeline + Table */}
        <SCard padding={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Pipeline */}
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Honorar-Pipeline · Portfolio</div>
              <div className="m-mute" style={{ fontSize: 11 }}>Σ {d.fmtEur(4_650_000)} Vertragsvolumen</div>
            </div>
            <div style={{ display: 'flex', height: 18, borderRadius: 4, overflow: 'hidden', gap: 2 }}>
              {[
                ['Bezahlt',           2_491_900, 'var(--pos)'],
                ['Offen ≤ 30 T.',     128_300,   'var(--accent)'],
                ['Überfällig > 30 T.',184_500,   'var(--neg)'],
                ['In Vorbereitung',   235_000,   'color-mix(in oklch, var(--accent) 35%, var(--surface-2))'],
                ['Noch nicht abgerufen', 1_610_300, 'var(--surface-3)'],
              ].map(([k, v, c], i) => (
                <div key={k} style={{ flex: v, background: c, position: 'relative' }}>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10 }}>
              {[
                ['Bezahlt',           '2.491,9k €', 'var(--pos)'],
                ['Offen ≤ 30 T.',     '128,3k €',   'var(--accent)'],
                ['Überfällig',        '184,5k €',   'var(--neg)'],
                ['In Vorbereitung',   '235,0k €',   'color-mix(in oklch, var(--accent) 35%, var(--surface-2))'],
                ['Noch nicht abgerufen','1.610,3k €','var(--surface-3)'],
              ].map(([k, v, c], i) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                  <div>
                    <div className="m-mute" style={{ fontSize: 10 }}>{k}</div>
                    <div className="m-num" style={{ fontSize: 11 }}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 1 }}>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Rechnung','Projekt','Abschlag','Datum','Fällig','Betrag','Status'].map(h => (
                    <th key={h} className="m-eyebrow" style={{ textAlign: h === 'Betrag' ? 'right' : 'left',
                                                                  padding: '10px 14px', fontWeight: 500, fontSize: 9.5 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rechnungen.map((r, i) => {
                  const st = statusMap[r.status];
                  return (
                    <tr key={r.nr} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 14px' }}>
                        <div className="m-num" style={{ fontSize: 11, fontWeight: 500 }}>{r.nr}</div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontSize: 12 }}>{r.name}</div>
                        <div className="m-num m-mute" style={{ fontSize: 10 }}>{r.proj}</div>
                      </td>
                      <td className="m-num" style={{ padding: '12px 14px', fontSize: 12, fontWeight: 600 }}>{r.abschlag}</td>
                      <td className="m-num m-mute" style={{ padding: '12px 14px', fontSize: 11 }}>{r.date}</td>
                      <td className="m-num" style={{ padding: '12px 14px', fontSize: 11,
                                                        color: r.status === 'überfällig' ? 'var(--neg)' : 'var(--text-dim)' }}>
                        {r.due}{r.days && r.status === 'überfällig' && <span style={{ marginLeft: 4 }}>+{r.days}T</span>}
                      </td>
                      <td className="m-num" style={{ padding: '12px 14px', textAlign: 'right',
                                                        fontSize: 13, fontWeight: 600 }}>
                        {d.fmtEur(r.amount)}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <STag tone={st.tone}>{st.label}</STag>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SCard>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>

          {/* Overdue card */}
          <SCard padding={18} style={{ border: '1.5px solid var(--neg)', background: 'color-mix(in oklch, var(--neg) 4%, var(--surface))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="alert" size={14} stroke={2} />
              <div style={{ fontSize: 14, fontWeight: 600 }}>Mahnstufe-1 fällig</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div className="m-num m-mute" style={{ fontSize: 10 }}>BÜR-118 · A 4 · seit 38 Tagen</div>
              <div className="m-num" style={{ fontSize: 22, fontWeight: 600, marginTop: 4, letterSpacing: -0.4, color: 'var(--neg)' }}>
                {d.fmtEur(184_500)}
              </div>
              <div className="m-mute" style={{ fontSize: 11, marginTop: 2 }}>Süd Invest GmbH · CFO Wilfried Brandt</div>
            </div>
            <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
              <div style={{ flex: 1, padding: '8px 12px', background: 'var(--neg)', color: 'var(--surface)',
                              borderRadius: 6, fontSize: 12, fontWeight: 500, textAlign: 'center', cursor: 'pointer' }}>
                Mahnung erstellen
              </div>
              <div style={{ padding: '8px 12px', background: 'var(--surface-2)', borderRadius: 6,
                              fontSize: 12, cursor: 'pointer' }}>Anrufen</div>
            </div>
          </SCard>

          {/* Cashflow forecast */}
          <SCard header={{ title: 'Cash-Forecast', subtitle: '30 Tage' }} padding={18}>
            <div className="m-num" style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.5, color: 'var(--pos)' }}>
              + 241k €
            </div>
            <div className="m-mute" style={{ fontSize: 11, marginTop: 2 }}>Eingang prognostiziert</div>

            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['25.10.', 'WHB-204 · A 4', 57_894, 'entwurf'],
                ['08.11.', 'WHB-204 · A 4 fällig', 57_894, 'erwartet'],
                ['02.11.', 'KIT-077 · A 8 fällig', 64_180, 'erwartet'],
                ['15.11.', 'BÜR-118 · A 5 vorber.', 184_500, 'plan'],
              ].map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 1fr auto', gap: 10,
                                        padding: '6px 0', borderTop: i ? '1px solid var(--border)' : 'none',
                                        alignItems: 'center' }}>
                  <span className="m-num m-mute" style={{ fontSize: 10 }}>{row[0]}</span>
                  <span style={{ fontSize: 12 }}>{row[1]}</span>
                  <span className="m-num" style={{ fontSize: 12, fontWeight: 500 }}>{d.fmtEur(row[2]/1000, 1)}k</span>
                </div>
              ))}
            </div>
          </SCard>

          {/* Sparkline mini */}
          <SCard padding={18}>
            <div className="m-eyebrow">Honorareingang · 12 Monate</div>
            <div style={{ marginTop: 8 }}>
              <Sparkline data={[180,220,140,260,310,290,250,240,290,310,260,290]}
                            w={260} h={50} stroke="var(--accent)"
                            fill="color-mix(in oklch, var(--accent) 12%, transparent)" strokeWidth={2} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginTop: 4,
                            color: 'var(--text-mute)', fontFamily: 'var(--font-data)' }}>
              <span>Nov 25</span><span>Okt 26</span>
            </div>
          </SCard>
        </div>
      </div>
    </StratumPage>
  );
};

Object.assign(window, { StratumHonorare });
