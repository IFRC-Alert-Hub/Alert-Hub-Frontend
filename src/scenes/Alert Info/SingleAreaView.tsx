import { Fragment } from "react";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import { AlertInfoText } from "./AlertInfoText";
// import AlertInfoMap from "./AlertInfoMap";
import { AreaPolygonCircle } from "./AreaPolygonCircle";
import { Area, AreaGeocodes } from "../../Alert-Manager-API/types";

// const infoSets = [
//   {
//     title: "Area Polygon & Circle",
//   },

//   {
//     title: "Area Geocode",
//   },
// ];

// const coordinatesString =
//   "-9.7639,33.8818 -10.4129,34.1455 -11.0605,34.2773 -11.5346,34.8486 -11.4054,35.5078 -11.6637,36.2549 -11.6637,37.0020 -11.6637,37.5293 -11.3192,38.1885 -10.4993,37.9688 -10.1102,37.1338 -9.6340,36.6064 -9.5040,35.9912 -9.0269,35.6396 -8.7229,35.0684 -8.6361,34.2773 -9.1137,33.7061 -9.7639,33.8818";

// const coordinatesArray = coordinatesString.split(" ").map((pair) => {
//   const [longitude, latitude] = pair.split(",").map(Number);
//   return [longitude, latitude];
// });

// const polygons = [
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

// const circles = [
//   {
//     type: "Circle",
//     name: "Circle 1",
//     coordinates: [-5.917401, 38.90551541],
//     radius: 100,
//   },
//   {
//     type: "Circle",
//     name: "Circle 2",
//     coordinates: [-5.380571851623813, 38.61525108318435],
//     radius: 100,
//   },
// ];

// const combinedPolygons = [...polygons, ...circles];

interface SingleAreaViewProps {
  areaSets: Area;
}

export const SingleAreaView: React.FC<SingleAreaViewProps> = ({ areaSets }) => {
  // const [selectedButton, setSelectedButton] = useState("Area Polygon & Circle"); // Initialize to null

  // const handleButtonClick = (title: string) => {
  //   setSelectedButton(title);
  // };

  interface KeyTitleMap {
    [key: string]: string;
  }
  const keyTitleMap: KeyTitleMap = {
    area_desc: "Area Description",
    altitude: "Altitude",
    ceiling: "Ceiling",
  };

  const keyOrder: (keyof Area)[] = ["area_desc", "altitude", "ceiling"];

  return (
    <Box sx={{ minHeight: "420px" }}>
      <Box paddingBottom={"10px"}>
        {" "}
        {keyOrder.map((key) => {
          const title = keyTitleMap[key] || key;
          const value = areaSets[key];

          if (key === "id") {
            return null;
          }

          return value !== "" && value !== null ? (
            <AlertInfoText
              key={key}
              title={title}
              content={value as unknown as any}
            />
          ) : (
            <AlertInfoText key={key} title={title} content={"Not Available"} />
          );
        })}{" "}
      </Box>

      <AreaPolygonCircle areaSets={areaSets} />
      {areaSets.geocode.length > 0 && (
        <Box
          sx={{
            border: "0.001em solid grey",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            sx={{ textDecoration: "underline", fontWeight: 600 }}
          >
            Geocodes
          </Typography>

          <Box sx={{ maxHeight: "250px", overflowY: "auto", padding: "20px" }}>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {areaSets.geocode.map((geocode: AreaGeocodes, index: number) => (
                <li key={index} style={{ marginBottom: "20px" }}>
                  <Card sx={{ padding: "20px" }}>
                    <Typography variant="h5">Geocode {index + 1}</Typography>
                    <Fragment>
                      <AlertInfoText
                        title={"Value Name"}
                        content={geocode.value_name}
                      />
                      <AlertInfoText title={"Value"} content={geocode.value} />
                    </Fragment>
                  </Card>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SingleAreaView;
