import { AuthError, ValidationError } from '../../lib/error';
import { Context } from '../../context';


function ensureAuthenticated(context: Context) {
  if (!context.auth.user) {
    throw new AuthError('You must be logged in to perform this action.');
  }
  return context.auth.user.id;
}

export const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      const userId = ensureAuthenticated(context);
      const user = await context.models.User.findById(userId);
      if (!user) {
        return null;
      }
      return { id: user.id, email: user.email, userName: user.name };
    },
  },
  Mutation: {
    register: async (_: unknown, args: { email: string; password: string; userName: string }, context: Context) => {
      const existing = await context.models.User.findOne({ email: args.email });
      if (existing) throw new ValidationError("Email already registered");

      const user = await context.models.User.create({
        email: args.email,
        password: args.password,
        name: args.userName,
      });

      context.auth.login({ id: user.id });

      return {
        user: {
          id: user.id,
          email: user.email,
          userName: user.name,
        },
      };
    },
    login: async (_: unknown, args: { email: string; password: string }, context: Context) => {
      const user = await context.models.User
        .findOne({ email: args.email })
        .select("+password");

      if (!user || !(await user.matchPassword(args.password))) {
        throw new ValidationError("Invalid email or password");
      }

      context.auth.login({ id: user.id });

      return {
        user: {
          id: user.id,
          email: user.email,
          userName: user.name,
        }
      };
    },
    logout: async (_: unknown, _args: unknown, context: Context) => {
      context.auth.logout();
      return true;  
    }
  }
};
