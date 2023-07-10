import { gql } from "@apollo/client";

export const getUserDetails = gql`
  query MyQuery {
    profile {
      avatar
      city
      country
      email
      id
      firstName
      lastName
      phoneNumber
    }
  }
`;
