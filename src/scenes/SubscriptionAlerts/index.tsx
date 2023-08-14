import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TitleHeader from "../../components/Layout/TitleHeader";
import AlertsTable from "./components/AlertsTable";
import { useEffect, useState } from "react";
import { SubscriptionAlertsType } from "../../API/TYPES";
import axios from "axios";

const SubscriptionAlerts = () => {
  const { id, title, country } = useParams();

  const [alertsData, setAlertsData] = useState<SubscriptionAlertsType[] | null>(
    null
  );

  useEffect(() => {
    axios
      .get(
        `https://backend-deploy.azurewebsites.net/subscription_manager/get_subscription_alerts/${id}/`
      )
      .then((res) => {
        setAlertsData(() =>
          res.data.map((item: any) => ({
            id: item.id,
            event: item.event,
            category: item.category,
            countryName: item.country_name,
            admin1s: item.admin1s,
            sent: item.sent,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Container maxWidth={"lg"}>
      <Box padding={"50px 0 20px 0"} sx={{ textAlign: "center" }}>
        <Typography
          variant={"h1"}
          fontWeight={"600"}
          sx={{ paddingBottom: "5px", textTransform: "capitalize" }}
        >
          {title}
        </Typography>
      </Box>
      <TitleHeader title={`${country} (${alertsData?.length})`} />
      {alertsData && alertsData.length > 0 ? (
        <AlertsTable alertsData={alertsData} />
      ) : (
        <Typography
          variant="h6"
          textAlign={"center"}
          padding={"50px"}
          color={"gray"}
        >
          {" "}
          No alerts happen in subscription admin1s now.
        </Typography>
      )}
    </Container>
  );
};

export default SubscriptionAlerts;
