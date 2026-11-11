import { useState, type FormEvent } from "react";
import { Plus, Save, X } from "lucide-react";

import { Task, type ITask, type TaskStatus } from "../models/Task";
import type { IProject } from "../models/Project";
import { useProjects } from "../hooks/useProjects";

interface FormularioTarefaProps {
  project: IProject;
  task?: ITask;
  onClose: () => void;
}

function FormularioTarefa({ project, task, onClose }: FormularioTarefaProps) {
  const { updateProject } = useProjects();

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "pendente");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const editing = Boolean(task);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const updatedTask = new Task(
      task?.id ?? crypto.randomUUID(),
      title.trim(),
      description.trim(),
      dueDate,
      status,
      task?.createdAt,
    );

    if (!updatedTask.validate()) {
      setError(
        "O título e a descrição devem ter pelo menos 3 caracteres. Indica também uma data válida.",
      );
      return;
    }

    const updatedTasks = editing
      ? project.tasks.map((item) =>
          item.id === updatedTask.id ? updatedTask : item,
        )
      : [...project.tasks, updatedTask];

    setSaving(true);

    try {
      await updateProject({
        ...project,
        tasks: updatedTasks,
      });

      onClose();
    } catch {
      setError("Não foi possível guardar a tarefa.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="project-card task-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>{editing ? "Editar tarefa" : "Nova tarefa"}</h3>

        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label="Fechar formulário"
        >
          <X size={19} />
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="task-title">Título</label>
        <input
          id="task-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex.: Criar página de contacto"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Descrição</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Descreve a tarefa..."
          rows={3}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-date">Data limite</label>
        <input
          id="task-date"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-status">Estado</label>
        <select
          id="task-status"
          value={status}
          onChange={(event) => setStatus(event.target.value as TaskStatus)}
        >
          <option value="pendente">Pendente</option>
          <option value="em-progresso">Em progresso</option>
          <option value="concluida">Concluída</option>
        </select>
      </div>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={saving}>
        {editing ? <Save size={17} /> : <Plus size={17} />}
        {saving
          ? "A guardar..."
          : editing
            ? "Guardar alterações"
            : "Adicionar tarefa"}
      </button>
    </form>
  );
}

export default FormularioTarefa;
