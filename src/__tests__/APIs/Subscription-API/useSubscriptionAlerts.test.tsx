import axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";
import useSubscriptionAlerts from "../../../APIs/Subscription-API/useSubscriptionAlerts";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData: any = {
  testData: "data",
};

test("GetAllAlerts fetches successfully data from an API", async () => {
  mockedAxios.get.mockResolvedValue({ data: mockData });

  const { result, waitForNextUpdate } = renderHook(() =>
    useSubscriptionAlerts("12")
  );

  await act(async () => {
    await waitForNextUpdate();
  });

  expect(result.current.isLoading).toBe(false);
  expect(result.current.data).toEqual(mockData);
  expect(result.current.error).toBe(null);
});

test("emptyData", async () => {
  // Mock the axios.get function to return mock data

  // Render the hook
  const { result, waitForNextUpdate } = renderHook(() =>
    useSubscriptionAlerts("12")
  );

  // Act: Call refetch with a null alert ID and wait for the update
  await act(async () => {
    await waitForNextUpdate();
  });

  // Assert the expected states after the update
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toEqual(
    "Cannot read properties of undefined (reading 'data')"
  ); // Check error object
});
