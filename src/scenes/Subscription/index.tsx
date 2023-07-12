import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SubscriptionTable from "./SubscriptionTable";
import { useContext, useEffect, useState } from "react";
import ModalForm from "./ModalForm";
import { useQuery } from "@apollo/client";
import {
  ContinentType,
  CountryType,
  GET_SUBSCRIPTIONS,
  SubscriptionForm,
  SubscriptionItem,
  SubscriptionQueryResult,
} from "../../API/queries/getSubscriptions";
import { cap_aggregator, subscription_module } from "../../API/API_Links";
import { GET_ALL_COUNTRIES } from "../../API/queries/getAllCountries";
import { UserContext } from "../../context/UserContext";

const Subscription = () => {
  const userContext = useContext(UserContext);
  const userId = Number(userContext.user?.id);

  const {
    loading: subscriptionLoading,
    error: subscriptionError,
    data: subscriptionData,
  } = useQuery<SubscriptionQueryResult>(GET_SUBSCRIPTIONS, {
    variables: {
      userId: userId,
    },
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
  const [formType, setFormType] = useState("");
  const [selectedRow, setSelectedRow] = useState<SubscriptionForm>({
    title: "",
    countries: [],
    urgency: [],
    severity: [],
    certainty: [],
    methods: [],
  });
  const [open, setOpen] = useState(false);

  const handleOpen = (type: string, id?: string) => {
    if (id) {
      const foundItem = tableData.find(
        (item) => item.id.toString() === id.toString()
      );
      if (foundItem) {
        setSelectedRow({
          id: id,
          title: foundItem.subscriptionName,
          countries: foundItem.countryIds.map((number) => number.toString()),
          urgency: foundItem.urgencyArray,
          severity: foundItem.severityArray,
          certainty: foundItem.certaintyArray,
          methods: foundItem.subscribeBy,
        });
      }
    } else {
      setSelectedRow({
        title: "",
        countries: [],
        urgency: [],
        severity: [],
        certainty: [],
        methods: [],
      });
    }
    setFormType(type);
    setOpen(true);
  };
  const handleClose = () => {
    setFormType("");
    setOpen(false);
  };

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
            My Subscription Groups
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} className="subscription-add-btn">
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpen("Add")}
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
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          formType={formType}
          countryList={countryList}
          regionList={regionList}
          tableData={tableData}
          setTableData={setTableData}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
      {countryLoading ? (
        <div></div>
      ) : countryError ? (
        <p>Error: {countryError.message}</p>
      ) : (
        <ModalForm
          userId={userId}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          formType={formType}
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
