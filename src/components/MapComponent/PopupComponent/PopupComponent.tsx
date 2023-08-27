import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Admin1_Alert_Data,
  AlertInfoArea,
} from "../../../APIs/Alert-Manager-API/types";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import PopupTabPanel from "./PopupTabPanel";
import {
  Alert,
  Button,
  Divider,
  Pagination,
  PaginationItem,
  Skeleton,
  Tooltip,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { a11yProps } from "./helper";
import { LngLatLike, Map as MapboxMap } from "mapbox-gl";
interface PopupComponentProps {
  handleClose?: () => void;
  loading?: boolean;
  error?: string | null;
  data?: Admin1_Alert_Data;
  countryPolygonNameClicked?: [string, string] | null;
  mapRef: React.MutableRefObject<MapboxMap | null>;
  infoDataHandler: {
    data: AlertInfoArea | undefined;
    loading: Boolean;
    error: string | null;
    refetch: any;
  };
  currentCountryBoundingBox: React.MutableRefObject<{
    countryCentroid: LngLatLike;
    zoom: number;
  } | null>;
}

export const PopupComponent: React.FC<PopupComponentProps> = ({
  handleClose,
  data,
  error,
  loading,
  countryPolygonNameClicked,
  mapRef,
  infoDataHandler,
  currentCountryBoundingBox,
}) => {
  React.useEffect(() => {
    setPage(1);
    setValue(0);
    setPageCount(0);
  }, [data]);
  const [page, setPage] = React.useState(1);
  const [value, setValue] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const tabPanelRef = React.useRef<HTMLDivElement | null>(null);
  const itemsPerPage = 8;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (tabPanelRef.current) {
      tabPanelRef.current.scrollTop = 0;
    }
    const sourceID = "infoArea-source";
    const layerID = "infoArea-layer";
    if (mapRef.current?.getSource(sourceID)) {
      mapRef.current?.removeLayer(layerID);
      mapRef.current?.removeSource(sourceID);
    }
    setValue(newValue + (page - 1) * itemsPerPage);
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
      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "700px",
            border: "1px black solid",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              color: "black",
              textAlign: "center",
              borderBottom: "1px solid black",
              padding: "10px",
              position: "relative",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={"bold"}
              textTransform={"uppercase"}
            >
              <Skeleton />
            </Typography>
            <Typography variant="h5" textTransform={"uppercase"}>
              <Skeleton />
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
              <Skeleton variant="rectangular" width={220} height={100} />
              <Divider /> <Divider />
              <Skeleton variant="rectangular" width={220} height={100} />
              <Divider /> <Divider />
              <Skeleton variant="rectangular" width={220} height={100} />
              <Divider /> <Divider />
              <Skeleton variant="rectangular" width={220} height={100} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "auto",
                  bottom: "0px",
                }}
              >
                <Skeleton variant="rectangular" width={220} height={50} />
              </Box>
            </div>

            <Box
              style={{
                overflowY: "scroll",
                display: "flex",
                width: "100%",
              }}
            ></Box>
          </Box>
        </Box>
      )}
      {error && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            border: "1px black solid",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              color: "black",
              textAlign: "center",
              borderBottom: "1px solid black",
              padding: "10px",
              position: "relative",
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
              (No Alerts)
            </Typography>
            <Typography variant="h5" textTransform={"uppercase"}>
              Country Name (Country ISO3)
            </Typography>
          </Box>
          <Alert severity="error">
            We are currently unable to retrieve the alert data, please refresh
            or try again
          </Alert>
        </Box>
      )}
      {!loading && !error && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            border: "1px black solid",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              color: "black",
              textAlign: "center",
              borderBottom: "1px solid black",
              padding: "10px",
              position: "relative",
            }}
          >
            <Tooltip
              title="If you want to reset the map zoom level, please click here"
              placement="bottom"
            >
              <span
                onClick={(event) => {
                  if (currentCountryBoundingBox.current !== null) {
                    mapRef.current!.flyTo({
                      center: currentCountryBoundingBox.current
                        ?.countryCentroid as unknown as LngLatLike,
                      zoom:
                        currentCountryBoundingBox.current!.zoom > 0
                          ? currentCountryBoundingBox.current!.zoom * 0.85
                          : mapRef.current!.getZoom(),
                    });
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
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
                    marginLeft: "8px",
                    marginRight: "8px",

                    textTransform: "capitalize",
                    padding: "4px ",
                    backgroundColor: "#f5333f",
                    "&:hover": {
                      backgroundColor: "#f5333f",
                    },
                    fontSize: "10px",
                  }}
                >
                  <RestartAltIcon fontSize="small" />
                  <Typography fontSize={"11px"}>Reset Map</Typography>
                </Button>
              </span>
            </Tooltip>
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
              {countryPolygonNameClicked?.length === 2
                ? `${countryPolygonNameClicked[0]} (${countryPolygonNameClicked[1]})`
                : "Unknown Country (Unknown ISO3)"}
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
                value={value - (page - 1) * itemsPerPage}
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
                        height: "75px",
                        backgroundColor:
                          index + (page - 1) * itemsPerPage === value
                            ? "#fcd4dc"
                            : "#DEDEDE",

                        border: "0.01em grey solid",
                      }}
                      label={
                        <span style={{ justifyItems: "center" }}>
                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              height: "100%",
                              width:
                                index + (page - 1) * itemsPerPage === value
                                  ? "10px"
                                  : "0", // Add a colored box on the left when clicked
                              backgroundColor: "#F5333F",
                            }}
                          />
                          {alert.info!.length > 0 ? (
                            <>
                              {!alert?.admin1_known && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingBottom: "1px",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      padding: "4px",
                                      fontSize: "9px",
                                      backgroundColor: "black",
                                      color: "white",
                                      ":hover": {
                                        backgroundColor: "black",
                                        border: "none",
                                      },
                                      border: "none",
                                    }}
                                  >
                                    Unknown Admin1
                                  </Box>
                                </Box>
                              )}

                              <Typography
                                variant="h5"
                                fontSize="13px"
                                fontWeight="600"
                                textTransform="uppercase"
                                color={
                                  index + (page - 1) * itemsPerPage !== value
                                    ? "#9A9797 !important"
                                    : ""
                                }
                                sx={{
                                  whiteSpace: "normal",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: "100%",
                                  display: "block",
                                  wordBreak: "break-word",
                                  lineHeight: "1.1",
                                }}
                              >
                                {alert.info![0].event.length > 30
                                  ? `${alert.info![0].event.substring(
                                      0,
                                      30
                                    )}...`
                                  : alert.info![0].event}
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
                                paddingBottom="4px"
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
                  bottom: "0px",
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
                height: "600px",
                overflowY: "scroll",
                display: "flex",
                width: "100%",
              }}
              ref={tabPanelRef}
            >
              {data?.alerts
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((alert, index) => (
                  <PopupTabPanel
                    alert={alert}
                    value={value}
                    index={index}
                    key={index}
                    page={page}
                    itemsPerPage={itemsPerPage}
                    mapRef={mapRef}
                    infoDataHandler={infoDataHandler}
                    currentCountryBoundingBox={currentCountryBoundingBox}
                  />
                ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
