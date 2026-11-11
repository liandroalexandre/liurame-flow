
import { createContext } from 'react';
import type { IProject } from '../models/Project';

export interface ProjectContextType {
    projects: IProject[];
    loading: boolean;
    error: string | null;
    refreshProjects: () => Promise<void>;
    addProject: (project: IProject) => Promise<void>;
    updateProject: (project: IProject) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
}

export const ProjectContext = createContext<
    ProjectContextType | undefined
>(undefined);
