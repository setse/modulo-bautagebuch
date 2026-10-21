# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git

Never add `Co-Authored-By` trailers or "Generated with Claude Code" lines to commits or PRs in this project. Commits are authored by the user only.

## Commands

Node.js 22.12+ is required (main-process `.cjs` files `require()` ES modules like `planner.mjs`).

```powershell
npm ci
npm run dev        # Vite on 127.0.0.1:5173 (strictPort) + Electron with --dev
npm start          # build, then run Electron against dist/
npm run build      # tsc --noEmit + vite build (the only type check / "lint")
npm test           # unit tests: node --test tests/*.test.cjs
node --test tests/planner.test.cjs   # single unit test file
```

- `tests/*.test.cjs` are fast `node:test` unit tests against `electron/` modules directly.
- `tests/*.cjs` without `.test` are Playwright-driven Electron workflows (`npm run test:desktop|pdf|features|formatting|minimal|transcription|assistant|planner|planner-export|demo`). Each `npm run test:*` rebuilds first. They launch Electron with `MODULO_TEST_DATA=.qa/<name>-<timestamp>` as an isolated `userData` dir (the window stays hidden when set) and write screenshots/PDFs to `.qa/` or `output/`.
- `tests/portable-*.cjs` and `tests/packaged.cjs` run against the packaged EXE; `MODULO_PACKAGED_EXE` overrides the path.
- `test:transcription` / `test:assistant` need the local AI assets: run `npm run build:transcription` and `npm run build:assistant` once (PowerShell + uv/Python 3.13; downloads pinned, hash-verified models into `.build/`).
- `npm run package:win` builds a single portable NSISBI EXE (~2.3 GB) into `release/`.
- `npm run demo` regenerates `demo/Modulo-Demo-Daten.zip` (`-- --anchor YYYY-MM-DD --seed modulo-demo-v1` for reproducibility; `npm test` checks fixture reproducibility).

## Architecture

Offline Windows Electron app (German UI) with two modules sharing one project/state: **Bautagebuch** (construction diary with photos, audio, PDF/DOCX export) and **Bauzeitenplaner** (schedule/Gantt planner).

**Process split.** `electron/main.cjs` owns all I/O and registers every IPC handler; `electron/preload.cjs` exposes the only renderer API as `window.diary.*` (sandboxed renderer, context isolation, no Node integration). Media is served to the renderer via the custom `diary-media:` protocol, confined to the data folder. `index.html` sets a strict CSP — no remote assets, fonts are bundled locally.

**State and persistence.** The whole app state is a single versioned JSON document (`diary.json` in `%APPDATA%`, or `MODULO_TEST_DATA`). `electron/model.cjs` (diary) and `electron/planner-model.cjs` (plans) define the zod schemas, which are the source of truth and validate every save and load; `stateSchema` migrates version 1 → 2 in a `z.preprocess`. The renderer's TypeScript types in `src/types.ts` and `src/planner-types.ts` are hand-maintained mirrors — **schema changes must be made in both places**. `electron/store.cjs` serializes saves through a promise queue and keeps `diary.json.bak` as the last valid save for recovery. ZIP backup/restore in `main.cjs` re-IDs imported projects/media (`remapPlans` for planner references) and never overwrites existing projects.

**Shared pure modules.** `electron/design.mjs`, `electron/layout.mjs` and `electron/planner.mjs` are imported by both the main process and the React renderer (`src/` imports `../electron/*.mjs`). Keep them free of Node/Electron APIs. `planner.mjs` holds scheduling logic (workday calendars, Ende–Anfang dependencies, lags); `layout.mjs` holds A4 photo layout math used by both the preview editor and exports.

**Exports.** Diary: `report.cjs` builds HTML (→ `pdf.cjs`, which prints via a hidden Chromium window from a temp HTML file to avoid URL-length limits) and DOCX (via `docx`, with `document-design.cjs`). Planner: `planner-print.mjs` / `planner-report.mjs` produce the tiled A4–A0 page HTML; the in-app preview uses the same HTML and page geometry as the PDF.

**Local AI.** Both models run fully offline on the CPU and share one `LocalInferenceQueue` (`inference-queue.cjs`), so only one model is loaded at a time; each unloads after 90 s idle.
- Transcription: `transcription.cjs` spawns the frozen Python worker (`transcription/worker.py`, onnx-asr + Parakeet + Silero VAD, FFmpeg decode) over stdin/stdout.
- Assistant: `assistant.cjs` runs `llama-server` (Qwen3.5-2B GGUF) on `127.0.0.1` with a random session key; `assistant-format.cjs` validates model JSON output, and `src/assistant-apply.mjs` grounds proposals in literal source quotes before the user reviews them. Model output is never applied without review.
- In development, assets resolve from `.build/{transcription,assistant}`; packaged, from `resources/`. Pinned URLs and SHA-256 hashes live in `transcription/assets.json` and `assistant/assets.json`.

## Conventions

- Code is written in a very dense style: long single lines, minimal whitespace, few comments. Match it.
- All user-facing strings, error messages and document content are German.
- UI follows the Modulo Stratum design system (`design-system/`, adapted tokens in `src/stratum/`): cream surfaces, sage accents, Geist / Geist Mono.
- `2312 Bautagebuch Juni-September 26.docx` is the layout reference for diary exports; do not modify it.
- `docs/` contains historical planning documents; Parakeet (not Whisper) is the implemented transcription provider.
