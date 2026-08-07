# Handoff: Moil Primary School — Breakfast Club Attendance App

## Overview
An iPad-first web app replacing a paper sign-in sheet for a daily school breakfast/foodbank program at Moil Primary School (Darwin, NT). One staff member stands at a servery table and taps through a student list while kids queue up, so the whole design is optimized for speed and large touch targets over information density. It also has lightweight PIN-gated admin screens for managing the roster, viewing reports, and exporting attendance to Excel.

## About the Design Files
The bundled `.dc.html` file is a **design reference built in HTML** — a working, high-fidelity click-through prototype showing exact layout, color, type, and interaction behavior, including in-memory state logic (marking present, roster editing, PIN check, Excel export via SheetJS). It is **not production code to ship as-is**. The task is to recreate this design and its behavior inside a real application with a persistent backend/database — pick whatever stack fits (e.g. React/Next.js + Postgres, or whatever the target codebase already uses) — porting the visual design pixel-for-pixel and reimplementing the logic against real persisted data instead of in-memory React state.

## Fidelity
**High-fidelity.** Colors, type, spacing, copy, and component states in the HTML file are final — recreate them pixel-perfectly. The only things that are prototype-only stand-ins are: data persistence (currently in-memory), authentication (currently a single shared 4-digit PIN check done client-side), and the student roster (currently 150 generated placeholder names — real names to be entered by the school).

## Why a backend is needed
Today all student and attendance data lives in React component state inside the browser tab. It resets on refresh and is not shared between iPads. For real use at the school this needs:
- A persistent database (students, attendance records, settings)
- An API the front end calls instead of local state mutations
- Basic auth for admin actions (the PIN check should move server-side)
- Ideally: multi-device sync so more than one iPad/staff member can mark or review the same data safely

## Screens / Views

### 1. Splash / landing screen
- **Purpose**: Branded entry point shown once when the app loads, before any data screen.
- **Layout**: Full-viewport, flex column, centered content, generous vertical gap (22px) between elements.
- **Components**:
  - Moil Primary School crest logo, 140x140px, assets/moil-logo.png
  - Eyebrow label: "MOIL PRIMARY SCHOOL" — 13px, weight 700, letter-spacing 0.1em, uppercase, color #8A7A63
  - Title: "Breakfast Club" — Bitter serif, 40px, weight 700, color #2B241E
  - Subtitle: "Daily attendance sign-in" — 17px, color #6B5F4C
  - Button: "Open sign-in sheet" — 64px tall, padding 0 40px, border-radius 14px, background #B24A2C, white text, 19px weight 700
- **Behavior**: Tapping the button transitions to the Mark screen. No auth required for this step.

