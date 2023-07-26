import { gql } from "@apollo/client";

export const ALL_ALERTS = gql`
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
      feed {
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

export const GET_SUBSCRIPTIONS = gql`
  query FetchSubscriptions {
    listAllSubscription {
      certaintyArray
      countryIds
      id
      severityArray
      subscribeBy
      subscriptionName
      urgencyArray
      userId
    }
  }
`;

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
