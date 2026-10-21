# Modulo Bautagebuch

A Windows desktop app built with Electron, React and TypeScript. Create a continuous German Bautagebuch, attach site photos and audio notes, and export selected entries as one PDF or Word document.

## Run

```powershell
npm ci
npm start
```

For development with hot reload:

```powershell
npm run dev
```

Node.js 22.12 or newer is required for development. The packaged Windows app includes its runtime and requires neither Node.js, Python, Microsoft Word, nor a GPU.

## Windows executable

```powershell
npm run package:win
```

The portable executable is generated at `release/Modulo-Bautagebuch-0.8.1-Windows.exe`. Building the transcription runtime requires [uv](https://docs.astral.sh/uv/) and Python 3.13 (uv can install Python). The first packaging run downloads the pinned model, decoder and build tools; file sizes and SHA-256 hashes are verified. Portable packaging uses compression level 1 because ultra compression makes the large INT8 model unusually slow to package. Run `npm run build:transcription` and `npm run build:assistant` once before using local AI in development. The bundled Parakeet and Qwen models make this version approximately 2.28 GB. The portable target uses a checksum-pinned NSISBI compiler to support an embedded archive larger than 2 GiB; no separate data file is required. Extraction uses about 3 GB of temporary disk space and happens on every portable launch. End users need no dependency installation or model download. This development release is unsigned. Portable means no installer is required; diary data is still stored in the Windows user profile, rather than beside the executable. Close an earlier version before launching the update; existing diaries are retained.

## Using the app

1. Open **Projektdaten** to set the project number, name, Bauherr, location and responsible author. The initial project details come from the supplied Word reference; its historical entries are not imported.
2. Click **Neuer Eintrag**. Enter a date or date range, times, weather and temperature. Calendar weeks are calculated automatically.
3. Add rows for Gewerk, Firma, Mitarbeiter and Arbeiten. Record meetings and observations under **Besondere Vorkommnisse**.
4. Add photos and captions, import audio, or record a voice note through the microphone. Supported photo formats are JPEG, PNG and WebP. Audio formats are MP3, WAV, M4A, OGG, WebM and FLAC; playback depends on Chromium's codec support. Drag files into the editor to attach them. Maximum input size is 100 MB per file. New photos are compressed to JPEG at up to 2400 pixels on the longest edge, with quality and dimensions adjusted to stay below 500 kB (512,000 bytes). Smaller pictures remain smaller. Original files outside the app and existing imported photos are untouched.
5. New audio imports and microphone recordings are automatically transcribed by Parakeet on the CPU. Review or edit the transcript. **Text glätten** opens an editable comparison with a local Qwen cleanup proposal. **Eintrag vorbereiten** suggests work rows, workforce, weather, temperature, occurrences and notes; select and edit the fields before applying. Alternatively, use **In Eintrag übernehmen** to append it to the occurrences. Progress, cancellation and manual retry are available on each audio card. Under **Einstellungen → Spracherkennung**, automatic transcription can be disabled. Existing transcripts and text edited during inference are kept unless you accept a replacement in the review dialog.
6. Mark an entry complete when ready. The app opens **Dokumentvorschau** for final adjustments; the entry remains editable. Copy an existing entry to reuse its fields and trades; the copy starts as a draft without attachments.
7. Click **Exportieren**, choose PDF or Word and select entries. Date filters narrow the visible list. If selected entries lie outside the filter, the dialog explicitly offers to limit the selection to the visible period. Selected entries are exported chronologically into one continuous document. Drafts are labelled. Photos and existing transcripts are included; playable audio files are kept in the app and its backups.

Use the top-bar zoom controls (75–200%) to scale the whole app. The initial zoom is 125%; the selected zoom is saved across restarts. `Ctrl++`, `Ctrl+-`, `Ctrl+0`, and `Ctrl+mouse wheel` also control zoom. PDF page sizes are independent of display zoom.

In **Dokumentvorschau**, section controls appear on hover or keyboard focus. The small photo icon adds photos to that section; hover the styling icon to preview its compact popover, or click it to keep the popover open. Advanced typography is collapsed under **Weitere Optionen**. Empty optional sections are omitted; the small photo icon near the signature lets you add photos to **Fotodokumentation**, **Weitere Notizen** or **Sprachnotizen**.

Click a photo to select it, drag it within the A4 photo area, and use its lower-right handle to resize it proportionally. Arrow keys move the selected photo. Every photo has a page selector directly on the image, including an option to create a new photo page. Selecting an image reveals its width and order controls on that image. **Automatisch anordnen** creates compact rows across photo pages; **Alle auf eine Seite** resizes all photos into an ordered grid on one A4 photo page, preserving their proportions. These two layout actions are icons in the section’s hover toolbar and apply to photos in that section. Photo containers reserve only the occupied height, so subsequent content moves up after shrinking photos. The first photo group flows after the section text; additional photo groups start a new exported page. Positions, sizes, captions and ordering are saved and included in exports. Overlapping photos are permitted when placing photos manually. Long captions on small photos are abbreviated in exports and included in full after the photo pages.

Open **Einstellungen → Kopf & Fußzeile** or the **Kopf- / Fußzeile** shortcut to upload a company logo and edit the header and footer. Edit one band at a time with the **Kopfzeile / Fußzeile** selector. Alignment, font and image width are under **Ausrichtung & Schrift**; reusable designs are under **Gespeicherte Vorlagen**. Logo uploads preserve transparency. Buttons below each text field insert project name, project number, client, author, date range and page fields at the cursor or replace selected text. The adjacent live preview resolves these fields using the current project and updates as text, logo and logo width change. Use short text, up to three lines. Save the design under a name to reuse it in other projects; saving again under the same name updates the preset. Header and footer each support an image, independent left/center/right text and image alignment, and font/size controls. Images and text occupy separate rows to avoid overlap. Increase page margins for larger or multi-line designs. Images and header/footer repeat on exported pages. Preview page numbers are illustrative; exports calculate the actual numbers.

Each section in **Dokumentvorschau** has **Gestaltung** controls for border style (none, solid, dashed, dotted, double), color, thickness, fill, font, font size, text color and alignment. **Fotos hinzufügen** imports pictures directly into that section. Existing pictures have an **Abschnitt** chooser in the entry editor; reassignment resets their position for the destination section. Legacy photos keep their Fotodokumentation assignment. Section-specific layouts and formatting persist through restart and backup.

**Einstellungen** groups options into **Dokument**, **Kopf & Fußzeile** and **Daten & Sicherung**. The document category has one shared font, text color, border and background for every section. Six standard color swatches make selection quick; **Eigene Farbe** retains custom colors when needed. **Tabellen** and **Seitenränder · A4** are collapsed by default. Existing section defaults are retained until a shared setting is changed, and entry-specific adjustments remain available through the preview’s hover controls. **Projektstandard verwenden** removes a local override. Top/bottom margins range from 15–60 mm and side margins from 5–60 mm. Photo bounds adapt to margins and section padding. These options apply to PDF and Word exports; **Projektdaten** remains dedicated to managing projects.

The project chooser opens a styled menu with full project names and search. Use arrow keys to navigate, Enter to choose and Escape to close. The UI follows the supplied **Modulo Stratum Design System**: cream surfaces, sage accents, warm borders, Geist UI text, Geist Mono for numeric data, and the original three-bar Modulo mark recolored in Stratum sage. The Windows app icon uses the same mark on cream. Fonts are extracted from the supplied standalone archive and bundled locally; no Google Fonts connection is needed. Source guidance is retained in `design-system/`, and adapted tokens are in `src/stratum/`.

Changes save automatically after a short delay. `Ctrl+S` saves immediately. Closing waits for pending saves and keeps the window open if saving fails. Stop an active recording before closing.

## Storage and backup

The current data path is shown in **Einstellungen → Daten & Sicherung**. The default is an app-specific folder under `%APPDATA%`.

- `diary.json`: versioned project and entry data.
- `diary.json.bak`: the previous valid save, used to recover a corrupt primary file.
- `media/`: local copies of attachments, addressed by generated IDs.

**Sichern** writes a ZIP containing all projects, entries, photo layouts, logos, saved header/footer designs and referenced media. **Sicherung importieren** adds restored projects and presets with new IDs and an “importiert” suffix; it does not overwrite existing projects. Keep ZIP backups on another drive for protection against loss of the PC. JSON's previous-save backup is not a full media backup.

Removed entries and attachments are excluded from exports and ZIP backups. Their files are retained in the data folder, so this version does not perform irreversible media cleanup. Projects can be created, renamed, edited and deleted in **Projektdaten**. Deleting a project requires confirmation and removes its entries; media files remain in the data folder. At least one project must remain. Only the selected entry shows a delete icon, aligned to its bottom-right corner; deletion requires confirmation. The breadcrumb buttons open project management or return to the diary.

## Document layout

The supplied `2312 Bautagebuch Juni-September 26.docx` guides the fields, A4 page dimensions and margins, dated sections, calendar weeks, trade table, occurrences and signature area. PDF and Word exports recreate that structure; they do not modify the reference or copy its organization logo. The in-app preview shows content, while actual pagination is determined during export.

PDF generation uses Electron's Chromium print engine, with table headers, page numbers, expandable content and embedded photos. Word exports are editable DOCX files generated with `docx`. This is a structural recreation rather than an exact Word template merge. The bundled environment lacked LibreOffice, so automated visual rendering of DOCX output could not be completed; PDF layout is checked separately.

PDF export in version 0.1.1 loads reports from a temporary local HTML file. This avoids the navigation URL limit reached by photo-heavy reports. The temporary document and print window are cleaned up after success or failure. `npm run test:pdf` reproduces the original `ERR_INVALID_URL` with a detailed image, then verifies that the same report exports through the corrected path.

## Offline Parakeet transcription

Version 0.6.0 bundles **primeline/parakeet-primeline**, using the community [INT8 ONNX conversion by Buttermilk03](https://huggingface.co/Buttermilk03/parakeet-primeline-onnx) at revision `2e2f9169c7030984cf0e9e35c0a68eadfac376e4`. The model files total about 933 MB, making the executable substantially larger. A frozen Python worker runs onnx-asr and ONNX Runtime with CPUExecutionProvider, using four CPU threads without a GPU requirement. FFmpeg decodes MP3, WAV, M4A, OGG, WebM and FLAC. Silero detects speech; processing uses one speech segment at a time, capped at 20 seconds. Inputs are limited to 100 MB and two hours.

The Windows EXE contains the model, interpreter, inference libraries and decoder. Audio never goes to a service, no API key is required, and production performs no model downloads. The worker starts on demand, processes audio notes sequentially and unloads after 90 seconds idle. Cancellation terminates its decoder process as well. Decoded temporary audio is removed on success, failure, cancellation and clean app shutdown. A forced OS termination can leave temporary files under the Windows temporary directory.

Automatic recognition only starts for newly imported or recorded audio; existing pending notes are not silently processed on upgrade. Completed transcripts carry their model/revision and timestamp, and survive restart and ZIP backup/import. Manual edits remain possible during inference. If text already exists or has been entered while recognition runs, the result opens a comparison dialog; only **Transkript ersetzen** replaces it. Recognition never automatically changes diary occurrences. Empty speech detection and decoder errors preserve the audio and current transcript.

A synthetic 12.648-second German recording was tested on this development PC (i5-14600KF): frozen-worker cold startup 2.286 seconds, recognition 0.376 seconds, peak worker process-tree working set approximately 1,053 MiB. This is a short, clean speech smoke test, not an accuracy or office-PC benchmark. Noisy site recordings, accents, names and measurements need review. Test on the target office computer before relying on a throughput estimate.

Build sources: `transcription/worker.py`, `electron/transcription.cjs`, `scripts/build-transcription.ps1`. Pinned asset hashes: `transcription/assets.json`. Attribution and bundled component licenses: `transcription/NOTICE.md` and `release/win-unpacked/resources/transcription/licenses/`. The earlier [Whisper research plan](docs/local-transcription-plan.md) remains historical; Parakeet is the implemented provider.

## Offline Qwen text assistant

Version 0.7.0 bundles **Qwen3.5-2B**, the text-only Q4_K_M GGUF conversion published by [Unsloth](https://huggingface.co/unsloth/Qwen3.5-2B-GGUF), pinned to revision `f6d5376be1edb4d416d56da11e5397a961aca8ae`. The model file is 1,280,835,840 bytes. The native Windows x64 CPU runtime is llama.cpp b11476. No GPU, Python installation, API key or model download is required in the finished app.

**Text glätten** suggests grammar, punctuation and filler-word edits. The editable review shows the source and suggestion side by side. Changes to number or negation counts produce a warning; these checks cannot prove that every meaning or name was preserved. Accepted cleanup retains the first original transcript, model revision and timestamp. Expand **Originaltranskript** on the audio card to read or restore the retained original. Parakeet transcripts are retained before any subsequent Qwen edit. Manual edits clear the current model label while preserving the retained original. Originals and model metadata survive restart and ZIP backup/import.

**Eintrag vorbereiten** proposes diary sections with literal source quotes available under **Textstelle ansehen**. Unsupported quotes and company/employee/temperature values without matching source evidence are removed. Source sentences outside the retained quotes remain selectable as **Nicht zugeordnete Textstelle**, unchecked by default. Coverage is conservative; a partially quoted sentence may appear again for review. These checks verify matching text, not full semantic accuracy or correct company-to-work assignment. Every proposal needs human review. Work proposals whose source quote contains a recognized negation or planning term are conservatively moved to occurrences or notes using the literal source text. A missing negation in an occurrence/note is also restored from its quote. These rules can over-classify a mixed sentence and cannot detect every future tense; the small model can still misclassify information.

Selected work rows are appended with an empty Gewerk code; exact duplicates are skipped. Occurrences and notes are appended without replacing existing text. Existing weather and temperature are unchecked by default and replaced only if selected. The original transcript is unchanged when organizing. Results are rejected if the transcript changes while the model runs. Draft suggestions are temporary and discarded when the app closes.

Both models share a cancelable inference queue. Before one loads, the other unloads, limiting simultaneous model memory use. Four CPU threads are used; the UI stays responsive. Qwen starts on demand and unloads after 90 seconds idle. Text is divided at sentence/word boundaries into approximately 2,500-character pieces for a 4,096-token context; conflicting weather across pieces becomes a review note. The input limit is 100,000 characters, total job timeout is 20 minutes, and cancellation stops the native worker. Truncated or malformed outputs report an error and are never applied. CPU speed depends on the office PC; the target 16 GB computer has not been benchmarked.

The generation service listens only on `127.0.0.1` with a random in-memory session key. Its web UI, tool agent and external MCP proxy are disabled; inherited llama configuration is removed. Transcript prompts and results are not written to runtime logs. There are no production cloud calls. Only development asset builds use the network.

Build sources: `assistant/assets.json`, `scripts/build-assistant.py`, `electron/assistant.cjs`, `electron/assistant-format.cjs`, `electron/inference-queue.cjs`. Qwen, llama.cpp, OpenMP and runtime attribution: `assistant/NOTICE.md`, with full open-source licenses in the packaged `resources/assistant/licenses/` directory. The model and native runtime download hashes are verified before packaging. Microsoft C++ runtime DLLs are included for app-local deployment.

## Validation

```powershell
npm test
npm run test:desktop
npm run test:pdf
npm run test:features
npm run test:formatting
npm run test:minimal
npm run test:transcription
npm run test:assistant
node tests/portable-assistant.cjs
npm run build
```

Core tests cover save ordering, restart persistence, recovery, date validation, media path confinement, German document content, photo embedding and the local speech provider, migration, cancellation, progress, worker failure recovery, silence and transcript provenance. The desktop test launches Electron against an isolated `.qa/desktop-*` folder, uses a simulated microphone, and checks the editor, imports, playback metadata, recording, restart, selected PDF/Word export, ZIP backup/import and deletion cancellation. Its example image is explicitly a test illustration. QA outputs are ignored by Git.

The features test checks persisted zoom, photo compression, dragging, proportional resizing, ordering, per-photo page controls, one-page fitting, live header/footer preview, cursor-aware field insertion, company logo, reusable presets, PDF/Word generation, restart, backup/import and searchable project-menu keyboard navigation. It creates desktop screenshots and a sample report for visual inspection. Layout tests include mixed proportions and up to 500 photos. The formatting workflow checks section photo import/reassignment, custom section styling, margins, table choices, footer images, saved presets, PDF/Word export, backup/restart, project creation/rename/deletion, entry-list deletion, and breadcrumb navigation.

The minimal UI workflow checks hover controls without layout shifts, keyboard access and Escape, compact photo height after resizing, selected-only delete alignment, grouped settings, shared color defaults and PDF/Word export.

The renderer is sandboxed with context isolation and no Node.js integration. A narrow preload API exposes validated operations; a local media protocol serves app attachments. Production UI has no remote assets or network-dependent fonts. Electron and Node dependencies are pinned in `package-lock.json`; review updates periodically.

## Technology choice

Electron includes Chromium and Node.js, which makes the app larger but provides a consistent document preview and built-in PDF printing. Tauri would retain the React UI while moving storage, native operations and provider integration into Rust; it uses Windows WebView2 rather than bundling Chromium. A native Windows UI in Rust would require a different UI toolkit and more custom editor/report work. For this first version, Electron makes the document/media workflow straightforward. The model and report modules are separate from the renderer to keep a later backend migration practical.

Official references: [Electron](https://www.electronjs.org/docs/latest/), [Electron context isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation), [Tauri webview versions](https://v2.tauri.app/reference/webview-versions/), [docx](https://docx.js.org/).

The speech workflow test runs actual CPU inference with a synthetic German fixture, blocks renderer HTTP requests, checks all six audio containers, protects manual edits, accepts a reviewed replacement, cancels/restarts the worker, segments longer audio, verifies UI responsiveness, handles invalid audio/silence, records a simulated microphone and verifies restart persistence. `MODULO_PACKAGED_EXE` can point it at the packaged app.

`node tests/portable-transcription.cjs` additionally launches the actual portable EXE, verifies extraction and automatic transcription with Python/FFmpeg excluded from PATH, checks persistence and clean shutdown. The v0.6.0 portable EXE is approximately 997 MB because it embeds the offline model.

The Qwen workflow test uses the actual bundled model for cleanup/discard/edit/accept, original restoration, field selection, protected existing weather, unassigned source coverage, stale-result rejection, cancellation/restart, Qwen-to-Parakeet handover, renderer responsiveness, restart and ZIP backup/import. Unit tests also cover malformed/truncated JSON, source grounding, negative/planned-work handling, number checks, bounded chunk coverage, duplicate handling, queue transitions and idle native-worker shutdown. `node tests/portable-assistant.cjs` verifies the actual single EXE above 2 GiB, running both models from its extracted resources with Python/FFmpeg excluded from PATH, then closes the launcher cleanly.


## Bauzeitenplaner (0.8.0)

Choose **Bauzeitenplaner** directly below the logo. Both modules share the selected project, autosave and the complete ZIP backup. Existing version-1 diaries migrate on load to version 2; keep a backup before using an older app version again. The application identity and data directory remain the same.

Create project trades and companies in **Gewerke & Firmen**, then add activities in **Terminplan**. A blank start means unscheduled; duration zero creates a milestone. Dates can be edited in the activity dialog or moved/resized in the chart. Automatic successors follow Ende–Anfang links; fix a date explicitly to retain it despite contradictory predecessors. Consequential changes and conflicts are reviewed before applying, with one-step transaction undo. Undo history is session-only (20 steps); the last 50 confirmed revisions and up to 20 immutable reference plans persist across restart.

The default calendar is Monday–Friday. Configure workdays and manually maintained nonworking dates through the calendar icon. Durations use workdays; predecessor waiting periods explicitly use workdays or calendar days. Friday + zero-lag Ende–Anfang means Monday. Progress, status, blocked flag and actual dates are independent manual reports.

A3/A4 landscape PDFs tile dates and rows to preserve legibility, repeat row labels and include the project logo. Print preview uses the same HTML and page divisions as export. Filters and explicit activity selections limit output. CSV import has column mapping, German/ISO date validation and a reviewed preview; it adds new activities and catalogs without overwriting the current plan. CSV exchanges activity fields, not the full dependency graph or reference plans; ZIP backup retains full fidelity and remaps restored IDs. **Wochenvorschau** offers rolling three/six-week views of the same tasks.

Structured blocker ownership, diary evidence links, AI schedule suggestions, critical path, resource leveling, XLSX/MS Project and collaboration remain follow-on features. No extra AI model or GPU runtime is needed for scheduling.

Run `npm run test:planner` for the Electron schedule workflow and `npm test` for deterministic calendar/dependency, schema/migration, backup mapping, CSV and tiled-report checks.

## Extensive demo data

Import `demo/Modulo-Demo-Daten.zip` through **Einstellungen → Daten & Sicherung → Sicherung importieren** in v0.8.0 or newer. This adds four fictional demo projects alongside existing projects. Importing it again adds another set of copies. Current app preferences are retained.

The dataset contains **1,005 activities, 100 diary entries, 318 illustrated photo attachments and 25 audio notes**, with six reference plans and three header/footer presets. Campus West includes dependency, waiting-period, blocked, fixed-date and unscheduled test cases; Kita Sonnenhof uses a Saturday work calendar; Quartier Süd contains 600 activities; the fourth project is an empty starter. A rich diary tests 24 photos across sections and multiple photo pages. All companies, reports and images are fictional; speech files reuse a synthetic German recording, with manual transcript additions explicitly identified.

See [demo/DEMO-ANLEITUNG.md](demo/DEMO-ANLEITUNG.md) for the test checklist. `demo/import-tests/` contains a large image for compression testing and valid/invalid CSV examples; `demo/csv/` contains exported activity lists. These manual test materials also ship inside the ZIP; extract it to access them. `npm run demo` regenerates the files around today's local date, or use `npm run demo -- --anchor 2026-10-08 --seed modulo-demo-v1`. Generation requires the development dependencies and Playwright Chromium; extra audio containers use the cached FFmpeg build. It does not change live app data.

`npm run test:demo` imports the ZIP into an isolated app profile, checks preservation of existing data and ID/reference remapping, exercises the schedule and both CSV fixtures, checks playback, exports PDF/Word, tests photo compression, backs up and restarts. It prefers the existing unpacked Windows app; set `MODULO_PACKAGED_EXE` to another executable or build the development app first if no packaged executable exists. `npm test` also verifies fixture reproducibility and calendar scenarios.


## Planner PDF layouts (0.8.1)

The planner export now offers **Gesamtterminplan**, **Gewerketerminplan** and **Vorgangsliste**, following the supplied overall/list/detail PDFs. Reports use a centered project/address header, the project's own logo at the right, a page frame, numbered and indented activities, bold Gewerk summaries, separate duration/start/end fields, and print-date/page/plan-date footers. Overview/list columns also include Auftragnehmer, Vorgänger and Nachfolger. The portrait list has no timeline.

Chart reports support A4 through A0 landscape; lists offer A4/A3 portrait. Automatic scale uses days, weeks or months according to the selected period and available chart width. Explicit finer scales split a long period horizontally; all layouts split rows vertically and repeat their header/footer. The preview uses the same page geometry as PDF and fits the sheet to the preview width where Chromium supports CSS zoom calculations. The export dialog initially uses the full date span of the selected activities; weekly export retains the current week range.

Black bars show the overall project and selected Gewerk spans; blue bars show activities, darker fill shows reported progress, a diamond marks a milestone, and a green line marks the saved plan date. Optional baseline bars use their saved calendar. Dashed red outlines indicate blocked activities, not critical path. Arrow lines connect Ende-Anfang dependencies whose source end and target start are both on the same printed page; overview/list dependency columns also retain links to activities outside the selected rows or page. Waiting periods explicitly use AT/KT. Existing scheduling supports EA only; the reference documents' AA/EE links are not inferred or invented.

Row numbers derive from the current complete plan, so filtering and switching export layouts preserve the same references. They can change when the plan's order or activity/catalog structure changes. The overall summary covers the complete project, while each printed Gewerk summary covers its selected activities. These are calculated print summaries and do not add activities or change saved scheduling data. Very long table content wraps into continued rows instead of being discarded. Exports stop at 500 pages.

Run `npm run test:planner-export` to exercise UI layout choices and produce three fictional sample PDFs under `output/pdf/`, plus full A0 and tiled A4 stress reports under `.qa/`. The workflow checks column overflow, table/chart alignment, legend/footer separation and matching preview/export page counts. Unit tests cover numbering, links, civil-date window coverage, paper orientation, long content, unique SVG IDs and invalid options.

`node tests/portable-planner.cjs` checks the actual single portable EXE, loading all three PDF layouts and A0 paper support from its extracted resources, with the bundled model runtimes available and no installed Python/FFmpeg required.
