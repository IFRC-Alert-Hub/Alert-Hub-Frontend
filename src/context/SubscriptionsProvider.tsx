import { createContext } from "react";

export type SubscriptionType = {
  id: number;
  title: string;
  countries: string[];
  urgency: string[];
  severity: string[];
  certainty: string[];
  methods: string[];
};

const initState: SubscriptionType[] = [
  {
    id: 0,
    title: "Asian flood",
    countries: ["Egypt", "South Africa", "Nigeria"],
    urgency: ["Future"],
    severity: ["Extreme, Severe"],
    certainty: ["Observed"],
    methods: ["Email, SMS"],
  },
  {
    id: 1,
    title: "Africa-v1",
    countries: ["Egypt", "South Africa", "Nigeria", "Kenya", "Morocco"],
    urgency: ["Future, Expected"],
    severity: ["Severe"],
    certainty: ["Likely"],
    methods: ["Email"],
  },
];

// const initState: SubscriptionType[] = []

export type SubscriptionsStateType = { subscriptions: SubscriptionType[] };

const initContextState: SubscriptionsStateType = { subscriptions: [] };
