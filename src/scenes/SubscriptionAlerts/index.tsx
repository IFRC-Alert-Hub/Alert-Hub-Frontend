import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TitleHeader from "../../components/Layout/TitleHeader";
import AlertsTable from "./components/AlertsTable";

const SubscriptionAlerts = () => {
  const { title, country } = useParams();
  const numAlerts = 10;

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
      <TitleHeader title={`${country} (${numAlerts})`} />
      <AlertsTable />
    </Container>
  );
};

export default SubscriptionAlerts;
