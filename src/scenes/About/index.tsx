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
          backgroundImage: `url("${process.env.PUBLIC_URL}/assets/homepage_bg.png")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
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
                src={process.env.PUBLIC_URL + "/assets/laptop.png"}
                width={"100%"}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <TitleHeader
          title={formatMessage({ id: "about.problem.titleHeader" })}
        />
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
        <TitleHeader
          title={formatMessage({ id: "about.solution.titleHeader" })}
        />
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

        <TitleHeader
          title={formatMessage({ id: "about.disclaimer.titleHeader" })}
        />
        <Typography variant="subtitle1">
          {formatMessage({ id: "about.disclaimer" })}
        </Typography>
      </Container>
    </>
  );
};

export default About;
