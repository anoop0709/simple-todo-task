export const Tag = {
  URGENT: "URGENT",
  NOT_URGENT: "NOT_URGENT",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
} as const;

export type Tag = (typeof Tag)[keyof typeof Tag];


export type Task = {
  id?: string;
  name: string;
  dueDate?: string;
  tag?: Tag;
  note?: string | null;
  completed?: boolean;
};

export type GetMeWithTasks = {
  me: {
    id: string;
    email: string;
    userName: string;
    tasks: Task[];
  } | null;
};

export type CreateTaskResponse = {
  createTask: Task;
};

export type CreateTaskVariables = {
  input: {
    name: string;
    dueDate?: string | null;
    tag?: string | null;
    note?: string | null;
    completed?: boolean;
  };
};

export type UpdateTaskResponse = {
  updateTask: Task;
};

export type UpdateTaskVariables = {
  id: string | null;
  input: {
    name?: string;
    dueDate?: string | null;
    tag?: string | null;
    note?: string | null;
    completed?: boolean;
  };
};