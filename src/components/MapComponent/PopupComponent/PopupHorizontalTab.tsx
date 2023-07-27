import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  AlertInfoSet,
  ExtremeThreatColour,
  ModerateThreatColour,
} from "../MapComponent";
import { PopupContentText } from "./PopupContentText";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function modifyDateTime(timestamp: string) {
  if (timestamp === "") {
    return "";
  }

  const date = new Date(timestamp);
  const formattedDateTime = date.toLocaleString("en-US", { timeZone: "UTC" });
  return formattedDateTime;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

interface TabProps {
  infoSets: AlertInfoSet[];
}

const determineColour = (info: AlertInfoSet) => {
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

export default function DynamicTabs({ infoSets }: TabProps) {
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
          {infoSets.map((info, index) => (
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
                      marginLeft: "5px", // Add some spacing between the text and the circle
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
      {infoSets.map((info, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          <React.Fragment key={index}>
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
              content={info.responseType!}
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
              content={info.eventCode!}
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
              content={info.senderName!}
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
      ))}
    </Box>
  );
}
