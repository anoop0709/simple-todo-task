import "graphql-import-node";
import { makeExecutableSchema } from "graphql-tools";
import { resolvers as userResolvers, typeDefs as userTypeDefs } from "./entities/user";
import { resolvers as taskResolvers, typeDefs as taskTypeDefs } from "./entities/task";
import { DateTimeResolver } from "graphql-scalars";


const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, taskTypeDefs],
  resolvers: [{ DateTime: DateTimeResolver },
    userResolvers, taskResolvers,],
});

export default schema;