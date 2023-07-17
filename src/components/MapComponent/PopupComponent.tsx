import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AlertData } from "./MapComponent";
import { Container, Divider, Pagination, Paper } from "@mui/material";

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
  const itemsPerPage = 10;
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
    <>
      <Box
        sx={{ backgroundColor: "black", color: "white", textAlign: "center" }}
      >
        {alerts[0]?.country?.iso3} ({alerts[0]?.country?.name})
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "550px",
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
          }}
        >
          {alerts
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((alert, index) => (
              <Tab
                key={index + (page - 1) * itemsPerPage}
                label={
                  <span
                    style={{
                      color:
                        index + (page - 1) * itemsPerPage === value
                          ? "#f6343f"
                          : undefined,
                    }}
                  >
                    Alert {index + (page - 1) * itemsPerPage + 1}
                  </span>
                }
                {...a11yProps(index + (page - 1) * itemsPerPage)}
              />
            ))}
        </Tabs>
        <Box
          sx={{ width: "1000px" }}
          style={{ overflowY: "auto" }}
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
                <Typography
                  variant="h5"
                  fontWeight={500}
                  paddingBottom={"10px"}
                  component="div"
                >
                  {alert.id}
                </Typography>

                <Typography variant="body2" component="div">
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    Country:{" "}
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
                      <Box sx={{ padding: "5px", border: "1px solid #f6343f" }}>
                        <Typography
                          variant="h5"
                          fontWeight={"bolder"}
                          sx={{ textDecoration: "underline" }}
                        >
                          InfoSet Title {infoIndex + 1}
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
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Box>
    </>
  );
};
