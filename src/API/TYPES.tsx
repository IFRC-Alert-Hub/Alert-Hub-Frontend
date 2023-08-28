export interface SubscriptionItem {
  id: string;
  userId: number;
  subscriptionName: string;
  countryIds: number[];
  admin1Ids: number[];
  urgencyArray: string[];
  severityArray: string[];
  certaintyArray: string[];
  subscribeBy: string[];
  sentFlag: number;
}

export interface UpdatedSubscriptionItem {
  id: string;
  userId: number;
  subscriptionName: string;
  countryIds: number[];
  admin1Ids: number[];
  urgencyArray: string[];
  severityArray: string[];
  certaintyArray: string[];
  subscribeBy: string[];
  sentFlag: number;
  countryNames: string[];
  admin1Names: string[];
  sentFlagName: string;
}

export interface SubscriptionQueryResult {
  [key: string]: any;
  subscriptionList: SubscriptionItem[];
}

export interface SubscriptionForm {
  [key: string]: string | string[] | number | number[] | undefined;
  id?: string;
  subscriptionName: string;
  countryIds: number[];
  admin1Ids: number[];
  urgencyArray: string[];
  severityArray: string[];
  certaintyArray: string[];
  subscribeBy: string[];
  sentFlag: number;
}

export interface CountryType {
  [key: string]: string;
  id: string;
  name: string;
}

export interface ContinentType {
  id: string;
  name: string;
  countrySet: CountryType[];
}

export type CountryOptionsType = {
  id: number;
  name: string;
  admin1s: {
    id: number;
    name: string;
  }[];
};

export type Admin1OptionsType = {
  admin1Id: number;
  admin1Name: string;
  countryId: number;
  countryName: string;
};

export type SubscriptionAlertsType = {
  id: number;
  event: string;
  category: string;
  admin1: string[];
  sent: string;
};
