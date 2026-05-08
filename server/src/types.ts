export const Tags = {
    URGENT: "URGENT",
    NOT_URGENT: "NOT_URGENT",
    HIGH: "HIGH",
    MEDIUM: "MEDIUM",
    LOW: "LOW",
} as const;

export type Tag = (typeof Tags)[keyof typeof Tags];

export type Task = {
    id?: string;
    name: string;
    dueDate?: string;
    tag?: Tag | undefined;
    note?: string | null;
    completed?: boolean;
};

export interface User {
    email: string;
    name: string;
    password: string;
    tasks:[Task]
}

export type UpdateTaskInput = {
  name: string;
  note?: string;
  tag?: Tag;
  completed: boolean;
  dueDate?: string;
};