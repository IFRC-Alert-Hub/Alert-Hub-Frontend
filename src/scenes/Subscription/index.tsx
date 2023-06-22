import { Box, Container, Typography } from "@mui/material";

const Subscription = () => {
  return (
    <Container maxWidth={"lg"}>
      <Box margin="50px 0px">
        <Typography
          variant="h1"
          fontWeight={"bold"}
          paddingBottom={"15px"}
          textTransform={"capitalize"}
          letterSpacing={"1.6px"}
        >
          My Subscription
        </Typography>
      </Box>
    </Container>
  );
};

export default Subscription;
