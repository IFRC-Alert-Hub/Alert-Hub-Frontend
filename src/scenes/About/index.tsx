import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";

import TitleHeader from "../../components/Layout/TitleHeader";

const About = () => {
  const { formatMessage } = useIntl();

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
                {formatMessage({ id: "about.title" })}
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"left"}
                color={"white"}
                fontSize={"1.06rem"}
                padding={"50px 0 50px 0"}
              >
                {formatMessage({ id: "about.subtitle" })}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={5} alignItems={"left"}>
              <img
                alt="AboutLogo"
                src={
                  "https://go-user-library.ifrc.org/static/media/laptop.54818dce.png"
                }
                width={"100%"}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <TitleHeader title={"The Problem"} />
        <Typography variant="subtitle1">
          {formatMessage({ id: "about.problem1" })}
          <br />
          <br />
          {formatMessage({ id: "about.problem2" })}
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
              {formatMessage({ id: "about.problem.listitem1" })}
            </ListItem>
            <ListItem>
              {formatMessage({ id: "about.problem.listitem2" })}
            </ListItem>
            <ListItem>
              {formatMessage({ id: "about.problem.listitem3" })}
            </ListItem>
            <ListItem>
              {formatMessage({ id: "about.problem.listitem4" })}
            </ListItem>
          </List>
        </Typography>
        <TitleHeader title={"The Solution"} />
        <Typography variant="subtitle1">
          {formatMessage({ id: "about.solution1" })}
          <br />
          <br />
          {formatMessage({ id: "about.solution2" })}
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
              {formatMessage({ id: "about.solution.listitem1" })}
            </ListItem>
            <ListItem>
              {formatMessage({ id: "about.solution.listitem2" })}
            </ListItem>
          </List>
        </Typography>

        <TitleHeader title={"Disclaimer"} />
        <Typography variant="subtitle1">
          {formatMessage({ id: "about.disclaimer" })}
        </Typography>
      </Container>
    </>
  );
};

export default About;
