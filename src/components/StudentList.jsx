import StudentCard from './StudentCard.jsx';

export default function StudentList({ students, rankMap, view, onDelete, onReset }) {
  if (students.length === 0) {
    return (
      <div className="empty">
        <div className="empty-emoji">🔍</div>
        <h3>No students found</h3>
        <p>Try a different search or clear the filters.</p>
        <button className="btn primary" onClick={onReset}>Clear filters</button>
      </div>
    );
  }

  return (
    <div className={`student-list ${view}`}>
      {students.map((student, index) => (
        <StudentCard
          key={student.id}
          student={student}
          rank={rankMap[student.id]}
          index={index}
          view={view}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
