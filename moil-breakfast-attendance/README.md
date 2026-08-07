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

On first run this creates `backend/data/moil.sqlite` and seeds the staff PIN
(`0000` by default — change it from the Settings screen or `DEFAULT_PIN` in
`.env` before first run). The roster itself starts **empty** — add the
school's real students via the Students screen (one at a time, paste a
list, or import an Excel file). Class is optional per student; leave it
unset for names not yet sorted into a class.

### 2. Frontend

```bash
cd frontend
cp .env.example .env    # point VITE_API_URL at the backend if not localhost
npm install
npm run dev              # http://localhost:5173
```

Open http://localhost:5173, tap "Open sign-in sheet", and you're on the Mark
screen. Tap any of Students / Reports / Export / Settings to hit the PIN
modal (default PIN `0000`).

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
| DELETE | `/students/:id` | PIN | hard delete a student + their attendance history |
| PATCH | `/students/:id/toggle-active` | PIN | activate/deactivate (soft, keeps history) |
| POST | `/students/:id/move` | PIN | reorder within the full roster |
| GET | `/attendance?term=&week=&day=` | — | one day's `{studentId: count}` map |
| POST | `/attendance/toggle` | — | cycle one student's count 0→1→2→3→0 |
| POST | `/attendance/mark-all` | — | set every active student at 0 to 1 |
| POST | `/attendance/search-mark` | — | mark the first matching not-yet-present student |
| GET | `/reports?term=` | PIN | week-by-week + term totals |
| GET | `/export/full` | PIN | full dataset for the client-side Excel export |
| PUT | `/settings/pin` | PIN | change the staff PIN |

## Excel export format

The download on the Export screen produces one worksheet per term (`Term 1`
through `Term 4`), matching the school's existing Foodbank/DSBP attendance
log layout rather than the original prototype's one-sheet-per-week format:
a `Student's Name` column, then a merged `Mon-Fri` block per week (`W1`
through `W{totalWeeks}`) laid out side by side, students in roster order,
and a `TOTALS` row at the bottom summing each day column across the whole
term. Note: the free SheetJS build this app uses (`xlsx` on npm) can write
merged cells and column widths but not cell fill colors/fonts, so the sheet
won't have the green/grey header shading of the school's original template —
only the row/column structure.

## Notes / known tradeoffs

- The Excel import/export still runs through SheetJS in the **browser**
  rather than a server-side xlsx library, avoiding a second xlsx-parsing
  implementation to keep in sync. Import is behind the PIN-gated Students
  screen, so it's trusted staff uploading trusted files.
- Session tokens live in `sessionStorage` on the client (not `localStorage`),
  which is what gives the "stays unlocked until you lock it or close the tab"
  behavior the design spec calls for, without any client-side PIN check.
- Students can be hard-deleted (with a confirm prompt, from the Students
  screen's edit mode) — this cascades to their attendance history too. This
  is a deliberate departure from the original design spec (which only had
  an active/inactive toggle), added for cleaning up typos/duplicates while
  setting up a real roster. Prefer Inactive over Delete once a student has
  real attendance history you want to keep in reports/exports.
- Class is optional on every student — left blank for names not yet sorted
  into Transition/Preschool/Year 1-6; the Students screen has a "No class"
  filter chip to find them.
- The header wraps onto two lines (branding on top, nav below) instead of
  overflowing or word-wrapping, since it doesn't quite fit on one line at
  iPad portrait widths (~768-810px) once the lock icon is showing — verified
  across iPad mini/regular/Air/Pro at both orientations.
