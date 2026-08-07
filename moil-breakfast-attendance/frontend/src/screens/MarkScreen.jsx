import { useMemo, useState } from 'react';
import { colors, pillBase, pillActive } from '../tokens.js';
import { DAYS } from '../tokens.js';

const termPillActive = { ...pillActive, background: colors.primaryDark, border: `2px solid ${colors.primaryDark}` };
const dayPillActive = { ...pillActive, background: colors.accent, border: `2px solid ${colors.accent}` };

export default function MarkScreen({ students, attendance, term, week, day, totalWeeks, onTermChange, onWeekChange, onDayChange, onToggle, onMarkAll, onSearchEnter }) {
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);

  const activeStudents = useMemo(() => students.filter((s) => s.active), [students]);
  const presentCount = activeStudents.filter((s) => (attendance[s.id] || 0) > 0).length;
  const servesTotal = activeStudents.reduce((sum, s) => sum + (attendance[s.id] || 0), 0);
  const totalActive = activeStudents.length;

  const q = search.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      activeStudents
        .filter((s) => !q || `${s.first} ${s.last}`.toLowerCase().includes(q))
        .sort((a, b) => a.first.localeCompare(b.first)),
    [activeStudents, q]
  );

  const countText =
    servesTotal > presentCount
      ? `${presentCount} of ${totalActive} present · ${servesTotal} servings`
      : `${presentCount} of ${totalActive} marked present`;

  const handleSearchKeyDown = async (e) => {
    if (e.key !== 'Enter') return;
    const query = search.trim();
    if (!query || busy) return;
    setBusy(true);
    try {
      const matched = await onSearchEnter(query);
      if (matched) setSearch('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '18px 24px 0' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <Label>Term</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[1, 2, 3, 4].map((t) => (
              <button key={t} onClick={() => onTermChange(t)} style={term === t ? termPillActive : pillBase}>
                Term {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label>Week</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 560 }}>
            {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((w) => (
              <button key={w} onClick={() => onWeekChange(w)} style={week === w ? pillActive : pillBase}>
                W{w}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label>Day</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {DAYS.map((d) => (
              <button key={d} onClick={() => onDayChange(d)} style={day === d ? dayPillActive : pillBase}>
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Type a name and press Enter to mark present"
          style={{
            flex: 1,
            minWidth: 240,
            height: 52,
            borderRadius: 12,
            border: `2px solid ${colors.border}`,
            background: colors.white,
            padding: '0 16px',
            fontSize: 17,
            color: colors.ink,
            textOverflow: 'ellipsis'
          }}
        />
        <div
          style={{
            height: 52,
            display: 'flex',
            alignItems: 'center',
            padding: '0 18px',
            borderRadius: 12,
            background: colors.presentChipBg,
            border: `2px solid ${colors.presentChipBorder}`,
            fontWeight: 700,
            fontSize: 16,
            color: colors.accentDark,
            whiteSpace: 'nowrap'
          }}
        >
          {countText}
        </div>
        <button
          onClick={onMarkAll}
          style={{
            height: 52,
            padding: '0 18px',
            borderRadius: 12,
            border: 'none',
            background: colors.accent,
            color: colors.white,
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          Mark everyone
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          border: `2px solid ${colors.border}`,
          borderRadius: 16,
          background: colors.white,
          marginBottom: 18
        }}
      >
        {filtered.map((st) => {
          const count = attendance[st.id] || 0;
          const present = count > 0;
          const circleColor = count > 1 ? colors.accentDark : colors.accent;
          return (
            <div
              key={st.id}
              onClick={() => onToggle(st.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                minHeight: 72,
                padding: '12px 20px',
                borderBottom: `1px solid ${colors.borderLight}`,
                cursor: 'pointer',
                background: present ? colors.presentChipBg : colors.white,
                borderLeft: present ? `6px solid ${circleColor}` : '6px solid transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "'Bitter', serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: colors.ink,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {st.first} {st.last}
                </span>
                {st.klass && (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: colors.mutedText2,
                      background: colors.chipBg,
                      borderRadius: 999,
                      padding: '4px 10px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {st.klass}
                  </span>
                )}
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: present ? circleColor : colors.white,
                  border: present ? `3px solid ${circleColor}` : `3px solid ${colors.toggleTrackOff}`
                }}
              >
                <span style={{ color: present ? colors.white : 'transparent', fontSize: 19, fontWeight: 700, lineHeight: 1 }}>
                  {present ? count : ''}
                </span>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: colors.mutedText2, fontSize: 16 }}>
            {q ? `No active students match "${search}"` : 'No active students on the roster yet.'}
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        color: colors.mutedText2,
        marginBottom: 6
      }}
    >
      {children}
    </div>
  );
}
