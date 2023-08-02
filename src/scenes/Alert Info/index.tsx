// import { Container } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import * as React from "react";
// import axios from "axios";

// const AlertInfo = () => {
//   const { id } = useParams();
//   const [alertData, setAlertData] = React.useState(null);
//   const [isLoading, setIsLoading] = React.useState(true);
//   const navigate = useNavigate();

//   const fetchAlertData = async () => {
//     try {
//       const response = await axios.get(
//         `https://alert-manager.azurewebsites.net/alert/get/${id}`
//       );
//       if (response.status === 200) {
//         const data = response.data;
//         console.log(data);
//         setAlertData(data);
//       } else {
//         redirectTo404();
//       }
//     } catch (error) {
//       redirectTo404();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const redirectTo404 = () => {
//     navigate("/404");
//   };

//   React.useEffect(() => {
//     fetchAlertData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   if (isLoading) {
//     return <p>Loading...</p>;
//   } else if (alertData) {
//     return (
//       <Container maxWidth="lg">
//         <h1>Alert Info</h1>
//       </Container>
//     );
//   } else {
//     return <p>Error: Unable to fetch alert data.</p>;
//   }
// };

// export default AlertInfo;

import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TitleHeader from "../../components/Layout/TitleHeader";
import { PopupContentText } from "../../components/MapComponent/PopupComponent/PopupContentText";
import { AlertInfoText } from "./AlertInfoText";
import AlertInfoTitleHeader from "./AlertInfoTitleHeader";
import DynamicTabs from "./InfoSetsHorizontalTabs";
import AlertInfoMap from "./AlertInfoMap";

const data = {
  "Message ID":
    "urn:oid:2.49.0.1.840.0.08397cac56a1b76c64d707f3e542a8b04308241b.001.3",
  "Sender ID": "w-nws.webmaster@noaa.gov",
  "Sent Date/Time": "2023-08-02T07:15:00+00:00",
  "Message Status": "ACTUAL",
  "Message Type": "ALERT",
  Source: "",
  Scope: "PUBLIC",
  Restriction: "",
  Addresses: "",
  "Handling Code": "IPAWSv1.0",
  Note: "",
  References: "",
  Incidents: "",
};
const AlertInfo = () => {
  //const { id } = useParams();

  return (
    <>
      <Box padding={"40px"} sx={{ textAlign: "center" }}>
        <Typography
          variant={"h1"}
          fontWeight={"600"}
          sx={{ paddingBottom: "5px" }}
        >
          Excessive Heat warning
        </Typography>
        <Typography variant={"h4"}>
          <LocationOnIcon />
          UNITED STATES OF AMERICA (USA)
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <AlertInfoTitleHeader title="Alert" />
        {Object.entries(data).map(([key, value]) =>
          value !== "" ? (
            <AlertInfoText key={key} title={key} content={value} />
          ) : (
            <AlertInfoText key={key} title={key} content={"Not available"} />
          )
        )}
        <Box sx={{ padding: "20px" }}>
          {" "}
          <DynamicTabs infoSets={[{ test: "1" }, { test2: "2" }]} />
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h4">afafa</Typography>
          </Grid>
          <Grid item xs={6}>
            <AlertInfoMap></AlertInfoMap>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AlertInfo;
