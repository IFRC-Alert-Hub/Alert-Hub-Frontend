import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation MyMutation($email: String!) {
    resetPassword(email: $email) {
      errors {
        email
        session
        user
        userName
        verifyCode
      }
      success
    }
  }
`;

export const RESET_PASSWORD_CONFIRM = gql`
  mutation MyMutation($verifyCode: String!, $password: String!) {
    resetPasswordConfirm(verifyCode: $verifyCode, password: $password) {
      success
      errors {
        email
        user
        session
        userName
        verifyCode
      }
    }
  }
`;
