import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation MyMutation {
    login(email: "", password: "") {
      payload
      refreshExpiresIn
      token
    }
  }
`;
