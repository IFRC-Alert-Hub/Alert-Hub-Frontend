import { Box, Container, Grid, Typography } from "@mui/material";
import ProfileForm from "./ProfileForm";
import ProfileAvatar from "./ProfileAvatar";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/UserContext";
import { GET_USER_DETAILS } from "../../API/queries/getUserDetails";
import { useQuery } from "@apollo/client";
import { auth_system } from "../../API/API_Links";

const Profile = () => {
  const userContext = useContext(UserContext);

  const [editStatus, setEditStatus] = useState(true);
  const { user, setUser } = userContext;

  // const { data: profileData } = useQuery(GET_USER_DETAILS, {
  //   client: auth_system,
  // });

  // useEffect(() => {
  //   if (profileData) {
  //     setUser(profileData.profile);
  //   }
  // }, [profileData, setUser]);

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
