import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ExtremeThreatColour, ModerateThreatColour } from "../MapComponent";
import { PopupContentText } from "./PopupContentText";
import { CustomTabPanel, a11yProps, modifyDateTime } from "./helper";
import { AlertInfo, AlertInfoArea } from "../../../Alert-Manager-API/types";
import { Map as MapboxMap } from "mapbox-gl";
import { PopupArea } from "./PopupArea";

interface TabProps {
  alertInfo: AlertInfo[];
  mapRef: React.MutableRefObject<MapboxMap | null>;
  infoDataHandler: {
    data: AlertInfoArea | undefined;
    loading: Boolean;
    error: string | null;
    refetch: any;
  };
}

const determineColour = (info: AlertInfo) => {
  if (
    info.urgency === "Immediate" ||
    info.urgency === "Expected" ||
    info.severity === "Extreme" ||
    info.severity === "Severe" ||
    info.certainty === "Observed" ||
    info.certainty === "Likely"
  ) {
    return ExtremeThreatColour;
  } else {
    return ModerateThreatColour;
  }
};

export const PopupInfoHorizontalTab = ({
  alertInfo,
  mapRef,
  infoDataHandler,
}: TabProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              height: "5px",
            },
          }}
        >
          {alertInfo.map((info, index) => (
            <Tab
              key={index}
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {`Info ${index + 1}`}
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: determineColour(info),
                      marginLeft: "5px",
                    }}
                  ></span>
                </div>
              }
              {...a11yProps(index)}
              sx={
                value === index
                  ? {
                      backgroundColor: "#fcd4dc",
                    }
                  : {
                      backgroundColor: "#DEDEDE",
                      color: "#9A9797",
                    }
              }
            />
          ))}
        </Tabs>
      </Box>
      {alertInfo.map((info, index) => (
        <Box padding="10px" key={index}>
          <CustomTabPanel key={index} value={value} index={index}>
            <React.Fragment key={index}>
              <PopupArea
                mapRef={mapRef}
                infoID={info.id}
                infoDataHandler={infoDataHandler}
              />

              <PopupContentText
                title="language"
                content={info.language!}
              ></PopupContentText>
              <PopupContentText
                title="Category"
                content={info.category!}
              ></PopupContentText>

              <PopupContentText
                title="Event"
                content={info.event!}
              ></PopupContentText>

              <PopupContentText
                title="Response Type"
                content={info.response_type!}
              ></PopupContentText>

              <PopupContentText
                title="Urgency"
                content={info.urgency!}
              ></PopupContentText>

              <PopupContentText
                title="severity"
                content={info.severity!}
              ></PopupContentText>

              <PopupContentText
                title="Certainty"
                content={info.certainty!}
              ></PopupContentText>

              <PopupContentText
                title="Audience"
                content={info.audience!}
              ></PopupContentText>

              <PopupContentText
                title="Event Code"
                content={info.event_code!}
              ></PopupContentText>

              <PopupContentText
                title="Effective"
                content={modifyDateTime(info.effective as string)}
              ></PopupContentText>

              <PopupContentText
                title="Onset"
                content={modifyDateTime(info.onset as string)}
              ></PopupContentText>

              <PopupContentText
                title="Expiration"
                content={modifyDateTime(info.expires as string)}
              ></PopupContentText>

              <PopupContentText
                title="Sender Name"
                content={info.sender_name!}
              ></PopupContentText>

              <PopupContentText
                title="Headline"
                content={info.headline!}
              ></PopupContentText>

              <PopupContentText
                title="Description"
                content={info.description!}
              ></PopupContentText>

              <PopupContentText
                title="Instructions"
                content={info.instruction!}
              ></PopupContentText>

              <PopupContentText
                title="Web"
                content={info.web!}
              ></PopupContentText>

              <PopupContentText
                title="Contact Info"
                content={info.contact!}
              ></PopupContentText>
            </React.Fragment>
          </CustomTabPanel>
        </Box>
      ))}
    </Box>
  );
};
