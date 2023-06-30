import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Alert } from "./MapComponent";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function modifyDateTime(timestamp: string) {
  const date = new Date(timestamp);
  const formattedDateTime = date.toLocaleString("en-US", { timeZone: "UTC" });
  return formattedDateTime;
}
function TabPanel(props: TabPanelProps) {
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

interface PopupComponentProps {
  alerts: Alert[];
}

export const PopupComponent: React.FC<PopupComponentProps> = ({
  alerts = [],
}) => {
  const [value, setValue] = React.useState(0);
  const tabPanelRef = React.useRef<HTMLDivElement | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (tabPanelRef.current) {
      tabPanelRef.current.scrollTop = 0;
    }
    setValue(newValue);
  };

  React.useEffect(() => {
    if (tabPanelRef.current) {
      tabPanelRef.current.scrollTop = 0;
    }
  }, [value]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 280,
        width: 550,
        borderRadius: "5px !important",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          "& .Mui-selected": {
            color: "#f6343f !important",
          },
          width: "150px",
        }}
      >
        {alerts.map((alert, index) => (
          <Tab
            key={index}
            label={
              <span
                style={{
                  wordBreak: "break-all", // Add word break property
                  hyphens: "auto", // Add hyphenation property
                }}
              >
                {alert.event}
              </span>
            }
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      <div style={{ overflowY: "auto", width: "400px" }} ref={tabPanelRef}>
        {alerts.map((alert, index) => (
          <TabPanel value={value} index={index}>
            <Typography variant="h5" fontWeight={500} paddingBottom={"10px"}>
              {alert.event}
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Country: </span>
              {alert.countryName}
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>ISO3: </span>
              {alert.countryISO3}
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Region: </span>
              {alert.region}
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Expires: </span>
              {modifyDateTime(alert.expires)}
            </Typography>

            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Severity: </span>
              {alert.severity}
            </Typography>

            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Certainty: </span>
              {alert.certainty}
            </Typography>

            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Urgency: </span>
              {alert.urgency}
            </Typography>

            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Effective: </span>
              {modifyDateTime(alert.effective)}
            </Typography>
          </TabPanel>
        ))}
      </div>
    </Box>
  );
};
