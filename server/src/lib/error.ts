import { GraphQLError } from "graphql";

export class AuthError extends Error {
  constructor(message = 'Authentication required') {
    super(message);
    this.name = 'AuthError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}


export function mapError(err: unknown) {
  if (err instanceof AuthError) {
    return new GraphQLError(err.message, {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  if (err instanceof NotFoundError) {
    return new GraphQLError(err.message, {
      extensions: { code: "NOT_FOUND" },
    });
  }

  if (err instanceof ValidationError) {
    return new GraphQLError(err.message, {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  return new GraphQLError("Something went wrong !, please try later", {
    extensions: { code: "INTERNAL_SERVER_ERROR" },
  });
}