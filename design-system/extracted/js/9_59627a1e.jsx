// Stratum — Mahnwesen · Dunning workflow for one overdue invoice
// Drill-in from Honorare → "Mahnung erstellen" for BÜR-118 · A 5 (184.500 € · 38 Tage überfällig).
// Three columns: timeline · letter preview · action panel.

const StratumMahnwesen = () => {
  const d = window.ModuloData;

  return (
    <StratumPage active="Honorare" padding="20px 28px">
      <StratumHeader
        breadcrumb={['Honorare', 'Überfällig', '2026-A5-BÜR118']}
        title={<span>Mahnwesen <span style={{ color: 'var(--text-mute)', fontWeight: 400, fontSize: 18 }}>· BÜR-118 · A 5</span></span>}
        subtitle="Süd Invest GmbH · Rechnung 184.500 € · 38 Tage überfällig"
        action={<><Icon name="invoice" size={12} /> Mahnung versenden</>}
        secondary={<><Icon name="clock" size={12} /> Fristverlängerung</>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 320px', gap: 14,
                      flex: 1, overflow: 'hidden' }}>

        {/* LEFT — workflow timeline + customer card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>

          {/* Customer */}
          <SCard padding={16}>
            <div className="m-eyebrow">Forderung</div>
            <div className="m-num" style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.5,
                                              marginTop: 4, color: 'var(--neg)' }}>
              {d.fmtEur(184_500)}
            </div>
            <div className="m-num m-mute" style={{ fontSize: 11, marginTop: 2 }}>+ 4,2 % Verzugszinsen p.a.</div>

            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
              <div className="m-eyebrow" style={{ marginBottom: 6 }}>Schuldner</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Süd Invest GmbH</div>
              <div className="m-mute" style={{ fontSize: 11, marginTop: 2, lineHeight: 1.45 }}>
                Wilfried Brandt · CFO<br />
                Königstraße 28 · 70173 Stuttgart<br />
                <span className="m-num">+49 711 4880-122</span><br />
                <span style={{ color: 'var(--accent)' }}>w.brandt@suedinvest.de</span>
              </div>
            </div>

            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)',
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11 }}>
              <div>
                <div className="m-eyebrow" style={{ fontSize: 9 }}>Beziehung</div>
                <div className="m-num" style={{ fontWeight: 600, marginTop: 2 }}>seit 2019</div>
              </div>
              <div>
                <div className="m-eyebrow" style={{ fontSize: 9 }}>Ø DSO</div>
                <div className="m-num" style={{ fontWeight: 600, marginTop: 2 }}>52 T.</div>
              </div>
              <div>
                <div className="m-eyebrow" style={{ fontSize: 9 }}>Bisheriges Vol.</div>
                <div className="m-num" style={{ fontWeight: 600, marginTop: 2 }}>2,18 Mio €</div>
              </div>
              <div>
                <div className="m-eyebrow" style={{ fontSize: 9 }}>Bonität · Creditreform</div>
                <div className="m-num" style={{ fontWeight: 600, marginTop: 2, color: 'var(--warn)' }}>238 (213↑)</div>
              </div>
            </div>
          </SCard>

          {/* Eskalationsstufen */}
          <SCard header={{ title: 'Eskalationsstufen' }} padding={16} style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 11, top: 8, bottom: 8, width: 2,
                              background: 'var(--surface-2)' }} />

              {[
                { stage: 'Rechnungseingang',         when: '17.09.', state: 'done', body: 'A 5 · BÜR-118 für LP 5 abgeschlossen.' },
                { stage: 'Zahlungserinnerung',       when: '21.10.', state: 'done', body: 'Freundliche Erinnerung per E-Mail an Buchhaltung.' },
                { stage: '1. Mahnung · Stufe 1',     when: '25.10.', state: 'now',  body: 'Schriftliche Mahnung, neue Frist + 7 Tage.' },
                { stage: '2. Mahnung · Stufe 2',     when: '+ 14 T.', state: 'plan', body: 'Verzugszinsen + Mahngebühr 5 €.' },
                { stage: '3. Mahnung · gerichtl.',   when: '+ 28 T.', state: 'plan', body: 'Mahnbescheid · Amtsgericht Stuttgart.' },
                { stage: 'Inkasso · Anwalt',         when: '+ 42 T.', state: 'plan', body: 'Abtretung an Rechtsanwalt Drösler &amp; Klein.' },
              ].map((s, i) => {
                const ring = s.state === 'done' ? 'var(--pos)'
                            : s.state === 'now' ? 'var(--neg)' : 'var(--surface-3)';
                const fill = s.state === 'done' ? 'var(--pos)'
                            : s.state === 'now' ? 'var(--neg)' : 'var(--surface)';
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 12,
                                          padding: '8px 0', alignItems: 'baseline', position: 'relative' }}>
                    <div style={{ width: 12, height: 12, borderRadius: 6, marginTop: 2,
                                    border: '2px solid ' + ring, background: fill, zIndex: 1 }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: s.state === 'now' ? 700 : 500,
                                         color: s.state === 'plan' ? 'var(--text-mute)' : 'var(--text)' }}>
                          {s.stage}
                        </span>
                        <span className="m-num m-mute" style={{ fontSize: 10, marginLeft: 'auto' }}>{s.when}</span>
                      </div>
                      <div className="m-mute" style={{ fontSize: 10.5, marginTop: 2, lineHeight: 1.4 }}>{s.body}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SCard>
        </div>

        {/* MIDDLE — letter preview */}
        <SCard padding={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)',
                          background: 'var(--surface-2)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Mahnung · Stufe 1</div>
            <STag tone="default">Entwurf</STag>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 4 }}>
              {['Stufe 1', 'Stufe 2', 'Mahnbescheid'].map((s, i) => (
                <div key={s} style={{ padding: '4px 10px', borderRadius: 4, fontSize: 10,
                                        background: i === 0 ? 'var(--accent)' : 'var(--surface)',
                                        color: i === 0 ? 'var(--surface)' : 'var(--text-dim)',
                                        border: i === 0 ? 'none' : '1px solid var(--border)',
                                        cursor: 'pointer' }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Document */}
          <div style={{ flex: 1, overflow: 'auto', padding: '24px 8px', background: 'var(--surface-2)',
                          display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 440, background: '#fff', padding: '36px 40px',
                            boxShadow: '0 4px 16px rgba(50,40,30,0.10)', borderRadius: 2,
                            fontSize: 10, lineHeight: 1.55, color: '#1f1f1c', fontFamily: 'var(--font-sans)' }}>

              {/* Letter head */}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                              paddingBottom: 12, borderBottom: '0.5px solid #ccc' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>HOFER · RENNER</div>
                  <div style={{ fontSize: 8, color: '#666', marginTop: 2 }}>Architekten BDA · München</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#888', textAlign: 'right' }}>
                  Schwere-Reiter-Str. 14<br />80637 München<br />+49 89 12 30 45 60
                </div>
              </div>

              {/* Address block */}
              <div style={{ marginTop: 20, fontFamily: 'var(--font-mono)', fontSize: 8, color: '#999',
                              borderBottom: '0.5px solid #eee', paddingBottom: 3 }}>
                Hofer · Renner Architekten BDA · Schwere-Reiter-Str. 14 · 80637 München
              </div>
              <div style={{ marginTop: 12 }}>
                Süd Invest GmbH<br />
                Wilfried Brandt · Kaufmännische Leitung<br />
                Königstraße 28<br />
                70173 Stuttgart
              </div>

              {/* Date */}
              <div style={{ marginTop: 22, textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 9 }}>
                München, 25. Oktober 2026
              </div>

              {/* Subject */}
              <div style={{ marginTop: 20, fontWeight: 700, fontSize: 11 }}>
                Zahlungserinnerung · Rechnung Nr. 2026-A5-BÜR118
              </div>

              <div style={{ marginTop: 14 }}>Sehr geehrter Herr Brandt,</div>

              <div style={{ marginTop: 12 }}>
                bei der Durchsicht unserer Unterlagen ist uns aufgefallen, dass der unten genannte
                Rechnungsbetrag noch nicht beglichen wurde. Wir möchten Sie höflich daran erinnern.
              </div>

              {/* Invoice table */}
              <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 9.5 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 4, paddingBottom: 6,
                                borderBottom: '0.5px solid #ccc', color: '#555' }}>
                  <span>Beleg</span><span style={{ textAlign: 'right' }}>Betrag</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 4, padding: '6px 0' }}>
                  <div>
                    <div>2026-A5-BÜR118</div>
                    <div style={{ color: '#888', fontSize: 8.5 }}>Honorar BÜR-118 · LP 5 Abschlag</div>
                    <div style={{ color: '#888', fontSize: 8.5 }}>Datum 17.09. · fällig 17.10.</div>
                  </div>
                  <div style={{ textAlign: 'right', fontWeight: 600 }}>184.500,00 €</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 4, padding: '6px 0',
                                borderTop: '0.5px solid #eee', color: '#888' }}>
                  <span>+ Verzugszinsen 4,2 % · 38 T.</span>
                  <span style={{ textAlign: 'right' }}>805,42 €</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 4, padding: '8px 0',
                                borderTop: '0.5px solid #ccc', fontWeight: 700, fontSize: 10.5 }}>
                  <span>Gesamtforderung</span>
                  <span style={{ textAlign: 'right' }}>185.305,42 €</span>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                Wir bitten Sie, den offenen Betrag bis zum <strong>01. November 2026</strong> auf unser
                bekanntes Konto zu überweisen. Sollte sich Ihre Zahlung mit diesem Schreiben gekreuzt
                haben, betrachten Sie dieses bitte als gegenstandslos.
              </div>

              <div style={{ marginTop: 14 }}>Mit freundlichen Grüßen</div>

              <div style={{ marginTop: 36, paddingTop: 4, borderTop: '0.5px solid #aaa', width: 160 }}>
                <div style={{ fontSize: 9, fontWeight: 600 }}>Maria Hofer</div>
                <div style={{ fontSize: 8, color: '#888' }}>Partnerin</div>
              </div>
            </div>
          </div>
        </SCard>

        {/* RIGHT — actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>

          {/* Recommendation */}
          <SCard padding={16} style={{ background: 'color-mix(in oklch, var(--accent) 6%, var(--surface))',
                                          border: '1.5px solid var(--accent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="alert" size={13} stroke={2} />
              <div className="m-eyebrow" style={{ color: 'var(--accent)' }}>Empfehlung</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6, lineHeight: 1.35 }}>
              Vor der Mahnung anrufen
            </div>
            <div className="m-mute" style={{ fontSize: 11, marginTop: 4, lineHeight: 1.45 }}>
              Süd Invest ist langjähriger Kunde mit Ø-DSO 52 T. — direkte Klärung mit
              Herrn Brandt erhält die Beziehung. Vorlage: <span style={{ color: 'var(--accent)' }}>Anrufprotokoll-Skript</span>.
            </div>
          </SCard>

          {/* Cost / fee preview */}
          <SCard header={{ title: 'Forderungsaufstellung' }} padding={16}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '6px 8px', fontSize: 11 }}>
              <span className="m-mute">Hauptforderung</span>
              <span className="m-num" style={{ textAlign: 'right' }}>184.500,00 €</span>
              <span className="m-mute">Verzugszinsen 4,2 % · 38 T.</span>
              <span className="m-num" style={{ textAlign: 'right' }}>805,42 €</span>
              <span className="m-mute">Mahngebühr Stufe 1</span>
              <span className="m-num" style={{ textAlign: 'right' }}>5,00 €</span>
              <div style={{ gridColumn: '1 / -1', height: 1, background: 'var(--border)', margin: '4px 0' }} />
              <span style={{ fontWeight: 600 }}>Gesamt</span>
              <span className="m-num" style={{ textAlign: 'right', fontWeight: 600, fontSize: 14 }}>185.310,42 €</span>
            </div>
          </SCard>

          {/* Channels */}
          <SCard header={{ title: 'Versand' }} padding={16}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['E-Mail · w.brandt@suedinvest.de', true,  'als PDF-Anhang'],
                ['Postversand · Einschreiben',      true,  '+ 5,99 € Porto'],
                ['DATEV · automatisch buchen',      false, 'als Mahnung markieren'],
              ].map(([label, on, sub], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                                        border: '1px solid ' + (on ? 'var(--accent)' : 'var(--border)'),
                                        borderRadius: 6,
                                        background: on ? 'var(--accent-dim)' : 'var(--surface)' }}>
                  <div style={{ width: 16, height: 16, borderRadius: 3,
                                  background: on ? 'var(--accent)' : 'var(--surface)',
                                  border: on ? 'none' : '1.5px solid var(--border)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  color: 'var(--surface)' }}>
                    {on && <Icon name="check" size={10} stroke={3} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{label}</div>
                    <div className="m-mute" style={{ fontSize: 10, marginTop: 1 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </SCard>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ padding: '11px 14px', background: 'var(--accent)', color: 'var(--surface)',
                            borderRadius: 6, fontSize: 13, fontWeight: 500, textAlign: 'center', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Icon name="check" size={13} stroke={2.4} /> Mahnung versenden
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, padding: '9px 12px', background: 'var(--surface-2)', borderRadius: 6,
                              fontSize: 12, textAlign: 'center', cursor: 'pointer',
                              border: '1px solid var(--border)' }}>
                Erst anrufen
              </div>
              <div style={{ flex: 1, padding: '9px 12px', background: 'var(--surface-2)', borderRadius: 6,
                              fontSize: 12, textAlign: 'center', cursor: 'pointer',
                              border: '1px solid var(--border)' }}>
                Frist verlängern
              </div>
            </div>
          </div>
        </div>
      </div>
    </StratumPage>
  );
};

Object.assign(window, { StratumMahnwesen });
