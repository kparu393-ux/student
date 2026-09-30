import { useRef, useState } from 'react';

const RADIUS = 26;
const CIRC = 2 * Math.PI * RADIUS;

function gradeOf(cgpa) {
  if (cgpa >= 9) return { label: 'Outstanding', tone: 'gold' };
  if (cgpa >= 8) return { label: 'Excellent', tone: 'green' };
  if (cgpa >= 7) return { label: 'Very Good', tone: 'blue' };
  if (cgpa >= 6) return { label: 'Good', tone: 'orange' };
  return { label: 'Needs Focus', tone: 'red' };
}

function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

function Avatar({ student }) {
  const [failed, setFailed] = useState(false);
  if (failed || !student.photo) {
    return <div className="avatar fallback">{initials(student.name)}</div>;
  }
  return (
    <img
      className="avatar"
      src={student.photo}
      alt={student.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function CgpaRing({ cgpa, tone }) {
  return (
    <div className={`ring ${tone}`} title={`CGPA ${cgpa.toFixed(2)} / 10`}>
      <svg viewBox="0 0 64 64">
        <circle className="ring-bg" cx="32" cy="32" r={RADIUS} />
        <circle
          className="ring-fg"
          cx="32" cy="32" r={RADIUS}
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - cgpa / 10)}
        />
      </svg>
      <span>{cgpa.toFixed(2)}</span>
    </div>
  );
}

export default function StudentCard({ student, rank, index, view, onDelete }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });
  const ref = useRef(null);
  const grade = gradeOf(student.cgpa);

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (0.5 - py) * 16, y: (px - 0.5) * 16, gx: px * 100, gy: py * 100 });
  };
  const handleLeave = () => setTilt({ x: 0, y: 0, gx: 50, gy: 50 });

  const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;

  /* ---------- LIST (row) VIEW ---------- */
  if (view === 'list') {
    return (
      <article className="row-card" style={{ '--i': index }}>
        <span className="rank-badge">{medal}</span>
        <Avatar student={student} />
        <div className="row-main">
          <h3>{student.name}</h3>
          <p>{student.roll} · {student.department}</p>
        </div>
        <span className="chip">Sem {student.semester}</span>
        <span className={`grade ${grade.tone}`}>{grade.label}</span>
        <CgpaRing cgpa={student.cgpa} tone={grade.tone} />
        <button className="icon-btn danger" onClick={() => onDelete(student.id)} title="Remove">🗑</button>
      </article>
    );
  }

  /* ---------- 3D FLIP CARD VIEW ---------- */
  return (
    <div className="card-wrap" style={{ '--i': index }}>
      <div
        ref={ref}
        className="tilt"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className={`flipper ${flipped ? 'flipped' : ''}`}>
          {/* FRONT */}
          <div className="face-card front-card" style={{ '--gx': `${tilt.gx}%`, '--gy': `${tilt.gy}%` }}>
            <span className="rank-badge">{medal}</span>
            <div className="photo-wrap">
              <Avatar student={student} />
              <span className={`dot ${grade.tone}`} />
            </div>
            <h3>{student.name}</h3>
            <p className="roll">{student.roll}</p>

            <div className="meta">
              <span className="chip">{student.department}</span>
              <span className="chip">Sem {student.semester}</span>
            </div>

            <div className="score">
              <CgpaRing cgpa={student.cgpa} tone={grade.tone} />
              <div>
                <small>CGPA</small>
                <strong className={`grade ${grade.tone}`}>{grade.label}</strong>
              </div>
            </div>

            <button className="flip-btn" onClick={() => setFlipped(true)}>View details ↻</button>
          </div>

          {/* BACK */}
          <div className="face-card back-card">
            <h4>{student.name}</h4>
            <ul className="details">
              <li><span>Roll No</span><b>{student.roll}</b></li>
              <li><span>Department</span><b>{student.department}</b></li>
              <li><span>Semester</span><b>{student.semester}</b></li>
              <li><span>CGPA</span><b>{student.cgpa.toFixed(2)} / 10</b></li>
              <li><span>Rank</span><b>{rank}</b></li>
              <li><span>Email</span><b className="email">{student.email}</b></li>
            </ul>
            <div className="skills">
              {student.skills.map((s) => (
                <span key={s} className="chip skill">{s}</span>
              ))}
            </div>
            <div className="back-actions">
              <button className="flip-btn" onClick={() => setFlipped(false)}>← Back</button>
              <button className="icon-btn danger" onClick={() => onDelete(student.id)} title="Remove student">🗑</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
