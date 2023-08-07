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
import { Admin1_Alert_Data } from "../../../Alert-Manager-API/types";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

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
  handleClose?: () => void;
  loading?: boolean;
  error?: string | null;
  data?: Admin1_Alert_Data;
}

export const PopupComponent: React.FC<PopupComponentProps> = ({
  handleClose,
  data,
  error,
  loading,
}) => {
  const [page, setPage] = React.useState(1);
  const [value, setValue] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);

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
    setValue((newPage - 1) * itemsPerPage);
  };

  React.useEffect(() => {
    if (!loading && !error) {
      setPageCount(Math.ceil(data!.alerts.length / itemsPerPage));
    }
  }, [data, error, loading]);

  return (
    <>
      {" "}
      {!loading && !error && (
        <Box sx={{ height: "700px" }}>
          {/* <PopupHeader alerts={alerts} handleClose={handleClose} /> */}
          <Box
            sx={{
              backgroundColor: "white",
              color: "black",
              textAlign: "center",
              borderBottom: "1px solid black",
              padding: "10px",
              position: "relative", // To make sure the close button is positioned relative to this Box
            }}
          >
            <DisabledByDefaultIcon
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
            <Typography
              variant="h4"
              fontWeight={"bold"}
              textTransform={"uppercase"}
            >
              {data?.admin1_name} (
              {data!.alerts.length > 1
                ? `${data?.alerts.length} Alerts`
                : `${data?.alerts.length} Alert`}
              )
            </Typography>
            <Typography variant="h5" textTransform={"uppercase"}>
              Country Name (ISO3)
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
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
                }}
              >
                {data!.alerts
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
                        // borderLeft:
                        //   index + (page - 1) * itemsPerPage === value
                        //     ? "10px solid #F5333F"
                        //     : "",

                        paddingBottom: "1px",
                      }}
                      label={
                        <span>
                          {alert.info!.length > 0 ? (
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
                                {alert.info![0].event}
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
                                ({alert.info![0].category})
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
                          "&:hover": {
                            backgroundColor: "#F5333F",
                          },
                        },
                        "&:hover": {
                          backgroundColor: "#F5333F",
                          color: "white",
                        },
                        "&:focus": {
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
              {data?.alerts
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
                        <span>{alert.info?.[0]?.event || ""}</span>
                        {/* <Tooltip
title={`Source: ${alerts[0]?.alertinfoSet?.[0]?.event}`}
>
<span>{alerts[0]?.alertinfoSet?.[0]?.event || ""}</span>
</Tooltip> */}
                      </Typography>

                      <a
                        href={alert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                          iconComponent={
                            <EmailIcon fontSize="medium"></EmailIcon>
                          }
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

                    {/* <DynamicTabs infoSets={alert?.alertinfoSet!}></DynamicTabs> */}
                  </TabPanel>
                ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
