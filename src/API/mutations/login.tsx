import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation MyMutation {
    login(email: "1234@1234.com", password: "1234") {
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
