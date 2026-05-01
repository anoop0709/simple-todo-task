import { gql } from "@apollo/client";


export const ME = gql`
  query {
    me {
      id
      email
      userName
    }
  }
`;

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