
export const typeDefs = `#graphql
  scalar DateTime

  enum Tag {
    URGENT
    NOT_URGENT
    HIGH
    MEDIUM
    LOW
  }

  type Task {
    id: ID!
    name: String!
    dueDate: DateTime
    tag: Tag
    note: String
    completed: Boolean!
  }

  input CreateTaskInput {
    name: String!
    dueDate: DateTime
    tag: Tag
    note: String
    completed: Boolean
  }

   input UpdateTaskInput {
    name: String
    dueDate: DateTime
    tag: Tag
    note: String
    completed: Boolean
  }


  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    toggleTask(id: ID!): Task!
    deleteTask(id: ID!): Boolean!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
  }
`;