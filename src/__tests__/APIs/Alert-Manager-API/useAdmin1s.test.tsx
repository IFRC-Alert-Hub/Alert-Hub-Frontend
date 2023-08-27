import axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";
import useAdmin1s from "../../../APIs/Alert-Manager-API/useAdmin1s";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData: any = {
  countries: [
    {
      id: 2,
      name: "France",
      admin1s: [
        {
          id: -2,
          name: "Unknown",
        },
        {
          id: 429,
          name: "Île-de-France",
        },
        {
          id: 430,
          name: "Centre-Val de Loire",
        },
        {
          id: 431,
          name: "Bourgogne-Franche-Comté",
        },
        {
          id: 432,
          name: "Normandie",
        },
        {
          id: 433,
          name: "Hauts-de-France",
        },
        {
          id: 434,
          name: "Grand Est",
        },
        {
          id: 435,
          name: "Pays de la Loire",
        },
        {
          id: 436,
          name: "Bretagne",
        },
        {
          id: 437,
          name: "Nouvelle-Aquitaine",
        },
        {
          id: 438,
          name: "Occitanie",
        },
        {
          id: 439,
          name: "Auvergne-Rhône-Alpes",
        },
        {
          id: 440,
          name: "Provence-Alpes-Côte d'Azur",
        },
        {
          id: 441,
          name: "Corse",
        },
      ],
    },
    {
      id: 3,
      name: "Serbia",
      admin1s: [
        {
          id: -3,
          name: "Unknown",
        },
        {
          id: 1412,
          name: "Syrmia District",
        },
        {
          id: 1413,
          name: "South Banat District",
        },
        {
          id: 1414,
          name: "North Banat District",
        },
        {
          id: 1415,
          name: "North Backa District",
        },
        {
          id: 1416,
          name: "Central Banat District",
        },
        {
          id: 1417,
          name: "West Backa District",
        },
        {
          id: 1418,
          name: "South Backa District",
        },
        {
          id: 1419,
          name: "Belgrade",
        },
        {
          id: 1420,
          name: "Bor District",
        },
        {
          id: 1421,
          name: "Macva District",
        },
        {
          id: 1422,
          name: "Pcinja District",
        },
        {
          id: 1423,
          name: "Kolubara District",
        },
        {
          id: 1424,
          name: "Podunavlje District",
        },
        {
          id: 1425,
          name: "Branicevo District",
        },
        {
          id: 1426,
          name: "Sumadija District",
        },
        {
          id: 1427,
          name: "Pomoravlje District",
        },
        {
          id: 1428,
          name: "Moravica District",
        },
        {
          id: 1429,
          name: "Zajecar District",
        },
        {
          id: 1430,
          name: "Zlatibor District",
        },
        {
          id: 1431,
          name: "Raska District",
        },
        {
          id: 1432,
          name: "Pirot District",
        },
        {
          id: 1433,
          name: "Jablanica District",
        },
        {
          id: 1434,
          name: "Toplica District",
        },
        {
          id: 1435,
          name: "Nisava District",
        },
        {
          id: 1436,
          name: "Rasina District",
        },
      ],
    },
    {
      id: 4,
      name: "Uruguay",
      admin1s: [
        {
          id: -4,
          name: "Unknown",
        },
        {
          id: 2767,
          name: "Canelones",
        },
        {
          id: 2768,
          name: "Rivera",
        },
        {
          id: 2769,
          name: "Montevideo",
        },
        {
          id: 2770,
          name: "Maldonado",
        },
        {
          id: 2771,
          name: "Lavalleja",
        },
        {
          id: 2772,
          name: "Florida",
        },
        {
          id: 2773,
          name: "San José",
        },
        {
          id: 2774,
          name: "Treinta y Tres",
        },
        {
          id: 2765,
          name: "Salto",
        },
        {
          id: 2766,
          name: "Artigas",
        },
        {
          id: 2775,
          name: "Flores",
        },
        {
          id: 2776,
          name: "Durazno",
        },
        {
          id: 2777,
          name: "Soriano",
        },
        {
          id: 2778,
          name: "Colonia",
        },
        {
          id: 2779,
          name: "Rocha",
        },
        {
          id: 2780,
          name: "Cerro Largo",
        },
        {
          id: 2781,
          name: "Tacuarembó",
        },
        {
          id: 2782,
          name: "Paysandú",
        },
        {
          id: 2783,
          name: "Río Negro",
        },
      ],
    },
  ],
};

test("GetAllAlerts fetches successfully data from an API", async () => {
  mockedAxios.get.mockResolvedValue({ data: mockData });

  const { result, waitForNextUpdate } = renderHook(() => useAdmin1s());

  await act(async () => {
    await waitForNextUpdate();
  });

  expect(result.current.isLoading).toBe(false);
  expect(result.current.data).toEqual(mockData.countries);
  expect(result.current.error).toBe(null);
});

test("emptyData", async () => {
  // Mock the axios.get function to return mock data
  mockedAxios.get.mockResolvedValue({ data: {} });

  // Render the hook
  const { result, waitForNextUpdate } = renderHook(() => useAdmin1s());

  // Act: Call refetch with a null alert ID and wait for the update
  await act(async () => {
    await waitForNextUpdate();
  });

  // Assert the expected states after the update
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toEqual("Currently no country data is added."); // Check error object
});
