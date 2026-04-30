import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        userName
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $userName: String!) {
    register(email: $email, password: $password, userName: $userName) {
      user {
        id
        email
        userName
      }
    }
  }
`;

export const LOGOUT = gql`
mutation Logout {
logout
}
`;

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      name
      dueDate
      tag
      note
      completed
    }
  }
`;

export const TOGGLE_TASK = gql`
  mutation ToggleTask($id: ID!) {
    toggleTask(id: $id) {
      id
      completed
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      name
      dueDate
      tag
      note
      completed
    }
  }
`;