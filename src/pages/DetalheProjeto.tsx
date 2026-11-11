import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  ListTodo,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import { Project } from "../models/Project";
import type { ITask } from "../models/Task";
import { useProjects } from "../hooks/useProjects";
import { findById } from "../utils/findById";
import FormularioTarefa from "../components/FormularioTarefa";

function DetalheProjeto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { projects, loading, error, updateProject, deleteProject } =
    useProjects();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [actionError, setActionError] = useState("");
  const [busyTaskId, setBusyTaskId] = useState<string | null>(null);
  const [deletingProject, setDeletingProject] = useState(false);

  // Utilização prática da função genérica
  const dados = id ? findById(projects, id) : undefined;

  function abrirNovaTarefa() {
    setEditingTask(null);
    setShowTaskForm(true);
    setActionError("");
  }

  function abrirEdicao(task: ITask) {
    setEditingTask(task);
    setShowTaskForm(true);
    setActionError("");
  }

  function fecharFormulario() {
    setShowTaskForm(false);
    setEditingTask(null);
  }

  async function concluirTarefa(task: ITask) {
    if (!dados || busyTaskId || deletingProject) return;

    setBusyTaskId(task.id);
    setActionError("");

    try {
      await updateProject({
        ...dados,
        tasks: dados.tasks.map((item) =>
          item.id === task.id ? { ...item, status: "concluida" } : item,
        ),
      });
    } catch {
      setActionError("Não foi possível concluir a tarefa.");
    } finally {
      setBusyTaskId(null);
    }
  }

  async function eliminarTarefa(task: ITask) {
    if (!dados || busyTaskId || deletingProject) return;

    const confirmado = window.confirm(
      `Tens a certeza de que queres eliminar a tarefa "${task.title}"?`,
    );

    if (!confirmado) return;

    setBusyTaskId(task.id);
    setActionError("");

    try {
      await updateProject({
        ...dados,
        tasks: dados.tasks.filter((item) => item.id !== task.id),
      });

      if (editingTask?.id === task.id) {
        fecharFormulario();
      }
    } catch {
      setActionError("Não foi possível eliminar a tarefa.");
    } finally {
      setBusyTaskId(null);
    }
  }

  async function eliminarProjetoAtual() {
    if (!dados || deletingProject || busyTaskId) return;

    const confirmado = window.confirm(
      `Tens a certeza de que queres eliminar o projeto "${dados.name}" e todas as suas tarefas?`,
    );

    if (!confirmado) return;

    setDeletingProject(true);
    setActionError("");

    try {
      await deleteProject(dados.id);
      navigate("/");
    } catch {
      setActionError("Não foi possível eliminar o projeto.");
      setDeletingProject(false);
    }
  }

  if (loading) {
    return <p>A carregar projeto...</p>;
  }

  if (error) {
    return (
      <p className="error-message" role="alert">
        {error}
      </p>
    );
  }

  if (!dados) {
    return (
      <div className="empty-state">
        <h2>Projeto não encontrado</h2>

        <Link to="/" className="btn btn-primary">
          Voltar ao Dashboard
        </Link>
      </div>
    );
  }

  const projeto = new Project(
    dados.id,
    dados.name,
    dados.description,
    dados.tasks,
    dados.createdAt,
  );

  const progresso = projeto.getProgress();

  const iconesEstado = {
    pendente: <Circle size={18} />,
    "em-progresso": <Clock3 size={18} />,
    concluida: <CheckCircle2 size={18} />,
  };

  const nomesEstado = {
    pendente: "Pendente",
    "em-progresso": "Em progresso",
    concluida: "Concluída",
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">DETALHES DO PROJETO</p>

          <h1>{projeto.name}</h1>
          <p>{projeto.description}</p>
        </div>

        <div className="project-actions">
          <Link to={`/projetos/${dados.id}/editar`} className="btn">
            <Pencil size={17} />
            Editar projeto
          </Link>

          <button
            type="button"
            className="btn danger-button"
            onClick={() => void eliminarProjetoAtual()}
            disabled={deletingProject || busyTaskId !== null}
          >
            <Trash2 size={17} />
            {deletingProject ? "A eliminar..." : "Eliminar projeto"}
          </button>

          <Link to="/" className="btn">
            <ArrowLeft size={17} />
            Voltar
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <ListTodo size={26} />
          <span>Total de tarefas</span>
          <strong>{projeto.tasks.length}</strong>
        </div>

        <div className="stat-card">
          <CheckCircle2 size={26} />
          <span>Tarefas concluídas</span>

          <strong>
            {projeto.tasks.filter((task) => task.status === "concluida").length}
          </strong>
        </div>

        <div className="stat-card">
          <Clock3 size={26} />
          <span>Progresso</span>
          <strong>{progresso}%</strong>
        </div>
      </div>

      <div className="section-heading">
        <h2>Tarefas do projeto</h2>

        <button
          type="button"
          className="btn btn-primary"
          onClick={showTaskForm ? fecharFormulario : abrirNovaTarefa}
          disabled={deletingProject || busyTaskId !== null}
        >
          <Plus size={17} />

          {showTaskForm ? "Fechar formulário" : "Nova tarefa"}
        </button>
      </div>

      {showTaskForm && (
        <FormularioTarefa
          key={editingTask?.id ?? "nova"}
          project={dados}
          task={editingTask ?? undefined}
          onClose={fecharFormulario}
        />
      )}

      {actionError && (
        <p className="error-message" role="alert">
          {actionError}
        </p>
      )}

      {projeto.tasks.length === 0 ? (
        <div className="empty-state">
          <h3>Este projeto ainda não tem tarefas</h3>

          <p>Clica em «Nova tarefa» para adicionares a primeira.</p>
        </div>
      ) : (
        <div className="tasks-list">
          {projeto.tasks.map((task) => (
            <article className="task-card" key={task.id}>
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <span className="task-date">
                  <CalendarDays size={15} />
                  Prazo: {task.dueDate}
                </span>
              </div>

              <div className="task-actions">
                <span className={`task-status status-${task.status}`}>
                  {iconesEstado[task.status]}
                  {nomesEstado[task.status]}
                </span>

                {task.status !== "concluida" && (
                  <button
                    type="button"
                    className="icon-button"
                    title="Concluir tarefa"
                    aria-label={`Concluir ${task.title}`}
                    disabled={busyTaskId !== null || deletingProject}
                    onClick={() => void concluirTarefa(task)}
                  >
                    <CheckCircle2 size={18} />
                  </button>
                )}

                <button
                  type="button"
                  className="icon-button"
                  title="Editar tarefa"
                  aria-label={`Editar ${task.title}`}
                  disabled={busyTaskId !== null || deletingProject}
                  onClick={() => abrirEdicao(task)}
                >
                  <Pencil size={18} />
                </button>

                <button
                  type="button"
                  className="icon-button danger-button"
                  title="Eliminar tarefa"
                  aria-label={`Eliminar ${task.title}`}
                  disabled={busyTaskId !== null || deletingProject}
                  onClick={() => void eliminarTarefa(task)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default DetalheProjeto;
