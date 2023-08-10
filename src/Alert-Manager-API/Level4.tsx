import { useRef, useState } from "react";
import axios from "axios";
import { convertCoordinates } from "./helperFunctions";
import { AlertInfoArea } from "./types";

type ResponseAreaType = {
  id: number;
  area_desc: string;
  altitude: string;
  ceiling: string;
  polygons: ResponseAreaPolygonType[];
  circle: ResponseAreaCircleType[];
  geocodes: ResponseAreaGeocodes[];
};

type ResponseAreaPolygonType = {
  id: number;
  value: string;
};

type ResponseAreaCircleType = {
  id: number;
  value: string;
};

type ResponseAreaGeocodes = {
  id: number;
  value_name: string;
  value: string;
};

interface ResponseType {
  data: {
    info_id: number;
    areas?: ResponseAreaType[];
  };
}

export const useLevel4Data = () => {
  const [data, setData] = useState<AlertInfoArea>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const current_Info_ID = useRef<number | null>(null);

  const refetch = async (info_ID: number) => {
    console.log(current_Info_ID.current);
    console.log(info_ID);

    if (
      current_Info_ID.current === null ||
      current_Info_ID.current !== info_ID
    ) {
      setLoading(true);
      setError(null);
      console.log("refetch called with infoID:", info_ID);

      const fetchData = async () => {
        try {
          const response: ResponseType = await axios.get(
            `https://alert-manager.azurewebsites.net/infos/${info_ID}`
          );

          if (!response.data || Object.keys(response.data).length === 0) {
            throw new Error("Data is empty or invalid.");
          }

          if (response.data.info_id && response.data.info_id !== info_ID) {
            throw new Error("ID does not exist");
          }
          if (response.data.areas && response.data.areas.length > 0) {
            response.data.areas = response.data.areas.map((area: any) => {
              if (area.polygons !== "") {
                area.polygons = area.polygons.map((polygon: any) => {
                  polygon.value = convertCoordinates(polygon.value);
                  return polygon;
                });
              }
              return area;
            });
          } else {
            throw new Error("areas is empty");
          }
          setData(response.data);
          setLoading(false);
        } catch (error: any) {
          console.error("Error fetching data:", error.message);
          setError(error.message);
          setLoading(false);
        }
      };
      current_Info_ID.current = info_ID;

      await fetchData();
    }
  };
  return { data, loading, error, refetch };
};

const Level4: React.FC = () => {
  const [admin1ID, setAdmin1ID] = useState<number>(1765);
  const { data, loading, error, refetch } = useLevel4Data();

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
          {data.areas?.map((area) => (
            <li key={area.id}>Area ID: {area.id}</li>
          ))}
        </ul>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Level4;
