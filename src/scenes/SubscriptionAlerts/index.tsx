import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import TitleHeader from "../../components/Layout/TitleHeader";
import AlertsTable from "./components/AlertsTable";

const SubscriptionAlerts = () => {
  const { title } = useParams();
  const numAlerts = 10;

  return (
    <Container maxWidth={"lg"} sx={{ paddingTop: "30px" }}>
      <TitleHeader title={`${title} (${numAlerts})`} />
      <AlertsTable />
    </Container>
  );
};

export default SubscriptionAlerts;
