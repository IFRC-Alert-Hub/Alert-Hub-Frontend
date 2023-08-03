import { Button, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { cap_aggregator, subscription_module } from "../../API/API_Links";
import {
  CountryOptionsType,
  SubscriptionForm,
  SubscriptionItem,
  SubscriptionQueryResult,
} from "../../API/TYPES";
import { GET_ALL_COUNTRIES, GET_SUBSCRIPTIONS } from "../../API/ALL_QUERIES";
import SubscriptionTable from "./components/SubscriptionTable";
import ModalForm from "./components/ModalForm";
import Progress from "../../components/Layout/Progress";

const INIT_ROW: SubscriptionForm = {
  subscriptionName: "",
  countryIds: [],
  districtIds: [],
  urgencyArray: [],
  severityArray: [],
  certaintyArray: [],
  subscribeBy: [],
};

const testCountryData: CountryOptionsType[] = [
  {
    countryId: "1",
    countryName: "country1",
    districts: [
      {
        districtId: "1",
        districtName: "district1",
      },
      {
        districtId: "2",
        districtName: "district2",
      },
      {
        districtId: "3",
        districtName: "district3",
      },
    ],
  },
  {
    countryId: "2",
    countryName: "country2",
    districts: [
      {
        districtId: "4",
        districtName: "district4",
      },
      {
        districtId: "5",
        districtName: "district5",
      },
    ],
  },
];

const Subscription = () => {
  // fetch the data from backend
  const { loading: countryLoading, data: countryData } = useQuery(
    GET_ALL_COUNTRIES,
    {
      client: cap_aggregator,
    }
  );
  const {
    loading: subscriptionLoading,
    error: subscriptionError,
    data: subscriptionData,
  } = useQuery<SubscriptionQueryResult>(GET_SUBSCRIPTIONS, {
    client: subscription_module,
  });

  const [formType, setFormType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SubscriptionForm>(INIT_ROW);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setFormType("");
    setSelectedRow(INIT_ROW);
    setModalOpen(false);
  };

  let tableContent;
  if (subscriptionLoading || countryLoading) {
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
          const foundCountry = testCountryData.find(
            (country) => country.countryId === id.toString()
          );
          return foundCountry?.countryName;
        });
        const districtNames = item.districtIds.map((id: number) => {
          const foundCountry = testCountryData.find(
            (country) => country.countryId === item.countryIds[0].toString()
          );
          const districtsList = foundCountry?.districts;
          const foundDistricts = districtsList?.find(
            (district) => district.districtId === id.toString()
          );
          return foundDistricts?.districtName;
        });
        return { ...item, countryNames, districtNames };
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
          // countryList={countryData.listCountry}
          countryList={testCountryData}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      )}
    </Container>
  );
};

export default Subscription;
