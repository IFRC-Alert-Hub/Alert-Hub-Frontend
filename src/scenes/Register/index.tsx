import { Container } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Register = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    });
    // const token = getToken({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    // console.log(token);
  };
  return (
    <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
      <Typography
        variant="h1"
        textAlign={"center"}
        fontWeight={"bold"}
        textTransform={"capitalize"}
        letterSpacing={"1.6px"}
      >
        Register
      </Typography>
      <Grid
        container
        component="main"
        sx={{
          height: "auto",
          borderRadiuWes: "20px",
          justify: "flex-end",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "2rem",
              minHeight: "600px",
              textAlign: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              fontWeight={560}
              textAlign={"center"}
            >
              Create Account
            </Typography>
            <Typography
              variant="h5"
              fontSize={"12px"}
              textAlign={"center"}
              color={"#444850"}
              padding="0 10px"
              marginBottom="3px"
            >
              Staff, members and volunteers of the Red Cross Red Crescent
              Movement (National Societies, the IFRC and the ICRC) are welcome
              to register for a user account on GO, to access information for
              the Membership. Other responders and members of the public may
              browse the public areas of the site without registering for an
              account.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="first-name"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                sx={{ fontSize: "12px" }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="last-name"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                sx={{ fontSize: "12px" }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                sx={{ fontSize: "12px" }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                sx={{ fontSize: "12px" }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="confirm-password"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                sx={{ fontSize: "12px", paddingBottom: "20px" }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  color: "#fff",
                  outline: "red",
                  textTransform: "capitalize",
                  borderRadius: "10px",
                  backgroundColor: "#f5333f",
                  "&:hover": {
                    backgroundColor: "#f5333f",
                  },
                  fontSize: "14px",
                }}
              >
                Register
              </Button>

              <Box
                textAlign="center"
                display="flex"
                justifyContent="center"
                marginTop={"17px"}
                marginBottom={"17px"}
              >
                <Typography variant="h5" fontSize="13px" color="#444850">
                  Already have an account?
                </Typography>
                <Link href="#" style={{ marginLeft: "8px" }}>
                  <Typography
                    variant="h5"
                    fontSize="13px"
                    color="#444850"
                    sx={{ textDecoration: "underline" }}
                  >
                    Log in
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          display={{ xs: "none", sm: "none", md: "block" }}
          md={6}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/login_ifrc.jpeg"}
            alt="ifrc_image"
            style={{
              width: "80%",
              height: "auto",
              borderRadius: "20px",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
