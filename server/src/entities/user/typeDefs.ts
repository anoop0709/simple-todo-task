export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    userName: String!
}

type AuthPayload {
    user: User!
}

type Query {
    me: User
}

type Mutation {
    register(email: String!, password: String!, userName: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean!
}
`;