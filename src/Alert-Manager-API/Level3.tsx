import { useState, useEffect } from "react";
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

export const useLevel2Data = ({ admin1_ID }: { admin1_ID: number }) => {
  const [data, setData] = useState<Admin1_Alert_Data>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await axios.get(
          `https://alert-manager.azurewebsites.net/admin1s/${admin1_ID}`
        );

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Data is empty or invalid.");
        }
        if (response.data.alerts && response.data.alerts.length > 0) {
        } else {
          throw new Error("Alerts is empty");
        }
        setData(response.data as any);
        console.log(response.data);

        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [admin1_ID]);

  return { data, loading, error };
};

const Level3: React.FC = () => {
  const { data, loading, error } = useLevel2Data({ admin1_ID: 99 });
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          <li key={data?.admin1_id}>
            {data?.admin1_name}
            <ul>
              {data?.alerts?.map((alert: any) => (
                <li key={alert.id}>{alert.url}</li>
              ))}
            </ul>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Level3;
