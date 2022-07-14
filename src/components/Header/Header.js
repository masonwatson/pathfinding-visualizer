// import bootstrap from 'bootstrap';
import "./Header.css";

export default function Header() {
  return (
    <nav
      id="navbar"
      className="navbar fixed-top bg-dark navbar-expand-lg navbar-dark p-md-3"
    >
      <div className="container-fluid">
        <a className="navbar-brand">Dijkstra's Pathfinding Visualizer</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#toggleMobileMenu"
          aria-controls="toggleMobileMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list"></i>
        </button>
        <div className="collapse navbar-collapse" id="toggleMobileMenu">
          <ul className="navbar-nav text-center me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                The Project
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
