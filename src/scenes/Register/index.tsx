import { Alert, Container, InputAdornment } from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMutation } from "@apollo/client";
import { REGISTER, VERIFY_EMAIL } from "../../API/mutations/authMutations";
import { auth_system } from "../../API/API_Links";
import { useNavigate, Link } from "react-router-dom";
import AuthComponent from "../../components/Authentication/AuthComponent";
import PasswordComponent from "../../components/Authentication/PasswordComponent";
import { useState, useEffect } from "react";
import { useIntl } from "react-intl";

const Register = () => {
  const [isSendClicked, setIsSendClicked] = useState(false);
  const [isSendEnabled, setIsSendEnabled] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const { formatMessage } = useIntl();

  const navigate = useNavigate();
  const [verifyEmail] = useMutation(VERIFY_EMAIL, {
    client: auth_system,
    variables: {
      email: "",
    },
  });

  useEffect(() => {
    if (isSendClicked) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setIsSendClicked(false);
            clearInterval(timer);
            return 60;
          }
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isSendClicked]);

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

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
      <AuthComponent
        pageTitle={formatMessage({ id: "register.pageTitle" })}
        authTitle={formatMessage({ id: "register.authTitle" })}
        authSubtitle={formatMessage({ id: "register.authSubtitle" })}
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
              autoFocus
              autoComplete="email"
              sx={{ fontSize: "12px" }}
              value={formik.values.email}
              onChange={handleEmailChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box borderLeft={"1px solid #ccc"}>
                      <Button
                        variant="text"
                        disableRipple
                        disabled={isSendClicked}
                        sx={{
                          color: "#d30210",
                          p: "0px 0px 0px 10px",
                          minWidth: "50px",
                          textTransform: "capitalize",
                          "&:hover": { opacity: "0.5" },
                        }}
                        onClick={isSendEnabled ? handleSendClick : undefined}
                      >
                        {isSendClicked && timeLeft > 0 ? (
                          <span>{timeLeft}s</span>
                        ) : (
                          <span>Send</span>
                        )}
                      </Button>
                    </Box>
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

            <PasswordComponent formik={formik} />

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
              <Link to="/login" style={{ marginLeft: "8px" }}>
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
