import { gql } from "@apollo/client";

export const GET_ALL_COUNTRIES = gql`
  query MyQuery {
    listRegion {
      id
      name
      countrySet {
        id
        name
      }
    }
  }
`;
