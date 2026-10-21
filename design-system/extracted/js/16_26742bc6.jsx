// Shared German architecture-firm controlling data for Modulo mockups.
// HOAI 2021 Honorartafel §35 (Gebäudeplanung) — Honorarzone III Mittelsatz.
// All numbers are realistic placeholders; nothing wired to a real backend.

window.ModuloData = (() => {
  const projects = [
    { id: 'WHB-204', name: 'Wohnhaus Bergmann', city: 'München', client: 'Familie Bergmann',
      lead: 'M. Hofer', zone: 'III', costs: 1_850_000, fee: 218_400, billed: 156_900,
      hours: 1_240, planned: 1_980, phase: 5, status: 'aktiv', umbau: false, nk: 6.0,
      progress: [100,100,100,100,68,0,0,0,0], deadline: '12.09.2026',
      type: 'Neubau · Einfamilienhaus' },
    { id: 'BÜR-118', name: 'Bürohaus Stadtkrone', city: 'Stuttgart', client: 'Süd Invest GmbH',
      lead: 'A. Renner', zone: 'IV', costs: 12_400_000, fee: 1_412_300, billed: 982_400,
      hours: 4_810, planned: 6_200, phase: 6, status: 'aktiv', umbau: false, nk: 5.0,
      progress: [100,100,100,100,100,72,0,0,0], deadline: '04.03.2027',
      type: 'Neubau · Verwaltung' },
    { id: 'KIT-077', name: 'Kita Lerchenfeld', city: 'Augsburg', client: 'Stadt Augsburg',
      lead: 'L. Vogel', zone: 'III', costs: 3_200_000, fee: 401_200, billed: 401_200,
      hours: 2_140, planned: 2_100, phase: 8, status: 'aktiv', umbau: false, nk: 7.0,
      progress: [100,100,100,100,100,100,100,32,0], deadline: '20.11.2025',
      type: 'Neubau · Öffentlich' },
    { id: 'SAN-302', name: 'Sanierung Altbau Maxvorstadt', city: 'München', client: 'Eigentümergemeinschaft',
      lead: 'M. Hofer', zone: 'IV', costs: 2_700_000, fee: 412_800, billed: 218_500,
      hours: 1_680, planned: 2_400, phase: 4, status: 'aktiv', umbau: true, nk: 8.0,
      progress: [100,100,100,54,0,0,0,0,0], deadline: '30.06.2027',
      type: 'Umbau · 33 % Zuschlag' },
    { id: 'GEW-441', name: 'Gewerbehof Riem', city: 'München', client: 'Riem Immobilien KG',
      lead: 'A. Renner', zone: 'III', costs: 8_900_000, fee: 904_600, billed: 904_600,
      hours: 5_240, planned: 5_100, phase: 9, status: 'abschluss', umbau: false, nk: 5.0,
      progress: [100,100,100,100,100,100,100,100,84], deadline: '15.02.2026',
      type: 'Neubau · Gewerbe' },
    { id: 'EFH-512', name: 'Doppelhaus Grünwald', city: 'Grünwald', client: 'Schaller / Wiesner',
      lead: 'L. Vogel', zone: 'III', costs: 1_240_000, fee: 156_700, billed: 28_400,
      hours: 320, planned: 1_400, phase: 2, status: 'aktiv', umbau: false, nk: 6.0,
      progress: [100,46,0,0,0,0,0,0,0], deadline: '08.10.2027',
      type: 'Neubau · Wohnen' },
    { id: 'SCH-088', name: 'Schulerweiterung Pasing', city: 'München', client: 'LBB Bayern',
      lead: 'M. Hofer', zone: 'IV', costs: 6_400_000, fee: 824_300, billed: 0,
      hours: 0, planned: 4_800, phase: 1, status: 'akquise', umbau: false, nk: 6.0,
      progress: [12,0,0,0,0,0,0,0,0], deadline: '—',
      type: 'Neubau · Öffentlich' },
  ];

  // HOAI 2021 §35 Honorartafel — abbreviated. Values in €.
  // Rows: anrechenbare Kosten · Cols: Honorarzonen I-V (Mittelsatz).
  const honorartafel = [
    { kosten: 25_000,     I: 3_120, II: 3_897, III: 4_675, IV: 5_452, V: 6_230 },
    { kosten: 50_000,     I: 5_641, II: 7_052, III: 8_462, IV: 9_873, V: 11_283 },
    { kosten: 100_000,    I: 9_799, II: 12_249, III: 14_699, IV: 17_149, V: 19_599 },
    { kosten: 250_000,    I: 21_233, II: 26_542, III: 31_850, IV: 37_158, V: 42_466 },
    { kosten: 500_000,    I: 38_360, II: 47_950, III: 57_540, IV: 67_130, V: 76_720 },
    { kosten: 1_000_000,  I: 68_590, II: 85_738, III: 102_886, IV: 120_033, V: 137_181 },
    { kosten: 1_500_000,  I: 96_550, II: 120_688, III: 144_826, IV: 168_963, V: 193_101 },
    { kosten: 2_500_000,  I: 148_770, II: 185_963, III: 223_155, IV: 260_348, V: 297_541 },
    { kosten: 5_000_000,  I: 268_390, II: 335_488, III: 402_585, IV: 469_683, V: 536_780 },
    { kosten: 10_000_000, I: 481_220, II: 601_525, III: 721_830, IV: 842_135, V: 962_440 },
    { kosten: 25_000_000, I: 1_055_960, II: 1_319_950, III: 1_583_940, IV: 1_847_930, V: 2_111_920 },
  ];

  // Leistungsphasen §34 HOAI Gebäudeplanung.
  const leistungsphasen = [
    { nr: 1, name: 'Grundlagenermittlung',         anteil: 2 },
    { nr: 2, name: 'Vorplanung',                    anteil: 7 },
    { nr: 3, name: 'Entwurfsplanung',               anteil: 15 },
    { nr: 4, name: 'Genehmigungsplanung',           anteil: 3 },
    { nr: 5, name: 'Ausführungsplanung',            anteil: 25 },
    { nr: 6, name: 'Vorbereitung der Vergabe',      anteil: 10 },
    { nr: 7, name: 'Mitwirkung bei der Vergabe',    anteil: 4 },
    { nr: 8, name: 'Objektüberwachung — Bauleitung', anteil: 32 },
    { nr: 9, name: 'Objektbetreuung',                anteil: 2 },
  ];

  const team = [
    { id: 'mh', name: 'Maria Hofer',     role: 'Partnerin · Projektleitung', rate: 125, avg: 7.8, color: '#d97c4a' },
    { id: 'ar', name: 'Andreas Renner',  role: 'Partner · Projektleitung',   rate: 125, avg: 8.4, color: '#7a9e6e' },
    { id: 'lv', name: 'Lukas Vogel',     role: 'Architekt',                  rate: 95,  avg: 8.1, color: '#6c7bb8' },
    { id: 'sn', name: 'Sophia Nowak',    role: 'Architektin',                rate: 95,  avg: 7.2, color: '#b89065' },
    { id: 'jk', name: 'Jonas Klar',      role: 'Bauzeichner',                rate: 72,  avg: 8.0, color: '#9a7eb5' },
    { id: 'ec', name: 'Elif Çelik',      role: 'Architektin · BIM',          rate: 95,  avg: 7.6, color: '#5fa3a8' },
    { id: 'tb', name: 'Tobias Burr',     role: 'Praktikant',                 rate: 28,  avg: 6.9, color: '#a8a8a8' },
  ];

  const kpis = {
    umsatzYTD: 1_842_400,
    umsatzPlan: 2_350_000,
    deckungsbeitragYTD: 0.34,
    deckungsbeitragPlan: 0.32,
    offeneRechnungen: 312_800,
    überfälligeRechnungen: 48_200,
    auslastung: 0.86,
    auslastungZiel: 0.82,
    stundenWoche: 268,
    stundenPlanWoche: 280,
    aktivProjekte: 12,
    risikoProjekte: 2,
  };

  // Monthly hours bar series for current year + previous year reference.
  const monatsstunden = [
    { m: 'Jan', ist: 1180, plan: 1240, prev: 1110 },
    { m: 'Feb', ist: 1090, plan: 1240, prev: 1180 },
    { m: 'Mär', ist: 1240, plan: 1240, prev: 1200 },
    { m: 'Apr', ist: 1280, plan: 1240, prev: 1090 },
    { m: 'Mai', ist: 1340, plan: 1240, prev: 1310 },
    { m: 'Jun', ist: 1200, plan: 1240, prev: 1280 },
    { m: 'Jul', ist: 980,  plan: 1100, prev: 1020 },
    { m: 'Aug', ist: 920,  plan: 1100, prev: 980  },
    { m: 'Sep', ist: 1310, plan: 1240, prev: 1170 },
    { m: 'Okt', ist: 1190, plan: 1240, prev: 1290 },
    { m: 'Nov', ist: 0,    plan: 1240, prev: 1260, future: true },
    { m: 'Dez', ist: 0,    plan: 1100, prev: 1080, future: true },
  ];

  // Today's time entries (Stundenerfassung).
  const heute = [
    { time: '08:15–10:30', project: 'BÜR-118', phase: 'LP6', user: 'M. Hofer',  task: 'Ausschreibung Fassade · Vorbereitung Pakete', h: 2.25 },
    { time: '10:45–12:00', project: 'WHB-204', phase: 'LP5', user: 'M. Hofer',  task: 'Detail Holzfenster · Knoten W-04',          h: 1.25 },
    { time: '13:00–15:30', project: 'SAN-302', phase: 'LP4', user: 'M. Hofer',  task: 'Bauantrag · Stellungnahme Denkmalschutz',    h: 2.50 },
    { time: '15:30–17:45', project: 'BÜR-118', phase: 'LP6', user: 'M. Hofer',  task: 'LV Trockenbau · Position 3.40–3.78',         h: 2.25 },
  ];

  const risiken = [
    { proj: 'SAN-302', label: 'Stunden 70 % über Plan in LP4 — Bauantrag verzögert', severity: 'hoch' },
    { proj: 'BÜR-118', label: 'Honorarabschlag 4 seit 38 Tagen offen (€ 184.500)',    severity: 'mittel' },
    { proj: 'EFH-512', label: 'Vertrag noch nicht unterzeichnet — LP2 läuft',         severity: 'mittel' },
  ];

  const fmtEur = (n, frac = 0) =>
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR',
      minimumFractionDigits: frac, maximumFractionDigits: frac }).format(n);
  const fmtNum = (n, frac = 0) =>
    new Intl.NumberFormat('de-DE', { minimumFractionDigits: frac, maximumFractionDigits: frac }).format(n);
  const fmtPct = (n, frac = 0) => `${(n * 100).toFixed(frac).replace('.', ',')}\u00a0%`;

  return { projects, honorartafel, leistungsphasen, team, kpis, monatsstunden,
           heute, risiken, fmtEur, fmtNum, fmtPct };
})();
