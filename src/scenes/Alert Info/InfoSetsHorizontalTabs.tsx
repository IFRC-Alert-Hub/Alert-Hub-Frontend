import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import { AlertInfoText } from "./AlertInfoText";
import { Card } from "@mui/material";

import { AlertInfo, InfoParameter } from "../../APIs/Alert-Manager-API/types";
import { AreaInfoHorizontalTab } from "./AreaInfoHorizontalTab";

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

interface InfoSetsHorizontalTabsProps {
  infoSets: AlertInfo[];
}

export const InfoSetsHorizontalTabs: React.FC<InfoSetsHorizontalTabsProps> = ({
  infoSets,
}) => {
  const [value, setValue] = React.useState(0);
  interface KeyTitleMap {
    [key: string]: string;
  }
  const keyTitleMap: KeyTitleMap = {
    language: "Language",
    category: "Category",
    sender_name: "Sender Name",
    event_code: "Event Code",
  };

  const keyOrder: (keyof AlertInfo)[] = [
    "language",
    "category",
    "event",
    "response_type",
    "urgency",
    "severity",
    "certainty",
    "audience",
    "event_code",
    "effective",
    "onset",
    "expires",
    "sender_name",
    "headline",
    "description",
    "instruction",
    "web",
    "contact",
  ];
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
              >
                <Grid item xs={12} sm={12} md={6}>
                  <Box paddingBottom={"10px"}>
                    {" "}
                    {keyOrder.map((key) => {
                      const title = keyTitleMap[key] || key;
                      const value = info[key];

                      if (key === "id") {
                        return null;
                      }

                      return value !== "" && value !== null ? (
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
                    })}{" "}
                  </Box>

                  {info.parameter.length > 0 && (
                    <Box
                      sx={{
                        border: "0.001em solid grey",
                        padding: "10px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        textAlign={"center"}
                        sx={{ textDecoration: "underline", fontWeight: 600 }}
                      >
                        Parameters
                      </Typography>
                      <Box
                        sx={{
                          maxHeight: "250px",
                          overflowY: "auto",
                          padding: "20px",
                        }}
                      >
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          {info.parameter.map(
                            (parameter: InfoParameter, index: number) => (
                              <li key={index} style={{ marginBottom: "20px" }}>
                                <Card sx={{ padding: "20px" }}>
                                  <Typography variant="h5">
                                    Parameter {index + 1}
                                  </Typography>
                                  <React.Fragment>
                                    <AlertInfoText
                                      title={"Value Name"}
                                      content={String(parameter.id)}
                                    />
                                    <AlertInfoText
                                      title={"Value"}
                                      content={parameter.value_name}
                                    />
                                  </React.Fragment>
                                </Card>
                              </li>
                            )
                          )}
                        </ul>
                      </Box>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Card sx={{ padding: "20px" }}>
                    <AreaInfoHorizontalTab infoSets={info} />
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </React.Fragment>
        </CustomTabPanel>
      ))}
    </Box>
  );
};
