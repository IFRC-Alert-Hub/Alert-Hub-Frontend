export interface SubscriptionItem {
  id: string;
  userId: number;
  subscriptionName: string;
  countryIds: number[];
  districtIds: number[];
  urgencyArray: string[];
  severityArray: string[];
  certaintyArray: string[];
  subscribeBy: string[];
}

export interface UpdatedSubscriptionItem {
  id: string;
  userId: number;
  subscriptionName: string;
  countryIds: number[];
  districtIds: number[];
  urgencyArray: string[];
  severityArray: string[];
  certaintyArray: string[];
  subscribeBy: string[];
  countryNames: string[];
  districtNames: string[];
}

export interface SubscriptionQueryResult {
  [key: string]: any;
  subscriptionList: SubscriptionItem[];
}

export interface SubscriptionForm {
  [key: string]: string | string[] | number[] | undefined;
  id?: string;
  subscriptionName: string;
  countryIds: number[];
  districtIds: number[];
  urgencyArray: string[];
  severityArray: string[];
  certaintyArray: string[];
  subscribeBy: string[];
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
  countryId: string;
  countryName: string;
  districts: {
    districtId: string;
    districtName: string;
  }[];
};

export type DistrictOptionsType = {
  districtId: string;
  districtName: string;
  countryId: string;
  countryName: string;
};
