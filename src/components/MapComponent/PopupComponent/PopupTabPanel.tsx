import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { PopupCard } from "./PopupCard";
import EmailIcon from "@mui/icons-material/Email";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { PopupContentText } from "./PopupContentText";
import { Alert } from "../../../Alert-Manager-API/types";
import { TabPanelProps, modifyDateTime } from "./helper";
import { PopupInfoHorizontalTab } from "./PopupInfoHorizontalTab";
import { Map as MapboxMap } from "mapbox-gl";
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
interface PopupTabPanelProps {
  alert: Alert;
  value: number;
  index: number;
  itemsPerPage: number;
  page: number;
  mapRef: React.MutableRefObject<MapboxMap | null>;
}

export const PopupTabPanel: React.FC<PopupTabPanelProps> = ({
  alert,
  value,
  index,
  itemsPerPage,
  page,
  mapRef,
}) => {
  return (
    <div>
      <TabPanel
        value={value}
        key={index + (page - 1) * itemsPerPage}
        index={index + (page - 1) * itemsPerPage}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textTransform="uppercase"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <span>{alert.info?.[0]?.event || ""}</span>
          </Typography>

          <a href={alert.url} target="_blank" rel="noopener noreferrer">
            <Button
              variant="contained"
              color="success"
              disableTouchRipple
              disableRipple
              disableElevation
              disableFocusRipple
              sx={{
                color: "#fff",
                outline: "red",
                textTransform: "uppercase",
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: "#f5333f",
                "&:hover": {
                  backgroundColor: "#f5333f",
                },
                width: "70px",
              }}
            >
              <AttachFileIcon
                fontSize="small"
                sx={{
                  width: "1em",
                  height: "1rem",
                  paddingRight: "5px",
                }}
              />{" "}
              Origin
            </Button>
          </a>
        </Box>
        <Grid
          container
          spacing={2}
          padding={"5px 0 5px 0"}
          marginTop={"0px"}
          marginBottom={"5px"}
        >
          <Grid item xs={6}>
            <PopupCard
              iconComponent={<EmailIcon fontSize="medium"></EmailIcon>}
              iconText="Sender"
              rightText={"cap@zamg.ac.at"}
            ></PopupCard>
          </Grid>
          <Grid item xs={6}>
            <PopupCard
              iconComponent={<DateRangeIcon fontSize="medium"></DateRangeIcon>}
              iconText="Sent"
              rightText={modifyDateTime(alert.sent as string)}
            ></PopupCard>
          </Grid>
        </Grid>
        <Box sx={{ padding: "5px 0 5px 0" }}>
          <PopupContentText
            title="Identifier"
            content={alert.identifier!}
          ></PopupContentText>

          {/* <PopupContentText
                title="Status"
                content={alert.status!}
              ></PopupContentText> */}

          <PopupContentText
            title="Scope"
            content={alert.scope!}
          ></PopupContentText>

          <PopupContentText
            title="restriction"
            content={alert.restriction!}
          ></PopupContentText>

          <PopupContentText
            title="references"
            content={alert.references!}
          ></PopupContentText>
        </Box>
        <PopupInfoHorizontalTab
          mapRef={mapRef}
          key={index}
          alertInfo={alert.info}
        />
      </TabPanel>
    </div>
  );
};

export default PopupTabPanel;
