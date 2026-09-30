export default function Footer({ studentCount }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>Campus<b>Nexus</b></strong>
          <p>Assignment 2 · Student Information Management using Props</p>
        </div>
        <div className="footer-tags">
          <span className="chip">⚛️ React</span>
          <span className="chip">Props</span>
          <span className="chip">Component Reusability</span>
          <span className="chip">{studentCount} records</span>
        </div>
        <p className="copy">© {new Date().getFullYear()} Campus Nexus. Built with ♥ and lots of CSS 3D.</p>
      </div>
    </footer>
  );
}
