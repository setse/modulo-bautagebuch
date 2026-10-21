// Stratum — Einstellungen (Settings)
// Settings sub-nav + HOAI defaults form + hourly rates table + integrations.

const StratumSettings = () => {
  const d = window.ModuloData;

  const settingsNav = [
    ['user',     'Konto',                  false],
    ['folder',   'Büro & Steuer',          false],
    ['calc',     'HOAI-Standards',         true],
    ['euro',     'Stundensätze & Tarife',  false],
    ['team',     'Benutzer & Rollen',      false],
    ['layers',   'Integrationen',          false],
    ['download', 'Export & Datenschutz',   false],
  ];

  return (
    <StratumPage active="Übersicht" padding="24px 28px">
      <StratumHeader
        title="Einstellungen"
        subtitle="Standardwerte für Honorarberechnung, Stundensätze, Team-Zugriff"
        action={<><Icon name="check" size={12} stroke={2.4} /> Änderungen speichern</>}
        search={false}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 18, flex: 1, overflow: 'hidden' }}>

        {/* Settings sub-nav */}
        <SCard padding={12}>
          <div className="m-eyebrow" style={{ padding: '8px 12px 4px' }}>Bereiche</div>
          {settingsNav.map(([icon, label, active]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                                        borderRadius: 6, marginBottom: 2,
                                        background: active ? 'var(--surface-2)' : 'transparent',
                                        color: active ? 'var(--text)' : 'var(--text-dim)',
                                        fontSize: 13, fontWeight: active ? 600 : 400 }}>
              <Icon name={icon === 'user' ? 'team' : icon} size={14} />
              <span>{label}</span>
              {active && <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: 2, background: 'var(--accent)' }} />}
            </div>
          ))}
        </SCard>

        {/* Settings content — HOAI-Standards */}
        <div style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>

          <SCard header={{ title: 'Honorarberechnung · Standards',
                              subtitle: 'Werte werden in neuen Projekten als Voreinstellung übernommen' }} padding={20}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <SettingField label="Standard-Honorarzone" hint="bei neuen Projekten" >
                <div style={{ display: 'flex', gap: 6 }}>
                  {['I','II','III','IV','V'].map(z => (
                    <div key={z} style={{ flex: 1, padding: '10px 0', textAlign: 'center', borderRadius: 6,
                                            background: z === 'III' ? 'var(--accent)' : 'var(--surface-2)',
                                            color: z === 'III' ? 'var(--surface)' : 'var(--text-dim)',
                                            fontFamily: 'var(--font-data)', fontSize: 13, fontWeight: 600,
                                            cursor: 'pointer' }}>{z}</div>
                  ))}
                </div>
              </SettingField>

              <SettingField label="Honorarsatz" hint="§ 7 Vereinbarung">
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Mindest','Mittel','Höchst'].map((s, i) => (
                    <div key={s} style={{ flex: 1, padding: '10px 0', textAlign: 'center', borderRadius: 6,
                                            background: i === 1 ? 'var(--accent)' : 'var(--surface-2)',
                                            color: i === 1 ? 'var(--surface)' : 'var(--text-dim)',
                                            fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{s}satz</div>
                  ))}
                </div>
              </SettingField>

              <SettingField label="Nebenkosten · § 14" hint="pauschal in % vom Honorar">
                <ValueInput value="6,00" suffix="%" />
              </SettingField>

              <SettingField label="Umbauzuschlag · § 6" hint="bei Umbau-Projekten">
                <ValueInput value="33" suffix="%" />
              </SettingField>

              <SettingField label="MwSt." hint="Umsatzsteuer">
                <ValueInput value="19" suffix="%" />
              </SettingField>

              <SettingField label="Zahlungsziel · Abschläge" hint="ab Rechnungsdatum">
                <ValueInput value="14" suffix="Tage" />
              </SettingField>
            </div>
          </SCard>

          <SCard header={{ title: 'Leistungsphasen · Standardprozente §34',
                              subtitle: 'Voreingestellte Phasen für neue Gebäudeplanungsprojekte' }} padding={20}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 6 }}>
              {d.leistungsphasen.map(lp => (
                <div key={lp.nr} style={{ padding: 12, borderRadius: 6, background: 'var(--surface-2)',
                                            textAlign: 'center', position: 'relative' }}>
                  <div className="m-eyebrow" style={{ fontSize: 9 }}>LP {lp.nr}</div>
                  <div className="m-num" style={{ fontSize: 18, fontWeight: 600, color: 'var(--accent)', marginTop: 2 }}>
                    {lp.anteil}
                  </div>
                  <div className="m-mute" style={{ fontSize: 9 }}>%</div>
                  <div style={{ fontSize: 9.5, lineHeight: 1.2, marginTop: 4, color: 'var(--text-dim)' }}>
                    {lp.name.split(' ').slice(0, 2).join(' ')}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: 12, background: 'var(--accent-dim)', borderRadius: 6,
                            display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
              <Icon name="alert" size={14} stroke={2} />
              Σ 100 % gemäß HOAI 2021 §34 — angepasste Phasenverteilungen werden im Honorar­angebot dokumentiert.
            </div>
          </SCard>

          <SCard header={{ title: 'Interne Stundensätze · Kostenermittlung',
                              subtitle: 'Zur Berechnung von Deckungsbeitrag und Soll/Ist' }} padding={0}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: 'var(--surface-2)' }}>
                  {['Rolle','Interner Satz','Verrechnungssatz Min.','Verrechnungssatz Mittel','Verrechnungssatz Max.','Multiplikator'].map(h => (
                    <th key={h} className="m-eyebrow" style={{ textAlign: h === 'Rolle' ? 'left' : 'right',
                                                                  padding: '10px 16px', fontWeight: 500, fontSize: 9.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Partner*in',           120, 145, 165, 195],
                  ['Architekt*in (Senior)', 92, 115, 125, 140],
                  ['Architekt*in',          78,  98, 110, 125],
                  ['Bauzeichner*in',        58,  72,  84,  95],
                  ['Praktikant*in',         28,  45,  52,  62],
                ].map(([role, intern, min, mid, max], i) => (
                  <tr key={role} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500 }}>{role}</td>
                    <td className="m-num" style={{ padding: '12px 16px', textAlign: 'right' }}>{intern} €/h</td>
                    <td className="m-num m-mute" style={{ padding: '12px 16px', textAlign: 'right' }}>{min} €/h</td>
                    <td className="m-num" style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--accent)', fontWeight: 600 }}>{mid} €/h</td>
                    <td className="m-num m-mute" style={{ padding: '12px 16px', textAlign: 'right' }}>{max} €/h</td>
                    <td className="m-num" style={{ padding: '12px 16px', textAlign: 'right' }}>×{(mid/intern).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SCard>

          <SCard header={{ title: 'Integrationen' }} padding={20}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                ['DATEV',         'Buchhaltung · Rechnungsexport', true,  'verbunden'],
                ['lexoffice',     'Alternative Buchhaltung',       false, 'verfügbar'],
                ['Outlook 365',   'Kalender & Mail',               true,  'verbunden'],
                ['Bauantragsportal Bayern', 'BayBauPortal',        false, 'verfügbar'],
                ['Capmo',         'Bautagebuch · Mängel',          true,  'verbunden'],
                ['Revit',         'BIM-Stundenübertragung',        false, 'in Beta'],
              ].map(([name, sub, connected, status], i) => (
                <div key={name} style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 6,
                                          display: 'flex', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface-2)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  color: 'var(--text-dim)', fontSize: 10, fontWeight: 600,
                                  fontFamily: 'var(--font-data)', flexShrink: 0 }}>
                    {name.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div>
                    <div className="m-mute" style={{ fontSize: 11, marginTop: 1 }}>{sub}</div>
                    <div style={{ marginTop: 6 }}>
                      <STag tone={connected ? 'pos' : 'outline'}>
                        {connected && <span style={{ width: 5, height: 5, borderRadius: 3, background: 'var(--pos)' }} />}
                        {status}
                      </STag>
                    </div>
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

const SettingField = ({ label, hint, children }) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
      <div style={{ fontSize: 12, fontWeight: 600 }}>{label}</div>
      {hint && <div className="m-mute" style={{ fontSize: 11 }}>{hint}</div>}
    </div>
    {children}
  </div>
);

const ValueInput = ({ value, suffix }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                  background: 'var(--surface-2)', borderRadius: 6, border: '1px solid var(--border)' }}>
    <span className="m-num" style={{ fontSize: 16, fontWeight: 600 }}>{value}</span>
    <span className="m-mute" style={{ fontSize: 11 }}>{suffix}</span>
    <div style={{ flex: 1 }} />
    <Icon name="chevdown" size={12} />
  </div>
);

Object.assign(window, { StratumSettings });
