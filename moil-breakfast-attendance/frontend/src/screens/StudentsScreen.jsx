import { useMemo, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { colors, pillBase, pillActive, CLASSES } from '../tokens.js';

const NO_CLASS = '';
const NO_CLASS_FILTER = 'No class';

function parseLine(line, defaultClass) {
  const parts0 = line.split(/,| - /);
  let name = line;
  let klass = defaultClass;
  if (parts0.length >= 2) {
    name = parts0[0].trim();
    klass = parts0[1].trim();
  }
  const parts = name.trim().split(' ');
  const first = parts[0] || name;
  const last = parts.slice(1).join(' ');
  return { first, last, klass: klass || defaultClass };
}

export default function StudentsScreen({ students, onAddStudent, onBulkAdd, onEdit, onToggleActive, onMove }) {
  const [addOpen, setAddOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [addFirst, setAddFirst] = useState('');
  const [addLast, setAddLast] = useState('');
  const [addClass, setAddClass] = useState(NO_CLASS);
  const [bulkText, setBulkText] = useState('');
  const [bulkClass, setBulkClass] = useState(NO_CLASS);
  const [classFilter, setClassFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editFirst, setEditFirst] = useState('');
  const [editLast, setEditLast] = useState('');
  const [editClass, setEditClass] = useState('');
  const fileInputRef = useRef(null);

  const totalStudents = students.length;
  const totalActive = students.filter((s) => s.active).length;

  const fullSorted = useMemo(() => [...students].sort((a, b) => a.order - b.order), [students]);
  const filteredSorted = useMemo(() => {
    if (classFilter === 'All') return fullSorted;
    if (classFilter === NO_CLASS_FILTER) return fullSorted.filter((s) => !s.klass);
    return fullSorted.filter((s) => s.klass === classFilter);
  }, [fullSorted, classFilter]);

  const bulkPreviewCount = bulkText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean).length;

  const submitAdd = () => {
    if (!addFirst.trim()) return;
    onAddStudent({ first: addFirst.trim(), last: addLast.trim(), klass: addClass });
    setAddFirst('');
    setAddLast('');
  };

  const submitBulk = () => {
    const lines = bulkText.split('\n').map((l) => l.trim()).filter(Boolean);
    const entries = lines.map((line) => parseLine(line, bulkClass));
    if (entries.length === 0) return;
    onBulkAdd(entries);
    setBulkText('');
    setBulkOpen(false);
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = new Uint8Array(ev.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }).filter((r) => r && r.length && String(r[0]).trim());
      const defaultClass = NO_CLASS;
      const entries = [];
      rows.forEach((row) => {
        const c0 = String(row[0]).trim();
        if (/^(name|first ?name|student)$/i.test(c0)) return;
        let first, last, klass;
        if (row.length >= 3 && row[1]) {
          first = c0;
          last = String(row[1]).trim();
          klass = String(row[2] || defaultClass).trim();
        } else if (row.length === 2) {
          const parts = c0.split(' ');
          first = parts[0];
          last = parts.slice(1).join(' ');
          klass = String(row[1] || defaultClass).trim();
        } else {
          const parts = c0.split(' ');
          first = parts[0];
          last = parts.slice(1).join(' ');
          klass = defaultClass;
        }
        entries.push({ first, last, klass });
      });
      if (entries.length) onBulkAdd(entries);
    };
    reader.readAsArrayBuffer(file);
    e.target.value = '';
  };

  const startEdit = (st) => {
    setEditingId(st.id);
    setEditFirst(st.first);
    setEditLast(st.last);
    setEditClass(st.klass);
  };
  const saveEdit = () => {
    onEdit(editingId, { first: editFirst.trim() || undefined, last: editLast.trim(), klass: editClass });
    setEditingId(null);
  };

  const pillH44 = (active) => (active ? { ...pillActive, height: 44 } : { ...pillBase, height: 44 });
  const chipStyle = (active) =>
    active ? { ...pillActive, height: 36, fontSize: 13, padding: '0 14px' } : { ...pillBase, height: 36, fontSize: 13, padding: '0 14px' };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '18px 24px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
        <div style={{ fontSize: 15, color: colors.mutedText }}>
          {totalStudents} students on the roster · {totalActive} active
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setAddOpen((v) => !v);
              setBulkOpen(false);
            }}
            style={pillH44(addOpen)}
          >
            + Add student
          </button>
          <button
            onClick={() => {
              setBulkOpen((v) => !v);
              setAddOpen(false);
            }}
            style={pillH44(bulkOpen)}
          >
            Paste a list
          </button>
          <button onClick={() => fileInputRef.current?.click()} style={pillH44(false)}>
            Import from Excel
          </button>
          <input type="file" ref={fileInputRef} onChange={handleImportFile} accept=".xlsx,.xls" style={{ display: 'none' }} />
        </div>
      </div>

      {addOpen && (
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            alignItems: 'center',
            background: colors.chipBg,
            borderRadius: 12,
            padding: 14,
            marginBottom: 12
          }}
        >
          <input
            value={addFirst}
            onChange={(e) => setAddFirst(e.target.value)}
            placeholder="First name"
            style={inputStyle({ flex: 1, minWidth: 140, height: 48 })}
          />
          <input
            value={addLast}
            onChange={(e) => setAddLast(e.target.value)}
            placeholder="Last name"
            style={inputStyle({ flex: 1, minWidth: 140, height: 48 })}
          />
          <select value={addClass} onChange={(e) => setAddClass(e.target.value)} style={selectStyle({ height: 48 })}>
            <option value="">No class</option>
            {CLASSES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <button onClick={submitAdd} style={primaryBtn}>
            Add
          </button>
        </div>
      )}

      {bulkOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: colors.chipBg, borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <textarea
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder="One student per line, e.g. Jack Nguyen, Year 3"
            rows={4}
            style={{
              width: '100%',
              borderRadius: 10,
              border: `2px solid ${colors.border}`,
              padding: '10px 14px',
              fontSize: 15,
              resize: 'vertical'
            }}
          />
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: colors.mutedText }}>Default class for lines without one:</span>
            <select value={bulkClass} onChange={(e) => setBulkClass(e.target.value)} style={selectStyle({ height: 44 })}>
              <option value="">No class</option>
              {CLASSES.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button onClick={submitBulk} style={{ ...primaryBtn, height: 44, marginLeft: 'auto' }}>
              Add {bulkPreviewCount} students
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {['All', NO_CLASS_FILTER, ...CLASSES].map((c) => (
          <button key={c} onClick={() => setClassFilter(c)} style={chipStyle(classFilter === c)}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', border: `2px solid ${colors.border}`, borderRadius: 16, background: colors.white, marginBottom: 18 }}>
        {filteredSorted.map((st) => {
          const idxFull = fullSorted.findIndex((x) => x.id === st.id);
          const isEditing = editingId === st.id;
          const upDisabled = idxFull === 0;
          const downDisabled = idxFull === fullSorted.length - 1;
          return (
            <div
              key={st.id}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px', borderBottom: `1px solid ${colors.borderLight}` }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <button
                  onClick={() => !upDisabled && onMove(st.id, 'up')}
                  disabled={upDisabled}
                  style={arrowBtnStyle(upDisabled)}
                >
                  ▲
                </button>
                <button
                  onClick={() => !downDisabled && onMove(st.id, 'down')}
                  disabled={downDisabled}
                  style={arrowBtnStyle(downDisabled)}
                >
                  ▼
                </button>
              </div>
              <div style={{ width: 30, textAlign: 'center', fontSize: 13, color: '#A79A82', fontWeight: 600 }}>{idxFull + 1}</div>

              {isEditing ? (
                <div style={{ display: 'flex', gap: 8, flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                  <input value={editFirst} onChange={(e) => setEditFirst(e.target.value)} style={inputStyle({ flex: 1, minWidth: 120, height: 46 })} />
                  <input value={editLast} onChange={(e) => setEditLast(e.target.value)} style={inputStyle({ flex: 1, minWidth: 120, height: 46 })} />
                  <select value={editClass} onChange={(e) => setEditClass(e.target.value)} style={selectStyle({ height: 46, fontSize: 14 })}>
                    <option value="">No class</option>
                    {CLASSES.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <button onClick={saveEdit} style={{ height: 46, padding: '0 16px', borderRadius: 10, border: 'none', background: colors.accent, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{ height: 46, padding: '0 14px', borderRadius: 10, border: `2px solid ${colors.border}`, background: '#fff', color: colors.mutedText, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => startEdit(st)}>
                  <span
                    style={{
                      fontFamily: "'Bitter', serif",
                      fontSize: 18,
                      fontWeight: 600,
                      color: colors.ink,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {st.first} {st.last}
                  </span>
                  <span
                    style={
                      st.klass
                        ? { fontSize: 12, fontWeight: 600, color: colors.mutedText2, background: colors.chipBg, borderRadius: 999, padding: '4px 10px', whiteSpace: 'nowrap' }
                        : { fontSize: 12, fontWeight: 600, color: '#A79A82', background: 'transparent', border: `1px dashed ${colors.border}`, borderRadius: 999, padding: '3px 10px', whiteSpace: 'nowrap' }
                    }
                  >
                    {st.klass || 'No class'}
                  </span>
                </div>
              )}

              <div
                onClick={() => onToggleActive(st.id)}
                style={{ width: 52, height: 30, borderRadius: 15, background: st.active ? colors.accent : colors.toggleTrackOff, position: 'relative', cursor: 'pointer', flexShrink: 0 }}
              >
                <div style={{ position: 'absolute', top: 3, left: st.active ? 25 : 3, width: 24, height: 24, borderRadius: '50%', background: colors.white }} />
              </div>
              <div style={{ width: 64, fontSize: 12, fontWeight: 700, color: colors.mutedText2, textAlign: 'right' }}>
                {st.active ? 'Active' : 'Inactive'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const primaryBtn = { height: 48, padding: '0 20px', borderRadius: 10, border: 'none', background: colors.primary, color: colors.white, fontWeight: 700, cursor: 'pointer' };

function inputStyle({ flex, minWidth, height }) {
  return { height, flex, minWidth, borderRadius: 10, border: `2px solid ${colors.border}`, padding: '0 14px', fontSize: 16 };
}
function selectStyle({ height, fontSize = 15 }) {
  return { height, borderRadius: 10, border: `2px solid ${colors.border}`, padding: '0 12px', fontSize, background: colors.white };
}
function arrowBtnStyle(disabled) {
  return { width: 32, height: 26, border: `2px solid ${colors.border}`, borderRadius: 6, background: colors.white, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.35 : 1, fontSize: 11 };
}
