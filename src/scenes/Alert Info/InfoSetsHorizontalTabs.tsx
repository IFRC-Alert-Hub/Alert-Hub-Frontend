import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { AlertInfoText } from "./AlertInfoText";
import { Card } from "@mui/material";
import SingleAreaView from "./SingleAreaView";

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
export default function DynamicTabs({ infoSets }: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        display="flex"
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
            <Card sx={{ padding: "20px" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                alignItems="center"
              >
                <Grid item xs={12} sm={12} md={6}>
                  {Object.entries(info).map(([key, value]) =>
                    value !== "" ? (
                      <AlertInfoText
                        key={key}
                        title={key}
                        content={value as string}
                      />
                    ) : (
                      <AlertInfoText
                        key={key}
                        title={key}
                        content={"Not available"}
                      />
                    )
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Card>
                    {" "}
                    <SingleAreaView />
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </React.Fragment>
        </CustomTabPanel>
      ))}
    </Box>
  );
}
