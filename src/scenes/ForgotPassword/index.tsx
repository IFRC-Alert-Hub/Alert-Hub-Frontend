import { Alert, Container, InputAdornment } from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useMutation } from "@apollo/client";
import { auth_system } from "../../GraphQL API/API_Links";
import { useNavigate } from "react-router-dom";
import {
  RESET_PASSWORD,
  RESET_PASSWORD_CONFIRM,
} from "../../GraphQL API/mutations/authMutations";
import AuthComponent from "../../components/Authentication/AuthComponent";
import PasswordComponent from "../../components/Authentication/PasswordComponent";
import { useIntl } from "react-intl";

const ForgotPassword = () => {
  const [isSendClicked, setIsSendClicked] = React.useState(false);
  const [isSendEnabled, setIsSendEnabled] = React.useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");

  const navigate = useNavigate();
  const [verifyEmail] = useMutation(RESET_PASSWORD, {
    client: auth_system,
    variables: {
      email: "",
    },
  });

  const { formatMessage } = useIntl();

  const [forgotPassword] = useMutation(RESET_PASSWORD_CONFIRM, {
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
      const { success, errors } = verifyEmailResponse.data.resetPassword;

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

  const handleForgotPassword = async (values: any) => {
    try {
      const forgotPasswordData = await forgotPassword({
        variables: {
          email: values.email,
          password: values.password,
          verifyCode: values.verifyCode,
        },
      });
      if (forgotPasswordData.data.resetPasswordConfirm.success) {
        navigate("/login");
      } else {
        console.log(
          "data: ",
          forgotPasswordData.data.resetPasswordConfirm.errors
        );
        formik.setFieldError(
          "email",
          forgotPasswordData.data.resetPasswordConfirm.errors.email
        );
        formik.setFieldError(
          "verifyCode",
          forgotPasswordData.data.resetPasswordConfirm.errors.verifyCode
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
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must contain at least one uppercase letter, one number, and one special character"
        ),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), ""], "Passwords must match"),
      verifyCode: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      handleForgotPassword(values);
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
        pageTitle={formatMessage({ id: "forgetPassword.pageTitle" })}
        authTitle={formatMessage({ id: "forgetPassword.authTitle" })}
        authSubtitle={formatMessage({ id: "forgetPassword.authSubtitle" })}
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
              label={formatMessage({
                id: "forgetPassword.formLabel.emailaddress",
              })}
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
              label={formatMessage({
                id: "forgetPassword.formLabel.verificationCode",
              })}
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
            <PasswordComponent formik={formik}></PasswordComponent>
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
              {formatMessage({
                id: "forgetPassword.recoverBtn",
              })}
            </Button>
          </Box>
        }
      />
    </Container>
  );
};

export default ForgotPassword;
