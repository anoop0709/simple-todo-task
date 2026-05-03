import { mapError, NotFoundError, ValidationError } from '../../lib/error';
import { Context } from '../../context';
import { detectCityWithNLP, ensureAuthenticated } from '../../lib/helper';

type cityNamesInTaskMap = Record<string, string>;

export const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      try {
        const userId = ensureAuthenticated(context);
        const user = await context.models.User.findById(userId);
        if (!user) {
          return null;
        }
        const { id, email, name } = user
        return { id, email, userName: name };
      } catch {
        return null;
      }
    },
  },
  User: {
    tasks: async (parent: { id: string }, _: unknown, context: Context) => {
      const userId = parent.id;
      const tasks = await context.models.Task
        .find({ userId })
        .sort({ createdAt: -1 });

      const cityNamesInTaskMap: Record<string, string> = {};

      tasks.forEach(task => {
        const taskId = task._id.toString();
        const city = detectCityWithNLP(task.name);
        if (city) {
          cityNamesInTaskMap[taskId] = city;
        }
      });

      const WEATHER_API = process.env.WEATHER_API_URL;

      if (!WEATHER_API || !Object.keys(cityNamesInTaskMap).length) {
        return tasks;
      }

      let weatherMap: Record<string, number> = {};

      try {
        const response = await fetch(WEATHER_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cityNamesInTaskMap }),
        });

        if (response.ok) {
          weatherMap = await response.json();
        }
      } catch (err) {
        console.error("Weather API failed:", err);
      }

      return tasks.map(task => {
        const obj = task.toObject();
        const taskId = obj._id.toString();
        const temperature = weatherMap[taskId];

        return {
          ...obj,
          id: taskId,
          note:
            temperature !== undefined
              ? `${temperature} °C`
              : obj.note,
        };
      });
    },
  },

  Mutation: {
    register: async (_: unknown, { input }: { input: { email: string; password: string; userName: string } }, context: Context) => {
      try {
        const existing = await context.models.User.findOne({ email: input.email });
        if (existing) throw new ValidationError("Email already registered");

        const user = await context.models.User.create({
          email: input.email,
          password: input.password,
          name: input.userName,
        });

        context.auth.login({ id: user.id });
        const { id, email, name } = user;

        return {
          user: {
            id,
            email,
            userName: name,
          },
        };
      } catch (error) {
        throw mapError(error)
      }
    },

    login: async (_: unknown, { input }: { input: { email: string; password: string; } }, context: Context) => {
      try {
        const user = await context.models.User
          .findOne({ email: input.email })
          .select("+password");

        if (!user || !(await user.matchPassword(input.password))) {
          throw new ValidationError("Invalid email or password");
        }

        context.auth.login({ id: user.id });
        const { id, email, name } = user;

        return {
          user: {
            id,
            email,
            userName: name,
          },
        };
      } catch (error) {
        throw mapError(error)
      }
    },

    logout: async (_: unknown, _args: unknown, context: Context) => {
      context.auth.logout();
      return true;
    }
  }
};
