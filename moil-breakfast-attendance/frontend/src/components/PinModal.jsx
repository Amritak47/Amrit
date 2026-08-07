import { useState } from 'react';
import { colors } from '../tokens.js';
import { api, setToken } from '../api.js';

const TARGET_LABELS = { students: 'Students', export: 'Export', settings: 'Settings', reports: 'Reports' };

const keyStyle = {
  width: 72,
  height: 58,
  borderRadius: 12,
  border: `2px solid ${colors.border}`,
  background: colors.white,
  fontSize: 22,
  fontWeight: 700,
  color: colors.ink,
  cursor: 'pointer'
};
const keyGhostStyle = { ...keyStyle, fontSize: 13, color: colors.mutedText2, fontWeight: 700 };

export default function PinModal({ target, onCancel, onSuccess }) {
  const [digits, setDigits] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const submit = async (nextDigits) => {
    setChecking(true);
    try {
      const { token } = await api.pinLogin(nextDigits);
      setToken(token);
      setChecking(false);
      onSuccess();
    } catch {
      setChecking(false);
      setError(true);
      setTimeout(() => {
        setDigits('');
        setError(false);
      }, 550);
    }
  };

  const pressDigit = (d) => {
    if (checking || digits.length >= 4) return;
    const next = digits + d;
    if (next.length < 4) {
      setDigits(next);
      setError(false);
      return;
    }
    setDigits(next);
    submit(next);
  };

  const backspace = () => setDigits((d) => d.slice(0, -1));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(43,36,32,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50
      }}
    >
      <div
        style={{
          background: colors.white,
          borderRadius: 20,
          padding: '30px 34px',
          width: 340,
          animation: error ? 'pinShake 0.4s ease' : 'none',
          boxShadow: '0 20px 60px rgba(43,36,32,0.3)'
        }}
      >
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 19, fontWeight: 700, textAlign: 'center', marginBottom: 4 }}>
          Enter staff PIN
        </div>
        <div style={{ textAlign: 'center', color: colors.mutedText2, fontSize: 14, marginBottom: 18 }}>
          to open {TARGET_LABELS[target] || ''}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 22 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: i < digits.length ? (error ? colors.primary : colors.accent) : colors.border
              }}
            />
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 72px)', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
            <button key={d} onClick={() => pressDigit(d)} style={keyStyle}>
              {d}
            </button>
          ))}
          <button onClick={onCancel} style={keyGhostStyle}>
            Cancel
          </button>
          <button onClick={() => pressDigit('0')} style={keyStyle}>
            0
          </button>
          <button onClick={backspace} style={keyGhostStyle}>
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}
