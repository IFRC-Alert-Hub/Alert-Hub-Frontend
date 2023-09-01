import { Container } from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../GraphQL API/mutations/authMutations";
import { auth_system } from "../../GraphQL API/API_Links";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AuthComponent from "../../components/Authentication/AuthComponent";
import { useIntl } from "react-intl";

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

  const getTokenData = async (loginData: any) => {
    // console.log("Login Data: ", loginData);
    try {
      const result = await login({ variables: loginData });
      return result;
    } catch (error: any) {
      formik.setFieldError("email", "Invalid email or password.");
      formik.setFieldError("password", "Invalid email or password.");
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
        if (authData) {
          userContext.setUser(authData.data.login.user);
          navigate("/account/subscription");
        }
      });
    },
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const { formatMessage } = useIntl();

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
        <AuthComponent
          pageTitle={formatMessage({ id: "login.pageTitle" })}
          authTitle={formatMessage({ id: "login.authTitle" })}
          authSubtitle={formatMessage({ id: "login.authSubtitle" })}
          formComponent={
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
                label={formatMessage({ id: "login.formLabel.emailaddress" })}
                name="email"
                autoComplete="email"
                inputProps={{ "data-testid": "login-email" }}
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
                label={formatMessage({ id: "login.formLabel.password" })}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                inputProps={{ "data-testid": "login-password" }}
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
                <Link to="/forget-password" style={{ marginLeft: "0px" }}>
                  <Typography
                    variant="h5"
                    fontSize="13px"
                    color="#444850"
                    sx={{ textDecoration: "underline" }}
                  >
                    {formatMessage({ id: "login.forgotPasswordLabel" })}
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
                {formatMessage({ id: "login.loginBtn" })}
              </Button>

              <Box
                textAlign="center"
                display="flex"
                justifyContent="center"
                marginTop={"17px"}
                marginBottom={"17px"}
              >
                <Typography variant="h5" fontSize="13px" color="#444850">
                  {formatMessage({ id: "login.accountLabel" })}
                </Typography>
                <Link to="/register" style={{ marginLeft: "8px" }}>
                  <Typography
                    variant="h5"
                    fontSize="13px"
                    color="#444850"
                    sx={{ textDecoration: "underline" }}
                  >
                    {formatMessage({ id: "login.signUpLabel" })}
                  </Typography>
                </Link>
              </Box>
            </Box>
          }
        />
      </Container>
    </>
  );
};

export default Login;
