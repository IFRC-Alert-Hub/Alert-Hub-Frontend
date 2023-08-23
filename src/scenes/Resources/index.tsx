import { Box, Container, Typography } from "@mui/material";
import Resourcecard from "./Resourcecard";
import { resourceData } from "./data";

const Resources = () => {
  return (
    <Container maxWidth="lg" data-testid="resources-container">
      <Typography
        variant="h2"
        fontWeight={"bold"}
        pt={"2rem"}
        pb={"1rem"}
        textTransform={"capitalize"}
        letterSpacing={"1.6px"}
      >
        Resources
      </Typography>
      <Typography variant="h5" lineHeight={2}>
        Alert Hub is an open source web project developed in collaboration with
        the International Federation of Red Cross and Red Crescent Societies
        (IFRC) as a part of the University College London (UCL) Industry
        Exchange Network (IXN). You can find all the source code and
        instructions under the following four repositories.
      </Typography>
      <Box mt={"2rem"}>
        {resourceData.map((data) => (
          <Resourcecard
            title={data.title}
            content={data.content}
            link={data.link}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Resources;
