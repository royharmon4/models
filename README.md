# Model Mastery

A browser-based management model trainer for memorizing and applying 151 MEM management models using spaced repetition, scenario training, and relationship chains.

---

## What It Does

- **Daily Review** — Spaced repetition flashcards. Miss a model and it comes back sooner; ace it and the interval grows (1 → 3 → 7 → 14+ days).
- **Number Drill** — Two-way number/name recall with nearby hints and decade anchors.
- **Scenario Trainer** — 80 realistic workplace scenarios asking "which models apply?" — the highest-leverage practice mode.
- **Model Library** — Browse, search, and filter all 151 models by name, number, keyword, or category.
- **Relationship Chains** — Seven pre-built model chains (Change, Performance, Problem-Solving, Delegation, Perception, Motivation, Hiring) for sequential learning.
- **Progress Dashboard** — Streak, mastery %, weak categories, and due-review count at a glance.

All progress is saved in browser `localStorage` — no login, no server, no cost.

---

## Running Locally

Because the app uses ES modules (`import`/`export`), you must serve it over HTTP — **double-clicking `index.html` will not work**.

### Option 1 — Python (built into macOS/Linux)

```bash
cd model-mastery
python3 -m http.server 8080
# Open http://localhost:8080
```

### Option 2 — Node.js `serve`

```bash
npx serve model-mastery
# Follow the URL it prints
```

### Option 3 — VS Code Live Server

Install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

---

## Deploying to GitHub Pages

1. Push the `model-mastery` folder contents to a GitHub repository (or use the repo root).
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch** → `main` → `/ (root)`.
4. GitHub will publish to `https://<username>.github.io/<repo>/`.

If files are in a subdirectory, set the source to that folder, or move everything to the repo root.

---

## How Progress Is Stored

All data lives in `localStorage` under the key `modelMastery_v1`. It includes:

- Per-model mastery: level (0–5), correct/incorrect counts, next review date, ease factor
- Stats: streak, total reviews, scenario accuracy, number drill accuracy
- Last study date

Progress persists across browser sessions as long as you use the same browser and do not clear site data.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Reveal answer |
| `1` | Grade: Missed |
| `2` | Grade: Hard |
| `3` | Grade: Got it |
| `4` | Grade: Easy |
| `/` | Focus search (Library) |
| `?` | Toggle shortcut overlay |

---

## Spaced Repetition Intervals

| Grade | Next Review |
|-------|-------------|
| Missed | Same day / tomorrow |
| Hard | 1 day |
| Got it | 3 days |
| Easy | 7 days |

Intervals grow automatically as mastery level increases (ease factor adjusts per-model, similar to SM-2).

---

## Editing Model Data

Open `models.js`. Each model object looks like:

```js
{
  number: 63,
  name: "KASH Formula",
  meaning: "Improvement requires knowledge, attitude, skills, and habits.",
  example: "Sales training adds product knowledge but also call discipline and belief.",
  category: "Hiring, Training & Performance",
  trigger: "Use when someone is underperforming and you need to diagnose the root cause.",
  diagnosticQuestion: "Is this a knowledge gap, attitude gap, skill gap, or habit gap?",
  relatedModels: [18, 60, 101, 145],
  comments: ""
}
```

Fields you can safely edit:
- `trigger` — when to reach for this model
- `diagnosticQuestion` — the key question it answers
- `relatedModels` — array of related model numbers
- `category` — must match one of the 10 categories in `CATEGORIES`
- `comments` — internal notes; not shown in the UI

After editing, reload the app. Mastery data for that model number is preserved.

---

## Importing and Exporting Progress

- **Export** — Click "↑ Export" in the top bar. Saves a `.json` file with your full progress.
- **Import** — Click "↓ Import" and select a previously exported `.json` file to restore progress.
- **Reset** — Click "Reset" to wipe all mastery data and start fresh (requires confirmation).
- **CSV** — Click "CSV" to download all model data as a spreadsheet.

---

## File Structure

```
model-mastery/
├── index.html      — App shell and navigation
├── styles.css      — Dark industrial theme, mobile-responsive
├── app.js          — Core logic: state, spaced repetition, all views
├── models.js       — All 151 models as structured data
├── scenarios.js    — 80 scenario questions + 7 relationship chains
└── README.md       — This file
```

---

## Categories

1. Action & Execution
2. Perception & Thinking
3. Motivation & Behavior
4. Change Management
5. Communication
6. Decision & Problem Solving
7. Planning & Priorities
8. Delegation & Management
9. Hiring, Training & Performance
10. Organization, Economics & Systems

---

## Recommended Next Improvements

- **Offline support** — Add a `service-worker.js` for PWA/offline use
- **Cloud sync** — Optional Supabase or Firebase backend for multi-device progress
- **More scenarios** — Expand from 80 to 150+ covering edge cases
- **Spaced repetition tuning** — Expose ease factor settings in a preferences panel
- **Model notes** — Personal annotation field per model stored in localStorage
- **Print / PDF export** — One-page cheat sheet per category
