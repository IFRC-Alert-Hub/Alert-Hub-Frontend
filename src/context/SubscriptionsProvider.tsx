import { createContext } from "react";

export type SubscriptionType = {
  id?: number;
  title: string;
  countries: string[];
  urgency: string[];
  severity: string[];
  certainty: string[];
  methods: string[];
};

type SubscriptionListStateType = { subscriptionList: SubscriptionType[] };

// const initSubscriptionListState: SubscriptionListStateType = { subscriptionList: [
//   {
//     id: 0,
//     title: "Asian flood",
//     countries: ["Egypt", "South Africa", "Nigeria"],
//     urgency: ["Future"],
//     severity: ["Extreme, Severe"],
//     certainty: ["Observed"],
//     methods: ["Email, SMS"],
//   },
//   {
//     id: 1,
//     title: "Africa-v1",
//     countries: ["Egypt", "South Africa", "Nigeria", "Kenya", "Morocco"],
//     urgency: ["Future, Expected"],
//     severity: ["Severe"],
//     certainty: ["Likely"],
//     methods: ["Email"],
//   },
// ]};

const initSubscriptionListState: SubscriptionListStateType = {
  subscriptionList: [],
};

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  FETCH: "FETCH",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
  SUBMIT: "SUBMIT",
  RESET: "RESET",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: SubscriptionType;
};

// const reducer = (
//   state: SubscriptionListStateType,
//   action: ReducerAction
// ): SubscriptionListStateType => {
//   switch (action.type) {
//     case REDUCER_ACTION_TYPE.FETCH: {
//       if (!action.payload) {
//         throw new Error("action.payload missing in FETCH action");
//       }
//       return { ...state };
//     }
//     case REDUCER_ACTION_TYPE.ADD: {
//       if (!action.payload) {
//         throw new Error("action.payload missing in ADD action");
//       }
//     }
//     case REDUCER_ACTION_TYPE.REMOVE: {
//       if (!action.payload) {
//         throw new Error("action.payload missing in REMOVE action");
//       }
//     }
//     case REDUCER_ACTION_TYPE.UPDATE: {
//       if (!action.payload) {
//         throw new Error("action.payload missing in UPDATE action");
//       }
//     }
//     case REDUCER_ACTION_TYPE.SUBMIT: {
//       if (!action.payload) {
//         throw new Error("action.payload missing in SUBMIT action");
//       }
//     }
//     case REDUCER_ACTION_TYPE.RESET: {
//       if (!action.payload) {
//         throw new Error("action.payload missing in RESET action");
//       }
//     }
//     default:
//       throw new Error("Unidentified reducer action type");
//   }
// };
