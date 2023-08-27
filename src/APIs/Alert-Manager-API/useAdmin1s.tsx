import { useEffect, useState } from "react";
import { CountryOptionsType } from "../../API/TYPES";
import axios from "axios";

interface ResponseType {
  data: {
    countries?: CountryOptionsType[];
  };
}

const useAdmin1s = () => {
  const [data, setData] = useState<CountryOptionsType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await axios.get(
          "https://alert-manager.azurewebsites.net/admin1s/"
        );

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Currently no country data is added.");
        }

        setData(response.data.countries as CountryOptionsType[]);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useAdmin1s;
