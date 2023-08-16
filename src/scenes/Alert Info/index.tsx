import { Box, Card, Container, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AlertInfoText } from "./AlertInfoText";
import AlertInfoTitleHeader from "./AlertInfoTitleHeader";
import { InfoSetsHorizontalTabs } from "./InfoSetsHorizontalTabs";
import { useParams } from "react-router-dom";
import { GetAlertInfoByAlertID } from "../../Alert-Manager-API/AlertInfo";
import { Alert } from "../../Alert-Manager-API/types";

const AlertInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, refetch } = GetAlertInfoByAlertID();
  useMemo(() => {
    refetch(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!loading && !error) {
      console.log(data);
    }
  }, [data, loading, error]);

  interface KeyTitleMap {
    [key: string]: string;
  }

  const keyTitleMap: KeyTitleMap = {
    url: "URL",
    identifier: "Identifier",
    sender: "Sender",
    sent: "Sent",
    status: "Status",
    msg_type: "Message Type",
    source: "Source",
    scope: "Scope",
    restriction: "Restriction",
    addresses: "Addresses",
    code: "Code",
    note: "Note",
    references: "References",
    incidents: "Incidents",
  };

  const keyOrder: (keyof Alert)[] = [
    "url",
    "identifier",
    "msg_type",
    "source",
    "sender",
    "sent",
    "status",
    "scope",
    "restriction",
    "addresses",
    "code",
    "note",
    "references",
    "incidents",
  ];
  return (
    <>
      {error && <h1>Error</h1>}
      {data && !loading && !error && (
        <>
          {" "}
          <Box padding={"40px"} sx={{ textAlign: "center" }}>
            <Typography
              variant={"h1"}
              fontWeight={"600"}
              sx={{ paddingBottom: "5px" }}
            >
              {data.info!.length > 0 && data.info![0].event}
            </Typography>
            <Typography variant={"h4"}>
              <LocationOnIcon />
              Country: {data.country}
            </Typography>
            <Typography variant={"h4"}>Region: {data.region}</Typography>
            <Typography variant={"h4"}>Admin1s: {data.admin1}</Typography>
          </Box>
          <Container maxWidth="lg">
            <AlertInfoTitleHeader title="Alert" />
            {keyOrder.map((key) => {
              const title = keyTitleMap[key] || key;
              const value = data[key];

              if (key === "id") {
                return null;
              }

              return value !== "" ? (
                <AlertInfoText
                  key={key}
                  title={title}
                  content={value as unknown as any}
                />
              ) : (
                <AlertInfoText
                  key={key}
                  title={title}
                  content={"Not Available"}
                />
              );
            })}

            <Box sx={{ padding: "20px" }}>
              {" "}
              <InfoSetsHorizontalTabs infoSets={data.info!} />
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default AlertInfo;
