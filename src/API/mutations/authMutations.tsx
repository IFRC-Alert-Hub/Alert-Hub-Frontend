import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation MyMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      payload
      refreshExpiresIn
      user {
        avatar
        city
        country
        email
        firstName
        id
        lastName
        phoneNumber
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation MyMutation {
    logout {
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

export const VERIFY_EMAIL = gql`
  mutation MyMutation($email: String!) {
    sendVerifyEmail(email: $email) {
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

export const REGISTER = gql`
  mutation MyMutation(
    $email: String!
    $password: String!
    $verifyCode: String!
  ) {
    register(email: $email, password: $password, verifyCode: $verifyCode) {
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
  mutation MyMutation(
    $verifyCode: String!
    $password: String!
    $email: String!
  ) {
    resetPasswordConfirm(
      verifyCode: $verifyCode
      password: $password
      email: $email
    ) {
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

export const VERIFY_TOKEN = gql`
  mutation MyMutation {
    verifyToken {
      payload
    }
  }
`;
