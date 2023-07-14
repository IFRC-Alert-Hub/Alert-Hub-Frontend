import { Container } from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageTitle from "../../components/PageTitle";
import BreadcrumbsComponent from "../../components/Breadcrumbs/BreadcrumbsComponent";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../API/mutations/login";
import { auth_system } from "../../API/API_Links";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const userContext = React.useContext(UserContext);

  const [login] = useMutation(LOGIN, {
    client: auth_system,
    variables: {
      email: "",
      password: "",
    },
  });

  // const [serverError, setServerError] = React.useState(false);

  const getTokenData = async (loginData: any) => {
    console.log("Login Data: ", loginData);
    try {
      const result = await login({ variables: loginData });
      return result;
    } catch (error: any) {
      formik.setFieldError("email", "Invalid email or password.");
      formik.setFieldError("password", "Invalid email or password.");
      //setServerError(true);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      getTokenData(values).then((authData) => {
        console.log("afsafsafa: ", authData);
        if (authData) {
          userContext.setUser(authData.data.login.user);
          //localStorage.setItem("tokenExpiry", authData.data.login.payload.exp);
          navigate("/account/subscription");
        }
      });
    },
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
        <BreadcrumbsComponent />
        <PageTitle title="Login"></PageTitle>
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
                minHeight: "auto",
                textAlign: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h2"
                fontWeight={560}
                textAlign={"center"}
                fontSize={"23px"}
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
                If you are staff, member or volunteer of the Red Cross Re
                Crescent Movement (National Societies, the IFRC and the ICRC)
                login with you email and password.{" "}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1, width: "80%" }}
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
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText={formik.touched.password && formik.errors.password}
                />

                <Box
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                  marginTop={"17px"}
                  marginBottom={"17px"}
                >
                  <Link href="/forget-password" style={{ marginRight: "8px" }}>
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
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Login
                </Button>

                {/* {serverError && (
                  <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    sx={{ marginTop: "8px", textTransform: "Uppercase" }}
                  >
                    Cannot connect to the server
                  </Typography>
                )} */}

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
                  <Link href="/register" style={{ marginLeft: "8px" }}>
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
              src={process.env.PUBLIC_URL + "/assets/login_ifrc.png"}
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
    </>
  );
};

export default Login;
