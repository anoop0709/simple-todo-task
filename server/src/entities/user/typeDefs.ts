export const typeDefs = `#graphql
type User {
  id: ID!
  email: String!
  userName: String!
  tasks: [Task!]!
}

type AuthResponse {
    user: User!
}

input RegisterUserInput {
    email: String!
    password: String!
    userName: String!
}
input LoginUserInput {
    email: String!
    password: String!
}

type Query {
    me: User
}

type Mutation {
    register(input: RegisterUserInput!): AuthResponse!
    login(input: LoginUserInput!): AuthResponse!
    logout: Boolean!
}
`;