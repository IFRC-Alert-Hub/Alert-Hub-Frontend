import { Box, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TitleHeader from "../../components/Layout/TitleHeader";
import AlertsTable from "./AlertsTable";
import useSubscriptionAlerts from "../../hooks/useSubscriptionAlerts";
import Progress from "../../components/Layout/Progress";

const SubscriptionAlerts = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, title, country } = useParams();
  const navigate = useNavigate();

  const {
    data: alertsData,
    isLoading: isAlertsLoading,
    error: alertsError,
  } = useSubscriptionAlerts(id);

  if (isAlertsLoading) {
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
        <Progress />
      </Container>
    );
  }

  if (alertsError) {
    navigate("/404");
  }

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
