# Local LLM Benchmark

Deutsch | [English](#english)

Vergleiche lokale und OpenAI-kompatible LLMs reproduzierbar - mit klaren Metriken, strukturierten Tests und praxisnaher Meta-Auswertung.

## Features

- Vergleich mehrerer Systeme/Modelle ueber einheitliche Prompt-Profile
- Metriken wie `walltime`, `ttft`, `tokens/s`, Token-Verbrauch
- Einzeltests, Profilmessungen und Batch-Matrix
- Analyse-, Runs- und Live-Dashboard-Ansicht
- Meta Evaluation (Local Judge + optionale Cloud-Freigabe)

## Schnellstart ohne Docker

Voraussetzungen:

- Node.js 18+ (empfohlen 20+)
- npm

Start:

```bash
npm install
npm start
```

App URL: `http://localhost:3005`

## Start mit Docker

### Option A: Docker Compose (empfohlen)

```bash
docker compose up -d --build
```

Stoppen:

```bash
docker compose down
```

### Option B: Direkt mit Docker

```bash
docker build -t local-llm-benchmark .
docker run -d --name local-llm-benchmark -p 3005:3005 -p 3015:3015 -v llm_benchmark_data:/app/data local-llm-benchmark
```

Hinweise:

- `3005` = App
- `3015` = Meta Public Port (nur relevant bei Cloud-Freigabe)
- Volume `llm_benchmark_data` speichert deine lokalen Daten persistent

## Dokumentation (Wiki)

- DE Start: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/Startseite-DE
- EN Home: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/Home-EN
- FAQ DE: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/FAQ-DE
- FAQ EN: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/FAQ-EN

## Docker Image

- Docker Hub: https://hub.docker.com/r/zeroneverload/local-llm-benchmark
- Tags: `latest`, `1.0.0`

```bash
docker pull zeroneverload/local-llm-benchmark:latest
```

## Wichtige Hinweise

### Default Prompts

Default-Profile kommen aus `data/Default_promt.json`.

Empfehlung:

- nicht als persoenliche Prompt-Sammlung umbauen
- eigene Profile und Prompts in der UI anlegen
- Default-Prompts als stabile Benchmark-Basis verwenden


## English

[Deutsch](#local-llm-benchmark) | English

Reproducibly compare local and OpenAI-compatible LLMs with structured tests, clear metrics, and practical meta evaluation.

## Features

- compare multiple systems/models with shared prompt profiles
- metrics like `walltime`, `ttft`, `tokens/s`, token usage
- single tests, profile runs, and batch matrix mode
- analysis, runs, and live dashboard views
- meta evaluation (local judge + optional cloud exposure)

## Quick Start without Docker

Requirements:

- Node.js 18+ (20+ recommended)
- npm

Run:

```bash
npm install
npm start
```

App URL: `http://localhost:3005`

## Run with Docker

### Option A: Docker Compose (recommended)

```bash
docker compose up -d --build
```

Stop:

```bash
docker compose down
```

### Option B: Plain Docker

```bash
docker build -t local-llm-benchmark .
docker run -d --name local-llm-benchmark -p 3005:3005 -p 3015:3015 -v llm_benchmark_data:/app/data local-llm-benchmark
```

Notes:

- `3005` = app
- `3015` = meta public port (only needed for cloud exposure)
- `llm_benchmark_data` volume keeps local data persistent

## Documentation (Wiki)

- EN Home: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/Home-EN
- DE Start: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/Startseite-DE
- FAQ EN: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/FAQ-EN
- FAQ DE: https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/FAQ-DE

## Docker Image

- Docker Hub: https://hub.docker.com/r/zeroneverload/local-llm-benchmark
- Tags: `latest`, `1.0.0`

```bash
docker pull zeroneverload/local-llm-benchmark:latest
```

## Important Notes

### Default prompts

Default profiles are loaded from `data/Default_promt.json`.

Recommendation:

- do not use this file as your personal prompt workspace
- create custom profiles/prompts in the UI
- keep default prompts stable as benchmark seed data

### Keep local data out of git

Local runtime/user data should not be committed. See:

- https://github.com/zeroneverload/Local-LLM-Benchmark/wiki/Privacy-and-Git-Hygiene

### Meta cloud exposure

Open ports only when needed, prefer token protection, and close exposure afterward.

## Publishing to GitHub (simple flow)

1. check `git status`
2. commit only intended files
3. keep commit message clear and short
4. run `git push`
5. verify on GitHub that no local/sensitive data was pushed

Suggested pre-push check:

```bash
git ls-files data/*
git status
```
