import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import AlertInfoMap from "./AlertInfoMap";
import { AlertInfoText } from "./AlertInfoText";

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

const coordinatesString =
  "-9.7639,33.8818 -10.4129,34.1455 -11.0605,34.2773 -11.5346,34.8486 -11.4054,35.5078 -11.6637,36.2549 -11.6637,37.0020 -11.6637,37.5293 -11.3192,38.1885 -10.4993,37.9688 -10.1102,37.1338 -9.6340,36.6064 -9.5040,35.9912 -9.0269,35.6396 -8.7229,35.0684 -8.6361,34.2773 -9.1137,33.7061 -9.7639,33.8818";

const coordinatesArray = coordinatesString.split(" ").map((pair) => {
  const [longitude, latitude] = pair.split(",").map(Number);
  return [longitude, latitude];
});

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
  Sourc2e: "",
  Scope2: "PUBLIC",
  Restr2iction: "",
  Addresse2s: "",
  "Handlin2 Code": "IPAWSv1.0",
  Note2: "",
  Referen2ces: "",
  Incide2nts: "",
  Scope3: "PUBLIC",
  Restr3iction: "",
  Addresse3s: "",
  "Handlin3 Code": "IPAWSv1.0",
  Note3: "",
  Referen3ces: "",
  Incide3nts: "",
};
export default function DynamicTabs({ infoSets }: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable prevent tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              height: "5px",
            },
            ".MuiTabs-scrollButtons.Mui-disabled": {
              opacity: 0.3,
            },
          }}
        >
          {infoSets.map((info: any, index: any) => (
            <Tab
              key={index}
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {`Info ${index + 1}`}
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
      {infoSets.map((info: any, index: any) => (
        <CustomTabPanel key={index} value={value} index={index}>
          <React.Fragment key={index}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                {Object.entries(data).map(([key, value]) =>
                  value !== "" ? (
                    <AlertInfoText key={key} title={key} content={value} />
                  ) : (
                    <AlertInfoText
                      key={key}
                      title={key}
                      content={"Not available"}
                    />
                  )
                )}
              </Grid>
              <Grid item xs={6}>
                <AlertInfoMap
                  areaPolygon={{
                    geometryType: "Polygon",
                    coordinates: coordinatesArray,
                  }}
                ></AlertInfoMap>
              </Grid>
            </Grid>{" "}
          </React.Fragment>
        </CustomTabPanel>
      ))}
    </Box>
  );
}
