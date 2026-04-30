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