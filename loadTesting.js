import http from "k6/http";
import { sleep, check } from "k6";
import { Trend } from "k6/metrics";

// Create a Trend to collect response time data
let responseTimes = new Trend("response_times");

export let options = {
  stages: [{ duration: "10m", target: 10000 }],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const res = http.get("https://alert-hub-frontend.azurewebsites.net/");

  responseTimes.add(res.timings.duration);

  check(res, { "status is 200": (r) => r.status === 200 });

  sleep(2);
}
