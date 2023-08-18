import axios from "axios";
import { GetAlertInfoByAlertID } from "../AlertInfo";
import { Alert } from "../types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("GetAlertInfoByAlertID fetches successfully data from an API", async () => {
  const mockData: Alert = {
    id: 1,
    url: "",
    identifier: "",
    sent: "",
    sender: "",
    msg_type: "",
    source: "",
    scope: "",
    restriction: "",
    addresses: "",
    code: "",
    note: "",
    references: "",
    incidents: "",
    info: [],
    admin1_known: false,
    region: "",
    country: "",
    admin1: [""],
    status: "",
  };

  mockedAxios.get.mockResolvedValue({ mockData });

  const { data } = GetAlertInfoByAlertID();

  expect(data).toEqual(mockData);
});

// import { renderHook, act } from "@testing-library/react";
// import { GetAlertInfoByAlertID } from "../AlertInfo";

// test("GetAlertInfoByAlertID fetches successfully data from an API", () => {
//   const { result } = renderHook(() => GetAlertInfoByAlertID);

//   expect(result.current).toBe(false);
// });
