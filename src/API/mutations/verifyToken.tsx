import { gql } from "@apollo/client";

export const VERIFY_TOKEN = gql`
  mutation MyMutation {
    verifyToken {
      payload
    }
  }
`;
