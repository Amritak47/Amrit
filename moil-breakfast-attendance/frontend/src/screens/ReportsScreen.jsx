import { useEffect, useState } from 'react';
import { colors, pillBase, pillActive, DAYS } from '../tokens.js';
import { api } from '../api.js';

const tabActive = { ...pillActive, height: 36, fontSize: 13, padding: '0 14px', background: colors.primaryDark, border: `2px solid ${colors.primaryDark}` };
const tabBase = { ...pillBase, height: 36, fontSize: 13, padding: '0 14px' };

export default function ReportsScreen({ defaultTerm }) {
  const [term, setTerm] = useState(defaultTerm || 1);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getReports(term)
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [term]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 22, fontWeight: 700 }}>Attendance report</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2, 3, 4].map((t) => (
            <button key={t} onClick={() => setTerm(t)} style={term === t ? tabActive : tabBase}>
              Term {t}
            </button>
          ))}
        </div>
      </div>

      {error && <div style={{ color: colors.primary, marginBottom: 12 }}>{error}</div>}

      <div style={{ background: colors.white, border: `2px solid ${colors.border}`, borderRadius: 16, padding: '20px 24px', marginBottom: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '64px repeat(5, 1fr) 90px', gap: 4, alignItems: 'center' }}>
          <div></div>
          {DAYS.map((d) => (
            <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: colors.mutedText2 }}>
              {d}
            </div>
          ))}
          <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: colors.mutedText2 }}>Week total</div>
          {(data?.rows || []).map((row) => (
            <RowCells key={row.week} row={row} />
          ))}
        </div>
      </div>

      <div style={{ background: colors.presentChipBg, border: `2px solid ${colors.presentChipBorder}`, borderRadius: 16, padding: '22px 26px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: colors.accentDark, marginBottom: 6 }}>
          Term total
        </div>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 32, fontWeight: 700, color: colors.accentDark }}>
          {data?.termTotal ?? 0} breakfasts served
        </div>
        <div style={{ color: '#3D6B5F', fontSize: 14, marginTop: 4 }}>
          Across {data?.weeksWithData ?? 0} of {data?.totalWeeks ?? 10} weeks recorded this term.
        </div>
      </div>
    </div>
  );
}

function RowCells({ row }) {
  return (
    <>
      <div style={{ fontSize: 13, fontWeight: 700, color: colors.mutedText2, padding: '8px 0' }}>{row.label}</div>
      {row.cells.map((v, i) => (
        <div key={i} style={{ textAlign: 'center', fontSize: 15, color: colors.ink, padding: '8px 0', borderTop: `1px solid ${colors.borderLight}` }}>
          {v || ''}
        </div>
      ))}
      <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, color: colors.ink, padding: '8px 0', borderTop: `1px solid ${colors.borderLight}` }}>
        {row.total || ''}
      </div>
    </>
  );
}
