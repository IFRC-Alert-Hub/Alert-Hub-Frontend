import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  LinearProgress,
} from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageTitle from "../../components/PageTitle";
import { useMutation } from "@apollo/client";
import { auth_system } from "../../API/API_Links";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  RESET_PASSWORD,
  RESET_PASSWORD_CONFIRM,
} from "../../API/mutations/resetPassword";
// import Tooltip from "@mui/material/Tooltip";
// import InfoIcon from "@mui/icons-material/Info";
// import CancelIcon from "@mui/icons-material/Cancel";

// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ForgotPassword = () => {
  const [passwordStrength, setPasswordStrength] = React.useState(0);
  const [isSendClicked, setIsSendClicked] = React.useState(false);
  const [isSendEnabled, setIsSendEnabled] = React.useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = React.useState(false);

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    client: auth_system,
    variables: {
      email: "",
    },
  });

  // const [resetPasswordConfirm] = useMutation(RESET_PASSWORD_CONFIRM, {
  //   client: auth_system,
  //   variables: {
  //     email: "",
  //   },
  // });
  const sendEmail = async (email: string) => {
    try {
      await resetPassword({ variables: { email: email } });
      alert("Sent");
    } catch (error: any) {
      alert(error);
    }
  };
  const calculatePasswordStrength = (password: string) => {
    const strengthRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/;
    if (password.length === 0) {
      return 0;
    } else if (strengthRegex.test(password)) {
      return 100;
    } else {
      const factors = [
        { regex: /[A-Z]/, factor: 20 },
        { regex: /[0-9]/, factor: 15 },
        { regex: /[!@#$%^&*()]/, factor: 15 },
      ];
      const lengthFactor = Math.min(password.length / 8, 1) * 50;

      let totalFactor = lengthFactor;
      factors.forEach((item) => {
        if (item.regex.test(password)) {
          totalFactor += item.factor;
        }
      });

      return totalFactor;
    }
  };
  const handlePasswordChange = (event: any) => {
    const password = event.target.value;
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
    formik.handleChange(event);
  };
  const handleSendClick = () => {
    setIsSendClicked(true);
    const { email } = formik.values;
    sendEmail(email);
    setIsEmailSent(true);
  };

  const formik = useFormik({
    initialValues: {
      // firstName: "",
      // lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      verifyCode: "",
    },
    validationSchema: Yup.object({
      // firstName: Yup.string().required("Required"),
      // lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/,
          "Password must contain at least one uppercase letter, one number, and one special character"
        ),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), ""], "Passwords must match"),
      verifyCode: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const isValidEmail = Yup.string()
      .email("Invalid email address")
      .required("Required")
      .isValidSync(event.target.value);
    setIsSendEnabled(isValidEmail);
    formik.handleChange(event);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setConfirmPassword] = React.useState(false);

  const handleToggleConfirmPassword = () => {
    setConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
      <PageTitle title="Forgot Password"></PageTitle>

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
            >
              Forgot Password{" "}
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
                sx={{ fontSize: "12px" }}
                value={formik.values.email}
                onChange={handleEmailChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span style={{ marginRight: "5px", color: "grey" }}>
                        |
                      </span>
                      <Link
                        sx={{
                          fontSize: "12px",
                          color: "grey",
                          pointerEvents: !isSendEnabled ? "none" : "auto",
                          cursor: isSendEnabled ? "pointer" : "default",
                        }}
                        onClick={isSendEnabled ? handleSendClick : undefined}
                      >
                        SEND
                      </Link>
                    </InputAdornment>
                  ),
                }}
              />
              {isEmailSent && (
                <Alert severity="success">Email has been sent</Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="verifyCode"
                label="Verification Code"
                name="verifyCode"
                autoComplete="off"
                sx={{ fontSize: "12px" }}
                value={formik.values.verifyCode}
                onChange={formik.handleChange}
                disabled={!isSendClicked}
                error={
                  formik.touched.verifyCode && Boolean(formik.errors.verifyCode)
                }
                helperText={
                  formik.touched.verifyCode && formik.errors.verifyCode
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={handlePasswordChange}
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

              <LinearProgress
                variant="determinate"
                value={passwordStrength}
                sx={{
                  marginTop: "4px",
                  direction: "ltr",
                  borderRadius: "25px",
                  height: "10px",
                  "& .MuiLinearProgress-barColorPrimary": {
                    backgroundColor:
                      passwordStrength === 100 ? "#4caf50" : "#f5333f",
                  },
                  "& .MuiLinearProgress-barColorPrimary.MuiLinearProgress-determinate":
                    {
                      backgroundColor:
                        passwordStrength === 100 ? "#4caf50" : "#4caf50",
                    },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirm-password"
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                sx={{ fontSize: "12px", paddingBottom: "20px" }}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                disabled={!formik.isValid || !formik.dirty}
              >
                Recover
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
