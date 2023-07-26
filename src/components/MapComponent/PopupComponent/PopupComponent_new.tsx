import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AlertData } from "../MapComponent";
import { Button, Grid, Pagination, PaginationItem } from "@mui/material";
import { PopupHeader } from "./PopupHeader";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { PopupCard } from "./PopupCard";
import EmailIcon from "@mui/icons-material/Email";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { PopupContentText } from "./PopupContentText";
import DynamicTabs from "./PopupHorizontalTab";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function modifyDateTime(timestamp: string) {
  if (timestamp === "") {
    return "";
  }

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
  const [page, setPage] = React.useState(1);
  const [value, setValue] = React.useState(0);
  const tabPanelRef = React.useRef<HTMLDivElement | null>(null);
  const itemsPerPage = 7;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (tabPanelRef.current) {
      tabPanelRef.current.scrollTop = 0;
    }
    setValue(newValue + (page - 1) * itemsPerPage); // Adjust the value based on the current page
  };

  React.useEffect(() => {
    if (tabPanelRef.current) {
      tabPanelRef.current.scrollTop = 0;
    }
  }, [value]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
    setValue((newPage - 1) * itemsPerPage); // Update the value to display the correct tabs on the new page
  };

  const pageCount = Math.ceil(alerts.length / itemsPerPage);

  return (
    <div>
      <PopupHeader alerts={alerts} />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "550px",
          borderRadius: "5px !important",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid black",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              width: "220px",

              borderColor: "divider",
              marginTop: "0px",
              "& .MuiTabs-indicator": {
                width: "0px",
              },
              // "& .MuiTabs-indicator": {
              // width: "10px",
              // backgroundColor: "#F5333F",
              // left: "0px",
              // },
            }}
          >
            {alerts
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((alert, index) => (
                <Tab
                  key={index + (page - 1) * itemsPerPage}
                  sx={{
                    minHeight: "70px",
                    backgroundColor:
                      index + (page - 1) * itemsPerPage === value
                        ? "#fcd4dc"
                        : "#DEDEDE",
                    borderLeft:
                      index + (page - 1) * itemsPerPage === value
                        ? "10px solid #F5333F"
                        : "",

                    paddingBottom: "1px",
                  }}
                  label={
                    <span>
                      {alert.alertinfoSet!.length > 0 ? (
                        <>
                          {" "}
                          <Typography
                            variant="h5"
                            fontSize={"13px"}
                            fontWeight={"600"}
                            textTransform={"uppercase"}
                            color={
                              index + (page - 1) * itemsPerPage !== value
                                ? "#9A9797 !important"
                                : ""
                            }
                          >
                            {alert.alertinfoSet![0].event}
                          </Typography>
                          <Typography
                            variant="h5"
                            fontSize={"12px"}
                            textTransform={"uppercase"}
                            color={
                              index + (page - 1) * itemsPerPage !== value
                                ? "#9A9797 !important"
                                : ""
                            }
                          >
                            ({alert.alertinfoSet![0].category})
                          </Typography>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  }
                  {...a11yProps(index + (page - 1) * itemsPerPage)}
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                />
              ))}
          </Tabs>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "auto",
              paddingBottom: "5px",
              paddingTop: "5px",
            }}
          >
            <Pagination
              count={pageCount}
              color="primary"
              page={page}
              onChange={handlePageChange}
              size="small"
              siblingCount={0}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#F5333F",
                      color: "white",
                    },
                  }}
                />
              )}
            />
          </Box>
        </div>

        <Box
          sx={{
            width: "1000px",
            overflowY: "auto",
          }}
          ref={tabPanelRef}
        >
          {alerts
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((alert, index) => (
              <TabPanel
                value={value}
                key={index + (page - 1) * itemsPerPage}
                index={index + (page - 1) * itemsPerPage}
              >
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
                    <span>{alert.alertinfoSet?.[0]?.event || ""}</span>
                    {/* <Tooltip
title={`Source: ${alerts[0]?.alertinfoSet?.[0]?.event}`}
>
<span>{alerts[0]?.alertinfoSet?.[0]?.event || ""}</span>
</Tooltip> */}
                  </Typography>

                  <a href={alert.id} target="_blank" rel="noopener noreferrer">
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
                        width: "150px",
                      }}
                    >
                      <AttachFileIcon
                        fontSize="small"
                        sx={{ width: "0.7em", height: "0.7rem" }}
                      />{" "}
                      Original Source
                    </Button>
                  </a>
                </Box>

                <Grid container spacing={2} padding={"5px 0 5px 0"}>
                  <Grid item xs={6}>
                    <PopupCard
                      iconComponent={<EmailIcon fontSize="medium"></EmailIcon>}
                      iconText="Sender"
                      rightText={"cap@zamg.ac.at"}
                    ></PopupCard>
                  </Grid>
                  <Grid item xs={6}>
                    <PopupCard
                      iconComponent={
                        <DateRangeIcon fontSize="medium"></DateRangeIcon>
                      }
                      iconText="Sent"
                      rightText={modifyDateTime(alert.sent as string)}
                    ></PopupCard>
                  </Grid>
                </Grid>

                <PopupContentText
                  title="Identifier"
                  content={alert.identifier!}
                ></PopupContentText>

                <PopupContentText
                  title="Status"
                  content={alert.status!}
                ></PopupContentText>

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
                <DynamicTabs infoSets={alert?.alertinfoSet!}></DynamicTabs>
              </TabPanel>
            ))}
        </Box>
      </Box>
    </div>
  );
};
