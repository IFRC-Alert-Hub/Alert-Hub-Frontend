import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { AlertInfoText } from "./AlertInfoText";
import AlertInfoMap from "./AlertInfoMap";
import AreaPolygonCircle from "./AreaPolygonCircle";

const infoSets = [
  {
    title: "Area Polygon & Circle",
  },

  {
    title: "Area Geocode",
  },
];

const coordinatesString =
  "-9.7639,33.8818 -10.4129,34.1455 -11.0605,34.2773 -11.5346,34.8486 -11.4054,35.5078 -11.6637,36.2549 -11.6637,37.0020 -11.6637,37.5293 -11.3192,38.1885 -10.4993,37.9688 -10.1102,37.1338 -9.6340,36.6064 -9.5040,35.9912 -9.0269,35.6396 -8.7229,35.0684 -8.6361,34.2773 -9.1137,33.7061 -9.7639,33.8818";

const coordinatesArray = coordinatesString.split(" ").map((pair) => {
  const [longitude, latitude] = pair.split(",").map(Number);
  return [longitude, latitude];
});

const polygons = [
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

const circles = [
  {
    type: "Circle",
    name: "Circle 1",
    coordinates: [-5.917401, 38.90551541],
    radius: 100,
  },
  {
    type: "Circle",
    name: "Circle 2",
    coordinates: [-5.380571851623813, 38.61525108318435],
    radius: 100,
  },
];

const combinedPolygons = [...polygons, ...circles];

const AreaHorizontalTab = () => {
  const [selectedButton, setSelectedButton] = useState("Area Polygon & Circle"); // Initialize to null

  const handleButtonClick = (title: string) => {
    setSelectedButton(title);
  };

  return (
    <Box sx={{ minHeight: "420px" }}>
      <Box>
        <AlertInfoText title={"Altitude"} content={"Not Available"} />
        <AlertInfoText title={"Area Desc"} content={"Komi Republic"} />
        <AlertInfoText title={"Ceiling"} content={"Not Available"} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        sx={{ padding: "20px" }}
      >
        {infoSets.map((info, index) => (
          <Button
            key={index}
            onClick={() => handleButtonClick(info.title)}
            variant={selectedButton === info.title ? "contained" : "outlined"}
            sx={{
              borderRadius: "20px",
              padding: "12px 24px",
              fontWeight: 600,
              textTransform: "none",
              backgroundColor:
                selectedButton === info.title ? "#fcd4dc" : "#DEDEDE",
              color: selectedButton === info.title ? "red" : "#9A9797",
              "&:hover": {
                backgroundColor: "#fcd4dc",
              },
              marginRight: "10px",
              marginLeft: "10px",
            }}
          >
            {info.title}
          </Button>
        ))}
      </Box>

      <Box paddingRight="30px" paddingLeft="30px" paddingBottom={"20px"}>
        {infoSets.map((info, index) => (
          <div
            key={index}
            style={{
              display: selectedButton === info.title ? "block" : "none",
            }}
          >
            {selectedButton === info.title && (
              <>
                {info.title === "Area Polygon & Circle" && (
                  <>
                    <AreaPolygonCircle />
                  </>
                )}
                {/* {info.title === "Area Circle" && (
                  <AlertInfoMap
                    areaCircle={{
                      coordinates: [-5.380571851623813, 38.61525108318435],
                      radius: 100,
                    }}
                  />
                )} */}
                {info.title === "Area Geocode" && (
                  <Card sx={{ padding: "20px" }}>
                    <AlertInfoText title={"value Name"} content={"HMCSTD"} />
                    <AlertInfoText title={"Value"} content={"2_30"} />
                  </Card>
                )}
              </>
            )}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default AreaHorizontalTab;
