
import { BaseEntity } from './BaseEntity';

export type TaskStatus =
    | 'pendente'
    | 'em-progresso'
    | 'concluida';

export interface ITask {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
    createdAt: string;
}

export class Task extends BaseEntity implements ITask {
    constructor(
        id: string,
        public title: string,
        public description: string,
        public dueDate: string,
        public status: TaskStatus = 'pendente',
        createdAt?: string
    ) {
        super(id, createdAt);
    }

    validate(): boolean {
        return (
            this.title.trim().length >= 3 &&
            this.description.trim().length >= 3 &&
            /^\d{4}-\d{2}-\d{2}$/.test(this.dueDate)
        );
    }

    complete(): void {
        this.status = 'concluida';
    }

    isCompleted(): boolean {
        return this.status === 'concluida';
    }
}
