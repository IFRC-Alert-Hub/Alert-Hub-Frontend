import { useEffect, useState } from "react";
import axios from "axios";
import { CountryRegionData } from "./types";
import { convertCoordinates } from "./helperFunctions";

type ResponseFiltersType = {
  urgency?: string[];
  severity?: string[];
  certainty?: string[];
};

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
  filters?: ResponseFiltersType;
};
interface ResponseType {
  data: {
    regions?: ResponseRegionType[];
  };
}
export const GetRegionData = () => {
  const [data, setData] = useState<CountryRegionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({
    urgency: "",
    severity: "",
    certainty: "",
  });

  const [region_ID, setRegion_ID] = useState<number | null>(null);

  const refetch = async (region_ID: number) => {
    setRegion_ID(region_ID);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (region_ID !== null) {
      const fetchData = async () => {
        try {
          const response: ResponseType = await axios.get(
            `https://alert-manager.azurewebsites.net/regions/${region_ID}`
          );

          if (!response.data || Object.keys(response.data).length === 0) {
            throw new Error("Data is empty or invalid.");
          }

          if (!response.data.regions || response.data.regions.length === 0) {
            throw new Error("Data is empty or invalid.");
          }
          let updatedRegions: any = response.data.regions;

          if (updatedRegions.length > 0) {
            updatedRegions = updatedRegions.map((region: any) => {
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
                region.countries = region.countries.filter(
                  (country: ResponseCountryType) => {
                    const countryFilters: any = country.filters;
                    if (!countryFilters) {
                      return true;
                    }

                    for (const filterKey in countryFilters) {
                      if (countryFilters.hasOwnProperty(filterKey)) {
                        const filterValues = countryFilters[filterKey];
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

                if (region.countries.length > 0) {
                  region.countries = region.countries.map((country: any) => {
                    try {
                      country.centroid = JSON.parse(country?.centroid);
                      if (country.polygon === null) {
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
                }
              }

              return region;
            });
          }
          updatedRegions = updatedRegions.filter((region: any) => {
            return region.countries.length > 0;
          });
          setData(updatedRegions);
          setLoading(false);
        } catch (error: any) {
          setError(error.message);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [filters, region_ID]);

  return { data, loading, error, setFilters, refetch };
};

// const urgencyOptions: string[] = [
//   "Immediate",
//   "Expected",
//   "Future",
//   "Past",
//   "Unknown",
// ];

// const RegionTest: React.FC = () => {
//   const { data, loading, error, setFilters, refetch } = GetRegionData();
//   const [selectedUrgency, setSelectedUrgency] = useState<string>("");
//   const { id } = useParams<{ id: string }>();

//   useMemo(() => {
//     refetch(Number(id));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const handleUrgencyChange = (
//     event: React.ChangeEvent<{}>,
//     value: string | null
//   ) => {
//     setSelectedUrgency(value || "");
//     setFilters({
//       urgency: value || "",
//       severity: "",
//       certainty: "",
//     });
//   };

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       {!loading && !error && (
//         <>
//           <Autocomplete
//             disablePortal
//             id="combo-box-urgency"
//             options={urgencyOptions}
//             getOptionLabel={(option) => option}
//             sx={{
//               width: 170,
//               backgroundColor: "#f4f4f4",
//               "& .MuiAutocomplete-input": {
//                 padding: "4px",
//               },
//               marginRight: "20px",
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Urgency"
//                 size="small"
//                 sx={{
//                   "& .MuiInputLabel-root": {
//                     color: "#8D8D8D",
//                     fontSize: "12px",
//                   },
//                 }}
//               />
//             )}
//             onChange={handleUrgencyChange}
//             value={selectedUrgency}
//             isOptionEqualToValue={(option: any, value: any) => {
//               if (option === null || value === null) {
//                 return option === value;
//               }
//               return option.value === value.value;
//             }}
//           />
//           <ul>
//             {data.map((region: CountryRegionData) => (
//               <li key={region.id}>
//                 {region.name}
//                 <ul>
//                   {region.countries?.map((country: Country) => (
//                     <>
//                       {" "}
//                       <div key={country.id}>
//                         <li>{country.name}</li>
//                         <ul>
//                           <li>URGENCY: {country.filters.urgency}</li>
//                           <li>SEVERITY: {country.filters.severity}</li>
//                           <li>CERTAINTY: {country.filters.certainty}</li>
//                         </ul>
//                       </div>
//                     </>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default RegionTest;
