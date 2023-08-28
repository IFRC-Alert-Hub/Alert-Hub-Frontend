import { useEffect, useState } from "react";
import { SubscriptionAlertsType } from "../../API/TYPES";
import axios from "axios";

const useSubscriptionAlerts = (id: string | undefined) => {
  const [data, setData] = useState<SubscriptionAlertsType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCodes, setStatusCodes] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://backend-deploy.azurewebsites.net/subscription_manager/get_subscription_alerts/${id}/`
        );
        setStatusCodes(() => response.status);
        if (response.status === 202) {
          setIsLoading(false);
          setStatusCodes(202);
        } else {
          const alertsIds = response.data;

          const requests = alertsIds.map(async (alertId: number) => {
            try {
              const alertResponse = await axios.get(
                `https://alert-manager.azurewebsites.net/alerts/${alertId}/summary/`
              );
              return alertResponse.data;
            } catch (error) {
              console.error(error);
              return null;
            }
          });

          const responses = await Promise.all(requests);
          const alertsData = responses.filter((alert) => alert !== null);
          setData(alertsData);
          setIsLoading(false);
          setStatusCodes(200);
        }
      } catch (error: any) {
        setError(error.message);
        setStatusCodes(404);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { data, isLoading, error, statusCodes };
};

export default useSubscriptionAlerts;
