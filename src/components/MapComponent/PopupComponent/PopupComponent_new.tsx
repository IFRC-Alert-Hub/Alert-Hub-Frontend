import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AlertData } from "../MapComponent";
import { Button, Pagination, PaginationItem } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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
              //   "& .MuiTabs-indicator": {
              //     width: "10px",
              //     backgroundColor: "#F5333F",
              //     left: "0px",
              //   },
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
                    <span>{alerts[0]?.alertinfoSet?.[0]?.event || ""}</span>
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

                <Typography variant="body2" component="div">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    Country 1:{" "}
                  </span>
                  {alerts[0]?.country?.name}{" "}
                </Typography>
                <Typography variant="body2" component="div">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    ISO3:{" "}
                  </span>
                  {alerts[0]?.country?.iso3}{" "}
                </Typography>
                <Typography variant="body2" component="div">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    Status:{" "}
                  </span>
                  {alert.status}{" "}
                </Typography>
                <Typography variant="body2" component="div">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    Source:{" "}
                  </span>
                  {alert.source}{" "}
                </Typography>
                <Typography variant="body2" component="div">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    Sent:{" "}
                  </span>
                  {alert.sent}{" "}
                </Typography>
                <Typography variant="body2" component="div">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    Scope:{" "}
                  </span>
                  {alert.scope}{" "}
                </Typography>
                <Typography variant="body2" component="div">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    restriction:{" "}
                  </span>
                  {alert.restriction}{" "}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ paddingBottom: "10px" }}
                >
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    references:{" "}
                  </span>
                  {alert.references}{" "}
                </Typography>

                {alert?.alertinfoSet?.map((info, infoIndex) => (
                  <Box sx={{ paddingBottom: "10px" }}>
                    <React.Fragment key={infoIndex}>
                      <Box sx={{ padding: "5px" }}>
                        <Typography
                          variant="h5"
                          fontWeight={"bolder"}
                          sx={{ textDecoration: "underline" }}
                        >
                          InfoSet {infoIndex + 1}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            language:{" "}
                          </span>
                          {info.language}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Event Category:{" "}
                          </span>
                          {info.category}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Event Type:{" "}
                          </span>
                          {info.event}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Response Type:{" "}
                          </span>
                          {info.responseType}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Urgency:{" "}
                          </span>
                          {info.urgency}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Severity:{" "}
                          </span>
                          {info.severity}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Certainty:{" "}
                          </span>
                          {info.certainty}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Audience:{" "}
                          </span>
                          {info.audience}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Event Code:{" "}
                          </span>
                          {info.eventCode}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Effective Date/Time:{" "}
                          </span>
                          {modifyDateTime(info.effective as string)}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Onset Date/Time:{" "}
                          </span>
                          {modifyDateTime(info.onset as string)}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Expiration Date/Time:{" "}
                          </span>
                          {modifyDateTime(info.expires as string)}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Sender Name:{" "}
                          </span>
                          {info.senderName}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Headline:{" "}
                          </span>
                          {info.headline}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Event Description:{" "}
                          </span>
                          {info.description}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Instructions:{" "}
                          </span>
                          {info.instruction}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Information URL:{" "}
                          </span>
                          {info.web}{" "}
                        </Typography>
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                          >
                            Contact Info:{" "}
                          </span>
                          {info.contact}{" "}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  </Box>
                ))}
              </TabPanel>
            ))}
        </Box>
      </Box>
    </div>
  );
};
