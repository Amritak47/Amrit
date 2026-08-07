import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { colors, pillBase, pillActive, DAYS } from '../tokens.js';
import { api } from '../api.js';

const tabActive = { ...pillActive, height: 36, fontSize: 13, padding: '0 14px', background: colors.primaryDark, border: `2px solid ${colors.primaryDark}` };
const tabBase = { ...pillBase, height: 36, fontSize: 13, padding: '0 14px' };

// One sheet per term, weeks laid out side by side (Student's Name column, then
// a Mon-Fri block per week, then a TOTALS row) — matching the school's existing
// Foodbank/DSBP attendance log format, rather than a sheet per term-week.
function buildTermSheet(t, full) {
  const { students, attendance, totalWeeks } = full;
  const activeStudents = [...students].sort((a, b) => a.order - b.order);
  const totalCols = 1 + totalWeeks * 5;

  const titleRow = new Array(totalCols).fill('');
  titleRow[0] = 'Moil Primary School — Breakfast Club';
  const subtitleRow = new Array(totalCols).fill('');
  subtitleRow[0] = `Foodbank Attendance Log — Term ${t}`;

  const weekHeaderRow = new Array(totalCols).fill('');
  weekHeaderRow[0] = "Student's Name";
  const dayHeaderRow = new Array(totalCols).fill('');

  for (let w = 1; w <= totalWeeks; w += 1) {
    const startCol = 1 + (w - 1) * 5;
    weekHeaderRow[startCol] = `W${w}`;
    DAYS.forEach((d, di) => {
      dayHeaderRow[startCol + di] = d;
    });
  }

  const rows = [titleRow, subtitleRow, weekHeaderRow, dayHeaderRow];
  const dayTotals = new Array(totalWeeks * 5).fill(0);

  activeStudents.forEach((st) => {
    const row = new Array(totalCols).fill('');
    row[0] = `${st.first} ${st.last}`.trim();
    for (let w = 1; w <= totalWeeks; w += 1) {
      const startCol = 1 + (w - 1) * 5;
      DAYS.forEach((d, di) => {
        const c = (attendance[`${t}-${w}-${d}`] || {})[st.id] || 0;
        row[startCol + di] = c > 0 ? c : '';
        dayTotals[(w - 1) * 5 + di] += c;
      });
    }
    rows.push(row);
  });

  const totalsRow = new Array(totalCols).fill('');
  totalsRow[0] = 'TOTALS';
  dayTotals.forEach((v, i) => {
    totalsRow[1 + i] = v;
  });
  rows.push(totalsRow);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 22 }, ...new Array(totalWeeks * 5).fill({ wch: 5 })];
  const merges = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: totalCols - 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: totalCols - 1 } },
    { s: { r: 2, c: 0 }, e: { r: 3, c: 0 } }
  ];
  for (let w = 1; w <= totalWeeks; w += 1) {
    const startCol = 1 + (w - 1) * 5;
    merges.push({ s: { r: 2, c: startCol }, e: { r: 2, c: startCol + 4 } });
  }
  ws['!merges'] = merges;
  return ws;
}

function buildWorkbook(full) {
  const wb = XLSX.utils.book_new();
  for (let t = 1; t <= 4; t += 1) {
    XLSX.utils.book_append_sheet(wb, buildTermSheet(t, full), `Term ${t}`);
  }
  return wb;
}

export default function ExportScreen({ defaultTerm }) {
  const [full, setFull] = useState(null);
  const [gridTerm, setGridTerm] = useState(defaultTerm || 1);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    api.getExportFull().then(setFull).catch((e) => setError(e.message));
  }, []);

  const totalWeeks = full?.totalWeeks ?? 10;

  const download = async () => {
    setDownloading(true);
    try {
      const data = full || (await api.getExportFull());
      const wb = buildWorkbook(data);
      XLSX.writeFile(wb, 'Moil-Breakfast-Attendance.xlsx');
    } catch (e) {
      setError(e.message);
    } finally {
      setDownloading(false);
    }
  };

  const gridRows = [];
  for (let w = 1; w <= totalWeeks; w += 1) {
    gridRows.push({
      label: `W${w}`,
      cells: DAYS.map((d) => {
        const recorded = full ? Object.keys(full.attendance[`${gridTerm}-${w}-${d}`] || {}).length > 0 : false;
        return recorded;
      })
    });
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '24px 24px 24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          background: colors.white,
          border: `2px solid ${colors.border}`,
          borderRadius: 16,
          padding: '22px 26px',
          marginBottom: 20
        }}
      >
        <div>
          <div style={{ fontFamily: "'Bitter', serif", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Download attendance</div>
          <div style={{ color: colors.mutedText, fontSize: 15 }}>
            One worksheet per term (Week 1 to Week {totalWeeks} side by side), in roster order, with a TOTALS row.
          </div>
        </div>
        <button
          onClick={download}
          disabled={downloading}
          style={{
            height: 56,
            padding: '0 26px',
            borderRadius: 12,
            border: 'none',
            background: colors.primary,
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            cursor: downloading ? 'default' : 'pointer',
            whiteSpace: 'nowrap',
            opacity: downloading ? 0.7 : 1
          }}
        >
          {downloading ? 'Preparing…' : 'Download Excel (.xlsx)'}
        </button>
      </div>

      {error && <div style={{ color: colors.primary, marginBottom: 12 }}>{error}</div>}

      <div style={{ background: colors.white, border: `2px solid ${colors.border}`, borderRadius: 16, padding: '22px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
          <div style={{ fontFamily: "'Bitter', serif", fontSize: 18, fontWeight: 700 }}>Where's the data?</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3, 4].map((t) => (
              <button key={t} onClick={() => setGridTerm(t)} style={gridTerm === t ? tabActive : tabBase}>
                Term {t}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '56px repeat(5, 1fr)', gap: 6, maxWidth: 460 }}>
          <div></div>
          {DAYS.map((d) => (
            <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: colors.mutedText2 }}>
              {d}
            </div>
          ))}
          {gridRows.map((wk) => (
            <div key={wk.label} style={{ display: 'contents' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.mutedText2, display: 'flex', alignItems: 'center' }}>{wk.label}</div>
              {wk.cells.map((recorded, i) => (
                <div
                  key={i}
                  style={{ height: 26, borderRadius: 5, background: recorded ? colors.accent : colors.chipBg, border: `1px solid ${colors.border}` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
