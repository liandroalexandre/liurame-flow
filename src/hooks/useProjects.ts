
import { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContextDefinition';

export function useProjects() {
    const context = useContext(ProjectContext);

    if (context === undefined) {
        throw new Error(
            'useProjects deve ser utilizado dentro de ProjectProvider'
        );
    }

    return context;
}
