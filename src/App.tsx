import { Link, NavLink, Navigate, Route, Routes } from "react-router-dom";

import { FolderKanban, LayoutDashboard } from "lucide-react";

import Dashboard from "./pages/Dashboard";
import FormularioProjeto from "./pages/FormularioProjeto";
import DetalheProjeto from "./pages/DetalheProjeto";

function App() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <Link to="/" className="brand">
          <span className="brand-icon">
            <FolderKanban size={24} />
          </span>

          <span>
            <strong>LIURAME</strong>
            <small>FLOW</small>
          </span>
        </Link>

        <nav className="sidebar-nav" aria-label="Menu principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <span>LIURAME Flow</span>
          <small>Gestão de projetos e tarefas</small>
        </div>
      </aside>

      <div className="app-content">
        <header className="topbar">
          <span>Workspace / Projetos</span>
          <span className="user-avatar">L</span>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/projetos/novo" element={<FormularioProjeto />} />

            <Route
              path="/projetos/:id/editar"
              element={<FormularioProjeto />}
            />

            <Route path="/projetos/:id" element={<DetalheProjeto />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
