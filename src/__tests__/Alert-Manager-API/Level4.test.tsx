import axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";

import { useLevel4Data } from "../../Alert-Manager-API/Level4";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData: any = {
  info_id: 754779,
  areas: [
    {
      id: 1941990,
      area_desc: "Lake Malawi, Shire river, Lake Malombe, Lake Chilwa",
      altitude: "",
      ceiling: "",
      polygons: [
        {
          id: 771016,
          value:
            "-12.2541,34.0137 -13.3255,34.1675 -14.307,34.4641 -15.9191,35.9473 -13.8167,35.7495 -12.8546,35.0903 -11.8458,35.1782 -11.1568,34.9805 -10.4662,34.8706 -9.6007,34.6948 -9.2539,34.3652 -9.5357,33.75 -12.2541,34.0137",
        },
      ],
      circles: [
        {
          id: 771016,
          value:
            "-12.2541,34.0137 -13.3255,34.1675 -14.307,34.4641 -15.9191,35.9473 -13.8167,35.7495 -12.8546,35.0903 -11.8458,35.1782 -11.1568,34.9805 -10.4662,34.8706 -9.6007,34.6948 -9.2539,34.3652 -9.5357,33.75 -12.2541,34.0137",
        },
      ],
      geocodes: [
        {
          id: 771016,
          value:
            "-12.2541,34.0137 -13.3255,34.1675 -14.307,34.4641 -15.9191,35.9473 -13.8167,35.7495 -12.8546,35.0903 -11.8458,35.1782 -11.1568,34.9805 -10.4662,34.8706 -9.6007,34.6948 -9.2539,34.3652 -9.5357,33.75 -12.2541,34.0137",
        },
      ],
    },
  ],
};

test("useLevel4Data fetches data successfully from an API", async () => {
  mockedAxios.get.mockResolvedValue({
    data: mockData,
  });

  const { result, waitForNextUpdate } = renderHook(() => useLevel4Data());

  await act(async () => {
    result.current.refetch(754779);
    await waitForNextUpdate();
  });

  expect(result.current.data).toEqual(mockData);
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBe(null);
});

test("Data is empty or invalid", async () => {
  mockedAxios.get.mockResolvedValue({
    data: {},
  });

  const { result, waitForNextUpdate } = renderHook(() => useLevel4Data());

  await act(async () => {
    result.current.refetch(754779);
    await waitForNextUpdate();
  });

  expect(result.current.error).toEqual("Data is empty or invalid.");
});

test("ID does not exist", async () => {
  mockedAxios.get.mockResolvedValue({
    data: mockData,
  });

  const { result, waitForNextUpdate } = renderHook(() => useLevel4Data());

  await act(async () => {
    result.current.refetch(315151);
    await waitForNextUpdate();
  });

  expect(result.current.error).toEqual("ID does not exist");
});

const mockData2: any = {
  info_id: 754779,
  areas: [],
};

test("areas is empty", async () => {
  mockedAxios.get.mockResolvedValue({
    data: mockData2,
  });

  const { result, waitForNextUpdate } = renderHook(() => useLevel4Data());

  await act(async () => {
    result.current.refetch(754779);
    await waitForNextUpdate();
  });

  expect(result.current.error).toEqual("areas is empty");
});
