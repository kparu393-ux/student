export default function Hero3D({ total, average, top, departmentCount, onAddClick }) {
  return (
    <section className="hero" id="top">
      <div className="hero-text">
        <span className="eyebrow">✦ Student Information Management</span>
        <h1>
          Meet the <span className="grad">brightest minds</span> of your campus.
        </h1>
        <p>
          A living, breathing student portal. Every card is built from a single reusable
          component and fed entirely through <code>props</code> — search, filter and sort by
          CGPA in real time.
        </p>
        <div className="hero-cta">
          <a href="#students" className="btn primary big">Explore Students ↓</a>
          <button className="btn ghost big" onClick={onAddClick}>+ Add New</button>
        </div>
        {top && (
          <div className="topper">
            <span className="topper-medal">🏆</span>
            <div>
              <small>Current topper</small>
              <strong>{top.name}</strong>
            </div>
            <span className="topper-score">{top.cgpa.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="scene" aria-hidden="true">
        <div className="orbit orbit-1" />
        <div className="orbit orbit-2" />
        <div className="cube">
          <div className="face front"><span>{total}</span><small>Students</small></div>
          <div className="face back"><span>{average.toFixed(2)}</span><small>Avg CGPA</small></div>
          <div className="face right"><span>{departmentCount}</span><small>Departments</small></div>
          <div className="face left"><span>{top ? top.cgpa.toFixed(2) : '—'}</span><small>Top CGPA</small></div>
          <div className="face top"><span>🎓</span><small>Campus Nexus</small></div>
          <div className="face bottom"><span>⚛️</span><small>React Props</small></div>
        </div>
        <div className="float f1">📚</div>
        <div className="float f2">💡</div>
        <div className="float f3">🚀</div>
      </div>
    </section>
  );
}
