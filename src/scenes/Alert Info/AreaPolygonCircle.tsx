import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AlertInfoMap from "./AlertInfoMap";

const coordinatesString =
  "-9.7639,33.8818 -10.4129,34.1455 -11.0605,34.2773 -11.5346,34.8486 -11.4054,35.5078 -11.6637,36.2549 -11.6637,37.0020 -11.6637,37.5293 -11.3192,38.1885 -10.4993,37.9688 -10.1102,37.1338 -9.6340,36.6064 -9.5040,35.9912 -9.0269,35.6396 -8.7229,35.0684 -8.6361,34.2773 -9.1137,33.7061 -9.7639,33.8818";

const coordinatesArray = coordinatesString.split(" ").map((pair) => {
  const [longitude, latitude] = pair.split(",").map(Number);
  return [longitude, latitude];
});

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

const AreaPolygonCircle = () => {
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

  useEffect(() => {
    console.log("Selected Shape: ", selectedShape);
    console.log("Selected Index: ", selectedIndex);
  }, [selectedShape, selectedIndex]);

  return (
    <>
      <FormControl>
        <Select
          value={selectedIndex}
          onChange={handleShapeChange}
          style={{ marginTop: "10px" }}
        >
          <MenuItem value={-1}>Select an option</MenuItem>
          {combinedShapes.map((shape, index) => (
            <MenuItem key={index} value={index}>
              {shape.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedShape ? (
        <AlertInfoMap
          areaPolygon={
            selectedShape && selectedShape.type === "Polygon"
              ? {
                  geometryType: "Polygon",
                  coordinates: selectedShape.coordinates,
                }
              : undefined
          }
          areaCircle={
            selectedShape && selectedShape.type === "Circle"
              ? {
                  radius: selectedShape.radius,
                  coordinates: selectedShape.center,
                }
              : undefined
          }
        />
      ) : (
        <div>
          Please select an option above to see the available area polygon(s) and
          circle(s)
        </div>
      )}
    </>
  );
};

export default AreaPolygonCircle;
