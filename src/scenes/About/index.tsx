import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import TitleHeader from "../../components/TitleHeader";

const About = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "555px",
          background:
            "url(https://go-user-library.ifrc.org/static/media/homepage_bg.59a1f73d.png) no-repeat center bottom",
          backgroundSize: "cover",
          padding: 0,
        }}
      >
        <Container
          sx={{
            padding: "120px 50px", // Adjusted padding values
            "@media (max-width:1200px)": {
              padding: "50px",
            },
          }}
          maxWidth="lg"
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
              sx={{
                paddingRight: "120px",
                "@media (max-width:1400px)": {
                  paddingRight: "50px",
                },
              }}
            >
              <Typography
                variant="h1"
                textAlign={"left"}
                color={"white"}
                fontSize="1.75rem"
                fontWeight={600}
                paddingBottom={"20px"}
              >
                The Goal
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"left"}
                color={"white"}
                fontSize={"1.06rem"}
                padding={"50px 0 50px 0"}
              >
                The goal of the IFRC Alert Hub is to ensure that communities
                everywhere receive the most timely and effective emergency
                alerting possible, and can thereby take action to safeguard
                their lives and livelihoods.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={5} alignItems={"left"}>
              <img
                alt="AboutLogo"
                src={
                  "https://go-user-library.ifrc.org/static/media/laptop.54818dce.png"
                }
                width={"100%"} // Adjusted image width to fill the grid item
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <TitleHeader title={"The Problem"} />
        <Typography variant="subtitle1">
          Every year, millions of people are killed, injured, displaced or made
          poor by natural hazards whose impacts could have been prevented or
          reduced. Too much of this loss is due to ineffective public warning:
          emergency alerts that are not timely enough, difficult to understand
          or fail to reach everyone at risk.
          <br />
          <br />
          This failure to reach people is due to a number of factors including:
          <List
            sx={{
              listStyleType: "disc",
              pl: 2,
              "& .MuiListItem-root": {
                display: "list-item",
              },
            }}
          >
            <ListItem>
              Hazard information that is not communicated effectively or in a
              consistent format;
            </ListItem>
            <ListItem>
              Overly complicated, data-heavy messages that are not contextually
              appropriate nor understandable by the general public;
            </ListItem>
            <ListItem>
              A lack of actionable guidance that people can understand and trust
              on how to stay safe;
            </ListItem>
            <ListItem>
              Limited broadcasting of hazard alerts across too few communication
              channels.
            </ListItem>
          </List>
        </Typography>
        <TitleHeader title={"The Solution"} />
        <Typography variant="subtitle1">
          The IFRC Alert Hub aims to address this situation by leveraging modern
          communications technology and proven international standards to
          increase the delivery of reliable, actionable emergency alerts and
          encourage anticipatory action by people in harm’s way.
          <br />
          <br />
          This will be done by:
          <List
            sx={{
              listStyleType: "decimal",
              pl: 2,
              "& .MuiListItem-root": {
                display: "list-item",
              },
            }}
          >
            <ListItem>
              increasing access for the media and online networks to official
              government alerts published using the Common Alerting Protocol
              (CAP), a digital format for exchanging emergency alerts, which
              allows a consistent alert message to be disseminated
              simultaneously over multiple communications pathways;
            </ListItem>
            <ListItem>
              facilitate the pairing of the CAP hazard alerts with locally
              contextualized and actionable public awareness and public
              education messages that have been developed and agreed to by
              national governments and emergency management organizations.
            </ListItem>
          </List>
        </Typography>

        <TitleHeader title={"Disclaimer"} />
        <Typography variant="subtitle1">
          The IFRC Alert Hub publishes only official alerts issued by recognised
          government alerting agencies. Alerts are not issued or published by
          the IFRC or its member Red Cross and Red Crescent National Societies.
          The IFRC takes no responsibility for the information contained in the
          alerts, which is solely the responsibility of the issuing agency. The
          IFRC makes every effort to identify broken government alert feeds and
          to highlight this information for users of the Alert Hub. However, the
          IFRC does not maintain 24/7 monitoring of the status of the government
          feeds and it is the responsibility of Alert Hub users to identify
          redundant sources of hazard alert information.
        </Typography>
      </Container>
    </>
  );
};

export default About;
