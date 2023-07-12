import { Box, Container, Grid, Typography } from "@mui/material";
import ProfileForm from "./ProfileForm";
import ProfileAvatar from "./ProfileAvatar";
import { useContext, useState } from "react";

import { UserContext } from "../../context/UserContext";

interface User {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  email: string;
  phoneNumber: string;
}

const Profile = () => {
  const userContext = useContext(UserContext);

  const [editStatus, setEditStatus] = useState(true);
  const [user, setUser] = useState<User>(userContext.user);
  return (
    <>
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
                <ProfileAvatar
                  editStatus={editStatus}
                  setEditStatus={setEditStatus}
                  user={user}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <ProfileForm
                  editStatus={editStatus}
                  setEditStatus={setEditStatus}
                  user={user}
                  setUser={setUser}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
