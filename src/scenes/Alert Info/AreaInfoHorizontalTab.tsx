import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import SingleAreaView from "./SingleAreaView";
import { AlertInfo, Area } from "../../APIs/Alert-Manager-API/types";

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

interface AreaInfoHorizontalTabProps {
  infoSets: AlertInfo;
}

export const AreaInfoHorizontalTab: React.FC<AreaInfoHorizontalTabProps> = ({
  infoSets,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box display="flex" width="100%">
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
          {infoSets.area.map((area: Area, index: number) => {
            return (
              <Tab
                key={index}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {`Area ${index + 1}`}
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
            );
          })}
        </Tabs>
      </Box>
      {infoSets.area.map((area: Area, index: number) => (
        <CustomTabPanel key={index} value={value} index={index}>
          <SingleAreaView areaSets={area} />
        </CustomTabPanel>
      ))}
    </Box>
  );
};
