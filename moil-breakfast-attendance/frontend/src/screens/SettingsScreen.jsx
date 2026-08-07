import { useState } from 'react';
import { colors } from '../tokens.js';
import { api } from '../api.js';

export default function SettingsScreen({ onLock }) {
  const [pin, setPin] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const savePin = async () => {
    setError(null);
    if (pin.length !== 4) return;
    try {
      await api.savePin(pin);
      setPin('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
      <div style={{ background: colors.white, border: `2px solid ${colors.border}`, borderRadius: 16, padding: '22px 26px', maxWidth: 480, marginBottom: 18 }}>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Staff PIN</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            maxLength={4}
            placeholder="4 digits"
            style={{
              height: 48,
              width: 140,
              borderRadius: 10,
              border: `2px solid ${colors.border}`,
              padding: '0 14px',
              fontSize: 18,
              letterSpacing: '0.2em'
            }}
          />
          <button
            onClick={savePin}
            style={{ height: 48, padding: '0 20px', borderRadius: 10, border: 'none', background: colors.accent, color: '#fff', fontWeight: 700, cursor: 'pointer' }}
          >
            Save PIN
          </button>
        </div>
        {saved && <div style={{ color: colors.accent, fontSize: 14, marginTop: 8, fontWeight: 600 }}>PIN updated.</div>}
        {error && <div style={{ color: colors.primary, fontSize: 14, marginTop: 8, fontWeight: 600 }}>{error}</div>}
      </div>
      <div style={{ background: colors.white, border: `2px solid ${colors.border}`, borderRadius: 16, padding: '22px 26px', maxWidth: 480 }}>
        <div style={{ fontFamily: "'Bitter', serif", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Session</div>
        <div style={{ color: colors.mutedText, fontSize: 15, marginBottom: 14 }}>Admin screens stay unlocked until you lock them or close the tab.</div>
        <button
          onClick={onLock}
          style={{ height: 48, padding: '0 20px', borderRadius: 10, border: `2px solid ${colors.border}`, background: '#fff', color: colors.mutedText, fontWeight: 700, cursor: 'pointer' }}
        >
          Lock admin screens now
        </button>
      </div>
    </div>
  );
}
