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
  ContinentType,
  CountryType,
  GET_SUBSCRIPTIONS,
  SubscriptionItem,
  SubscriptionQueryResult,
} from "../../API/queries/getSubscriptions";
import { cap_aggregator, subscription_module } from "../../API/API_Links";
import { GET_ALL_COUNTRIES } from "../../API/queries/getAllCountries";

const Subscription = () => {
  const {
    loading: subscriptionLoading,
    error: subscriptionError,
    data: subscriptionData,
  } = useQuery<SubscriptionQueryResult>(GET_SUBSCRIPTIONS, {
    client: subscription_module,
  });
  const {
    loading: countryLoading,
    error: countryError,
    data: countryData,
  } = useQuery(GET_ALL_COUNTRIES, {
    client: cap_aggregator,
  });

  const [regionList, setRegionList] = useState<ContinentType[]>([]);
  const [countryList, setCountryList] = useState<CountryType[]>([]);
  const [tableData, setTableData] = useState<SubscriptionItem[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (subscriptionData) {
      setTableData(subscriptionData.listSubscriptionByUserId);
    }
    if (countryData) {
      setRegionList(countryData.listRegion);
      setCountryList(countryData.listCountry);
    }
  }, [subscriptionData, countryData]);

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
      {subscriptionLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : subscriptionError ? (
        <p>Error: {subscriptionError.message}</p>
      ) : (
        <SubscriptionTable
          countryList={countryList}
          tableData={tableData}
          setTableData={setTableData}
        />
      )}
      {countryLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : countryError ? (
        <p>Error: {countryError.message}</p>
      ) : (
        <ModalForm
          tableData={tableData}
          setTableData={setTableData}
          countryList={countryList}
          regionList={regionList}
          open={open}
          handleClose={handleClose}
        />
      )}
    </Container>
  );
};

export default Subscription;
