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
  sentFlag: number;
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
  sentFlag: number;
  countryNames: string[];
  districtNames: string[];
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
  districtIds: number[];
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
  districts: {
    id: number;
    name: string;
  }[];
};

export type DistrictOptionsType = {
  districtId: number;
  districtName: string;
  countryId: number;
  countryName: string;
};
