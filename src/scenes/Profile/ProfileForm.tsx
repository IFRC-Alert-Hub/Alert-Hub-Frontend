import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

interface UserType {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

type PropsType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  editStatus: boolean;
  setEditStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileForm = ({
  user,
  setUser,
  editStatus,
  setEditStatus,
}: PropsType) => {
  const [prevUser, setPrevUser] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setUser(prevUser);
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
          <label className="form-label" htmlFor="firstName">
            FIRST NAME
          </label>
          <TextField
            id="firstName"
            name="firstName"
            size="small"
            className="form-text-field"
            value={user.firstName}
            disabled={editStatus}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="form-label" htmlFor="lastName">
            LAST NAME
          </label>
          <TextField
            id="lastName"
            name="lastName"
            size="small"
            className="form-text-field"
            value={user.lastName}
            disabled={editStatus}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <label className="form-label" htmlFor="email">
            EMAIL ADDRESS
          </label>
          <TextField
            id="email"
            name="email"
            size="small"
            className="form-text-field"
            value={user.email}
            disabled={editStatus}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <label className="form-label" htmlFor="contactNumber">
            PHONE NUMBER
          </label>
          <TextField
            id="contactNumber"
            name="contactNumber"
            size="small"
            className="form-text-field"
            value={user.contactNumber}
            disabled={editStatus}
            onChange={handleInputChange}
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
            paddingRight="30px"
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
