import { gql } from "@apollo/client";


export const GET_ME_WITH_TASKS = gql`
  query GetMeWithTasks {
  me {
    id
    email
    userName
    tasks {
      id
      name
      dueDate
      tag
      note
      completed
    }
  }
}
`;