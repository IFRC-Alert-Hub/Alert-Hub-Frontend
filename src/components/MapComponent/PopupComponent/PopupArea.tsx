import {
  Box,
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Map as MapboxMap } from "mapbox-gl";

const coordinatesArray = [
  [
    [46.402337365920744, -17.803245312080932],
    [47.908167523744794, -15.723010653316308],
    [46.33780178772807, -16.116059589294224],
    [44.97179871598672, -16.76597213323565],
    [44.84272755960282, -18.85488195045251],
    [46.402337365920744, -17.803245312080932],
  ],
];

const polygons: any = [
  {
    type: "Polygon",
    name: "Polygon 1",
    coordinates: coordinatesArray,
  },
  {
    type: "Polygon",
    name: "Polygon 2",
    coordinates: coordinatesArray,
  },
];

const circles: any = [
  {
    type: "Circle",
    name: "Circle 1",
    center: [-5.917401, 38.90551541],
    radius: 100,
  },
  {
    type: "Circle",
    name: "Circle 2",
    center: [-5.380571851623813, 38.61525108318435],
    radius: 100,
  },
];

const combinedShapes = [...polygons, ...circles];

interface PopupAreaProps {
  mapRef: React.MutableRefObject<MapboxMap | null>;
}
export const PopupArea = ({ mapRef }: PopupAreaProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedShape, setSelectedShape] = useState<any>(null);

  const handleShapeChange = (event: any) => {
    const newSelectedIndex = event.target.value;
    if (newSelectedIndex !== -1) {
      setSelectedIndex(newSelectedIndex);
      setSelectedShape(null);
      setSelectedShape(combinedShapes[newSelectedIndex]);
    } else {
      setSelectedIndex(newSelectedIndex);
      setSelectedShape(null);
    }
  };

  const handleClearSelection = (event: any) => {
    setSelectedShape(null);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    console.log(selectedShape);
    const sourceID = "infoArea-source";
    const layerID = "infoArea-layer";
    if (mapRef.current?.getSource(sourceID)) {
      mapRef.current?.removeLayer(layerID);
      mapRef.current?.removeSource(sourceID);
    }
    if (!mapRef.current || selectedShape === null) {
      return;
    }
    mapRef.current?.addSource(sourceID, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Polygon" as any,
          coordinates: coordinatesArray as any,
        },
        properties: {},
      },
    });
    mapRef.current?.addLayer({
      id: layerID,
      type: "fill",
      source: sourceID,
      paint: {
        "fill-color": "#f6333f",
        "fill-opacity": 0.8,
      },
    });
  }, [selectedShape, mapRef]);

  return (
    <>
      <Card sx={{ padding: "5px" }}>
        {" "}
        <Box display="flex" alignItems="center">
          <Typography
            variant="h5"
            sx={{ fontSize: "0.75rem" }}
            fontWeight={600}
            paddingRight={"10px"}
          >
            See on the map:
          </Typography>
          <FormControl>
            <Select
              value={selectedIndex}
              onChange={handleShapeChange}
              style={{ marginTop: "10px", marginRight: "10px" }}
            >
              <MenuItem value={-1}>Select an option</MenuItem>
              {combinedShapes.map((shape, index) => (
                <MenuItem key={index} value={index}>
                  {shape.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearSelection}
            >
              Clear Selection
            </Button>
          </FormControl>
        </Box>
      </Card>
    </>
  );
};
