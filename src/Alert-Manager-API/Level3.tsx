import { useEffect, useState } from "react";
import axios from "axios";
import { Admin1_Alert_Data } from "./types";
import { Autocomplete, TextField } from "@mui/material";

type ResponseAlertType = {
  id: number;
  url: string;
  identifier: string;
  sent: string;
  sender: string;
  msg_type: string;
  source: string;
  scope: string;
  restriction: string;
  addresses: string;
  code: string;
  note: string;
  references: string;
  incidents: string;
  info: ResponseInfoType[];
};

type ResponseInfoType = {
  id: number;
  language: string;
  category: string;
  event: string;
  response_type: string;
  urgency: string;
  severity: string;
  certainty: string;
  audience: string;
  event_code: string;
  effective: string;
  onset: string;
  expires: string;
  sender_name: string;
  headline: string;
  description: string;
  instruction: string;
  web: string;
  contact: string;
  parameter: ResponseParameterType;
};

type ResponseParameterType = {
  id: number;
  value_name: string;
  value: string;
};
interface ResponseType {
  data: {
    admin1_id?: number;
    admin1_name?: string;
    alerts?: ResponseAlertType[];
  };
}

export const useLevel3Data = () => {
  const [data, setData] = useState<Admin1_Alert_Data>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [admin1_ID, setAdmin1_ID] = useState<number | null>(null);
  const [filters, setFilters] = useState<any>({});

  const refetch = async (admin1_ID: number) => {
    setAdmin1_ID(admin1_ID);
  };

  useEffect(() => {
    console.log("FILTERS 3: ", filters);

    setLoading(true);
    setError(null);
    if (admin1_ID !== null) {
      const fetchData = async () => {
        try {
          const response: ResponseType = await axios.get(
            `https://alert-manager.azurewebsites.net/admin1s/${admin1_ID}`
          );

          if (!response.data || Object.keys(response.data).length === 0) {
            throw new Error("Data is empty or invalid.");
          }

          if (
            response.data.admin1_id &&
            response.data.admin1_id !== admin1_ID
          ) {
            throw new Error("ID does not exist");
          }
          let modifiedData: any = { ...response.data };

          if (response.data.alerts && response.data.alerts.length > 0) {
            const filteredAlerts = modifiedData.alerts.filter(
              (alert: ResponseAlertType) => {
                const infoMatchesFilters = alert.info.every(
                  (info: ResponseInfoType) => {
                    return Object.keys(filters).every((filterKey) => {
                      const filteredValue = filters[filterKey].toLowerCase();
                      if (filteredValue === null || filteredValue === "") {
                        return true; // Skip this filter if it's not set
                      }
                      const infoValue = String(
                        info[filterKey as keyof ResponseInfoType]
                      ).toLowerCase();
                      return infoValue === filteredValue;
                    });
                  }
                );

                return infoMatchesFilters;
              }
            );

            const filteredData = {
              ...modifiedData,
              alerts: filteredAlerts,
            };
            setData(filteredData as any);
          } else {
            throw new Error("Alerts is empty");
          }

          setLoading(false);
        } catch (error: any) {
          console.error("Error fetching data:", error.message);
          setError(error.message);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [admin1_ID, filters]);

  return { data, loading, error, refetch, setFilters };
};
const urgencyOptions: string[] = [
  "Immediate",
  "Expected",
  "Future",
  "Past",
  "Unknown",
];

const Level3: React.FC = () => {
  const [admin1ID, setAdmin1ID] = useState<number>(1765);
  const { data, loading, error, refetch, setFilters } = useLevel3Data();

  const handleFetch = () => {
    if (admin1ID) {
      refetch(admin1ID);
    }
  };

  const [selectedUrgency, setSelectedUrgency] = useState<string>("");

  const handleUrgencyChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
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
        Admin1 ID:
        <input
          type="number"
          value={admin1ID}
          onChange={(e) => setAdmin1ID(Number(e.target.value))}
        />
      </label>
      <button onClick={handleFetch}>Fetch Data</button>

      {loading && <p>Loading...</p>}
      {!loading && !error && data && (
        <>
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
          />
          <ul>
            {data.alerts?.map((alert) => (
              <li key={alert.id}>Alert ID: {alert.id}</li>
            ))}
          </ul>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Level3;
