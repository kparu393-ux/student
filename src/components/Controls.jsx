export default function Controls({
  sortOrder, onSortChange,
  dept, onDeptChange, departments,
  semester, onSemesterChange,
  view, onViewChange,
  resultCount, totalCount, onReset,
}) {
  const sorts = [
    { key: 'none', label: 'Default' },
    { key: 'desc', label: 'CGPA ↓ High' },
    { key: 'asc', label: 'CGPA ↑ Low' },
  ];
  const isFiltered = dept !== 'All' || semester !== 'All' || sortOrder !== 'none';

  return (
    <section className="controls" id="students">
      <div className="controls-head">
        <h2>
          Student Directory
          <span className="count">
            {resultCount} / {totalCount}
          </span>
        </h2>
        {isFiltered && (
          <button className="link" onClick={onReset}>Reset all</button>
        )}
      </div>

      <div className="controls-row">
        <div className="group">
          <label>Sort by CGPA</label>
          <div className="segmented">
            {sorts.map((s) => (
              <button
                key={s.key}
                className={sortOrder === s.key ? 'active' : ''}
                onClick={() => onSortChange(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="group">
          <label htmlFor="dept">Department</label>
          <select id="dept" value={dept} onChange={(e) => onDeptChange(e.target.value)}>
            <option>All</option>
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="group">
          <label htmlFor="sem">Semester</label>
          <select id="sem" value={semester} onChange={(e) => onSemesterChange(e.target.value)}>
            <option>All</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>Semester {n}</option>
            ))}
          </select>
        </div>

        <div className="group">
          <label>View</label>
          <div className="segmented">
            <button className={view === 'grid' ? 'active' : ''} onClick={() => onViewChange('grid')}>▦ Cards</button>
            <button className={view === 'list' ? 'active' : ''} onClick={() => onViewChange('list')}>☰ List</button>
          </div>
        </div>
      </div>
    </section>
  );
}
