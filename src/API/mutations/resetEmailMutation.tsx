import { gql } from "@apollo/client";

export const RESET_EMAIL = gql`
  mutation ResetEmail {
    resetEmail {
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

export const RESET_EMAIL_CONFIRM = gql`
  mutation resetEmailConfirm($verifyCode: String = "") {
    resetEmailConfirm(verifyCode: $verifyCode) {
      success
      token
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

export const SEND_NEW_VEIRFY_EMAIL = gql`
  mutation SendNewVerifyEmail($newEmail: String = "", $token: String = "") {
    sendNewVerifyEmail(newEmail: $newEmail, token: $token) {
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

export const NEW_EMAIL_CONFIRM = gql`
  mutation NewEmailConfirm($newEmail: String = "", $verifyCode: String = "") {
    newEmailConfirm(newEmail: $newEmail, verifyCode: $verifyCode) {
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
