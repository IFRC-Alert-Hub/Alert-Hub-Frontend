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
  [key: string]: string;
  id: string;
  name: string;
}

export interface ContinentType {
  id: string;
  name: string;
  countrySet: CountryType[];
}
