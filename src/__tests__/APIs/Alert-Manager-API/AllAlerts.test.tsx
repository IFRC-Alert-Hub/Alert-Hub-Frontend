import axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";
import { GetAllAlerts } from "../../../APIs/Alert-Manager-API/AllAlerts";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData: any = {
  alerts: [
    {
      id: 941824,
      url: "https://apiprevmet3.inmet.gov.br/avisos/rss/44474",
      identifier: "urn:oid:2.49.0.0.76.0.2023.20926.2",
      sender: "info.aviso@inmet.gov.br",
      sent: "2023-08-24 06:00:00+00:00",
      source: "",
      region: "Americas",
      country: "Brazil",
      admin1: [
        "Maranhao",
        "Ceara",
        "Piaui",
        "Pernambuco",
        "Tocantins",
        "Bahia",
        "Goias",
        "Minas Gerais",
      ],
      info: [
        {
          category: "Met",
          event: "Onda de Calor",
        },
      ],
    },
    {
      id: 941825,
      url: "https://feeds.meteoalarm.org/api/v1/warnings/feeds-bulgaria/7f46df70-a824-46e6-a231-47ccd5081154?index_info=1&index_area=20&index_geocode=0",
      identifier: "2.49.0.0.100.0.BG.230825120000.250823114509Z1421",
      sender: "meteoalarm@meteo.bg",
      sent: "2023-08-25 09:00:00+00:00",
      source: "",
      region: "Europe",
      country: "Bulgaria",
      admin1: ["Unknown"],
      info: [
        {
          category: "Met",
          event: "Горещо!",
        },
        {
          category: "Met",
          event: "Hot weather!",
        },
      ],
    },
  ],
};

test("GetAllAlerts fetches successfully data from an API", async () => {
  mockedAxios.get.mockResolvedValue({ data: mockData });

  const { result, waitForNextUpdate } = renderHook(() => GetAllAlerts());

  await act(async () => {
    await waitForNextUpdate();
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toEqual(mockData.alerts);
  expect(result.current.error).toBe(null);
});

test("emptyData", async () => {
  // Mock the axios.get function to return mock data
  mockedAxios.get.mockResolvedValue({ data: {} });

  // Render the hook
  const { result, waitForNextUpdate } = renderHook(() => GetAllAlerts());

  // Act: Call refetch with a null alert ID and wait for the update
  await act(async () => {
    await waitForNextUpdate();
  });

  // Assert the expected states after the update
  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBe(null); // Expect data to be set to null
  expect(result.current.error).toEqual("Data is empty or invalid."); // Check error object
});
