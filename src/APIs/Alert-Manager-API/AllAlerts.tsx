import { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "./types";

interface ResponseType {
  data: {
    alerts?: Alert[];
  };
}

export const GetAllAlerts = () => {
  const [data, setData] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await axios.get(
          "https://alert-manager.azurewebsites.net/alerts/"
        );

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Data is empty or invalid.");
        }

        setData(response.data.alerts as any);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

// const AllAlertsComponent: React.FC = () => {
//   const { data, loading, error } = GetAllAlerts();

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       {!loading && !error && (
//         <ul>
//           {data.map((alert: Alert) => (
//             <li key={alert.id}>{alert.url}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AllAlertsComponent;
