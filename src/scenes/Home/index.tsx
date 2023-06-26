import { Box, Container, Grid, Typography } from "@mui/material";
import TitleHeader from "../../components/TitleHeader";
import MapComponent from "../../components/MapComponent/MapComponent";
import { useRef } from "react";
import { useIntl } from "react-intl";

export const ExtremeThreatColour = "#f5333f";
export const ModerateThreatColour = "#ff9e00";
export const OtherAlertsColour = "#95BF6E";

const Home = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { formatMessage } = useIntl();

  // useEffect(() => {
  //   if (!mapRef.current) return;

  //   mapRef.current.on("load", () => {
  //     if (mapRef.current!.getSource("source1")) {
  //       return; // Source already exists, no need to add it again
  //     }

  //     console.log(mapRef.current);
  //     // Add a data source containing GeoJSON data.
  //     mapRef.current!.addSource("source1", {
  //       type: "geojson",
  //       data: {
  //         type: "Feature",
  //         geometry: {
  //           type: "Polygon",
  //           coordinates: [
  //             [
  //               [-67.13734, 45.13745],
  //               [-66.96466, 44.8097],
  //               [-68.03252, 44.3252],
  //               [-69.06, 43.98],
  //               [-70.11617, 43.68405],
  //               [-70.64573, 43.09008],
  //               [-70.75102, 43.08003],
  //               [-70.79761, 43.21973],
  //               [-70.98176, 43.36789],
  //               [-70.94416, 43.46633],
  //               [-71.08482, 45.30524],
  //               [-70.66002, 45.46022],
  //               [-70.30495, 45.91479],
  //               [-70.00014, 46.69317],
  //               [-69.23708, 47.44777],
  //               [-68.90478, 47.18479],
  //               [-68.2343, 47.35462],
  //               [-67.79035, 47.06624],
  //               [-67.79141, 45.70258],
  //               [-67.13734, 45.13745],
  //             ],
  //           ],
  //         },
  //         properties: {}, // Add an empty properties object
  //       },
  //     });

  //     mapRef.current!.addLayer({
  //       id: "fill",
  //       type: "fill",
  //       source: "source1", // reference the data source
  //       layout: {},
  //       paint: {
  //         "fill-color": "#D15D5D", // blue color fill
  //         "fill-opacity": 0.8,
  //       },
  //     });
  //     // Add a black outline around the polygon.
  //     mapRef.current!.addLayer({
  //       id: "outline",
  //       type: "line",
  //       source: "source1",
  //       layout: {},
  //       paint: {
  //         "line-color": "#000",
  //         "line-width": 2,
  //       },
  //     });
  //   });
  // }, []);

  const polygonCoordinates = [
    {
      coordinates: [
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

      color: ExtremeThreatColour,
    },
    {
      coordinates: [
        [-111.97247757707605, 33.405141431812496],
        [-111.66039281790292, 32.81858119772198],
        [-111.02099965276837, 32.20236266359389],
        [-110.20653454956084, 31.950821040094752],
        [-109.7954960862599, 32.35681295802918],
        [-109.32356303580347, 32.27962068530867],
        [-108.94297186608053, 32.24099988780213],
        [-108.76789992800803, 32.31179212744006],
        [-108.42536787525692, 32.21524356286564],
        [-107.94582300140611, 32.21524356286564],
        [-107.45866630416049, 32.23456149089131],
        [-106.94867413673173, 32.23456149089131],
        [-106.75076672847564, 32.34395214871819],
        [-106.95628596012611, 32.575166610768335],
        [-107.25314707251, 33.24613784509407],
        [-106.86494407939267, 33.9372618476702],
        [-106.75076672847564, 34.62908485460697],
        [-106.56047114361391, 35.060129905209834],
        [-107.07807513443751, 34.96661660362342],
        [-107.93821117801174, 35.234401726454436],
        [-108.54715704956831, 35.58801412919837],
        [-108.97341915965801, 35.346236380510746],
        [-110.35115919405585, 34.94166167075913],
        [-111.68322828808651, 35.28412509089915],
        [-111.52337999680275, 34.84801303694944],
        [-112.08665492799307, 34.39073561593149],
        [-112.12471404496542, 33.46231164949154],
        [-111.97247757707605, 33.405141431812496],
      ],

      color: OtherAlertsColour,
    },
  ];
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
          {formatMessage({ id: "home.title" })}
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Typography
              fontWeight={300}
              variant="h6"
              textAlign="center"
              sx={{ margin: "0 20px" }}
            >
              {formatMessage({ id: "home.subtitle" })}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <TitleHeader
        title="ONGOING Extreme Alerts"
        rightTitle={"View all alerts"}
        rightLinkURL={"/alerts/all"}
      />

      <MapComponent
        mapContainerRef={mapContainerRef}
        mapRef={mapRef}
        polygons={polygonCoordinates}
        pins={[
          { coordinates: [-90.98571, 40.748817], color: ExtremeThreatColour },
          { coordinates: [-74.006, 40.7128], color: ModerateThreatColour },
          { coordinates: [-23.993, 40.7392], color: OtherAlertsColour },
        ]}
        // boundingRegionCoordinates={{
        //   type: "Polygon",
        //   coordinates: [
        //     [
        //       [-32.99047851563365, -47.08120743260386],
        //       [-32.99047851563365, 41.726381079898935],
        //       [67.90795898435852, 41.726381079898935],
        //       [67.90795898435852, -47.08120743260386],
        //       [-32.99047851563365, -47.08120743260386],
        //     ],
        //   ],
        // }}
      />
    </Container>
  );
};

export default Home;
