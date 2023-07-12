import { gql } from "@apollo/client";

export const GET_SUBSCRIPTIONS = gql`
  query FetchSubscriptions($userId: Int = 0) {
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

export interface SubscriptionItem {
  id: string;
  userId: number;
  subscriptionName: string;
  countryIds: number[];
  urgencyArray: string[];
  severityArray: string[];
  certaintyArray: string[];
  subscribeBy: string[];
}

export interface SubscriptionQueryResult {
  [key: string]: any;
  subscriptionList: SubscriptionItem[];
}

export interface SubscriptionForm {
  [key: string]: string | string[] | string[] | undefined;
  id?: string;
  title: string;
  countries: string[];
  urgency: string[];
  severity: string[];
  certainty: string[];
  methods: string[];
}

export interface CountryType {
  id: string;
  name: string;
}

export interface ContinentType {
  id: string;
  name: string;
  countrySet: CountryType[];
}
