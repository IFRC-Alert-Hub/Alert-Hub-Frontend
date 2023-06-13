import { Box, Container, Grid, Typography } from "@mui/material";
import TitleHeader from "../../components/TitleHeader";
import MapComponent from "./MapComponent";
import { useEffect, useRef } from "react";

const Home = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.on("load", () => {
      if (mapRef.current!.getSource("source1")) {
        return; // Source already exists, no need to add it again
      }

      console.log(mapRef.current);
      // Add a data source containing GeoJSON data.
      mapRef.current!.addSource("source1", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-67.13734, 45.13745],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573, 43.09008],
                [-70.75102, 43.08003],
                [-70.79761, 43.21973],
                [-70.98176, 43.36789],
                [-70.94416, 43.46633],
                [-71.08482, 45.30524],
                [-70.66002, 45.46022],
                [-70.30495, 45.91479],
                [-70.00014, 46.69317],
                [-69.23708, 47.44777],
                [-68.90478, 47.18479],
                [-68.2343, 47.35462],
                [-67.79035, 47.06624],
                [-67.79141, 45.70258],
                [-67.13734, 45.13745],
              ],
            ],
          },
          properties: {}, // Add an empty properties object
        },
      });

      mapRef.current!.addLayer({
        id: "fill",
        type: "fill",
        source: "source1", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#D15D5D", // blue color fill
          "fill-opacity": 0.8,
        },
      });
      // Add a black outline around the polygon.
      mapRef.current!.addLayer({
        id: "outline",
        type: "line",
        source: "source1",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 2,
        },
      });
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: "50px 0 50px 0" }}>
        <Typography
          variant="h1"
          textAlign={"center"}
          fontWeight={"bold"}
          paddingBottom={"15px"}
          textTransform={"capitalize"}
          letterSpacing={"1.6px"}
        >
          IFRC Alert Hub
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Typography
              fontWeight={300}
              variant="h6"
              textAlign="center"
              sx={{ margin: "0 20px" }}
            >
              IFRC GO aims to make all disaster information universally
              accessible and useful to IFRC responders for better decision
              making.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <TitleHeader
        title="ONGOING Extreme Alerts"
        rightTitle={"View all alerts"}
        rightLinkURL={"/View all alerts"}
      />

      <MapComponent mapContainerRef={mapContainerRef} mapRef={mapRef} />
    </Container>
  );
};

export default Home;
