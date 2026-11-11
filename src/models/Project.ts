
import { BaseEntity } from './BaseEntity';
import { Task, type ITask } from './Task';

export interface IProject {
    id: string;
    name: string;
    description: string;
    tasks: ITask[];
    createdAt: string;
}

export class Project extends BaseEntity implements IProject {
    public tasks: Task[];

    constructor(
        id: string,
        public name: string,
        public description: string,
        tasks: ITask[] = [],
        createdAt?: string
    ) {
        super(id, createdAt);

        this.tasks = tasks.map(
            (task) =>
                new Task(
                    task.id,
                    task.title,
                    task.description,
                    task.dueDate,
                    task.status,
                    task.createdAt
                )
        );
    }

    validate(): boolean {
        return (
            this.name.trim().length >= 3 &&
            this.description.trim().length >= 3
        );
    }

    addTask(task: Task): void {
        if (!task.validate()) {
            throw new Error('Os dados da tarefa são inválidos.');
        }

        this.tasks.push(task);
    }

    removeTask(taskId: string): void {
        this.tasks = this.tasks.filter(
            (task) => task.id !== taskId
        );
    }

    getProgress(): number {
        if (this.tasks.length === 0) {
            return 0;
        }

        const completed = this.tasks.filter(
            (task) => task.isCompleted()
        ).length;

        return Math.round(
            (completed / this.tasks.length) * 100
        );
    }
}
