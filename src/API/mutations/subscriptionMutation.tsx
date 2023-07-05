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
