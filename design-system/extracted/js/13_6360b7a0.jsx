// HOAI Honorar-Rechner B — WIZARD
// 6-Schritt Wizard mit großen Touch-Targets. Theme: Stratum (warm, calm).
// Linke Spalte: Schritte mit Fortschritt. Mitte: aktiver Schritt (Schritt 4 LP-Auswahl).
// Rechts: laufende Berechnung mit Trail jeder Auswahl.

const HoaiWizard = () => {
  const d = window.ModuloData;
  const steps = [
    ['Projekt-Typ',        'Gebäude · Innenräume · Freianlage'],
    ['Anrechenbare Kosten','Kostenermittlung gem. § 33'],
    ['Honorarzone',        'Einstufung nach Anforderungen'],
    ['Leistungsphasen',    'Welche Phasen leistet das Büro?'],
    ['Zuschläge & NK',     'Umbauzuschlag · Nebenkosten'],
    ['Honorar bestätigen', 'Angebot generieren'],
  ];
  const activeStep = 3;

  const phasen = [1,2,3,4,5,6,7,8];
  const totalAnteil = phasen.reduce((s, n) => s + d.leistungsphasen[n-1].anteil, 0);

  return (
    <div className="m-app theme-stratum dens-comfy"
         style={{ width: 1280, height: 800, display: 'grid',
                  gridTemplateColumns: '230px 1fr', overflow: 'hidden' }}>

      <StratumSidebar active="HOAI-Rechner" />

      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', padding: '20px 28px 16px', gap: 14 }}>
          <Icon name="chevron" size={14} stroke={1.4} />
          <div className="m-mute" style={{ fontSize: 12 }}>HOAI-Rechner</div>
          <Icon name="chevron" size={10} stroke={1.4} />
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.4 }}>Neues Honorarangebot</div>
          <div style={{ flex: 1 }} />
          <div className="m-pill" style={{ background: 'var(--surface)', padding: '4px 10px' }}>
            <span className="m-eyebrow">Entwurf</span>
            <span className="m-num m-mute" style={{ marginLeft: 8, fontSize: 10 }}>zuletzt gespeichert 09:38</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr 340px',
                       padding: '0 28px 28px', gap: 20, overflow: 'hidden' }}>

          {/* Steps */}
          <div className="m-card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div className="m-eyebrow" style={{ marginBottom: 12 }}>Schritte</div>
            {steps.map(([title, sub], i) => {
              const done = i < activeStep;
              const active = i === activeStep;
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10, padding: '10px 6px',
                                        background: active ? 'var(--surface-2)' : 'transparent', borderRadius: 8,
                                        position: 'relative' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 12,
                                  background: done ? 'var(--accent)' : active ? 'var(--text)' : 'var(--surface-2)',
                                  color: done || active ? 'var(--surface)' : 'var(--text-mute)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontFamily: 'var(--font-data)', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                    {done ? <Icon name="check" size={12} /> : i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: active ? 600 : 500,
                                    color: done || active ? 'var(--text)' : 'var(--text-dim)' }}>{title}</div>
                    <div className="m-mute" style={{ fontSize: 10, marginTop: 1 }}>{sub}</div>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ position: 'absolute', left: 17, top: 34, bottom: -4, width: 1,
                                    background: done ? 'var(--accent)' : 'var(--border)' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active step content */}
          <div className="m-card" style={{ padding: 28, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="m-eyebrow">Schritt 4 von 6</div>
            <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.5, marginTop: 4 }}>
              Welche Leistungsphasen leistet das Büro?
            </div>
            <div className="m-mute" style={{ fontSize: 13, marginTop: 6, maxWidth: 540 }}>
              Wählen Sie alle Leistungsphasen aus, die im Honorarangebot enthalten sind. Die Prozentsätze ergeben das Honorar
              gemäß § 34 HOAI für Gebäudeplanung.
            </div>

            <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {d.leistungsphasen.map((lp) => {
                const sel = phasen.includes(lp.nr);
                return (
                  <div key={lp.nr} style={{ padding: 14, border: '1.5px solid ' + (sel ? 'var(--accent)' : 'var(--border)'),
                                              borderRadius: 8, background: sel ? color_mix(0.05) : 'var(--surface)',
                                              position: 'relative', cursor: 'pointer',
                                              boxShadow: sel ? '0 1px 0 rgba(0,0,0,0.04)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div className="m-eyebrow" style={{ color: sel ? 'var(--accent)' : 'var(--text-mute)' }}>
                        LP {lp.nr}
                      </div>
                      <div style={{ width: 18, height: 18, borderRadius: 4,
                                      background: sel ? 'var(--accent)' : 'transparent',
                                      border: '1.5px solid ' + (sel ? 'var(--accent)' : 'var(--border-strong)'),
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      color: 'var(--surface)' }}>
                        {sel && <Icon name="check" size={11} stroke={2.6} />}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, marginTop: 8, lineHeight: 1.3 }}>{lp.name}</div>
                    <div className="m-num" style={{ fontSize: 18, marginTop: 8, fontWeight: 500,
                                                       color: sel ? 'var(--accent)' : 'var(--text-mute)' }}>
                      {lp.anteil} <span style={{ fontSize: 11 }}>%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 16, padding: 14, background: 'var(--surface-2)', borderRadius: 8,
                            display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="alert" size={16} />
              <div style={{ flex: 1, fontSize: 12 }}>
                LP 9 (Objektbetreuung) ist nicht ausgewählt. Soll diese später optional angeboten werden?
              </div>
              <div className="m-pill" style={{ background: 'var(--surface)', padding: '4px 10px', cursor: 'pointer' }}>
                Als Option hinzufügen
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex',
                            alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px',
                              background: 'var(--surface-2)', borderRadius: 8, fontSize: 13, fontWeight: 500 }}>
                <Icon name="arrowright" size={12} stroke={2} style={{ transform: 'scaleX(-1)' }} /> Zurück
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div className="m-eyebrow">Σ ausgewählt</div>
                <div className="m-num" style={{ fontSize: 16, fontWeight: 600 }}>
                  {totalAnteil}<span className="m-mute"> % · 8 von 9 Phasen</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 22px',
                              background: 'var(--accent)', color: 'var(--surface)', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                Weiter <Icon name="arrowright" size={13} stroke={2.4} />
              </div>
            </div>
          </div>

          {/* Live calculation */}
          <div className="m-card" style={{ padding: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="m-eyebrow">Honorar · live</div>
            <div className="m-num" style={{ fontSize: 32, fontWeight: 600, letterSpacing: -1, marginTop: 6,
                                              color: 'var(--accent)' }}>
              {d.fmtEur(218_400)}
            </div>
            <div className="m-mute" style={{ fontSize: 12, marginTop: 2 }}>Grundleistungen netto · 98 % von Vollhonorar</div>

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Gebäudeplanung gem. §34', '', true],
                ['Anrechenbare Kosten', d.fmtEur(1_850_000)],
                ['Honorarzone III · Mittelsatz', d.fmtEur(222_858)],
                ['Leistungsphasen 1–8', '98 %'],
                ['Umbauzuschlag', '— %', false, 'mute'],
                ['Nebenkosten 6,0 %', d.fmtEur(13_104), false, 'mute'],
              ].map(([k, v, head, dim], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                                       padding: head ? '8px 0 4px' : '0',
                                       borderBottom: head ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontSize: 12, fontWeight: head ? 600 : 400,
                                  color: head ? 'var(--text)' : dim === 'mute' ? 'var(--text-mute)' : 'var(--text-dim)' }}>
                    {k}
                  </div>
                  <div className="m-num" style={{ fontSize: 12, fontWeight: 500,
                                                    color: dim === 'mute' ? 'var(--text-mute)' : 'var(--text)' }}>
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, padding: 14, background: 'var(--surface-2)', borderRadius: 8 }}>
              <div className="m-eyebrow">Endbetrag inkl. USt 19 %</div>
              <div className="m-num" style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>
                {d.fmtEur((218_400 + 13_104) * 1.19)}
              </div>
              <div className="m-mute" style={{ fontSize: 10, marginTop: 2 }}>
                Wird mit jedem Schritt aktualisiert
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--border)',
                            fontSize: 11, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="alert" size={11} />
              Honorarvereinbarung gem. § 7 erforderlich
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// helper for in-line transparent-accent backgrounds — inline style doesn't
// support color-mix in some webviews, so just compute lightened sage.
function color_mix(opacity) { return `rgba(94, 124, 100, ${opacity})`; }

Object.assign(window, { HoaiWizard });
