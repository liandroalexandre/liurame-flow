import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import { Project } from "../models/Project";
import { useProjects } from "../hooks/useProjects";

function FormularioProjeto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { projects, loading, addProject, updateProject } = useProjects();

  const editing = Boolean(id);
  const existingProject = projects.find((project) => project.id === id);

  if (editing && loading) {
    return <p>A carregar projeto...</p>;
  }

  if (editing && !existingProject) {
    return (
      <div className="empty-state">
        <h2>Projeto não encontrado</h2>
        <Link to="/" className="btn btn-primary">
          Voltar ao Dashboard
        </Link>
      </div>
    );
  }

  return (
    <ProjectForm
      key={existingProject?.id ?? "novo"}
      existingProject={existingProject}
      addProject={addProject}
      updateProject={updateProject}
      navigate={navigate}
    />
  );
}

interface ProjectFormProps {
  existingProject?: ProjectData;
  addProject: (project: ProjectData) => Promise<void>;
  updateProject: (project: ProjectData) => Promise<void>;
  navigate: ReturnType<typeof useNavigate>;
}

type ProjectData = {
  id: string;
  name: string;
  description: string;
  tasks: import("../models/Task").ITask[];
  createdAt: string;
};

function ProjectForm({
  existingProject,
  addProject,
  updateProject,
  navigate,
}: ProjectFormProps) {
  const editing = Boolean(existingProject);

  const [name, setName] = useState(existingProject?.name ?? "");
  const [description, setDescription] = useState(
    existingProject?.description ?? "",
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const project = new Project(
      existingProject?.id ?? crypto.randomUUID(),
      name.trim(),
      description.trim(),
      existingProject?.tasks ?? [],
      existingProject?.createdAt,
    );

    if (!project.validate()) {
      setError("O nome e a descrição devem ter pelo menos 3 caracteres.");
      return;
    }

    setSaving(true);

    try {
      if (editing) {
        await updateProject(project);
        navigate(`/projetos/${project.id}`);
      } else {
        await addProject(project);
        navigate("/");
      }
    } catch {
      setError("Não foi possível guardar o projeto. Verifica a API.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">GESTÃO DE PROJETOS</p>
          <h1>{editing ? "Editar projeto" : "Novo projeto"}</h1>
          <p>
            {editing
              ? "Atualiza os dados do projeto."
              : "Preenche os dados para criares um novo projeto."}
          </p>
        </div>

        <Link
          to={editing ? `/projetos/${existingProject?.id}` : "/"}
          className="btn"
        >
          <ArrowLeft size={17} />
          Voltar
        </Link>
      </div>

      <form className="project-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="project-name">Nome do projeto</label>
          <input
            id="project-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex.: Website LIURAME"
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="project-description">Descrição</label>
          <textarea
            id="project-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descreve o objetivo do projeto..."
            rows={5}
            maxLength={1000}
            required
          />
        </div>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary" disabled={saving}>
          <Save size={17} />
          {saving
            ? "A guardar..."
            : editing
              ? "Guardar alterações"
              : "Criar projeto"}
        </button>
      </form>
    </div>
  );
}

export default FormularioProjeto;
