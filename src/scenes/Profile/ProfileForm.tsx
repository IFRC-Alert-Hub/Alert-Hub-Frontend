import {
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";

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

type PropsType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  editStatus: boolean;
  setEditStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileForm = ({
  user,
  setUser,
  editStatus,
  setEditStatus,
}: PropsType) => {
  const [, setPrevUser] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser: User | null) => ({
      ...(prevUser as User), // Type assertion to satisfy TypeScript
      [e.target.name]: e.target.value,
    }));
  };
  const handleCancel = () => {
    setUser((prevUser) => prevUser); // No changes needed, just reset to the previous user state
    setEditStatus(true);
  };

  const handleSubmit = () => {
    setPrevUser(user);
    console.log(user);
    setEditStatus(true);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="form-box"
      onSubmit={(e) => e.preventDefault()}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <InputLabel className="form-label" htmlFor="firstName">
            First Name
          </InputLabel>
          <TextField
            id="firstName"
            name="firstName"
            size="small"
            className="form-text-field"
            value={user?.firstName}
            disabled={editStatus}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel className="form-label" htmlFor="lastName">
            Last Name
          </InputLabel>
          <TextField
            id="lastName"
            name="lastName"
            size="small"
            className="form-text-field"
            value={user?.lastName}
            disabled={editStatus}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel className="form-label" htmlFor="country">
            Country
          </InputLabel>
          <TextField
            id="country"
            name="country"
            size="small"
            className="form-text-field"
            value={user?.country}
            disabled={editStatus}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel className="form-label" htmlFor="city">
            City
          </InputLabel>
          <TextField
            id="city"
            name="city"
            size="small"
            className="form-text-field"
            value={user?.city}
            disabled={editStatus}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} m={{ xs: "0px 0px 20px 0px", sm: "0 30px 20px 0" }}>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <OutlinedInput
            id="email"
            name="email"
            size="small"
            value={user?.email}
            disabled
            fullWidth
            sx={{ p: "0px" }}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="text"
                  disabled={!editStatus}
                  disableRipple
                  sx={{
                    color: "red",
                    textTransform: "capitalize",
                    "&:hover": { opacity: "0.5" },
                  }}
                >
                  {"Switch"}
                </Button>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={12} m={{ xs: "0px 0px 20px 0px", sm: "0 30px 30px 0" }}>
          <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
          <OutlinedInput
            id="phoneNumber"
            name="phoneNumber"
            size="small"
            value={user?.phoneNumber}
            disabled
            fullWidth
            sx={{ p: "0px" }}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="text"
                  disabled={!editStatus}
                  disableRipple
                  sx={{
                    color: "red",
                    textTransform: "capitalize",
                    "&:hover": { opacity: "0.5" },
                  }}
                >
                  {"Switch"}
                </Button>
              </InputAdornment>
            }
          />
        </Grid>

        {editStatus ? (
          <div></div>
        ) : (
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="flex-end"
            pr={{ xs: "20px", sm: "30px" }}
          >
            <Button
              variant="outlined"
              color="error"
              sx={{ marginRight: "10px" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="error"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProfileForm;
