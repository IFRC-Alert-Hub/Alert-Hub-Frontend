import { gql } from "@apollo/client";

export const LOGOUT = gql`
  mutation MyMutation {
    logout {
      deleted
    }
  }
`;
