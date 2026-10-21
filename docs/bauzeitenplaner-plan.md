# Modulo Bauzeitenplaner — research and expansion plan

Prepared 8 October 2026. Approved design; first local release implemented in version 0.8.0. Direct module navigation was selected during mockup review.

## Recommended direction

Expand the existing portable desktop app with a second module, **Bauzeitenplaner**, sharing projects, company branding, local storage and backups with **Bautagebuch**. Put direct Bautagebuch / Bauzeitenplaner navigation below the logo. Software versions and saved plan revisions are separate concepts.

Assumption for the first release: one local planner, small to medium projects, roughly 10–30 trades and 100–300 activities, covering both refurbishment and new construction. This is a design target to validate with representative schedules, not an observed limit. Concurrent editing across computers would require a separate collaboration design.

The primary view is a grouped Gantt schedule. Each Gewerk contains multiple activities; a trade must not be represented by a single continuous bar when it has separate mobilizations or works in different areas. A short-term coordination view complements the overall plan.

## Research findings and design implications

- [Capmo's official Bauzeitenplan guidance](https://support.capmo.com/der-bauzeitenplan) combines a timeline, configurable columns, workday calendars, companies, predecessors and automatic successor rescheduling. Its documentation explains the confusion caused when dependencies exist but auto-planning is disabled. Implication: make each activity's scheduling rule and the consequences of moving it visible.
- [PlanRadar's official project-plan documentation](https://help.planradar.com/de/projektplane/) describes synchronized hierarchy/table and Gantt views, progress, working days, fixed/manual versus automatic scheduling, four dependency types, and PDF export. Implication: use a table plus timeline, retain fixed dates explicitly, and start with the common Ende–Anfang relationship while designing the data model for additional types.
- [Smartsheet's official dependency documentation](https://help.smartsheet.com/articles/765727-enabling-dependencies-using-predecessors) distinguishes working duration from elapsed time, allows lead/lag, and represents zero-duration milestones as diamonds. [Its Gantt guidance](https://help.smartsheet.com/learning-track/level-3-solutions/gantt-chart-dependencies) also covers baseline comparisons and critical-path views. Implication: separate planned workdays from calendar-day curing/waiting periods, preserve a reference plan, and add critical-path analysis after the calendar/dependency engine is reliable.
- [Lean Construction Institute's glossary](https://leanconstruction.org/glossary/) distinguishes overall scheduling from look-ahead planning that removes constraints before work starts. It describes look-ahead windows from 3–12 weeks, with six weeks preferred on many projects. Implication: offer a configurable three/six-week coordination window; a three-week default here is a proposed usability choice, not a claim that every project uses it.

The features below are recommendations for Modulo, rather than claims that the researched products provide identical behavior.

## Navigation and visual design

Keep the current Stratum identity: original Modulo mark, cream surfaces, sage accents, warm borders, Geist UI font and restrained numeric typography. Preserve the current application zoom preference; do not reduce text size to fit more timeline columns.

Under the logo: **Bautagebuch / Bauzeitenplaner**. Below that: the existing searchable project chooser. Switching modules preserves the selected project, date range and each module's previous view, and completes pending saves. Diary recording/transcription jobs retain their lifecycle when changing modules.

Planner navigation has three destinations:

1. **Terminplan** — primary grouped table plus Gantt.
2. **Wochenvorschau** — next three weeks, optionally six, focused on work readiness and coordination.
3. **Gewerke & Firmen** — project trade catalog and responsible contractors.

Global **Projektdaten** and **Einstellungen** retain their current responsibilities. Project calendars and planner defaults live in one collapsed planner settings group. Document styling is shared where appropriate; planner exports have their own readable page layout.

### Terminplan screen

- A compact toolbar: **Vorgang hinzufügen**, **Heute**, time scale **Tag / Woche / Monat**, filters, and **Exportieren**. Put rarely used commands under a menu.
- Left table: expandable Gewerk groups and activity rows. Default columns: **Vorgang**, **Firma**, **Start**, **Ende**. Duration, area and progress can be shown on demand.
- Right timeline: aligned bars, calendar weeks, weekends/holidays, today marker, milestones and optional dependency lines. Keep grouping headers visually distinct from actual activities.
- The list/table widths can be adjusted. Scrolling remains synchronized, with frozen row labels and time headers. On a narrow window, show a readable list with activity details and an optional timeline instead of shrinking the desktop chart.
- Clicking an activity opens a details drawer. Extra fields, predecessor selection, blockers, evidence links and styling appear there. Hover reveals drag handles, but essential actions remain keyboard accessible.
- One restrained default bar color. Optional six-color trade palette; statuses also use labels/icons. Do not use color as the only indication of blocked, late or complete work.
- Baseline is a thin secondary marker, current plan is the main bar, and completion is a fill within that bar. Date-based elapsed time is not automatically treated as progress.

## First usable release

### Trade and activity structure

Project-scoped trade definitions with optional code, display name and color. Contractors are separate records: one trade can have several companies; one company can perform several trades. Each activity can carry a building/section/floor/room label. Group by Gewerk by default; grouping by area can follow as a second display mode.

Existing diary rows remain intact. Offer an explicit mapping/import review to seed the trade catalog from their codes and company names; never automatically merge similarly named trades or assume a code belongs to a universal classification.

Each activity has a title, trade, optional firm/area, start, duration, calculated finish, predecessors, optional fixed date/deadline, status and notes. Advanced fields are collapsed. A quick entry needs only a title, trade, start and duration. Activities may first be saved as **Noch nicht terminiert** rather than inventing a date.

### Editing and scheduling

Create, duplicate, reorder and delete activities; drag to move and resize to change duration. Provide equivalent date/duration fields and keyboard commands. Show a live date preview while dragging, then commit a single undoable change.

Support **Ende–Anfang** dependencies first: a following activity starts after its predecessor, using the relevant calendar. Include an optional lag. Model dependency type and lag unit explicitly so Anfang–Anfang/Ende–Ende can be added later.

Moving a predecessor computes a proposal for affected successors. Show affected activities, deadline conflicts and the old/new finish before the user applies the change. Use one action to apply the transaction and one undo action to reverse it. Fixed-date activities stay fixed and receive a clear conflict warning. Display **Folgt Vorgängern** or **Termin fixiert** in activity details.

Reject self-dependencies and cycles with the actual offending chain. Overlap is permitted by default because many trades legitimately work in parallel. A company appearing twice is not by itself proof of a crew conflict.

### Calendar rules

Project workweek defaults to Monday–Friday, with optional Saturday work, configurable non-working dates, manually maintained holidays and shutdowns. Add an offline, year/region-labelled German holiday calendar after verifying its source and coverage; do not silently depend on an online holiday API.

Work duration is counted in workdays. Technical waits such as drying/curing can be expressed in calendar days and must not skip weekends. Such durations are entered by the planner, not inferred from a generic trade template.

Define day-level semantics explicitly: a normal task occupying a single working date has duration one; a milestone has duration zero. With an Ende–Anfang link and zero lag, a task ending Friday is followed on Monday for a Monday–Friday calendar. Store civil dates without timezone-induced shifts. Actual starts and completions are recorded facts, distinct from planned/current forecast dates.

### Reference plan, revisions and progress

Save a named **Sollplan / Referenzstand** as an immutable snapshot. Preserve subsequent current-plan revisions with timestamp, optional reason and a human-readable change list. A baseline is not the same as the previous autosave, and one must not overwrite it while recalculating dates.

Activity status: planned, active, complete; **blockiert** is a separate flag that can coexist with active work. Progress can be manually recorded, with actual start/completion dates. Changing a diary entry to complete does not complete a schedule activity. Show late activities, upcoming milestones and slips against the reference plan, with clear working-day versus calendar-day units.

### Output and backups

PDF: A3 landscape for the main plan, A4 landscape for weekly extracts, shared company logo/project header, chosen period/trades/areas, revision/date, and repeated row labels/legend when tiled across pages. A **fit to one page** option must not silently make the text unreadable. Print preview should reveal actual pagination.

CSV import/export with a column-mapping preview, German date formats, explicit duration units and validation. A CSV activity list is an editable exchange format, not a claim that it round-trips all dependencies, revisions and evidence. Full fidelity remains in the app's ZIP backup. Native Excel workbook exchange is a subsequent increment; MS Project .mpp compatibility needs a dedicated feasibility check and is not an initial promise.

Extend backup/import to include plan versions, trade/company data, calendars and diary links, remapping all restored IDs consistently. Old diaries migrate without losing content. Undo, autosave, restart recovery and project deletion must apply across both modules.

## Follow-on release: site coordination

**Wochenvorschau** filters the same activities into a rolling three/six-week window; it is not a second unrelated schedule. Show who is coming, where, prerequisites, commitments and blockers. A blocker includes description, responsible person and target resolution date, such as missing material, drawing approval or an unavailable area. Basic blocked status belongs in the first release; structured blocker tracking belongs here.

Add a direct **Bautagebucheintrag erstellen** action for a scheduled activity/day, and links from existing diary evidence to activities. Prefill trade/company/task context, but ask the user for actual work performed and actual worker counts. Planned manpower must not be written as observed manpower. Show linked photos, notes and audio transcripts within activity details.

Diary-to-schedule suggestions can report an observed delay or propose actual progress/date changes for review. Qwen can suggest a matching task or turn a voice note into a draft activity. The deterministic scheduling engine computes dates and dependencies; the LLM never automatically changes a released plan, invents a duration, or infers a completion percentage from an ambiguous statement.

## Later extensions

- Critical path and float, tested against the implemented calendar/dependency rules and deadline constraints. This is dependency-based analysis, not automatic crew leveling.
- Anfang–Anfang and Ende–Ende relationships; resource/crew calendars and capacity warnings when actual capacities are entered.
- Reusable project templates whose durations remain explicit editable assumptions.
- Room/floor sequences and a dedicated Takt view when repetitive projects justify it.
- Multi-project resource overview, richer Excel/MS Project exchange, and mobile/cloud collaboration only when there is a concrete need. Offline single-PC operation remains the first scope.

## Implementation sequence

1. Separate the shared app shell, projects, persistence and background job lifecycle from the diary screen. Introduce versioned planner schemas and safe migrations, including backup ID mapping.
2. Build the deterministic date/calendar/dependency engine before connecting drag gestures to it. Keep its operations transaction-based, supporting preview and undo.
3. Build trade/activity editing and synchronized grouped Gantt; then reference snapshots, revision comparison and PDF/CSV output. Validate with a real user schedule.
4. Add weekly coordination, structured blockers and manual diary evidence links. Connect reviewed local-AI suggestions after those links work reliably.
5. Extend dependency types, critical path, capacity and specialist imports as separate additions.

Keep Electron/React and the current local architecture. The planner itself needs no additional model download, GPU runtime or separate executable. Keep scheduling logic separate from visual components; choose a Gantt dependency only after checking commercial distribution terms, offline behavior, accessibility, custom grouping and PDF export requirements. The current JSON store is a reasonable initial continuation for the assumed scale; benchmark before deciding on SQLite or another storage change.

## Acceptance criteria for the first release

- Switching modules keeps the project and saves pending work; speech jobs are not lost.
- Two disjoint work visits for the same trade remain two activities, not one misleading bar.
- Weekends, holidays, Saturday calendars and calendar-day waits calculate correctly.
- Zero-duration milestones work; fixed dates remain fixed; impossible links/cycles explain themselves.
- A predecessor delay previews downstream effects; undo restores every affected activity atomically.
- Current forecast, immutable reference dates, actual dates and percent complete remain distinct.
- PDF output is readable over several pages with repeated row labels and revision information.
- Restart/backup/import retain tasks, calendar, references and evidence links; existing diaries still export correctly.
- The default screen remains readable at the saved 125% zoom; a representative 300-activity plan stays responsive on an ordinary office CPU.

Before implementation, confirm typical project size, use of rooms/floors, Saturday/holiday rules, required input files and whether editing is single-PC or shared. The plan above uses explicit defaults so these questions do not prevent evaluating the concept.
