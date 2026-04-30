import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      name
      dueDate
      tag
      note
      completed
    }
  }
`;