# Local LLM Benchmark

Deutsch | [English](#english)

Vergleiche lokale und OpenAI-kompatible LLMs reproduzierbar - mit klaren Metriken, strukturierten Tests und praxisnaher Meta-Auswertung.

## Warum dieses Projekt?

`Local LLM Benchmark` hilft dir, Modelle nicht nur nach Bauchgefuehl, sondern anhand vergleichbarer Daten zu bewerten:

- Geschwindigkeit (`walltime`, `ttft`, `tokens/s`)
- Antwortqualitaet und Instruktions-Treue
- Vergleich mehrerer Systeme, Modelle und Prompt-Profile
- Meta-Auswertung ganzer Run-Datensaetze (lokal oder optional cloud-freigegeben)

## Features

- System-Slots fuer mehrere Backends (z. B. Ollama, LM Studio, OpenAI-kompatibel)
- Prompt-Profile mit Default- und User-Prompts
- Einzeltest, Profilmessung und Batch-Matrix
- Analyse- und Runs-Tab mit Filtern, Detailansichten und Export
- Live-Dashboard fuer laufende Benchmarks
- Meta Evaluation inkl. Local Judge und optionaler Cloud-Freigabe

## Quick Start

```bash
npm install
npm start
```

Standard-URL: `http://localhost:3005`

## Dokumentation (Wiki)

- DE Start: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/Startseite-DE
- EN Home: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/Home-EN
- FAQ DE: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/FAQ-DE
- FAQ EN: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/FAQ-EN

## Wichtige Hinweise

### 1) Default Prompts

Die eingebauten Default-Profile kommen aus `data/Default_promt.json`.

Empfehlung:

- nicht als persoenliche Prompt-Sammlung umbauen
- eigene Profile und Prompts in der UI anlegen
- Default-Prompts als stabile Benchmark-Seed-Daten nutzen

### 2) Lokale Daten nicht pushen

Fuer eine frische Installation bei anderen Nutzern sollten lokale Lauf-/Nutzerdaten nicht in Git landen.

Siehe:

- https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/Datenschutz-und-Git-Hygiene

### 3) Meta Cloud-Freigabe mit Vorsicht

Portfreigaben nur bewusst und zeitlich begrenzt nutzen, idealerweise mit Token-Schutz.

---

## English

[Deutsch](#local-llm-benchmark) | English

Reproducibly compare local and OpenAI-compatible LLMs with structured tests, clear metrics, and practical meta evaluation.

## Why this project?

`Local LLM Benchmark` helps you evaluate models using consistent data instead of subjective impressions:

- speed metrics (`walltime`, `ttft`, `tokens/s`)
- response quality and instruction adherence
- cross-system/model/profile comparison
- meta evaluation over complete run datasets (local or optional cloud exposure)

## Features

- multi-slot system configuration for different backends
- prompt profiles with default and user prompts
- single tests, profile runs, and batch matrix mode
- analysis and runs tabs with filters, details, and export options
- live dashboard during active benchmark runs
- meta evaluation with local judge and optional cloud exposure

## Quick Start

```bash
npm install
npm start
```

Default URL: `http://localhost:3005`

## Documentation (Wiki)

- EN Home: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/Home-EN
- DE Start: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/Startseite-DE
- FAQ EN: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/FAQ-EN
- FAQ DE: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/FAQ-DE

## Important Notes

### 1) Default prompts

Default profiles are loaded from `data/Default_promt.json`.

Recommendation:

- do not use this file as your personal prompt workspace
- create your own profiles/prompts in the UI
- keep defaults as stable benchmark seed data

### 2) Keep local data out of git

For clean installs, local runtime/user data should not be committed.

See:

- https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/Privacy-and-Git-Hygiene

### 3) Use meta cloud exposure carefully

Open ports only when needed, use token protection when possible, and close exposure after use.
