import { Link } from "react-router-dom";
import { FolderKanban, ListTodo, CheckCircle2, ArrowRight } from "lucide-react";
import { Project } from "../models/Project";
import { useProjects } from "../hooks/useProjects";

function Dashboard() {
  const { projects, loading, error, refreshProjects } = useProjects();

  const totalTasks = projects.reduce(
    (total, project) => total + project.tasks.length,
    0,
  );

  const completedTasks = projects.reduce(
    (total, project) =>
      total +
      project.tasks.filter((task) => task.status === "concluida").length,
    0,
  );

  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow">VISÃO GERAL</p>
          <h1>Os meus projetos</h1>
          <p>Organiza projetos, acompanha tarefas e monitoriza o progresso.</p>
        </div>

        <Link to="/projetos/novo" className="btn btn-primary">
          + Novo projeto
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FolderKanban size={26} />
          <span>Projetos</span>
          <strong>{projects.length}</strong>
        </div>

        <div className="stat-card">
          <ListTodo size={26} />
          <span>Total de tarefas</span>
          <strong>{totalTasks}</strong>
        </div>

        <div className="stat-card">
          <CheckCircle2 size={26} />
          <span>Tarefas concluídas</span>
          <strong>{completedTasks}</strong>
        </div>
      </div>

      <div className="section-heading">
        <h2>Projetos ativos</h2>
        <span>{projects.length} projetos</span>
      </div>

      {loading && <p>A carregar projetos...</p>}

      {error && (
        <div className="error-message" role="alert">
          <p>{error}</p>
          <button onClick={() => void refreshProjects().catch(() => {})}>
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="empty-state">
          <h3>Ainda não existem projetos</h3>
          <p>Cria o primeiro projeto para começares a organizar as tarefas.</p>
          <Link to="/projetos/novo" className="btn btn-primary">
            Criar projeto
          </Link>
        </div>
      )}

      {!loading && !error && (
        <div className="projects-grid">
          {projects.map((projectData) => {
            const project = new Project(
              projectData.id,
              projectData.name,
              projectData.description,
              projectData.tasks,
              projectData.createdAt,
            );

            const progress = project.getProgress();

            return (
              <article className="project-card" key={project.id}>
                <div className="project-card-top">
                  <span className="project-icon">
                    <FolderKanban size={22} />
                  </span>
                  <span className="project-status">Projeto</span>
                </div>

                <h3>{project.name}</h3>
                <p>{project.description}</p>

                <div className="progress-heading">
                  <span>Progresso</span>
                  <strong>{progress}%</strong>
                </div>

                <div
                  className="progress-track"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Progresso de ${project.name}`}
                >
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="project-card-footer">
                  <span>{project.tasks.length} tarefas</span>
                  <Link to={`/projetos/${project.id}`}>
                    Ver projeto <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
