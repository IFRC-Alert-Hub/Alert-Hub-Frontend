import axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";
import { useLevel2Data } from "../../../APIs/Alert-Manager-API/Level2";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData: any = {
  country_id: 317,
  country_name: "Malawi",
  admin1s: [
    {
      id: 4973,
      name: "Central Region",
      polygon:
        "[[[34.58347025093466, -15.210452206748656], [34.59383888310726, -15.207803486276596], [34.60151306229015, -15.21352046308235], [34.614527127584395, -15.216757559220706], [34.63066884045815, -15.225011207854179], [34.64000601274429, -15.224821903986438]]]",
      multipolygon: null,
      filters: {
        urgency: ["Expected"],
        severity: ["Severe"],
        certainty: ["Likely"],
      },
    },
  ],
};

test("Level2 fetches successfully data from an API", async () => {
  mockedAxios.get.mockResolvedValue({
    data: mockData,
  });

  const { result, waitForNextUpdate } = renderHook(() => useLevel2Data());

  await act(async () => {
    result.current.refetch(317);
    await waitForNextUpdate();
  });
  expect(result.current.data).toEqual(mockData);
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBe(null);
});

test("ID does not exist", async () => {
  mockedAxios.get.mockResolvedValue({ data: mockData });

  // Render the hook
  const { result, waitForNextUpdate } = renderHook(() => useLevel2Data());

  await act(async () => {
    result.current.refetch(211);
    await waitForNextUpdate();
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toEqual("ID does not exist"); // Check error object
});
test("Data is empty or invalid.", async () => {
  mockedAxios.get.mockResolvedValue({ data: {} });

  // Render the hook
  const { result, waitForNextUpdate } = renderHook(() => useLevel2Data());

  await act(async () => {
    result.current.refetch(211);
    await waitForNextUpdate();
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toEqual("Data is empty or invalid.");
});

const mockData2: any = {
  country_id: 317,
  country_name: "Malawi",
  admin1s: [],
};

test("admin1", async () => {
  mockedAxios.get.mockResolvedValue({ data: mockData2 });

  // Render the hook
  const { result, waitForNextUpdate } = renderHook(() => useLevel2Data());

  await act(async () => {
    result.current.refetch(317);
    await waitForNextUpdate();
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toEqual("admin1 is empty");
});
