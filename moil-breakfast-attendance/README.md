# Moil Primary School — Breakfast Club Attendance App

A production backend (and a working frontend that consumes it) for the
Breakfast Club sign-in app used at Moil Primary School (Darwin, NT). This
replaces the original design prototype's in-memory, single-tab React state
with a real persisted API, so attendance data survives refreshes and is
shared across every iPad at the servery table.

Ported from `design_handoff_breakfast_attendance/` (the original click-through
`.dc.html` prototype + its README) — see that folder for the full visual/behavior
spec this app implements pixel-for-pixel.

## Stack

- **backend/** — Node.js + Express + SQLite (`better-sqlite3`). No external
  database service to stand up; the whole app runs from a single `.sqlite`
  file, which suits a single-school deployment.
- **frontend/** — React + Vite, calling the backend over a small REST API.
  Excel import/export uses SheetJS (`xlsx`), same as the original prototype.

## Why a backend (what changed from the prototype)

- Students, attendance, and the staff PIN are now stored in SQLite, not
  browser state — they persist across refreshes and are shared by every
  device pointed at the same backend.
- The staff PIN check happens **server-side** (`POST /api/auth/pin`), hashed
  with `scrypt`, rate-limited, and backed by short-lived session tokens
  instead of a client-side string comparison.
- The Mark screen (marking a student present) intentionally requires **no
  auth**, matching the original design — staff standing at the servery table
  shouldn't need to unlock anything to tick names off. Students/Reports/
  Export/Settings still require the PIN, enforced by the API this time, not
  just hidden UI.
- Multiple iPads can safely mark the same day at once — writes go through
  SQLite transactions on the server instead of local component state.

## Getting started

### 1. Backend

```bash
cd backend
cp .env.example .env   # adjust CORS_ORIGIN / DEFAULT_PIN if needed
npm install
npm run dev             # http://localhost:4000
```

On first run this creates `backend/data/moil.sqlite`, seeds the staff PIN
(`2468` by default — change it from the Settings screen or `DEFAULT_PIN` in
`.env` before first run), and seeds the roster from the placeholder 150-name
list bundled with the design handoff (`backend/src/data/students-seed.json`).
Replace that roster with the school's real students via the Students screen
(add one at a time, paste a list, or import an Excel file) — there's no
migration needed, it's just normal roster edits.

### 2. Frontend

```bash
cd frontend
cp .env.example .env    # point VITE_API_URL at the backend if not localhost
npm install
npm run dev              # http://localhost:5173
```

Open http://localhost:5173, tap "Open sign-in sheet", and you're on the Mark
screen. Tap any of Students / Reports / Export / Settings to hit the PIN
modal (default PIN `2468`).

### Deploying for real use at the school

Run the backend somewhere reachable from the school's wifi (a small VM,
Raspberry Pi, whatever's already on-site works fine given the load), point
every iPad's browser at the built frontend (`npm run build` in `frontend/`,
serve `frontend/dist/`), and set `VITE_API_URL` / `CORS_ORIGIN` to match.
Back up `backend/data/moil.sqlite` periodically — it's the only durable
state in the whole system.

## API summary

All endpoints are under `/api`. Endpoints marked **PIN** require an
`Authorization: Bearer <token>` header from a successful `POST /api/auth/pin`.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/config` | — | total weeks/terms, days, class list |
| POST | `/auth/pin` | — | exchange a 4-digit PIN for a session token |
| POST | `/auth/lock` | — | invalidate the current session token |
| GET | `/auth/me` | — | whether the bearer token is currently valid |
| GET | `/students` | — | full roster (Mark screen needs this pre-auth) |
| POST | `/students` | PIN | add one student |
| POST | `/students/bulk` | PIN | add many students (paste-list / Excel import) |
| PUT | `/students/:id` | PIN | edit name/class |
| PATCH | `/students/:id/toggle-active` | PIN | activate/deactivate (no hard delete) |
| POST | `/students/:id/move` | PIN | reorder within the full roster |
| GET | `/attendance?term=&week=&day=` | — | one day's `{studentId: count}` map |
| POST | `/attendance/toggle` | — | cycle one student's count 0→1→2→3→0 |
| POST | `/attendance/mark-all` | — | set every active student at 0 to 1 |
| POST | `/attendance/search-mark` | — | mark the first matching not-yet-present student |
| GET | `/reports?term=` | PIN | week-by-week + term totals |
| GET | `/export/full` | PIN | full dataset for the client-side Excel export |
| PUT | `/settings/pin` | PIN | change the staff PIN |

## Notes / known tradeoffs

- The Excel import/export still runs through SheetJS in the **browser**
  (same as the original prototype) rather than a server-side xlsx library —
  keeps the exact same worksheet layout the design spec calls for, and avoids
  a second xlsx-parsing implementation to keep in sync. Import is behind the
  PIN-gated Students screen, so it's trusted staff uploading trusted files.
- Session tokens live in `sessionStorage` on the client (not `localStorage`),
  which is what gives the "stays unlocked until you lock it or close the tab"
  behavior the design spec calls for, without any client-side PIN check.
- No student is ever hard-deleted — only the active/inactive toggle exists,
  matching the original design spec.
