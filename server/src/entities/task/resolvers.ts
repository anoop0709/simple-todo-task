import mongoose from "mongoose";
import { Context } from "../../context";
import { mapError, NotFoundError } from "../../lib/error";
import { ensureAuthenticated, parseToISOString, sanitizeRequiredText, sanitizeText } from "../../lib/helper";
import { UpdateTaskInput } from "../../types";


export const resolvers = {
    Mutation: {
        createTask: async (
            _: unknown,
            { input }: any,
            context: Context
        ) => {
            try {
                const userId = ensureAuthenticated(context);
                const task = await context.models.Task.create({
                    name: sanitizeRequiredText(input.title),
                    note: sanitizeText(input.note),
                    dueDate: parseToISOString(input?.dueDate),
                    tag: input.tag,
                    completed: input.completed,
                    userId: new mongoose.Types.ObjectId(userId),
                });
                return task;
            } catch (error) {
                throw mapError(error)
            }
        },

        toggleTask: async (
            _: unknown,
            { id }: { id: string },
            context: Context
        ) => {
            try {
                const userId = ensureAuthenticated(context);
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid task ID");
                }
                const task = await context.models.Task.findOne({ _id: id, userId });

                if (!task) throw new NotFoundError("Task not found");

                task.completed = !task.completed;
                await task.save();
                return task;
            } catch (error) {
                throw mapError(error)
            }
        },

        deleteTask: async (
            _: unknown,
            { id }: { id: string },
            context: Context
        ) => {
            try {
                const userId = ensureAuthenticated(context);
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid task ID");
                }
                const response = await context.models.Task.deleteOne({ _id: id, userId });
                return response.deletedCount === 1;
            } catch (error) {
                throw mapError(error)
            }
        },

        updateTask: async (
            _: unknown,
            { id, input }: { id: string; input: UpdateTaskInput },
            context: Context
        ) => {
            try {
                const userId = ensureAuthenticated(context);
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid task ID");
                }
                const task = await context.models.Task.findOne({ _id: id, userId });

                if (!task) throw new NotFoundError("Task not found");

                if ("name" in input && input.name != null) {
                    task.name = sanitizeRequiredText(input.name);
                }
                if ("note" in input) {
                    task.note = sanitizeText(input.note);
                }
                if ("tag" in input) {
                    task.tag = input.tag;
                }
                if ("completed" in input) {
                    task.completed = input.completed;
                }
                if ("dueDate" in input) {
                    input.dueDate = parseToISOString(input.dueDate);
                }

                Object.assign(task, input);
                await task.save();
                return task;
            } catch (error) {
                throw mapError(error)
            }
        },
    },
};