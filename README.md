# flexicards

A **spaced repetition flashcard app** — a single-file web app for studying with flashcards that resurface on a spaced schedule. Built by a PharmD student at the University of Benin for his own revision, and useful for any student who learns by active recall.

## What it is

flexicards is a flashcard app built around spaced repetition: instead of cramming a deck once, cards come back at intervals so you review them just as you're about to forget them. The whole app lives in one HTML file, works offline once loaded, and needs no install, account, or server.

## Features

- **Spaced repetition flashcards** — cards are scheduled for review at fixed intervals chosen per grade. Each deck has its own intervals, defaulting to Again ≈ 1 hour, Hard 1 day, Good 3 days, Easy 7 days. Grading a card simply sets its next due date to now plus that grade's interval — there is no adaptive algorithm (each card stores an `ease` of 2.5 and a `step` counter, but grading does not use them). New cards are due immediately, so they show up in the next study session.
- **Customisable intervals per deck** — change the four intervals (in days, decimals allowed, e.g. 0.0417 ≈ 1 hour) for any deck from Settings, so a deck can be reviewed faster or slower than the default. Each grading button shows its interval (e.g. "Good (3d)").
- **Customisable grading labels** — rename the Again / Hard / Good / Easy buttons to whatever wording you prefer.
- **Decks and cards** — create multiple decks, add cards with a front, a back, and tags, and edit, rename, or delete decks and cards.
- **Study mode** — work through the cards due today, in shuffled order, flip a card to reveal the answer, grade yourself, or skip a card (it moves to the end of the queue). A progress counter ("n / total") and a completion screen show how the session went. If nothing is due, the app says so instead of starting an empty session.
- **Due badges** — each deck shows how many cards are due, so you know where to start.
- **Search** — live search across all cards by front, back, or tags; prefix a query with `#` to search tags only. Each result has a Study button that jumps straight into that card's deck.
- **Tags overview** — see all tags in use and the cards behind them.
- **Single-file app** — everything runs from `flexicard2.html`; open it and study.
- **GitHub Gist cloud sync** — optional sync to a private Gist: enter a GitHub personal access token once, then Push to upload and Pull to download your data.
- **JSON backup and CSV import/export** — export all data as a JSON backup file (and import it back), or export/import cards as CSV with `Front,Back,Tags,Deck` columns (tags separated by `;`). Importing creates any named decks that don't exist yet, and cards without a deck go into a deck called "Imported".
- **Reset progress or all data** — reset one deck's review progress (all its due dates go back to today), or wipe everything and start over.
- **Light and dark themes** — toggle from the header; your choice is remembered.
- **Offline support** — a service worker (`sw.js`, cache `flexicards-v5`) caches the app so it keeps working without a connection, falling back to the cached copy when the network fails.

## Getting started

No build step and no install required.

1. Open `flexicard2.html` in a browser (or serve the folder with any static server, e.g. `python3 -m http.server`).
2. Create a deck, add cards, and study them; the app schedules reviews for you.
3. Optional: in Settings, set up Gist sync with a GitHub personal access token to back your cards up to the cloud.

> Note: there is no `index.html` in this repo — the app's entry point is `flexicard2.html`, so open that file directly.

## Tech stack

- Plain HTML, CSS, and JavaScript in a single file — no framework, no build step.
- Data is stored in `localStorage` (`flexicards_data`; sync token, Gist ID, and custom labels are stored under their own keys).
- Service worker (`sw.js`) for offline caching.

## Project structure

```
flexicards/
├── flexicard2.html   # The entire app (~67 KB, single file)
├── sw.js             # Service worker (offline cache, v5)
└── README.md         # This file
```

## Status

A working personal study tool.
