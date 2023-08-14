import { gql } from "@apollo/client";

export const ADD_SUBSCRIPTION = gql`
  mutation AddSubscription(
    $certaintyArray: [String] = ""
    $countryIds: [Int]!
    $admin1Ids: [Int]!
    $sentFlag: Int!
    $severityArray: [String] = ""
    $subscribeBy: [String] = ""
    $subscriptionName: String = ""
    $urgencyArray: [String] = ""
  ) {
    createSubscription(
      sentFlag: $sentFlag
      subscriptionName: $subscriptionName
      urgencyArray: $urgencyArray
      subscribeBy: $subscribeBy
      severityArray: $severityArray
      countryIds: $countryIds
      certaintyArray: $certaintyArray
      admin1Ids: $admin1Ids
    ) {
      subscription {
        certaintyArray
        countryIds
        admin1Ids
        id
        sentFlag
        severityArray
        subscribeBy
        subscriptionName
        urgencyArray
        userId
      }
    }
  }
`;

export const DELETE_SUBSCRIPTION = gql`
  mutation DeleteSubscription($subscriptionId: Int = 10) {
    deleteSubscription(subscriptionId: $subscriptionId) {
      errorMessage
      success
    }
  }
`;

export const UPDATE_SUBSCRIPTION = gql`
  mutation UpdateSubscription(
    $subscriptionId: Int!
    $subscriptionName: String = ""
    $certaintyArray: [String] = ""
    $countryIds: [Int]!
    $admin1Ids: [Int]!
    $sentFlag: Int!
    $severityArray: [String] = ""
    $subscribeBy: [String] = ""
    $urgencyArray: [String] = ""
  ) {
    updateSubscription(
      sentFlag: $sentFlag
      subscriptionId: $subscriptionId
      subscriptionName: $subscriptionName
      countryIds: $countryIds
      admin1Ids: $admin1Ids
      urgencyArray: $urgencyArray
      severityArray: $severityArray
      certaintyArray: $certaintyArray
      subscribeBy: $subscribeBy
    ) {
      success
      errorMessage
    }
  }
`;
