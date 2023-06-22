import { Box, Container, Grid, Typography } from "@mui/material";
import ProfileForm from "./ProfileForm";
import ProfileAvatar from "./ProfileAvatar";

const Profile = () => {
  return (
    <Container maxWidth={"lg"}>
      <Box margin="30px 0px">
        <Typography
          variant="h2"
          fontWeight={"bold"}
          paddingBottom={"15px"}
          textTransform={"capitalize"}
          letterSpacing={"1.6px"}
        >
          My Profile
        </Typography>

        <Box margin="10px 30px">
          <Grid container>
            <Grid item xs={12} sm={3}>
              <ProfileAvatar />
            </Grid>
            <Grid item xs={12} sm={9}>
              <ProfileForm />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
