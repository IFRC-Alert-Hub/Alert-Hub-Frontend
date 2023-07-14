import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AlertData } from "./MapComponent";

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
          <Typography component={"div"}>{children}</Typography>
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
  alerts: AlertData[];
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
    <>
      {" "}
      <Box
        sx={{ backgroundColor: "black", color: "white", textAlign: "center" }}
      >
        {alerts[0].country?.iso3} ({alerts[0].country?.name})
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "600px",
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
            width: "400px",
            borderRight: 1,
            borderColor: "divider",
            "& .Mui-selected": {
              color: "#f6343f !important",
            },
          }}
        >
          {alerts.map((alert, index) => (
            <Tab
              key={index}
              label={<span>Alert {index + 1}</span>}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
        <Box
          sx={{ width: "1000px" }}
          style={{ overflowY: "auto" }}
          ref={tabPanelRef}
        >
          {alerts.map((alert, index) => (
            <TabPanel value={value} key={index} index={index}>
              <Typography
                variant="h5"
                fontWeight={500}
                paddingBottom={"10px"}
                component="div"
              >
                {alert.id}
                {/* <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: alert.color,
                    marginLeft: "10px",
                  }}
                ></span> */}
              </Typography>
              <Typography variant="body2" component="div">
                <span style={{ fontWeight: "bold" }}>Country: </span>
                {alerts[0].country?.name}{" "}
              </Typography>
              <Typography variant="body2" component="div">
                <span style={{ fontWeight: "bold" }}>ISO3: </span>
                {alerts[0].country?.iso3}{" "}
              </Typography>
              <Typography variant="body2" component="div">
                <span style={{ fontWeight: "bold" }}>Status: </span>
                {alert.status}{" "}
              </Typography>
              <Typography variant="body2" component="div">
                <span style={{ fontWeight: "bold" }}>Source: </span>
                {alert.source}{" "}
              </Typography>
              <Typography variant="body2" component="div">
                <span style={{ fontWeight: "bold" }}>Sent: </span>
                {alert.sent}{" "}
              </Typography>
              <Typography variant="body2" component="div">
                <span style={{ fontWeight: "bold" }}>Scope: </span>
                {alert.scope}{" "}
              </Typography>

              <Typography variant="body2" component="div">
                <span style={{ fontWeight: "bold" }}>restriction: </span>
                {alert.restriction}{" "}
              </Typography>
              <Typography variant="body2" component="div">
                <span style={{ fontWeight: "bold" }}>references: </span>
                {alert.references}{" "}
              </Typography>
            </TabPanel>
          ))}
        </Box>
      </Box>
    </>
  );
};
