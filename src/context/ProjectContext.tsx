import { useCallback, useEffect, useState, type ReactNode } from "react";

import type { IProject } from "../models/Project";

import {
  listarProjetos,
  criarProjeto as criarProjetoAPI,
  atualizarProjeto as atualizarProjetoAPI,
  eliminarProjeto as eliminarProjetoAPI,
} from "../services/projectService";

import { ProjectContext } from "./ProjectContextDefinition";

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await listarProjetos();
      setProjects(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar projetos",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function carregarProjetos() {
      try {
        const data = await listarProjetos();

        if (active) {
          setProjects(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Erro ao carregar projetos",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void carregarProjetos();

    return () => {
      active = false;
    };
  }, []);

  async function addProject(project: IProject) {
    setError(null);

    try {
      const created = await criarProjetoAPI(project);

      setProjects((previous) => [...previous, created]);
    } catch (err) {
      setError("Não foi possível criar o projeto.");
      throw err;
    }
  }

  async function updateProject(project: IProject) {
    setError(null);

    try {
      const updated = await atualizarProjetoAPI(project);

      setProjects((previous) =>
        previous.map((item) => (item.id === updated.id ? updated : item)),
      );
    } catch (err) {
      setError("Não foi possível atualizar o projeto.");
      throw err;
    }
  }

  async function deleteProject(id: string) {
    setError(null);

    try {
      await eliminarProjetoAPI(id);

      setProjects((previous) => previous.filter((item) => item.id !== id));
    } catch (err) {
      setError("Não foi possível eliminar o projeto.");
      throw err;
    }
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        refreshProjects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
