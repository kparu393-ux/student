const p = (g, n) => `https://randomuser.me/api/portraits/${g}/${n}.jpg`;

export const initialStudents = [
  { id: 1,  name: 'Aarav Sharma',   roll: 'CSE2101', department: 'Computer Science', semester: 5, cgpa: 9.42, photo: p('men', 32),   email: 'aarav.sharma@campus.edu',  skills: ['React', 'Node.js', 'DSA'] },
  { id: 2,  name: 'Ananya Das',     roll: 'CSE2115', department: 'Computer Science', semester: 5, cgpa: 9.78, photo: p('women', 44), email: 'ananya.das@campus.edu',    skills: ['AI/ML', 'Python', 'Research'] },
  { id: 3,  name: 'Rohan Mukherjee',roll: 'ECE2087', department: 'Electronics',      semester: 3, cgpa: 8.36, photo: p('men', 75),   email: 'rohan.m@campus.edu',       skills: ['VLSI', 'Embedded', 'C++'] },
  { id: 4,  name: 'Priya Nair',     roll: 'ME2054',  department: 'Mechanical',       semester: 7, cgpa: 8.91, photo: p('women', 68), email: 'priya.nair@campus.edu',    skills: ['CAD', 'Robotics', 'MATLAB'] },
  { id: 5,  name: 'Kabir Singh',    roll: 'IT2132',  department: 'Information Tech', semester: 3, cgpa: 7.64, photo: p('men', 12),   email: 'kabir.singh@campus.edu',   skills: ['Java', 'SQL', 'Cloud'] },
  { id: 6,  name: 'Ishita Roy',     roll: 'IT2140',  department: 'Information Tech', semester: 5, cgpa: 9.15, photo: p('women', 26), email: 'ishita.roy@campus.edu',    skills: ['UI/UX', 'Figma', 'React'] },
  { id: 7,  name: 'Vikram Patel',   roll: 'CE2019',  department: 'Civil',            semester: 7, cgpa: 7.12, photo: p('men', 54),   email: 'vikram.patel@campus.edu',  skills: ['AutoCAD', 'Survey', 'STAAD'] },
  { id: 8,  name: 'Sneha Banerjee', roll: 'ECE2093', department: 'Electronics',      semester: 5, cgpa: 8.68, photo: p('women', 90), email: 'sneha.b@campus.edu',       skills: ['IoT', 'Signals', 'PCB'] },
  { id: 9,  name: 'Arjun Reddy',    roll: 'CSE2144', department: 'Computer Science', semester: 3, cgpa: 6.89, photo: p('men', 41),   email: 'arjun.reddy@campus.edu',   skills: ['Web Dev', 'Git', 'Linux'] },
  { id: 10, name: 'Meera Iyer',     roll: 'ME2061',  department: 'Mechanical',       semester: 3, cgpa: 8.05, photo: p('women', 12), email: 'meera.iyer@campus.edu',    skills: ['Thermo', 'Design', 'Ansys'] },
  { id: 11, name: 'Dev Malhotra',   roll: 'IT2158',  department: 'Information Tech', semester: 7, cgpa: 9.03, photo: p('men', 86),   email: 'dev.malhotra@campus.edu',  skills: ['DevOps', 'Docker', 'AWS'] },
  { id: 12, name: 'Tanvi Kulkarni', roll: 'CE2033',  department: 'Civil',            semester: 5, cgpa: 7.91, photo: p('women', 33), email: 'tanvi.k@campus.edu',       skills: ['BIM', 'Concrete', 'GIS'] },
];

export const departments = [
  'Computer Science',
  'Information Tech',
  'Electronics',
  'Mechanical',
  'Civil',
];
