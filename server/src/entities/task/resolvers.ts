import mongoose from "mongoose";
import { Context } from "../../context";

function requireAuth(context: Context) {
    if (!context.auth.user) {
        throw new Error("Not authenticated");
    }
    return context.auth.user.id;
}

export const resolvers = {
    Query: {
        tasks: async (_: unknown, __: unknown, context: Context) => {
            const userId = requireAuth(context);

            return context.models.Task.find({ userId }).sort({ createdAt: -1 });
        },
    },

    Mutation: {
        createTask: async (
            _: unknown,
            { input }: any,
            context: Context
        ) => {
            const userId = requireAuth(context);

            const task = await context.models.Task.create({
                ...input,
                dueDate: input?.dueDate
                    ? new Date(input.dueDate).toISOString()
                    : undefined,
                userId: new mongoose.Types.ObjectId(userId),
            });

            return task;
        },

        toggleTask: async (
            _: unknown,
            { id }: { id: string },
            context: Context
        ) => {
            const userId = requireAuth(context);

            const task = await context.models.Task.findOne({ _id: id, userId });

            if (!task) throw new Error("Task not found");

            task.completed = !task.completed;
            await task.save();

            return task;
        },

        deleteTask: async (
            _: unknown,
            { id }: { id: string },
            context: Context
        ) => {
            const userId = requireAuth(context);

            const res = await context.models.Task.deleteOne({ _id: id, userId });

            return res.deletedCount === 1;
        },
        updateTask: async (
            _: unknown,
            { id, input }: { id: string; input: any },
            context: Context
        ) => {
            const userId = requireAuth(context);

            const task = await context.models.Task.findOne({ _id: id, userId });

            if (!task) throw new Error("Task not found");

            if (input.dueDate) {
                const parsed = new Date(input.dueDate);
                input.dueDate = !isNaN(parsed.getTime())
                    ? parsed.toISOString()
                    : undefined;
            }

            Object.assign(task, input);

            await task.save();

            return task;
        },
    },
};