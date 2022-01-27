// import bootstrap from 'bootstrap';
import "./Header.css";

export default function Header() {
  return (
    <nav id="navbar" className="navbar fixed-top bg-dark navbar-expand-lg navbar-dark p-md-3">
      <div className="container-fluid">
        <a className="navbar-brand">Dijkstra's Pathfinding Visualizer</a>
      </div>
    </nav>
  );
}
