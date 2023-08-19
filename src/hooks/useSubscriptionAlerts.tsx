import { useEffect, useState } from "react";
import { SubscriptionAlertsType } from "../API/TYPES";
import axios from "axios";

interface ResponseType {
  data: SubscriptionAlertsType[];
}

const useSubscriptionAlerts = (id: string | undefined) => {
  const [data, setData] = useState<SubscriptionAlertsType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await axios.get(
          `https://backend-deploy.azurewebsites.net/subscription_manager/get_subscription_alerts/${id}/`
        );
        setData(response.data as SubscriptionAlertsType[]);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { data, isLoading, error };
};

export default useSubscriptionAlerts;
