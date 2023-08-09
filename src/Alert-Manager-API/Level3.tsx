import { useState } from "react";
import axios from "axios";
import { Admin1_Alert_Data } from "./types";

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
  const refetch = async (admin1_ID: number) => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response: ResponseType = await axios.get(
          `https://alert-manager.azurewebsites.net/admin1s/${admin1_ID}`
        );

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Data is empty or invalid.");
        }

        if (response.data.admin1_id && response.data.admin1_id !== admin1_ID) {
          console.log(admin1_ID);
          console.log(response.data.admin1_id);
          throw new Error("ID does not exist");
        }

        if (response.data.alerts && response.data.alerts.length > 0) {
        } else {
          throw new Error("Alerts is empty");
        }
        setData(response.data as any);

        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  };

  return { data, loading, error, refetch };
};

const Level3: React.FC = () => {
  const [admin1ID, setAdmin1ID] = useState<number>(1765);
  const { data, loading, error, refetch } = useLevel3Data();

  const handleFetch = () => {
    if (admin1ID) {
      refetch(admin1ID);
    }
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
        <ul>
          {data.alerts?.map((alert) => (
            <li key={alert.id}>Alert ID: {alert.id}</li>
          ))}
        </ul>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Level3;
