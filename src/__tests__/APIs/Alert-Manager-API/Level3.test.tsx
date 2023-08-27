import axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";

import { useLevel3Data } from "../../../APIs/Alert-Manager-API/Level3";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData: any = {
  admin1_id: 4973,
  admin1_name: "Central Region",
  alerts: [
    {
      id: 942483,
      url: "https://cap-sources.s3.amazonaws.com/mw-met-en/2023-08-25-14-35-19.xml",
      identifier: "urn:oid:2.49.0.1.454.0.2023.8.25.14.35.19",
      sender: "chibanthowasa@gmail.com",
      sent: "2023-08-25 14:35:19+00:00",
      status: "Actual",
      msg_type: "Alert",
      source: "",
      scope: "Public",
      restriction: "",
      addresses: "",
      code: "",
      note: "",
      references: "",
      incidents: "",
      admin1_known: true,
      info: [
        {
          id: 754779,
          language: "en",
          category: "Met",
          event: "Strong Mwera winds",
          response_type: "Prepare",
          urgency: "Expected",
          severity: "Severe",
          certainty: "Likely",
          audience: "",
          event_code: "",
          effective: "2023-08-25 14:35:19+00:00",
          onset: "2023-08-26 23:00:00+00:00",
          expires: "2023-08-31 20:00:21+00:00",
          sender_name:
            "Malawi Department of Climate Change and Meteorological Services",
          headline: "Mwera winds over Lake Malawi and other water bodies",
          description:
            "Strong Mwera winds with speeds of up to 45km/h are expected to be blowing over Lake Malawi,Lake Malombe,Lake Chilwa and Shire river, which are expected to cause high water waves of  greater than 2  meters.",
          instruction:
            "Avoid swimming, fishing and  sailing over Lake Malawi,Shire River,Lake Malombe,Lake chilwa during this period to avoid loss of life and property.",
          web: "http://www.metmalawi.gov.mw/",
          contact: "nationalmetcentre@gmail.com",
          parameter: [],
        },
      ],
    },
  ],
};

test("useLevel3Data fetches data successfully from an API", async () => {
  mockedAxios.get.mockResolvedValue({
    data: mockData,
  });

  const { result, waitForNextUpdate } = renderHook(() => useLevel3Data());

  await act(async () => {
    result.current.refetch(4973);
    await waitForNextUpdate();
  });

  expect(result.current.data).toEqual(mockData);
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBe(null);
});

const mockData2: any = {
  admin1_id: 4973,
  admin1_name: "Central Region",
  alerts: [],
};

test("Data is empty or invalid.", async () => {
  mockedAxios.get.mockResolvedValue({
    data: {},
  });

  const { result, waitForNextUpdate } = renderHook(() => useLevel3Data());

  await act(async () => {
    result.current.refetch(4973);
    await waitForNextUpdate();
  });

  expect(result.current.error).toEqual("Data is empty or invalid.");
});

test("ID does not exist", async () => {
  mockedAxios.get.mockResolvedValue({
    data: mockData,
  });

  const { result, waitForNextUpdate } = renderHook(() => useLevel3Data());

  await act(async () => {
    result.current.refetch(51131);
    await waitForNextUpdate();
  });

  expect(result.current.error).toEqual("ID does not exist");
});
