import { Box, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TitleHeader from "../../components/Layout/TitleHeader";
import AlertsTable from "./AlertsTable";
import useSubscriptionAlerts from "../../APIs/Subscription-API/useSubscriptionAlerts";
import Progress from "../../components/Layout/Progress";

const SubscriptionAlerts = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, title, country } = useParams();
  const navigate = useNavigate();

  const {
    data: alertsData,
    isLoading: isAlertsLoading,
    error: alertsError,
    statusCodes,
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
        <TitleHeader title={`${country}`} />
        <Progress />
      </Container>
    );
  }

  if (alertsError) {
    navigate("/404");
  }

  if (statusCodes === 202) {
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
        <TitleHeader title={`${country}`} />
        <Typography
          variant="h5"
          textAlign={"center"}
          padding={"50px"}
          color={"gray"}
        >
          Still matching alerts, please come back later or refresh the page.
        </Typography>
      </Container>
    );
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
      {alertsData && country && alertsData.length > 0 ? (
        <AlertsTable country={country} alertsData={alertsData} />
      ) : (
        <>
          <TitleHeader title={`${country} (0)`} />
          <Typography
            variant="h5"
            textAlign={"center"}
            padding={"50px"}
            color={"gray"}
          >
            {" "}
            No alerts happen in subscription admin1s now.
          </Typography>
        </>
      )}
    </Container>
  );
};

export default SubscriptionAlerts;
