import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SubscriptionTable from "./SubscriptionTable";
import { useEffect, useState } from "react";
import ModalForm from "./ModalForm";
import { useQuery } from "@apollo/client";
import {
  GET_SUBSCRIPTIONS,
  SubscriptionItem,
  SubscriptionQueryResult,
} from "../../API/queries/getSubscriptions";
import { subscription_module } from "../../API/API_Links";

const Subscription = () => {
  const {
    loading,
    error,
    data: subscriptionData,
  } = useQuery<SubscriptionQueryResult>(GET_SUBSCRIPTIONS, {
    client: subscription_module,
  });
  const [tableData, setTableData] = useState<SubscriptionItem[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (subscriptionData) {
      setTableData(subscriptionData.listSubscriptionByUserId);
    }
  }, [subscriptionData]);

  return (
    <Container maxWidth={"lg"}>
      <Grid container direction="row" margin="30px 0px 10px 0px">
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h2"
            fontWeight={"bold"}
            paddingBottom={"15px"}
            textTransform={"capitalize"}
            letterSpacing={"1.6px"}
          >
            My Subscription Group
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} className="subscription-add-btn">
          <Button
            variant="contained"
            color="error"
            onClick={handleOpen}
            sx={{ borderRadius: 3, marginRight: "10px" }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <SubscriptionTable tableData={tableData} setTableData={setTableData} />
      )}
      <ModalForm
        tableData={tableData}
        setTableData={setTableData}
        open={open}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default Subscription;
