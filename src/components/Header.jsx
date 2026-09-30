export default function Header({ theme, onToggleTheme, query, onQueryChange, onAddClick, total }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Campus Nexus home">
          <span className="brand-logo">🎓</span>
          <span className="brand-text">
            Campus<b>Nexus</b>
          </span>
          <span className="pill">{total} students</span>
        </a>

        <div className="search">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search by name, roll number or department…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search students"
          />
          {query && (
            <button className="clear" onClick={() => onQueryChange('')} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>

        <div className="header-actions">
          <button className="btn ghost icon" onClick={onToggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="btn primary" onClick={onAddClick}>
            + Add Student
          </button>
        </div>
      </div>
    </header>
  );
}
