import "graphql-import-node";
import { makeExecutableSchema } from "graphql-tools";
import { resolvers as userResolvers, typeDefs as userTypeDefs } from "./entities/user";

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
});

export default schema;