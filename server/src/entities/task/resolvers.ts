import mongoose from "mongoose";
import { Context } from "../../context";
import { mapError, NotFoundError } from "../../lib/error";
import { ensureAuthenticated, parseToISOString } from "../../lib/helper";

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
                    ...input,
                    dueDate: parseToISOString(input?.dueDate),
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
                const response = await context.models.Task.deleteOne({ _id: id, userId });
                return response.deletedCount === 1;
            } catch (error) {
                throw mapError(error)
            }
        },

        updateTask: async (
            _: unknown,
            { id, input }: { id: string; input: any },
            context: Context
        ) => {
            try {
                const userId = ensureAuthenticated(context);
                const task = await context.models.Task.findOne({ _id: id, userId });

                if (!task) throw new NotFoundError("Task not found");

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