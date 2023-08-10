import { Box, Container, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AlertInfoText } from "./AlertInfoText";
import AlertInfoTitleHeader from "./AlertInfoTitleHeader";
import DynamicTabs from "./InfoSetsHorizontalTabs";

const data = {
  code: "",
  id: "15383",
  identifier: "2.49.0.0.250.0.FR.20230803060040.725023",
  incidents: "",
  msgType: "ALERT",
  note: "",
  references: "",
  restriction: "",
  scope: "PUBLIC",
  sender: "vigilance@meteo.fr",
  sent: "2023-08-03T04:00:40+00:00",
  source: "",
  status: "ACTUAL",
  url: "https://feeds.meteoalarm.org/api/v1/warnings/feeds-france/5db24ddb-eb6e-4a23-8617-11a8c8968ead?index_info=1&index_area=10&index_geocode=0",
  addresses: "",
};

const info = [
  {
    category: "MET",
    audience: "",
    contact: "METEO-FRANCE",
    certainty: "LIKELY",
    description:
      "Des phénomènes habituels dans la région mais occasionnellement et localement dangereux sont prévus (exemple : mistral, orage d'été, montée des eaux, fortes vagues submergeant le littoral).",
    effective: "2023-08-03T04:00:00+00:00",
    event: "Vigilance jaune orages",
    urgency: "FUTURE",
    severity: "MODERATE",
    senderName: "METEO-FRANCE",
    responseType: "MONITOR",
    parameter: "",
    onset: "2023-08-03T04:00:26+00:00",
    language: "fr-FR",
    id: "13874",
    instruction:
      "Soyez attentifs si vous pratiquez des activités sensibles au risque météorologique ou à proximité d'un rivage ou d'un cours d'eau. Tenez-vous au courant de l'évolution de la situation.",
    headline: "Vigilance jaune orages",
    expires: "2023-08-03T22:00:00+00:00",
    eventCode: "",
    web: "http://vigilance.meteofrance.com/",
  },
  {
    category: "MET",
    audience: "",
    contact: "METEO-FRANCE",
    certainty: "LIKELY",
    description:
      "Moderate damages may occur, especially in vulnerable or in exposed areas and to people who carry out weather-related activities.",
    effective: "2023-08-03T04:00:00+00:00",
    event: "Moderate thunderstorm warning",
    urgency: "FUTURE",
    severity: "MODERATE",
    senderName: "METEO-FRANCE",
    responseType: "MONITOR",
    parameter: "",
    onset: "2023-08-03T04:00:26+00:00",
    language: "en-GB",
    id: "13877",
    instruction: "Be careful, keep informed of the latest weather forecast.",
    headline: "Moderate thunderstorm warning",
    expires: "2023-08-03T22:00:00+00:00",
    eventCode: "",
    web: "http://vigilance.meteofrance.com/",
  },
];

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
          <DynamicTabs infoSets={info} />
        </Box>
      </Container>
    </>
  );
};

export default AlertInfo;
