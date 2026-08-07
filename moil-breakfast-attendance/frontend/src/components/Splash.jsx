import { colors } from '../tokens.js';

export default function Splash({ onOpen }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
        padding: 24,
        textAlign: 'center'
      }}
    >
      <img src="/assets/moil-logo.png" alt="Moil Primary School logo" style={{ width: 140, height: 140, objectFit: 'contain' }} />
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: colors.mutedText2,
            marginBottom: 8
          }}
        >
          Moil Primary School
        </div>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 40, fontWeight: 700, color: colors.ink }}>Breakfast Club</div>
        <div style={{ fontSize: 17, color: colors.mutedText, marginTop: 8 }}>Daily attendance sign-in</div>
      </div>
      <button
        onClick={onOpen}
        style={{
          height: 64,
          padding: '0 40px',
          borderRadius: 14,
          border: 'none',
          background: colors.primary,
          color: colors.white,
          fontWeight: 700,
          fontSize: 19,
          cursor: 'pointer',
          marginTop: 10
        }}
      >
        Open sign-in sheet
      </button>
    </div>
  );
}
