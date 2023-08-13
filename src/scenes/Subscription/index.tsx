import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { subscription_module } from "../../API/API_Links";
import {
  CountryOptionsType,
  SubscriptionForm,
  SubscriptionItem,
  SubscriptionQueryResult,
} from "../../API/TYPES";
import { GET_SUBSCRIPTIONS } from "../../API/ALL_QUERIES";
import SubscriptionTable from "./components/SubscriptionTable";
import ModalForm from "./components/ModalForm";
import Progress from "../../components/Layout/Progress";
import { RADIO_OPTIONS } from "./components/SentFlagRadio";

const INIT_ROW: SubscriptionForm = {
  subscriptionName: "",
  countryIds: [],
  districtIds: [],
  urgencyArray: [],
  severityArray: [],
  certaintyArray: [],
  subscribeBy: [],
  sentFlag: -1,
};

const Subscription = () => {
  const [formType, setFormType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SubscriptionForm>(INIT_ROW);
  const [countryData, setCountryData] = useState<CountryOptionsType[] | null>(
    null
  );

  const {
    loading: subscriptionLoading,
    error: subscriptionError,
    data: subscriptionData,
  } = useQuery<SubscriptionQueryResult>(GET_SUBSCRIPTIONS, {
    client: subscription_module,
  });

  useEffect(() => {
    axios
      .get("https://alert-manager.azurewebsites.net/admin1s/")
      .then((res) => {
        setCountryData(res.data.countries);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setFormType("");
    setSelectedRow(INIT_ROW);
    setModalOpen(false);
  };

  let tableContent;
  if (subscriptionLoading) {
    tableContent = <Progress />;
  } else if (subscriptionError) {
    tableContent = (
      <Typography variant="h5" textAlign={"center"} color={"gray"} mt={10}>
        Something error! Please contact the application administrator.
      </Typography>
    );
  } else if (subscriptionData && countryData) {
    const tableDetail = subscriptionData.listAllSubscription.map(
      (item: SubscriptionItem) => {
        const countryNames = item.countryIds.map((id: number) => {
          const foundCountry = countryData.find((country) => country.id === id);
          return foundCountry?.name;
        });
        const districtNames = item.districtIds.map((id: number) => {
          const foundCountry = countryData.find(
            (country) => country.id === item.countryIds[0]
          );
          const districtsList = foundCountry?.districts;
          const foundDistricts = districtsList?.find(
            (district) => district.id === id
          );
          return foundDistricts?.name;
        });
        const sentFlagName = RADIO_OPTIONS.find(
          (option) => Number(option.value) === item.sentFlag
        )?.label;
        return { ...item, countryNames, districtNames, sentFlagName };
      }
    );
    tableContent = (
      <SubscriptionTable
        updatedSubscriptions={tableDetail}
        modalOpen={modalOpen}
        handleModalOpen={handleModalOpen}
        setFormType={setFormType}
        setSelectedRow={setSelectedRow}
      />
    );
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container direction="row" margin="3rem 0 1rem 0">
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h3"
            fontWeight={"bold"}
            paddingBottom={"15px"}
            textTransform={"capitalize"}
            letterSpacing={"1.6px"}
          >
            My Subscriptions
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} className="subscription-add-btn">
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleModalOpen();
              setFormType("Add");
            }}
            sx={{
              borderRadius: 10,
              marginRight: "10px",
              textTransform: "capitalize",
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {tableContent}
      {countryData && (
        <ModalForm
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          formType={formType}
          countryList={countryData}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      )}
    </Container>
  );
};

export default Subscription;
