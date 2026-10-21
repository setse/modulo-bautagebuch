// Stratum — Mitarbeiter · Team & Wer ist online
// Read-only roster. No rates, no utilization. Focus on contact + presence + current activity.

const EmpTeamPage = () => {
  const team = EMP_TEAM;
  const online = team.filter(t => t.status === 'online');
  const busy   = team.filter(t => t.status === 'busy');
  const away   = team.filter(t => t.status === 'away');
  const off    = team.filter(t => t.status === 'vacation' || t.status === 'sick');

  const statusLabel = {
    online:   'verfügbar',
    busy:     'beschäftigt',
    away:     'kurz weg',
    vacation: 'im Urlaub',
    sick:     'krank',
    offline:  'offline',
  };

  return (
    <EmpPage active="Team">
      <EmpHeader
        title="Team"
        subtitle={`${team.length} Kolleg:innen · ${online.length + busy.length + away.length} jetzt erreichbar · ${off.length} abwesend`}
        action={<><Icon name="plus" size={12} /> Nachricht</>}
        secondary={<><Icon name="filter" size={12} /> Filter</>}
      />

      {/* Jetzt online — stripe */}
      <SCard padding={18}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Jetzt im Büro · 14:35</div>
          <div className="m-mute" style={{ fontSize: 11 }}>Live-Status · letzte Aktualisierung gerade eben</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 14, fontSize: 11 }}>
            {[
              ['online',   online.length],
              ['busy',     busy.length],
              ['away',     away.length],
              ['vacation', off.filter(t => t.status === 'vacation').length],
              ['sick',     off.filter(t => t.status === 'sick').length],
            ].map(([s, n]) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <PresenceDot status={s} size={8} border="var(--surface)" />
                <span className="m-num m-mute">{n}</span>
                <span className="m-mute" style={{ fontSize: 10 }}>{statusLabel[s]}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
          {team.map(p => {
            const dimmed = p.status === 'vacation' || p.status === 'sick' || p.status === 'offline';
            return (
              <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
                                          padding: 8, borderRadius: 8,
                                          background: p.self ? 'var(--accent-dim)' : 'transparent',
                                          opacity: dimmed ? 0.5 : 1 }}>
                <div style={{ position: 'relative', marginBottom: 6 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 23, background: p.color,
                                  color: '#fff', fontSize: 14, fontWeight: 600,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span style={{ position: 'absolute', right: -2, bottom: -2 }}>
                    <PresenceDot status={p.status} size={12} border="var(--surface)" />
                  </span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>
                  {p.name.replace(/(\w)\w+\s/, '$1. ')}
                </div>
                <div className="m-mute" style={{ fontSize: 9, marginTop: 1 }}>{statusLabel[p.status]}</div>
              </div>
            );
          })}
        </div>
      </SCard>

      {/* Team-Liste */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, flex: 1, overflow: 'hidden' }}>
        <SCard padding={0} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'baseline', gap: 12,
                          borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Alle Kolleg:innen</div>
            <div className="m-mute" style={{ fontSize: 11 }}>Direktkontakt · was läuft gerade</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px',
                            background: 'var(--surface-2)', borderRadius: 6,
                            fontSize: 11, color: 'var(--text-mute)' }}>
              <Icon name="search" size={11} />
              Name oder Projekt…
            </div>
          </div>

          <div style={{ flex: 1, overflow: 'auto' }}>
            {team.map(p => {
              const dimmed = p.status === 'vacation' || p.status === 'sick';
              return (
                <div key={p.id} style={{ display: 'grid',
                                            gridTemplateColumns: '50px 1.4fr 1fr 60px',
                                            gap: 12, padding: '14px 18px', alignItems: 'center',
                                            borderBottom: '1px solid var(--border)',
                                            background: p.self ? 'color-mix(in oklch, var(--accent) 5%, var(--surface))' : 'transparent' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 20, background: p.color,
                                    color: '#fff', fontSize: 12, fontWeight: 600,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    opacity: dimmed ? 0.55 : 1 }}>
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ position: 'absolute', right: -1, bottom: -1 }}>
                      <PresenceDot status={p.status} size={11} border="var(--surface)" />
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      {p.name}
                      {p.self && <span className="m-eyebrow" style={{ fontSize: 8, color: 'var(--accent)' }}>DU</span>}
                    </div>
                    <div className="m-mute" style={{ fontSize: 11, marginTop: 1 }}>{p.role}</div>
                  </div>
                  <div>
                    <div className="m-eyebrow" style={{ fontSize: 9 }}>
                      {p.status === 'vacation' ? 'ABWESEND' :
                       p.status === 'sick'     ? 'KRANK'    :
                       p.status === 'busy'     ? 'GERADE'   :
                       p.status === 'away'     ? 'KURZ WEG' : 'AKTIV'}
                    </div>
                    <div style={{ fontSize: 12, marginTop: 2,
                                    color: dimmed ? 'var(--text-mute)' : 'var(--text)' }}>
                      {p.activity}
                    </div>
                    {p.ort && p.ort !== '—' && (
                      <div className="m-mute" style={{ fontSize: 10, marginTop: 2,
                                                          display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 4, height: 4, borderRadius: 2, background: 'var(--text-mute)' }} />
                        {p.ort}{p.bis ? ` · bis ${p.bis}` : ''}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                    {!dimmed && !p.self && (
                      <>
                        <div title="Nachricht" style={{ width: 26, height: 26, borderRadius: 13,
                                        background: 'var(--surface-2)', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        color: 'var(--text-dim)' }}>
                          <Icon name="invoice" size={11} />
                        </div>
                        <div title="Anrufen" style={{ width: 26, height: 26, borderRadius: 13,
                                        background: 'var(--surface-2)', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        color: 'var(--text-dim)' }}>
                          <Icon name="clock" size={11} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </SCard>

        {/* Right: who's where / where am I / etc */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>

          <SCard padding={16}>
            <div className="m-eyebrow" style={{ marginBottom: 10 }}>Heute auf Baustelle</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { who: 'M. Hofer', ort: 'BÜR-118 · Stuttgart', sub: 'Bauherrentermin · zurück 17:30', c: '#d97c4a' },
                { who: 'A. Renner', ort: 'GEW-441 · Riem',       sub: 'remote · Abnahmebericht',       c: '#7a9e6e' },
                { who: 'L. Vogel',  ort: 'KIT-077 · Augsburg',   sub: 'morgen vor Ort',                 c: '#6c7bb8' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 10,
                                       padding: '6px 0', alignItems: 'flex-start',
                                       borderTop: i ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 12, background: p.c,
                                  color: '#fff', fontSize: 9, fontWeight: 600,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.who.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500 }}>{p.who} · {p.ort}</div>
                    <div className="m-mute" style={{ fontSize: 10, marginTop: 1 }}>{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </SCard>

          <SCard padding={16}>
            <div className="m-eyebrow" style={{ marginBottom: 10 }}>Geburtstage</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { who: 'Tobias Burr', d: '02.11.', sub: 'in 8 Tagen', soon: true },
                { who: 'Maria Hofer', d: '18.11.', sub: 'in 24 Tagen' },
                { who: 'Elif Çelik',  d: '03.12.', sub: 'in 39 Tagen' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="m-num m-mute" style={{ fontSize: 11, width: 44 }}>{b.d}</span>
                  <span style={{ fontSize: 11, flex: 1, fontWeight: b.soon ? 600 : 400 }}>{b.who}</span>
                  <span className="m-mute" style={{ fontSize: 10 }}>{b.sub}</span>
                </div>
              ))}
            </div>
          </SCard>

          <SCard padding={16}>
            <div className="m-eyebrow" style={{ marginBottom: 8 }}>Mein Team-Beitrag · KW 43</div>
            <div style={{ fontSize: 12, marginBottom: 8, color: 'var(--text-dim)' }}>
              Du hast diese Woche an <strong style={{ color: 'var(--text)' }}>2 Projekten</strong> mit
              <strong style={{ color: 'var(--text)' }}> 4 Kolleg:innen </strong>zusammengearbeitet.
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[
                { c: '#d97c4a', n: 'MH', proj: 'BÜR-118 · SAN-302' },
                { c: '#5fa3a8', n: 'EC', proj: 'BÜR-118' },
                { c: '#9a7eb5', n: 'JK', proj: 'BÜR-118' },
                { c: '#6c7bb8', n: 'LV', proj: 'SAN-302' },
              ].map((m, i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: 15, background: m.c,
                                        color: '#fff', fontSize: 10, fontWeight: 600,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginLeft: i ? -4 : 0, border: '2px solid var(--surface)' }}>
                  {m.n}
                </div>
              ))}
            </div>
          </SCard>
        </div>
      </div>
    </EmpPage>
  );
};

Object.assign(window, { EmpTeamPage });
