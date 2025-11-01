export interface SubTask {
    id: string;
    title: string;
    completed: boolean;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    subtasks: SubTask[];
    status: "todo" | "doing" | "done";
}