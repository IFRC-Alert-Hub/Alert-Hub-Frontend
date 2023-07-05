import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation MyMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      payload
      refreshExpiresIn
      token
    }
  }
`;
