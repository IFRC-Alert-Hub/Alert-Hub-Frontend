import { gql } from "@apollo/client";

export const ADD_SUBSCRIPTION = gql`
  mutation AddSubscription(
    $certaintyArray: [String] = []
    $countryIds: [Int] = []
    $severityArray: [String] = []
    $subscribeBy: [String] = []
    $subscriptionName: String = ""
    $urgencyArray: [String] = []
  ) {
    createSubscription(
      subscriptionName: $subscriptionName
      countryIds: $countryIds
      urgencyArray: $urgencyArray
      severityArray: $severityArray
      certaintyArray: $certaintyArray
      subscribeBy: $subscribeBy
    ) {
      subscription {
        id
        userId
        subscriptionName
        countryIds
        urgencyArray
        severityArray
        certaintyArray
        subscribeBy
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
    $countryIds: [Int] = 10
    $severityArray: [String] = ""
    $subscribeBy: [String] = ""
    $urgencyArray: [String] = ""
  ) {
    updateSubscription(
      subscriptionId: $subscriptionId
      subscriptionName: $subscriptionName
      countryIds: $countryIds
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