### 2. Header (persistent across all screens once app is open)
- **Layout**: 72px tall bar, white background, 2px bottom border #E7DCC8, flex row, space-between, 24px horizontal padding.
- **Left**: 46x46px circular logo (assets/moil-logo.png) + two-line label stack: eyebrow "MOIL PRIMARY SCHOOL" (11px, 600, uppercase, #8A7A63) above "Breakfast Club" (Bitter serif, 21px, 700, #2B241E).
- **Right**: Nav pill buttons — Mark, Students, Export, Reports, Settings. Each is 44px tall, border-radius 10px, font-weight 700, 15px. Inactive: transparent background, #6B5F4C text, transparent border. Active: background #F4EEE0, border 2px #E7DCC8, text color #B24A2C.
  - Mark is always open, no auth.
  - Students / Export / Reports / Settings are PIN-gated (see PIN modal below).
- A small lock icon button (44x44px, border 2px #E7DCC8) appears at the far right only when the admin session is unlocked, letting staff re-lock manually.

### 3. Mark screen (primary/default screen)
- **Layout**: flex column filling remaining viewport height below header, 18-24px padding, no page scroll except the student list.
- **Term selector**: row of 4 pills, "Term 1"-"Term 4". Active pill background #8A3520 (dark terracotta).
- **Week selector**: row of up to 10 pills, "W1"-"W10". Active pill background #B24A2C.
- **Day selector**: row of 5 pills, "Mon"-"Fri". Active pill background #31665A (deep green).
- All pills: 40px tall, padding 0 16px, border-radius 10px, font-weight 700, 15px; inactive style is white background with 2px #E7DCC8 border and #6B5F4C text.
- **Toolbar row** (flex, wraps on narrow viewports, 10px gap):
  - Search input, flex-grow, 52px tall, border-radius 12px, 2px #E7DCC8 border, placeholder "Type a name and press Enter to mark present". Pressing Enter marks the first active, not-yet-present student whose name (first+last) contains the query, then clears the search box.
  - Present-count chip: background #EAF1EC, border 2px #C6DBCF, bold text e.g. "38 of 150 marked present" (or, when any student has 2+ servings that day, "38 of 150 present . 42 servings").
  - "Mark everyone" button — background #31665A, white text, marks every active student present (count = 1) for the current term/week/day without overwriting anyone already marked with a higher count.
  - The former "Clear this day" button was removed intentionally — it was a mis-tap risk standing at a servery table. Do not re-add it to the Mark screen.
- **Student list**: scrollable card, 2px #E7DCC8 border, 16px border-radius, white background. Each row is a single large tap target (min-height 72px):
  - Left: student name (Bitter serif, 20px, 600, #2B241E) + class tag pill (12px, 600, #8A7A63 text on #F4EEE0 background) — the class tag is always shown.
  - Right: a 40x40px circle that cycles through 0 -> 1 -> 2 -> 3 -> back to 0 on each tap, representing how many times that student took a serving that day (supports kids occasionally taking a second breakfast). 0 = white circle, 3px #D8CDB8 border, empty. 1 = filled #31665A circle with white "1". 2 or 3 = filled #21493F (darker) circle with white "2"/"3".
  - Present rows get a subtle background tint (#EAF1EC) and a 6px left border in the circle color.
  - List is sorted alphabetically by first name and filtered live by the search box.
  - Empty state message ("No active students match ..." or "No active students on the roster yet.") when the filtered list is empty.

### 4. Students screen (admin, PIN-gated)
- **Purpose**: Manage the roster — add, bulk-paste, import from Excel, edit, activate/deactivate, and reorder students. Roster order determines export row order.
- **Toolbar**: roster summary text ("150 students on the roster . 148 active"), plus three toggle buttons: "+ Add student", "Paste a list", "Import from Excel" (44px tall pills, active state matches the pill-active style above).
- **Add student panel** (collapsible, background #F4EEE0, 12px radius): first-name input, last-name input, class select (options: Transition, Preschool, Year 1-6), "Add" button (#B24A2C background).
- **Paste-a-list panel** (collapsible): multi-line textarea, placeholder "One student per line, e.g. Jack Nguyen, Year 3"; a class select sets the default class for lines that do not specify one; "Add N students" button shows a live count of non-empty lines. Parsing: split each line on comma or " - "; if two parts, first = name, second = class; otherwise split the whole line into first/last name and use the default class.
- **Import from Excel**: hidden file input (.xlsx/.xls) triggered by the button; reads the first sheet of the workbook via SheetJS, skips a header row if the first cell reads "Name"/"First Name"/"Student", and maps rows the same way as the paste-a-list parser (3 columns = first/last/class, 2 columns = full name + class, 1 column = full name only + default class). New rows are appended to the end of the roster order.
- **Class filter chips**: "All" + each of the 8 classes, 36px tall pills, filters the visible list only (does not affect reorder logic).
- **Student rows** (10px vertical padding, 1px bottom divider #F0E9DA):
  - Up/down arrow buttons (32x26px each, stacked) reorder the student within the full, unfiltered roster order (not just the filtered view) — this is what the Excel export sorts by. Buttons are visually dimmed (opacity 0.35) and disabled at the top/bottom of the full list.
  - A small numeric position label.
  - Tapping the name/class area switches that row into inline edit mode: first-name input, last-name input, class select, Save (#31665A) / Cancel (outlined) buttons.
  - An iOS-style toggle switch (52x30px track, 24px knob) for active/inactive, with an "Active"/"Inactive" label to its right.
- No delete action exists by spec — only active/inactive toggling.

### 5. Reports screen (admin, PIN-gated)
- **Purpose**: Give staff a week-by-week and term total view to relay to a manager.
- **Term tabs**: same 4-tab pattern as Mark/Export.
- **Table**: grid with columns [Week label, Mon, Tue, Wed, Thu, Fri, Week total]. Each cell shows the total servings (sum of all students counts, i.e. including doubles) recorded for that term/week/day; blank if none recorded. Week total column sums the row.
- **Term total card**: highlighted green card (background #EAF1EC, border #C6DBCF) showing large text "{N} breakfasts served" (Bitter serif, 32px, #21493F) and a line like "Across 6 of 10 weeks recorded this term."

### 6. Export screen (admin, PIN-gated)
- **Download card**: title "Download attendance", description "One worksheet per week, Week 1 to Week {N}, in roster order.", and a primary button "Download Excel (.xlsx)" (#B24A2C, 56px tall).
- **Excel format** (built with SheetJS, XLSX.writeFile):
  - One sheet per Term x Week combination, named e.g. "T1 W3" (up to 40 sheets for 4 terms x 10 weeks).
  - Each sheet: row 1 = merged title "Moil Primary School — Breakfast Club"; row 2 = merged "Term {t} | Week {w}"; row 3 blank; row 4 = header Student, Class, Mon, Tue, Wed, Thu, Fri; then one row per active student (in roster order) with the numeric serving count (or blank) in each day column; then a blank row; then a "Students present" footer row (headcount per day) and a "Total servings" footer row (sum per day).
  - A "Summary" sheet is added first in the workbook: columns Term / Week / Students present / Total servings, one row per term-week, with a "Term N total" subtotal row after each term’s weeks.
- **At-a-glance grid**: below the download card, a card with its own Term tabs and a 10-row (weeks) x 5-column (days) grid of small colored squares — filled #31665A if that term/week/day has any recorded attendance, otherwise empty (#F4EEE0) — so staff can see at a glance which days still need marking or have been recorded.

### 7. Settings screen (admin, PIN-gated)
- **Staff PIN card**: 4-digit numeric input + "Save PIN" button (#31665A); shows "PIN updated." confirmation for 2 seconds after saving. This changes the PIN required for the modal below.
- **Session card**: explanation text ("Admin screens stay unlocked until you lock them or close the tab.") + "Lock admin screens now" button, which re-locks and returns to the Mark screen.

### 8. PIN modal (overlay, appears when an unauthenticated user taps Students/Export/Reports/Settings)
- **Layout**: fixed full-screen overlay, semi-transparent dark scrim (rgba(43,36,32,0.55)), centered white card (340px wide, 20px border-radius, 30px/34px padding, drop shadow).
- Title "Enter staff PIN", subtitle "to open {Students|Export|Reports|Settings}".
- 4 dot indicators (16px circles) that fill in green (#31665A) as digits are entered, or flash red (#B24A2C) plus a shake animation (0.4s) on an incorrect 4-digit entry, then clear.
- A numeric keypad (72x58px keys, 12px radius, 2px #E7DCC8 border) for 1-9 and 0, plus "Cancel" and a backspace key in the bottom corners.
- Default PIN is "2468" unless changed in Settings. On success: unlocks the admin session (stays unlocked until manually locked or the tab closes) and navigates to the screen that was tapped.

## Interactions & Behavior Summary
- App start: Splash -> tap button -> Mark screen.
- Mark screen never requires a PIN.
- Any admin nav tap while locked opens the PIN modal; on success, unlocks for the whole session (all four admin screens) and jumps straight to the tapped screen.
- Marking present is a tap-to-cycle counter (0-3), not a boolean checkbox — this was a deliberate change from an earlier "X" checkbox design, to support recording a student taking a second serving.
- "Mark everyone" only sets students who are currently at 0 to 1; it does not reduce anyone already marked higher.
- Search + Enter marks the first alphabetical, not-yet-present match and clears the search field (keyboard-first flow for a queue).
- Reordering in Students always operates on the full roster order, even when a class filter is applied.

## State Management (current prototype — replace with API-backed equivalents)
- students: array of { id, first, last, klass, active, order } — currently loaded once from a static students-data.js module; needs to become a real, persisted, multi-user-editable roster.
- attendance: object keyed by "term-week-day" (e.g. "2-4-Mon") -> object of { [studentId]: count } where count is 0 (absent, key omitted) to 3. Needs to become persisted attendance records keyed by (school, term, week, day, student) with an updated_at/updated_by for auditing.
- term (1-4), week (1-10), day (Mon-Fri): current selection, session-local — fine to keep as UI-only state.
- pinUnlocked / customPin: PIN check is done entirely client-side today by comparing digits to a stored string. This must move server-side — do not ship a client-side PIN comparison as real auth.
- Recommended additions for a real backend: created_at/updated_at/updated_by on attendance and roster edits; a schools or single-tenant config table if this is ever used beyond one school; soft-delete rather than hard-delete on students (matches the active/inactive toggle already in the design).

## Design Tokens
**Colors**
- Background (cream): #FCF8F2
- Ink/primary text: #2B241E
- Primary / terracotta (Mark week pill, primary buttons, add actions): #B24A2C
- Primary dark (term pill active, dark accents): #8A3520
- Accent / deep green (present state, day pill active, positive actions): #31665A
- Accent dark green (2+ servings, report total text): #21493F
- Muted text: #6B5F4C and #8A7A63
- Borders: #E7DCC8 (2px, standard card/input border), #F0E9DA (1px, row dividers)
- Chip/tag background: #F4EEE0
- Present-count chip: background #EAF1EC, border #C6DBCF
- Inactive toggle track: #D8CDB8
- White surfaces: #FFFFFF

**Typography**
- Headings/names: Bitter (serif), weights 600-700
- UI/body text: Public Sans, weights 400-700
- Both loaded from Google Fonts

**Radii**: 10px (pills/buttons), 12px (inputs/panels), 14-16px (cards, panels, list containers), 999px (tag pills), 50% (toggle circles/avatars)

**Touch targets**: minimum 44x44px on every interactive element per iPad guidelines; list rows are 72px tall.

## Assets
- assets/moil-logo.png — Moil Primary School crest ("MOIL — WE CARE — PRIMARY SCHOOL"), supplied directly by the school. Reuse this exact file; do not recreate or restyle it.

## Files
- Breakfast Attendance.dc.html — the full design/prototype (template + interaction logic in one file). This is the source of truth for layout, copy, states, and colors described above.
- students-data.js — the placeholder roster data module (150 generated Australian names across 8 classes) used only to populate the prototype; replace with real data from the school.
- assets/moil-logo.png — school logo asset.