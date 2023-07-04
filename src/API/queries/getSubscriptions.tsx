import { gql } from "@apollo/client";

export interface SubscriptionItem {
  id: number;
  userId: number;
  subscriptionName: string;
  countryIds: string[];
  urgencyArray: string[];
  severityArray: string[];
  certaintyArray: string[];
  subscribeBy: string[];
}

export interface SubscriptionQueryResult {
  [key: string]: any;
  subscriptionList: SubscriptionItem[];
}

export const GET_SUBSCRIPTIONS = gql`
  query FetchSubscriptions($userId: Int = 10) {
    listSubscriptionByUserId(userId: $userId) {
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
