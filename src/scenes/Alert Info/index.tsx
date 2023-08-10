import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AlertInfoText } from "./AlertInfoText";
import AlertInfoTitleHeader from "./AlertInfoTitleHeader";
import { InfoSetsHorizontalTabs } from "./InfoSetsHorizontalTabs";
import { useParams } from "react-router-dom";
import { GetAlertInfoByAlertID } from "../../Alert-Manager-API/AlertInfo";

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
              Excessive Heat warning
            </Typography>
            <Typography variant={"h4"}>
              <LocationOnIcon />
              UNITED STATES OF AMERICA (USA)
            </Typography>
          </Box>
          <Container maxWidth="lg">
            <AlertInfoTitleHeader title="Alert" />
            {Object.entries(data).map(
              ([key, value]) =>
                !Array.isArray(value) &&
                (value !== "" ? (
                  <AlertInfoText key={key} title={key} content={value as any} />
                ) : (
                  <AlertInfoText
                    key={key}
                    title={key}
                    content={"Not available"}
                  />
                ))
            )}
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
