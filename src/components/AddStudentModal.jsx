import { useEffect, useState } from 'react';

export default function AddStudentModal({ departments, onAdd, onClose }) {
  const [form, setForm] = useState({
    name: '',
    roll: '',
    department: departments[0],
    semester: 1,
    cgpa: '',
    photo: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.roll.trim()) errs.roll = 'Roll number is required';
    const cg = parseFloat(form.cgpa);
    if (Number.isNaN(cg) || cg < 0 || cg > 10) errs.cgpa = 'CGPA must be between 0 and 10';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    onAdd({
      name: form.name.trim(),
      roll: form.roll.trim().toUpperCase(),
      department: form.department,
      semester: Number(form.semester),
      cgpa: cg,
      photo: form.photo.trim(),
      email: form.email.trim() || `${form.name.trim().split(' ')[0].toLowerCase()}@campus.edu`,
      skills: ['New Joiner'],
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit} noValidate>
        <div className="modal-head">
          <h3>Add a new student</h3>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="form-grid">
          <label className="full">
            Full name
            <input value={form.name} onChange={set('name')} placeholder="e.g. Riya Sen" />
            {errors.name && <em>{errors.name}</em>}
          </label>

          <label>
            Roll number
            <input value={form.roll} onChange={set('roll')} placeholder="CSE2201" />
            {errors.roll && <em>{errors.roll}</em>}
          </label>

          <label>
            CGPA (0 – 10)
            <input type="number" step="0.01" value={form.cgpa} onChange={set('cgpa')} placeholder="8.75" />
            {errors.cgpa && <em>{errors.cgpa}</em>}
          </label>

          <label>
            Department
            <select value={form.department} onChange={set('department')}>
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>

          <label>
            Semester
            <select value={form.semester} onChange={set('semester')}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>

          <label className="full">
            Photo URL <small>(optional — initials are used if empty)</small>
            <input value={form.photo} onChange={set('photo')} placeholder="https://…" />
          </label>

          <label className="full">
            Email <small>(optional)</small>
            <input type="email" value={form.email} onChange={set('email')} placeholder="name@campus.edu" />
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">Add student</button>
        </div>
      </form>
    </div>
  );
}
