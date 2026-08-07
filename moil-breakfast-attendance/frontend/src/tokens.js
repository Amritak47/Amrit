// Design tokens ported verbatim from the design handoff (Breakfast Attendance.dc.html).
export const colors = {
  background: '#FCF8F2',
  ink: '#2B241E',
  primary: '#B24A2C',
  primaryDark: '#8A3520',
  accent: '#31665A',
  accentDark: '#21493F',
  mutedText: '#6B5F4C',
  mutedText2: '#8A7A63',
  border: '#E7DCC8',
  borderLight: '#F0E9DA',
  chipBg: '#F4EEE0',
  presentChipBg: '#EAF1EC',
  presentChipBorder: '#C6DBCF',
  toggleTrackOff: '#D8CDB8',
  white: '#FFFFFF'
};

export const CLASSES = ['Transition', 'Preschool', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'];
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const pillBase = {
  height: '40px',
  padding: '0 16px',
  borderRadius: '10px',
  fontSize: '15px',
  fontWeight: '700',
  cursor: 'pointer',
  border: `2px solid ${colors.border}`,
  background: colors.white,
  color: colors.mutedText
};

export const pillActive = { ...pillBase, background: colors.primary, border: `2px solid ${colors.primary}`, color: colors.white };

export const navBase = {
  height: '44px',
  padding: '0 16px',
  borderRadius: '10px',
  border: '2px solid transparent',
  background: 'transparent',
  color: colors.mutedText,
  fontWeight: '700',
  fontSize: '15px',
  cursor: 'pointer'
};

export const navActive = { ...navBase, background: colors.chipBg, color: colors.primary, border: `2px solid ${colors.border}` };
