import mongoose from "mongoose";
import { Context } from "../../context";
import { detectCityWithNLP } from "../../lib/helper";
import { mapError, NotFoundError } from "../../lib/error";
import { ensureAuthenticated, parseToISOString } from "../../lib/helper";

type TaskCityMap = Record<string, string>;
export const resolvers = {
    Query: {
        tasks: async (_: unknown, __: unknown, context: Context) => {
            try {
                const userId = ensureAuthenticated(context);
                const tasks = await context.models.Task.find({ userId }).sort({ createdAt: -1 });
                const taskCityMap: TaskCityMap = {};

                tasks.forEach(task => {
                    const city = detectCityWithNLP(task.name);
                    if (city) {
                        taskCityMap[task.id] = city;
                    }
                });
                const WEATHER_API = process.env.WEATHER_API_URL
                if (!WEATHER_API) throw new NotFoundError('aws weather api url not found')

                let weatherMap: Record<string, number> = {};

                if (Object.keys(taskCityMap).length > 0) {
                    const response = await fetch(`${WEATHER_API}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ taskCityMap }),
                    });

                    weatherMap = await response.json();
                }
                return tasks.map(task => {
                    const temperatureInCelsius: number = weatherMap[task.id];
                    if (temperatureInCelsius !== undefined) {
                        task.note = `${temperatureInCelsius} °C`;
                    }
                    return task;
                })
            } catch (error) {
                throw mapError(error)
            }
        },
    },

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