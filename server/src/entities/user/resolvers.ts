import { mapError, NotFoundError, ValidationError } from '../../lib/error';
import { Context } from '../../context';
import { detectCityWithNLP, ensureAuthenticated } from '../../lib/helper';

type cityNamesInTaskMap = Record<string, string>;

export const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      const userId = ensureAuthenticated(context);
      const user = await context.models.User.findById(userId);
      if (!user) {
        return null;
      }
      const { id, email, name } = user
      return { id, email, userName: name };
    },
  },

  User: {
    tasks: async (parent: { id: string }, __: unknown, context: Context) => {
      try {
        const userId = parent.id;
        const tasks = await context.models.Task.find({ userId }).sort({ createdAt: -1 });
        const cityNamesInTaskMap: cityNamesInTaskMap = {};

        tasks.forEach(task => {
          const city = detectCityWithNLP(task.name);
          if (city) {
            cityNamesInTaskMap[task.id] = city;
          }
        });
        const WEATHER_API = process.env.WEATHER_API_URL
        if (!WEATHER_API) throw new NotFoundError('aws weather api url not found')

        if (!Object.keys(cityNamesInTaskMap).length) {
          return tasks
        }
        const response = await fetch(`${WEATHER_API}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cityNamesInTaskMap }),
        });
        if (!response.ok) {
          return tasks;
        }

        const weatherMap: Record<string, number> = await response.json();

        return tasks.map(task => {
          const taskObj = task.toObject();
          const taskId = taskObj._id.toString();
          const temperatureInCelsius: number = weatherMap[taskId];
          return {
            ...taskObj,
            id: taskId,
            note:
              temperatureInCelsius !== undefined
                ? `${temperatureInCelsius} °C`
                : taskObj.note,
          };
        })
      } catch (error) {
        throw mapError(error)
      }
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
