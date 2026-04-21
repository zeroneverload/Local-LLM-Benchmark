# Local LLM Benchmark

A local LLM benchmarking framework designed to evaluate model performance across multiple backends (LM Studio, Ollama, etc.), including metrics for speed, quality, and instruction adherence. Supports structured test runs, result analysis, and reproducible evaluations.

## Default Prompts via `Default_promt.json`

Die eingebauten Default-Profile werden aus dieser Datei geladen:

- `data/Default_promt.json`

Du kannst die Datei direkt anpassen, ohne neu zu deployen. Die Inhalte werden bei API-Zugriffen dynamisch geladen.

Wenn die Datei fehlt, leer oder ungueltig ist, nutzt das System automatisch die internen Fallback-Defaults und schreibt die Datei neu.

## Struktur von `Default_promt.json`

Die Datei muss ein JSON-Array von Profilen sein.

Pflichtfelder pro Profil:

- `slug` (string, eindeutig)
- `title` (string)
- `tests` (array, genau 10 Tests empfohlen)

Empfohlene Profilfelder:

- `description` (string)
- `category` (string)
- `profileType` (`"short"` oder `"long"`)
- `sortOrder` (number)

Empfohlene Testfelder:

- `title` (string)
- `prompt` (string)
- `description` (string)
- `expectedFocus` (string)
- `difficulty` (string)
- `estimatedLength` (string)
- `tags` (array of string)

## Beispiel

```json
[
  {
    "slug": "default-reasoning",
    "title": "Reasoning & Logic",
    "description": "Mehrstufige Logik-, Mathe- und Planungsaufgaben.",
    "category": "reasoning",
    "profileType": "long",
    "sortOrder": 10,
    "tests": [
      {
        "title": "Constraint Scheduler",
        "description": "Terminslots mit Nebenbedingungen",
        "expectedFocus": "constraint reasoning",
        "difficulty": "hard",
        "estimatedLength": "long",
        "tags": ["logic", "planning"],
        "prompt": "Plane einen Wochenplan fuer 5 Personen mit Konflikten."
      }
    ]
  }
]
```

## Hinweise

- `slug` muss pro Profil eindeutig sein.
- Die App behandelt diese Eintraege als System-Defaults (read-only in der UI).
- Standardverhalten bleibt: Default-Prompts werden nicht als User-Prompts exportiert.
