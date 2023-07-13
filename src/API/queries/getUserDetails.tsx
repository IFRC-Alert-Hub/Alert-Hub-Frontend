import { gql } from "@apollo/client";

export const GET_USER_DETAILS = gql`
  query FetchUserProfile {
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
