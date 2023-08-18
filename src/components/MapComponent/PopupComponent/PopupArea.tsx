import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Map as MapboxMap, LngLatBoundsLike } from "mapbox-gl";
import { AlertInfoArea } from "../../../Alert-Manager-API/types";
import turfCircle from "@turf/circle";
import turfBbox from "@turf/bbox";
import CloseIcon from "@mui/icons-material/Close";
// const coordinatesArray = [
//   [
//     [46.402337365920744, -17.803245312080932],
//     [47.908167523744794, -15.723010653316308],
//     [46.33780178772807, -16.116059589294224],
//     [44.97179871598672, -16.76597213323565],
//     [44.84272755960282, -18.85488195045251],
//     [46.402337365920744, -17.803245312080932],
//   ],
// ];

// const polygons: any = [
//   {
//     type: "Polygon",
//     name: "Polygon 1",
//     coordinates: coordinatesArray,
//   },
//   {
//     type: "Polygon",
//     name: "Polygon 2",
//     coordinates: coordinatesArray,
//   },
// ];

// const circles: any = [
//   {
//     type: "Circle",
//     name: "Circle 1",
//     center: [-5.917401, 38.90551541],
//     radius: 100,
//   },
//   {
//     type: "Circle",
//     name: "Circle 2",
//     center: [-5.380571851623813, 38.61525108318435],
//     radius: 100,
//   },
// ];

interface PopupAreaProps {
  mapRef: React.MutableRefObject<MapboxMap | null>;
  infoID: number;
  infoDataHandler: {
    data: AlertInfoArea | undefined;
    loading: Boolean;
    error: string | null;
    refetch: any;
  };
}
export const PopupArea = ({
  mapRef,
  infoID,
  infoDataHandler,
}: PopupAreaProps) => {
  const { data, loading, error, refetch } = infoDataHandler;

  useEffect(() => {
    refetch(infoID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [combinedShapes, setCombinedShapes] = useState<any>(null);

  const sourceID = "infoArea-source";
  const layerID = "infoArea-layer";
  const handleShapeChange = (event: any) => {
    const newSelectedIndex = event.target.value;
    if (newSelectedIndex !== -1) {
      setSelectedIndex(newSelectedIndex);

      if (mapRef.current?.getSource(sourceID)) {
        mapRef.current?.removeLayer(layerID);
        mapRef.current?.removeSource(sourceID);
      }
      console.log(combinedShapes[newSelectedIndex].coordinates);

      if (combinedShapes[newSelectedIndex].type === "Polygon") {
        mapRef.current?.addSource(sourceID, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon" as any,
              coordinates: [
                combinedShapes[newSelectedIndex].coordinates,
              ] as any,
            },
            properties: {},
          },
        });
        mapRef.current?.addLayer({
          id: layerID,
          type: "fill",
          source: sourceID,
          paint: {
            "fill-color": "black",
            "fill-opacity": 0.6,
          },
        });
        console.log(mapRef.current?.getStyle().layers);
      } else {
        var circle = turfCircle(
          combinedShapes[newSelectedIndex]?.center as any,
          combinedShapes[newSelectedIndex]?.radius as any,
          {
            units: "kilometers",
          }
        );

        console.log("CIRCLE: ", circle);

        mapRef.current?.addSource(sourceID, {
          type: "geojson",
          data: circle,
        });

        mapRef.current?.addLayer({
          id: layerID,
          type: "fill",
          source: sourceID,
          paint: {
            "fill-color": "#0000FF",
            "fill-opacity": 0.8,
          },
        });
      }
    } else {
      setSelectedIndex(newSelectedIndex);

      if (mapRef.current?.getSource(sourceID)) {
        mapRef.current?.removeLayer(layerID);
        mapRef.current?.removeSource(sourceID);
      }
    }
  };

  // const handleClearSelection = (event: any) => {
  //   setSelectedShape(null);
  //   setSelectedIndex(-1);
  // };
  useEffect(() => {
    if (!loading && !error) {
      console.log("info_id: ", data?.info_id);
      let combinedShapesIn: any = [];
      if (!mapRef.current) {
        return;
      }
      console.log("DATA AREAS: ", data?.areas);
      data?.areas?.forEach((area: any) => {
        combinedShapesIn.push(...area.polygons, ...area.circles);
      });

      setCombinedShapes(combinedShapesIn);
    }
  }, [data?.areas, loading, error, data?.info_id, mapRef]);

  return (
    <>
      {error && (
        <h1>
          {" "}
          <Alert severity="error">
            We are currently unable to retrieve the alert information
          </Alert>
        </h1>
      )}

      {!loading &&
        !error &&
        data &&
        combinedShapes !== null &&
        combinedShapes.length > 0 && (
          <>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h5"
                sx={{ fontSize: "0.75rem" }}
                fontWeight={600}
                paddingRight={"10px"}
              >
                See on the map:
              </Typography>
              <FormControl
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& .MuiInputBase-root": {
                    margin: "0px !important",
                    height: "30px",
                  },
                }}
              >
                <Select
                  value={selectedIndex}
                  onChange={handleShapeChange}
                  style={{ marginTop: "10px", marginRight: "10px" }}
                  sx={{
                    width: 160, // Increased width to accommodate the close button
                    backgroundColor: "#f4f4f4",
                    fontSize: "0.75rem",
                    position: "relative", // Required for positioning the close button
                  }}
                >
                  <MenuItem value={-1}>Choose an option</MenuItem>

                  {combinedShapes.map((shape: any, index: number) => {
                    return (
                      <MenuItem key={index} value={index}>
                        {shape.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  if (mapRef.current?.getSource(sourceID)) {
                    mapRef.current?.removeLayer(layerID);
                    mapRef.current?.removeSource(sourceID);
                  }
                  handleShapeChange({
                    target: {
                      value: -1,
                    },
                  });
                }}
              >
                <CloseIcon />
              </IconButton> */}
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
                  display: selectedIndex !== -1 ? "block" : "none",
                  fontSize: "10px",
                }}
                onClick={() => {
                  if (mapRef.current?.getSource(sourceID)) {
                    mapRef.current?.removeLayer(layerID);
                    mapRef.current?.removeSource(sourceID);
                  }
                  handleShapeChange({
                    target: {
                      value: -1,
                    },
                  });
                }}
              >
                Remove Polygon
              </Button>

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
                  textTransform: "capitalize",
                  padding: "4px ",
                  backgroundColor: "#f5333f",
                  "&:hover": {
                    backgroundColor: "#f5333f",
                  },
                  fontSize: "10px",
                  marginLeft: "8px",
                  marginRight: "8px",

                  display: selectedIndex !== -1 ? "block" : "none",
                }}
                onClick={() => {
                  const mapBoundingBox = turfBbox({
                    type: "Feature",
                    geometry: {
                      type: "Polygon" as any,
                      coordinates: [
                        combinedShapes[selectedIndex]?.coordinates,
                      ] as any,
                    },
                  });

                  console.log(mapBoundingBox);
                  const [minX, minY, maxX, maxY] = mapBoundingBox;

                  mapRef.current!.fitBounds(
                    [minX, minY, maxX, maxY] as LngLatBoundsLike,
                    {
                      padding: { top: 20, bottom: 35, left: 20, right: 10 }, // Increased padding
                      maxZoom: 10, // Adjust this value to control the maximum zoom level
                    }
                  );
                }}
              >
                Fly to Polygon
              </Button>
            </Box>
          </>
        )}
    </>
  );
};
