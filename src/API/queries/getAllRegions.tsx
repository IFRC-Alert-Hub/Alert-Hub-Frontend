import { gql } from "@apollo/client";

export const GET_ALL_REGIONS = gql`
  query MyQuery {
    listRegion {
      centroid
      id
      name
      polygon
    }
  }
`;
