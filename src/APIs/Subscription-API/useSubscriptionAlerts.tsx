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

          try {
            let data = {
              alert_ids: JSON.stringify(alertsIds),
              csrfmiddlewaretoken: "csrfToken",
            };
            const alertResponse = await axios.post(
              `https://alert-manager.azurewebsites.net/alerts/summary/`,
              new URLSearchParams(data).toString()
            );
            const responses = JSON.parse(alertResponse.data);

            const alertsData = responses.filter(
              (alert: any) => Object.keys(alert).length !== 0
            );
            setData(alertsData);
            setIsLoading(false);
            setStatusCodes(200);
          } catch (error) {
            console.error(error);
          }
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
