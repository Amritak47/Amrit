import { useEffect, useState, useCallback } from 'react';
import { colors } from './tokens.js';
import { api, getToken, setToken } from './api.js';
import Splash from './components/Splash.jsx';
import Header from './components/Header.jsx';
import PinModal from './components/PinModal.jsx';
import MarkScreen from './screens/MarkScreen.jsx';
import StudentsScreen from './screens/StudentsScreen.jsx';
import ReportsScreen from './screens/ReportsScreen.jsx';
import ExportScreen from './screens/ExportScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';

export default function App() {
  const [appStarted, setAppStarted] = useState(false);
  const [screen, setScreen] = useState('mark');
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinTarget, setPinTarget] = useState(null);

  const [totalWeeks, setTotalWeeks] = useState(10);
  const [students, setStudents] = useState([]);
  const [term, setTerm] = useState(1);
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState('Mon');
  const [attendance, setAttendance] = useState({});

  const reloadStudents = useCallback(() => {
    api.getStudents().then(setStudents).catch(() => {});
  }, []);

  const reloadAttendance = useCallback(() => {
    api.getAttendance(term, week, day).then(setAttendance).catch(() => {});
  }, [term, week, day]);

  useEffect(() => {
    api.getConfig().then((c) => setTotalWeeks(c.totalWeeks)).catch(() => {});
    reloadStudents();
    if (getToken()) {
      api
        .me()
        .then((r) => setPinUnlocked(!!r.unlocked))
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reloadAttendance();
  }, [reloadAttendance]);

  const navigate = (target) => {
    if (target === 'mark' || pinUnlocked) {
      setScreen(target);
    } else {
      setPinTarget(target);
    }
  };

  const onPinSuccess = () => {
    setPinUnlocked(true);
    setScreen(pinTarget);
    setPinTarget(null);
  };

  const lock = async () => {
    try {
      await api.lock();
    } catch {
      // token already invalid/expired server-side; still clear locally
    }
    setToken(null);
    setPinUnlocked(false);
    setScreen('mark');
  };

  const onToggle = async (studentId) => {
    setAttendance((prev) => {
      const cur = prev[studentId] || 0;
      const next = cur >= 3 ? 0 : cur + 1;
      const copy = { ...prev };
      if (next === 0) delete copy[studentId];
      else copy[studentId] = next;
      return copy;
    });
    try {
      const result = await api.toggleAttendance(term, week, day, studentId);
      setAttendance((prev) => {
        const copy = { ...prev };
        if (result.count === 0) delete copy[studentId];
        else copy[studentId] = result.count;
        return copy;
      });
    } catch {
      reloadAttendance();
    }
  };

  const onMarkAll = async () => {
    try {
      const map = await api.markAll(term, week, day);
      setAttendance(map);
    } catch {
      reloadAttendance();
    }
  };

  const onSearchEnter = async (query) => {
    const { matched } = await api.searchMark(term, week, day, query);
    if (matched) {
      setAttendance((prev) => ({ ...prev, [matched.id]: 1 }));
    }
    return matched;
  };

  const withReload = (fn) => async (...args) => {
    await fn(...args);
    reloadStudents();
  };

  if (!appStarted) {
    return (
      <Shell>
        <Splash onOpen={() => setAppStarted(true)} />
      </Shell>
    );
  }

  return (
    <Shell>
      <Header screen={screen} onNavigate={navigate} pinUnlocked={pinUnlocked} onLock={lock} />

      {screen === 'mark' && (
        <MarkScreen
          students={students}
          attendance={attendance}
          term={term}
          week={week}
          day={day}
          totalWeeks={totalWeeks}
          onTermChange={setTerm}
          onWeekChange={setWeek}
          onDayChange={setDay}
          onToggle={onToggle}
          onMarkAll={onMarkAll}
          onSearchEnter={onSearchEnter}
        />
      )}

      {screen === 'students' && (
        <StudentsScreen
          students={students}
          onAddStudent={withReload((s) => api.addStudent(s))}
          onBulkAdd={withReload((entries) => api.bulkAddStudents(entries))}
          onEdit={withReload((id, patch) => api.editStudent(id, patch))}
          onDelete={withReload((id) => api.deleteStudent(id))}
          onToggleActive={withReload((id) => api.toggleActive(id))}
          onMove={withReload((id, dir) => api.moveStudent(id, dir))}
        />
      )}

      {screen === 'reports' && <ReportsScreen defaultTerm={term} />}
      {screen === 'export' && <ExportScreen defaultTerm={term} />}
      {screen === 'settings' && <SettingsScreen onLock={lock} />}

      {pinTarget && (
        <PinModal
          target={pinTarget}
          onCancel={() => setPinTarget(null)}
          onSuccess={onPinSuccess}
        />
      )}
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: colors.background,
        color: colors.ink,
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  );
}
