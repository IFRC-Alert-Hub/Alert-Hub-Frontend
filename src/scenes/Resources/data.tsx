export type ResourceDataType = {
  title: string;
  content: string;
  link: string;
};

const BASE_URL = "https://github.com/IFRC-Alert-Hub";

export const resourceData = [
  {
    title: "Alert Hub APIs",
    content:
      "Alert Hub APIs enable third-party developers and rebroadcasters to access alerts and alert feed.",
    link: "https://github.com/IFRC-Alert-Hub/Alert-Hub-CAP-Aggregator#api-documentation",
  },
  {
    title: "Alert Hub Frontend",
    content:
      "This repository contains the frontend code for the IFRC Alert Hub. The goal of the IFRC Alert Hub is to ensure that communities everywhere receive the most timely and effective emergency alerting possible, and can thereby take action to safeguard their lives and livelihoods.",
    link: `${BASE_URL}/Alert-Hub-Frontend#readme`,
  },
  {
    title: "Alert Hub CAP Aggregator",
    content:
      "The CAP Aggregator is an alert aggregation service built for IFRC's Alert Hub. Public alerts use the Common Alerting Protocol (CAP) Version 1.2 standard.",
    link: `${BASE_URL}/Alert-Hub-CAP-Aggregator#readme`,
  },
  {
    title: "Alert Hub Alert Manager",
    content:
      "The Alert Manager is an alert distribution service built for IFRC's Alert Hub. Public alerts use the Common Alerting Protocol (CAP) Version 1.2 standard.",
    link: `${BASE_URL}/Alert-Hub-Alert-Manager#readme`,
  },
  {
    title: "Alert Hub Subscription System",
    content:
      "This project serves as a back-end application of IFRC Alert Hub designed to work with IFRC/UCL Alert Hub CAP Aggregator. This application relies on it to get real-time updates about alerts.",
    link: `${BASE_URL}/Alert-Hub-Subscription-System#readme`,
  },
];
