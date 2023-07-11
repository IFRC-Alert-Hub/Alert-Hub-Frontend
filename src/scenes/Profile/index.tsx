import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ProfileForm from "./ProfileForm";
import ProfileAvatar from "./ProfileAvatar";
import { useContext, useState } from "react";
import { getUserDetails } from "../../API/queries/getUserDetails";
import { auth_system } from "../../API/API_Links";
import { useQuery } from "@apollo/client";
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

  const { loading, error } = useQuery(getUserDetails, {
    client: auth_system,
    onCompleted: ({ profile }) => {
      console.log("ProfileID", profile.id);
      localStorage.setItem("ProfileID", profile.id);
    },
  });

  const [editStatus, setEditStatus] = useState(true);
  console.log(userContext);
  const [user, setUser] = useState<User>({
    id: "1",
    avatar: "https://eu.ui-avatars.com/api/?name=M&size=250",
    firstName: "Adi",
    lastName: "Leio",
    country: "United Kindom",
    city: "London",
    email: "email123@email.com",
    phoneNumber: "01234567890",
  });
  return (
    <>
      {loading && (
        <CircularProgress sx={{ textAlign: "center" }} color="secondary" />
      )}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
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
      )}
    </>
  );
};

export default Profile;
