import { Box, Grid, TextField } from "@mui/material";

const ProfileForm = () => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ margin: "50px 0px 0px 30px" }}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <TextField
            label="FIRST NAME"
            id="first name"
            size="small"
            className="form-text-field"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="LAST NAME"
            id="last name"
            size="small"
            className="form-text-field"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="EMAIL ADDRESS"
            id="email"
            size="small"
            className="form-text-field"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="CONTECT NUMBER"
            id="contact number"
            size="small"
            className="form-text-field"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileForm;
