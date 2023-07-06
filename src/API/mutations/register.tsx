import { gql } from "@apollo/client";

export const VERIFY_EMAIL = gql`
  mutation MyMutation($email: String!) {
    sendVerifyEmail(email: $email) {
      errors
      success
    }
  }
`;

export const REGISTER = gql`
  mutation MyMutation(
    $email: String!
    $password: String!
    $verifyCode: String!
  ) {
    register(email: $email, password: $password, verifyCode: $verifyCode) {
      errors
      success
    }
  }
`;
