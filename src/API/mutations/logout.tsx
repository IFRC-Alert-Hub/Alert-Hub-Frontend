import { gql } from "@apollo/client";

export const LOGOUT = gql`
  mutation MyMutation {
    logout {
      id
      success
      errors {
        email
        session
        user
        userName
        verifyCode
      }
    }
  }
`;
