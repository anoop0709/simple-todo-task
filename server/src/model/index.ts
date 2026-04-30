import { Task } from "./task.model";
import { User } from "./user.model";

export const models = {
  User,
  Task
};

export type Models = typeof models;