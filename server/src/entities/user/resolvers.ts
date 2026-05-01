import { mapError, ValidationError } from '../../lib/error';
import { Context } from '../../context';
import { ensureAuthenticated } from '../../lib/helper';

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
  Mutation: {
    register: async (_: unknown, args: { email: string; password: string; userName: string }, context: Context) => {
      try {
        const existing = await context.models.User.findOne({ email: args.email });
        if (existing) throw new ValidationError("Email already registered");

        const user = await context.models.User.create({
          email: args.email,
          password: args.password,
          name: args.userName,
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

    login: async (_: unknown, args: { email: string; password: string }, context: Context) => {
      try {
        const user = await context.models.User
          .findOne({ email: args.email })
          .select("+password");

        if (!user || !(await user.matchPassword(args.password))) {
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
