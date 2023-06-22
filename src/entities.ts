export const enum TaskStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done",
}

export interface Task {
  id: number;
  status: TaskStatus;
  title: string;
}
