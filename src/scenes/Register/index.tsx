import {
  Alert,
  Checkbox,
  Container,
  FormControlLabel,
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
import Typography from "@mui/material/Typography";
import { useMutation } from "@apollo/client";
import { REGISTER, VERIFY_EMAIL } from "../../API/mutations/register";
import { auth_system } from "../../API/API_Links";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthComponent from "../../components/Authentication/AuthComponent";

const Register = () => {
  const [passwordStrength, setPasswordStrength] = React.useState(0);
  const [isSendClicked, setIsSendClicked] = React.useState(false);
  const [isSendEnabled, setIsSendEnabled] = React.useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");

  const navigate = useNavigate();
  const [verifyEmail] = useMutation(VERIFY_EMAIL, {
    client: auth_system,
    variables: {
      email: "",
    },
  });

  const [register] = useMutation(REGISTER, {
    client: auth_system,
    variables: {
      email: "",
      password: "",
      verifyCode: "",
    },
  });

  const sendEmail = async (email: string) => {
    try {
      const verifyEmailResponse = await verifyEmail({
        variables: { email: email },
      });
      const { success, errors } = verifyEmailResponse.data.sendVerifyEmail;

      if (success) {
        setIsEmailSent(true);
        setEmailError("");
      } else {
        setIsEmailSent(false);
        setEmailError(errors.email);
        console.log(errors.email);
      }
    } catch (error) {
      alert(error);
      setEmailError("");
    }
  };
  const calculatePasswordStrength = (password: string) => {
    const strengthRegex =
      /^(?=.[A-Z])(?=.[0-9])(?=.[?!@#$%^&()])[a-zA-Z0-9!@#$%^&()]{8,}$/;
    if (password.length === 0) {
      return 0;
    } else if (strengthRegex.test(password)) {
      return 100;
    } else {
      const factors = [
        { regex: /[A-Z]/, factor: 20 },
        { regex: /[0-9]/, factor: 15 },
        { regex: /[?!@#$%^&()]/, factor: 15 },
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

  const handlePasswordCopy = (
    event: React.ClipboardEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
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
  };

  const handleRegister = async (values: any) => {
    try {
      const registerData = await register({
        variables: {
          email: values.email,
          password: values.password,
          verifyCode: values.verifyCode,
        },
      });
      if (registerData.data.register.success) {
        navigate("/login");
      } else {
        console.log("data: ", registerData.data.register.errors);
        formik.setFieldError("email", registerData.data.register.errors.email);
        formik.setFieldError(
          "verifyCode",
          registerData.data.register.errors.verifyCode
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      verifyCode: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*()])[a-zA-Z0-9!?@#$%^&*()]{8,}$/,
          "Password must contain at least one uppercase letter, one number, and one special character"
        ),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), ""], "Passwords must match"),
      verifyCode: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      handleRegister(values);
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
    setEmailError("");
    setIsEmailSent(false);
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
      <AuthComponent
        pageTitle="Register"
        authTitle="Create Account"
        authSubtitle="Staff, members and volunteers of the Red Cross Red Crescent
              Movement (National Societies, the IFRC and the ICRC) are welcome
              to register for a user account on GO, to access information for
              the Membership. Other responders and members of the public may
              browse the public areas of the site without registering for an
              account."
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
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ fontSize: "12px" }}
              value={formik.values.email}
              onChange={handleEmailChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <span style={{ marginRight: "5px", color: "grey" }}>|</span>
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
            {emailError !== "" && <Alert severity="error">{emailError}</Alert>}
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
              onBlur={formik.handleBlur}
              error={
                formik.touched.verifyCode && Boolean(formik.errors.verifyCode)
              }
              helperText={formik.touched.verifyCode && formik.errors.verifyCode}
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
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                onCopy: handlePasswordCopy, // Prevent password copying
              }}
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

            <Box textAlign={"left"} padding={"none"} color="green">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={/[A-Z]/.test(formik.values.password)}
                    color="primary"
                    disabled
                    className={
                      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*()])[a-zA-Z0-9!?@#$%^&*()]{8,}$/.test(
                        formik.values.password
                      )
                        ? "fulfilled"
                        : ""
                    }
                  />
                }
                label="At least one uppercase letter"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={/[0-9]/.test(formik.values.password)}
                    color="primary"
                    disabled
                    className={
                      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*()])[a-zA-Z0-9!?@#$%^&*()]{8,}$/.test(
                        formik.values.password
                      )
                        ? "fulfilled"
                        : ""
                    }
                  />
                }
                label="At least one number"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={/[?!@#$%^&()]/.test(formik.values.password)}
                    color="primary"
                    disabled
                    className={
                      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*()])[a-zA-Z0-9!?@#$%^&*()]{8,}$/.test(
                        formik.values.password
                      )
                        ? "fulfilled"
                        : ""
                    }
                  />
                }
                label="At least one special character [?!@#$%^&*()]"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.password.length >= 8}
                    color="primary"
                    disabled
                    className={
                      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*()])[a-zA-Z0-9!?@#$%^&*()]{8,}$/.test(
                        formik.values.password
                      )
                        ? "fulfilled"
                        : ""
                    }
                  />
                }
                label="At least 8 characters"
              />
            </Box>
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
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              <Link href="/login" style={{ marginLeft: "8px" }}>
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
        }
      />
    </Container>
  );
};

export default Register;
