import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Hero3D from './components/Hero3D.jsx';
import Controls from './components/Controls.jsx';
import StudentList from './components/StudentList.jsx';
import AddStudentModal from './components/AddStudentModal.jsx';
import Footer from './components/Footer.jsx';
import Background from './components/Background.jsx';
import { initialStudents, departments } from './data/students.js';

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('All');
  const [semester, setSemester] = useState('All');
  const [sortOrder, setSortOrder] = useState('none'); // none | desc | asc
  const [view, setView] = useState('grid'); // grid | list
  const [theme, setTheme] = useState('dark');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Rank of every student by CGPA (1 = best) — passed down through props
  const rankMap = useMemo(() => {
    const sorted = [...students].sort((a, b) => b.cgpa - a.cgpa);
    return Object.fromEntries(sorted.map((s, i) => [s.id, i + 1]));
  }, [students]);

  const visibleStudents = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = students.filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.roll.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q);
      const matchesDept = dept === 'All' || s.department === dept;
      const matchesSem = semester === 'All' || s.semester === Number(semester);
      return matchesQuery && matchesDept && matchesSem;
    });
    if (sortOrder === 'desc') list = [...list].sort((a, b) => b.cgpa - a.cgpa);
    if (sortOrder === 'asc') list = [...list].sort((a, b) => a.cgpa - b.cgpa);
    return list;
  }, [students, query, dept, semester, sortOrder]);

  const stats = useMemo(() => {
    const total = students.length;
    const average = total ? students.reduce((sum, s) => sum + s.cgpa, 0) / total : 0;
    const top = total ? students.reduce((a, b) => (b.cgpa > a.cgpa ? b : a)) : null;
    const deptCount = new Set(students.map((s) => s.department)).size;
    return { total, average, top, deptCount };
  }, [students]);

  const addStudent = (student) => {
    setStudents((prev) => [{ ...student, id: Date.now() }, ...prev]);
    setModalOpen(false);
  };

  const deleteStudent = (id) => setStudents((prev) => prev.filter((s) => s.id !== id));

  const resetFilters = () => {
    setQuery('');
    setDept('All');
    setSemester('All');
    setSortOrder('none');
  };

  return (
    <div className="app">
      <Background theme={theme} />

      <Header
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        query={query}
        onQueryChange={setQuery}
        onAddClick={() => setModalOpen(true)}
        total={stats.total}
      />

      <main>
        <Hero3D
          total={stats.total}
          average={stats.average}
          top={stats.top}
          departmentCount={stats.deptCount}
          onAddClick={() => setModalOpen(true)}
        />

        <Controls
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          dept={dept}
          onDeptChange={setDept}
          departments={departments}
          semester={semester}
          onSemesterChange={setSemester}
          view={view}
          onViewChange={setView}
          resultCount={visibleStudents.length}
          totalCount={students.length}
          onReset={resetFilters}
        />

        <StudentList
          students={visibleStudents}
          rankMap={rankMap}
          view={view}
          onDelete={deleteStudent}
          onReset={resetFilters}
        />
      </main>

      <Footer studentCount={stats.total} />

      {modalOpen && (
        <AddStudentModal
          departments={departments}
          onAdd={addStudent}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
