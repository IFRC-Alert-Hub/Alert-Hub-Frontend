import { gql, useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { cap_aggregator } from "./API_Links";

export const ALL_ALERTS_QUERY_1 = gql`
  query MyQuery($regionId: String, $iso3: String, $continentId: String) {
    listAlert(regionId: $regionId, iso3: $iso3, continentId: $continentId) {
      status
      source
      sent
      sender
      references
      scope
      restriction
      note
      msgType
      incidents
      identifier
      code
      addresses
      id
      country {
        id
        name
        region {
          name
        }
      }
      alertinfoSet {
        web
        urgency
        audience
        category
        certainty
        contact
        effective
        event
        eventCode
        headline
        expires
        instruction
        language
        onset
        responseType
        senderName
        severity
        id
        description
      }
      sourceFeed {
        url
        name
      }
    }
    listCountry {
      id
      iso3
      multipolygon
      name
      polygon
      centroid
      region {
        id
        name
        polygon
      }
    }
  }
`;

export const ALL_ALERTS_QUERY_2 = gql`
  query MyQuery($regionId: String, $iso3: String, $continentId: String) {
    listAlert(regionId: $regionId, iso3: $iso3, continentId: $continentId) {
      status
      source
      sent
      sender
      references
      scope
      restriction
      note
      msgType
      incidents
      identifier
      code
      addresses
      id
      country {
        id
        name
        region {
          name
        }
      }
      alertinfoSet {
        web
        urgency
        audience
        category
        certainty
        contact
        effective
        event
        eventCode
        headline
        expires
        instruction
        language
        onset
        responseType
        senderName
        severity
        id
        description
      }
      sourceFeed {
        url
        name
      }
    }
  }
`;

export const ALL_COUNTRIES = gql`
  query MyQuery {
    listCountry {
      centroid
      id
      iso3
      multipolygon
      name
      polygon
    }
  }
`;

export const GET_COUNTRY_BY_ISO3 = gql`
  query MyQuery($iso3: String) {
    listCountry(iso3: $iso3) {
      centroid
      id
      iso3
      multipolygon
      name
      polygon
    }
  }
`;

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
    listCountry {
      id
      name
    }
  }
`;

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

export default function TestPerformance() {
  const { loading, error } = useQuery(GET_COUNTRY_BY_ISO3, {
    client: cap_aggregator,
    fetchPolicy: "no-cache",
    variables: {
      iso3: "USA",
    },
  });
  return (
    <>
      {" "}
      {loading && (
        <CircularProgress sx={{ textAlign: "center" }} color="secondary" />
      )}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && <h1>afafsafsa</h1>}
    </>
  );
}
