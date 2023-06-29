import { Container } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../API/mutations/login";

const Login = () => {
  const [login] = useMutation(LOGIN);
  // const getToken = async (loginData: any) => {
  //   try {
  //     const result = await login({ variables: loginData });
  //     return result.data.login.token;
  //   } catch (error: any) {
  //     alert(error.message);
  //     return null;
  //   }
  // };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
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
        Login
      </Typography>
      <Grid
        container
        component="main"
        sx={{
          height: "auto",
          borderRadius: "20px",
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
              Welcome Back
            </Typography>
            <Typography
              variant="h5"
              fontSize={"12px"}
              textAlign={"center"}
              color={"#444850"}
              padding="0 10px"
              marginBottom="3px"
            >
              If you are staff, member or volunteer of the Red Cross Re Crescent
              Movement (National Societies, the IFRC and the ICRC) login with
              you email and password.{" "}
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ fontSize: "12px" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Box
                textAlign="center"
                display="flex"
                justifyContent="center"
                marginTop={"17px"}
                marginBottom={"17px"}
              >
                <Link href="#" style={{ marginRight: "8px" }}>
                  <Typography
                    variant="h5"
                    fontSize="13px"
                    color="#444850"
                    sx={{ textDecoration: "underline" }}
                  >
                    Forgot Password
                  </Typography>
                </Link>
                <Typography variant="h5" fontSize="12px" color="#444850">
                  |
                </Typography>
                <Link href="#" style={{ marginLeft: "8px" }}>
                  <Typography
                    variant="h5"
                    fontSize="13px"
                    color="#444850"
                    sx={{ textDecoration: "underline" }}
                  >
                    Re-send validation email
                  </Typography>
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  color: "#fff",
                  outline: "red",
                  textTransform: "capitalize",
                  padding: "0px ",
                  borderRadius: "10px",
                  backgroundColor: "#f5333f",
                  "&:hover": {
                    backgroundColor: "#f5333f",
                  },
                  fontSize: "14px",
                }}
              >
                Login
              </Button>

              <Box
                textAlign="center"
                display="flex"
                justifyContent="center"
                marginTop={"17px"}
                marginBottom={"17px"}
              >
                <Typography variant="h5" fontSize="13px" color="#444850">
                  Don’t have an account?
                </Typography>
                <Link href="#" style={{ marginLeft: "8px" }}>
                  <Typography
                    variant="h5"
                    fontSize="13px"
                    color="#444850"
                    sx={{ textDecoration: "underline" }}
                  >
                    Sign up
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

export default Login;
