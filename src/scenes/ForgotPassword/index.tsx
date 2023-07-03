import { Container } from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageTitle from "../../components/PageTitle";
// import { useMutation } from "@apollo/client";
// import { LOGIN } from "../../API/mutations/login";

const ForgotPassword = () => {
  // const [login] = useMutation(LOGIN);

  // const getToken = async (loginData: any) => {
  //   try {
  //     const result = await login({ variables: loginData });
  //     return result.data.login.token;
  //   } catch (error: any) {
  //     alert(error.message);
  //     return null;
  //   }
  // };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // const token = getToken({
      //   email: data.get("email"),
      //   password: data.get("password"),
      // });
      // console.log(token);
    },
  });

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
      <PageTitle title="Forgot Password" />
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
              Forgot Password
            </Typography>
            <Typography
              variant="h5"
              fontSize={"12px"}
              textAlign={"center"}
              color={"#444850"}
              padding="0 10px"
              marginBottom="3px"
            >
              Enter the email you used during registration
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
                sx={{ fontSize: "10px", minWidth: "100%", width: "100%" }} // Added sx property for full width
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
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
                  width: "100%", // Added sx property for full width
                }}
              >
                Recover
              </Button>
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
  );
};

export default ForgotPassword;
