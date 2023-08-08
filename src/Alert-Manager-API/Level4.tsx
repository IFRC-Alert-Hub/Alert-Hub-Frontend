import { useState, useEffect } from "react";
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

export const useLevel4Data = ({ info_ID }: { info_ID: number }) => {
  const [data, setData] = useState<AlertInfoArea>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response: ResponseType = await axios.get(
        `https://dl.dropboxusercontent.com/scl/fi/tifx0x4hgxqeou5v6gyfr/infos.json?dl=0&rlkey=f8ug3fjzznjwse7ucprleig7c`
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
      console.log(response.data);

      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  fetchData();

  return { data, loading, error };
};

const Level4: React.FC = () => {
  const { data, loading, error } = useLevel4Data({ info_ID: 1309 });
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <ul>
          <li key={data?.info_id}>
            INFO ID: {data?.info_id}
            <ul>
              {data?.areas?.map((area: any) => (
                <li key={area.id}>{area.area_desc}</li>
              ))}
            </ul>
          </li>
        </ul>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Level4;
