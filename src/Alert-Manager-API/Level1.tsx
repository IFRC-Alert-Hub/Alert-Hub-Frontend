import { useState, useEffect } from "react";
import axios from "axios";
import { convertCoordinates } from "./helperFunctions";
import { Country, CountryRegionData } from "./types";

type ResponseRegionType = {
  id: number;
  name: string;
  polygon: string;
  centroid: string;
  countries?: ResponseCountryType;
};

type ResponseCountryType = {
  id: number;
  name: string;
  iso3: string;
  polygon: string;
  multipolygon: string;
  centroid: string;
};
interface ResponseType {
  data: {
    regions?: ResponseRegionType[];
  };
}

export const useLevel1Data = () => {
  const [data, setData] = useState<CountryRegionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await axios.get(
          "https://alert-manager.azurewebsites.net/regions"
        );

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Data is empty or invalid.");
        }

        if (!response.data.regions || response.data.regions.length === 0) {
          throw new Error("Data is empty or invalid.");
        }

        const updatedRegions = response.data.regions.map((region: any) => {
          try {
            region.centroid = JSON.parse(region?.centroid);
          } catch (error) {
            throw new Error("Invalid centroid data for region");
          }

          if (region.polygon) {
            try {
              region.bbox = {
                type: "Polygon",
                coordinates: [convertCoordinates(region.polygon)],
              };
              delete region.polygon;
            } catch (error) {
              throw new Error("Invalid polygon data for region");
            }
          }

          if (region.countries && region.countries.length > 0) {
            region.countries = region.countries.map((country: any) => {
              try {
                country.centroid = JSON.parse(country?.centroid);
                if (country.polygon === "") {
                  country.type = "MultiPolygon";
                  country.coordinates = JSON.parse(country.multipolygon);
                  delete country.polygon;
                  delete country.multipolygon;
                } else {
                  country.type = "Polygon";
                  country.coordinates = JSON.parse(country.polygon);
                  delete country.polygon;
                  delete country.multipolygon;
                }
              } catch (error) {
                throw new Error("Invalid data for a country in a region");
              }
              return country;
            });
          } else {
            throw new Error("Data is not loaded");
          }

          return region;
        });

        setData(updatedRegions);

        console.log(updatedRegions);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

const Level1: React.FC = () => {
  const { data, loading, error } = useLevel1Data();

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <ul>
          {data.map((region: CountryRegionData) => (
            <li key={region.id}>
              {region.name}
              <ul>
                {region.countries?.map((country: Country) => (
                  <li key={country.id}>{country.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Level1;
