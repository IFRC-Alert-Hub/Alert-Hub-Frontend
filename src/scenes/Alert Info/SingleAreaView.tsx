import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { AlertInfoText } from "./AlertInfoText";
import AlertInfoMap from "./AlertInfoMap";

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

const coordinatesString2 =
  "61.682,59.349 61.739,59.386 61.941,59.439 61.993,59.486 65.069,60.184 64.885,60.628 65.717,62.019 65.719,62.09 66.884,65.08 67.937,66.074 67.92,65.434 68.213,65.269 68.398,65.438 68.431,65.481 68.433,65.429 68.379,64.624 67.002,61.435 67.094,52.156 66.276,49.577 66.119,49.006 65.233,48.988 65.299,49.613 64.795,50.469 64.504,50.332 64.174,45.4 63.716,46.87 63.561,47.031 63.343,46.936 63.149,47.561 62.848,47.073 62.639,47.245 62.346,47.226 62.336,47.409 62.196,47.395 62.179,47.634 62.331,47.656 62.314,48.305 62.849,48.728 62.77,49.609 60.854,48.419 60.827,48.433 60.363,48.762 59.709,48.512 59.657,49.079 59.484,49.034 59.391,49.547 59.244,49.514 59.221,49.792 59.755,49.958 60.063,51.116 59.945,51.512 60.318,52.069 60.242,52.298 60.334,52.335 60.881,51.9 60.836,52.33 60.87,54.986 61.203,56.29 61.528,56.676 61.507,58.818 61.682,59.349";
const coordinatesArray = coordinatesString.split(" ").map((pair) => {
  const [longitude, latitude] = pair.split(",").map(Number);
  return [longitude, latitude];
});

const AreaHorizontalTab = () => {
  const [selectedButton, setSelectedButton] = useState("Area Polygon & Circle"); // Initialize to null

  const handleButtonClick = (title: string) => {
    setSelectedButton(title);
  };

  return (
    <Box sx={{ minHeight: "420px" }}>
      <Box sx={{ padding: "20px", textAlign: "center" }}>
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
                  <AlertInfoMap
                    areaPolygon={{
                      geometryType: "Polygon",
                      coordinates: coordinatesArray,
                    }}
                  />
                )}
                {info.title === "Area Circle" && (
                  <AlertInfoMap
                    areaCircle={{
                      coordinates: [-5.380571851623813, 38.61525108318435],
                      radius: 100,
                    }}
                  />
                )}
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
