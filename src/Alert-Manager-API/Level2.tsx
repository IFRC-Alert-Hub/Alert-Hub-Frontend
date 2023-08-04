import { useState, useEffect } from "react";
import axios from "axios";
import { Country_Admin1s_Data, admin1 } from "./types";

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

export const useLevel2Data = ({ countryID }: { countryID: number }) => {
  const [data, setData] = useState<Country_Admin1s_Data>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await axios.get(
          `https://alert-manager.azurewebsites.net/countries/${countryID}`
        );

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Data is empty or invalid.");
        }
        if (response.data.admin1s && response.data.admin1s.length > 0) {
          response.data.admin1s = response.data.admin1s.map((admin1: any) => {
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
        } else {
          throw new Error("admin1 is empty");
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
  }, [countryID]);

  return { data, loading, error };
};

const Level2: React.FC = () => {
  const { data, loading, error } = useLevel2Data({ countryID: 161 });
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <ul>
          <li key={data?.country_id}>
            {data?.country_name}
            <ul>
              {data?.admin1s?.map((admin1: admin1) => (
                <li key={admin1.id}>{admin1.name}</li>
              ))}
            </ul>
          </li>
        </ul>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Level2;
