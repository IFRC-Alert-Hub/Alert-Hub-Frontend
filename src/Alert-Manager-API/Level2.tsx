import { useEffect, useState } from "react";
import axios from "axios";
import { Country_Admin1s_Data, admin1 } from "./types";
import { Autocomplete, TextField } from "@mui/material";

type ResponseAdmin1Type = {
  id: number;
  name: string;
  polygon: string;
  multipolygon: string;
};

interface ResponseType {
  data: {
    country_id: number;
    country_name?: string;
    admin1s?: ResponseAdmin1Type[];
  };
}

export const useLevel2Data = () => {
  const [data, setData] = useState<Country_Admin1s_Data>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({});
  const [countryID, setCountryID] = useState<number | null>(null);

  const refetch = async (countryID: number) => {
    setCountryID(countryID);
  };

  useEffect(() => {
    console.log("LEVEL 2 filters", filters);
    setLoading(true);
    setError(null);
    if (countryID !== null) {
      const fetchData = async () => {
        try {
          console.log("ID: ", countryID);
          if (countryID === null) {
            throw new Error("Country ID is not provided.");
          }

          const response: ResponseType = await axios.get(
            `https://alert-manager.azurewebsites.net/countries/${countryID}`
          );

          if (!response.data || Object.keys(response.data).length === 0) {
            throw new Error("Data is empty or invalid.");
          }
          if (
            response.data.country_id &&
            response.data.country_id !== countryID
          ) {
            throw new Error("ID does not exist");
          }

          let modifiedData: any = { ...response.data };

          if (modifiedData.admin1s && modifiedData.admin1s.length > 0) {
            modifiedData.admin1s = modifiedData.admin1s.filter(
              (admin1: any) => {
                const adminFilters: any = admin1.filters;
                if (!adminFilters) {
                  return true;
                }

                for (const filterKey in adminFilters) {
                  if (adminFilters.hasOwnProperty(filterKey)) {
                    const filterValues = adminFilters[filterKey];
                    const selectedFilterValue = filters[filterKey];

                    if (
                      selectedFilterValue &&
                      selectedFilterValue !== "" &&
                      !filterValues.includes(selectedFilterValue)
                    ) {
                      return false;
                    }
                  }
                }
                return true;
              }
            );
            modifiedData.admin1s = modifiedData.admin1s.map((admin1: any) => {
              if (admin1.polygon === null) {
                admin1.type = "MultiPolygon";
                admin1.coordinates = JSON.parse(admin1.multipolygon);
                delete admin1.polygon;
                delete admin1.multipolygon;
              } else {
                admin1.type = "Polygon";
                admin1.coordinates = JSON.parse(admin1.polygon);
                delete admin1.polygon;
                delete admin1.multipolygon;
              }

              return admin1;
            });
            modifiedData.admin1s.reverse();
          } else {
            throw new Error("admin1 is empty");
          }
          setData(modifiedData as any);
          setLoading(false);
        } catch (error: any) {
          console.log(error.message);
          setError(error.message);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [countryID, filters]);
  return { data, loading, error, refetch, setFilters };
};
const urgencyOptions: string[] = [
  "Immediate",
  "Expected",
  "Future",
  "Past",
  "Unknown",
];
const Level2: React.FC = () => {
  const [countryID, setCountryID] = useState<number>(161);
  const { data, loading, error, refetch, setFilters } = useLevel2Data();

  const handleFetch = () => {
    if (countryID) {
      refetch(countryID);
    }
  };
  const [selectedUrgency, setSelectedUrgency] = useState<string>("");

  const handleUrgencyChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    console.log(value);
    setSelectedUrgency(value || "");
    setFilters({
      urgency: value || "",
      severity: "",
      certainty: "",
    });
  };
  return (
    <div>
      <label>
        Country ID:
        <input
          type="number"
          value={countryID}
          onChange={(e) => setCountryID(Number(e.target.value))}
        />
      </label>
      <button onClick={handleFetch}>Fetch Data</button>

      {loading && <p>Loading...</p>}
      {!loading && !error && data && (
        <>
          {" "}
          <Autocomplete
            disablePortal
            id="combo-box-urgency"
            options={urgencyOptions}
            getOptionLabel={(option) => option}
            sx={{
              width: 170,
              backgroundColor: "#f4f4f4",
              "& .MuiAutocomplete-input": {
                padding: "4px",
              },
              marginRight: "20px",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Urgency"
                size="small"
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#8D8D8D",
                    fontSize: "12px",
                  },
                }}
              />
            )}
            onChange={handleUrgencyChange}
            value={selectedUrgency}
            isOptionEqualToValue={(option: any, value: any) => {
              if (option === null || value === null) {
                return option === value;
              }
              return option.value === value.value;
            }}
          />{" "}
          <ul>
            <li>
              {data.country_name}
              <ul>
                {data.admin1s?.map((admin1) => (
                  <li key={admin1.id}>{admin1.name}</li>
                ))}
              </ul>
            </li>
          </ul>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Level2;
