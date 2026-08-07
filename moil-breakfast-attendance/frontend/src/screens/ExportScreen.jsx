import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { colors, pillBase, pillActive, DAYS } from '../tokens.js';
import { api } from '../api.js';

const tabActive = { ...pillActive, height: 36, fontSize: 13, padding: '0 14px', background: colors.primaryDark, border: `2px solid ${colors.primaryDark}` };
const tabBase = { ...pillBase, height: 36, fontSize: 13, padding: '0 14px' };

function buildWorkbook(full) {
  const { students, attendance, totalWeeks } = full;
  const activeStudents = [...students].sort((a, b) => a.order - b.order);
  const wb = XLSX.utils.book_new();
  const cols = [{ wch: 24 }, { wch: 12 }, { wch: 6 }, { wch: 6 }, { wch: 6 }, { wch: 6 }, { wch: 6 }];
  const summaryRows = [['Moil Primary School — Breakfast Club: Term Summary'], [''], ['Term', 'Week', 'Students present', 'Total servings']];

  for (let t = 1; t <= 4; t += 1) {
    let termServes = 0;
    let termPresent = 0;
    for (let w = 1; w <= totalWeeks; w += 1) {
      const rows = [
        ['Moil Primary School — Breakfast Club', '', '', '', '', '', ''],
        [`Term ${t}  |  Week ${w}`, '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['Student', 'Class', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      ];
      const dayPresent = [0, 0, 0, 0, 0];
      const dayServes = [0, 0, 0, 0, 0];
      activeStudents.forEach((st) => {
        const row = [`${st.first} ${st.last}`.trim(), st.klass];
        DAYS.forEach((d, di) => {
          const c = (attendance[`${t}-${w}-${d}`] || {})[st.id] || 0;
          row.push(c > 0 ? c : '');
          if (c > 0) {
            dayPresent[di] += 1;
            dayServes[di] += c;
          }
        });
        rows.push(row);
      });
      rows.push(['', '', '', '', '', '', '']);
      rows.push(['', 'Students present', ...dayPresent]);
      rows.push(['', 'Total servings', ...dayServes]);
      const ws = XLSX.utils.aoa_to_sheet(rows);
      ws['!cols'] = cols;
      ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } }
      ];
      XLSX.utils.book_append_sheet(wb, ws, `T${t} W${w}`);
      const weekServes = dayServes.reduce((a, b) => a + b, 0);
      const weekPresent = dayPresent.reduce((a, b) => a + b, 0);
      termServes += weekServes;
      termPresent += weekPresent;
      summaryRows.push([`Term ${t}`, `Week ${w}`, weekPresent, weekServes]);
    }
    summaryRows.push([`Term ${t} total`, '', termPresent, termServes]);
    summaryRows.push(['', '', '', '']);
  }
  const summaryWs = XLSX.utils.aoa_to_sheet(summaryRows);
  summaryWs['!cols'] = [{ wch: 14 }, { wch: 10 }, { wch: 16 }, { wch: 14 }];
  summaryWs['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
  XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
  wb.SheetNames.unshift(wb.SheetNames.pop());
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
          <div style={{ color: colors.mutedText, fontSize: 15 }}>One worksheet per week, Week 1 to Week {totalWeeks}, in roster order.</div>
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
