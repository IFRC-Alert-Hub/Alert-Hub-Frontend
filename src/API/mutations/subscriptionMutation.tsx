import { gql } from "@apollo/client";

export const ADD_SUBSCRIPTION = gql`
  mutation AddSubscription(
    $certaintyArray: [String] = []
    $countryIds: [Int] = []
    $severityArray: [String] = []
    $subscribeBy: [String] = []
    $subscriptionName: String = ""
    $urgencyArray: [String] = []
    $userId: Int = 0
  ) {
    createSubscription(
      userId: $userId
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
  mutation DeleteSubscription($subscriptionId: Int = 5) {
    deleteSubscription(subscriptionId: $subscriptionId) {
      subscription {
        id
      }
    }
  }
`;

export const UPDATE_SUBSCRIPTION = gql`
  mutation UpdateSubscription(
    $subscriptionId: Int!
    $userId: Int!
    $subscriptionName: String = ""
    $certaintyArray: [String] = ""
    $countryIds: [Int] = 10
    $severityArray: [String] = ""
    $subscribeBy: [String] = ""
    $urgencyArray: [String] = ""
  ) {
    updateSubscription(
      subscriptionId: $subscriptionId
      userId: $userId
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
        urgencyArray
        subscriptionName
        subscribeBy
        severityArray
        countryIds
        certaintyArray
      }
    }
  }
`;
