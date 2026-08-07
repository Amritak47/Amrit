import { colors, navBase, navActive } from '../tokens.js';

const NAV_ITEMS = [
  { key: 'mark', label: 'Mark' },
  { key: 'students', label: 'Students' },
  { key: 'reports', label: 'Reports' },
  { key: 'export', label: 'Export' },
  { key: 'settings', label: 'Settings' }
];

export default function Header({ screen, onNavigate, pinUnlocked, onLock }) {
  return (
    <div
      style={{
        minHeight: 72,
        flexShrink: 0,
        background: colors.white,
        borderBottom: `2px solid ${colors.border}`,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 24px',
        gap: '8px 16px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <img
          src="/assets/moil-logo.png"
          alt="Moil Primary School logo"
          style={{ width: 46, height: 46, borderRadius: '50%', flexShrink: 0, objectFit: 'contain' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, minWidth: 0 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: colors.mutedText2,
              whiteSpace: 'nowrap'
            }}
          >
            Moil Primary School
          </span>
          <span style={{ fontFamily: "'Bitter', serif", fontSize: 21, fontWeight: 700, color: colors.ink, whiteSpace: 'nowrap' }}>
            Breakfast Club
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {NAV_ITEMS.map((nav) => (
          <button key={nav.key} onClick={() => onNavigate(nav.key)} style={screen === nav.key ? navActive : navBase}>
            {nav.label}
          </button>
        ))}
        {pinUnlocked && (
          <button
            onClick={onLock}
            title="Lock admin screens"
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: `2px solid ${colors.border}`,
              background: colors.white,
              color: colors.mutedText2,
              fontSize: 16,
              cursor: 'pointer',
              marginLeft: 4
            }}
          >
            🔒
          </button>
        )}
      </div>
    </div>
  );
}
