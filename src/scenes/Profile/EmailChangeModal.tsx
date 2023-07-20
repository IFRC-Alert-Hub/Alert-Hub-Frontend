import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import MessageModal from "./components/MessageModal";
import ModalButton from "./components/ModalButton";
import { useMutation } from "@apollo/client";
import { auth_system } from "../../API/API_Links";
import { LOGOUT } from "../../API/mutations/authMutations";
import { UserContext } from "../../context/UserContext";
import {
  NEW_EMAIL_CONFIRM,
  SEND_NEW_VEIRFY_EMAIL,
} from "../../API/mutations/authMutations";

type PropsType = {
  isVerified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  emailToken: string;
};

const EmailChangeModal = ({
  isVerified,
  setIsVerified,
  emailToken,
}: PropsType) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const [sendNewVerifyEmail] = useMutation(SEND_NEW_VEIRFY_EMAIL, {
    client: auth_system,
  });
  const [newEmailConfirm] = useMutation(NEW_EMAIL_CONFIRM, {
    client: auth_system,
  });
  const [logoutData] = useMutation(LOGOUT, {
    client: auth_system,
  });

  useEffect(() => {
    if (isCodeSent) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setIsCodeSent(false);
            clearInterval(timer);
            return 60;
          }
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isCodeSent]);

  const formik = useFormik({
    initialValues: {
      newEmail: "",
      verificationCode: "",
    },
    validationSchema: yup.object({
      newEmail: yup
        .string()
        .email("Invalid email address")
        .required("Please enter the email"),
      verificationCode: yup.string().required("Please enter the code"),
    }),
    onSubmit: async () => {
      const res = await newEmailConfirm({
        variables: {
          newEmail: formik.values.newEmail,
          verifyCode: formik.values.verificationCode,
        },
      });
      const { success, errors } = res.data.newEmailConfirm;
      if (success) {
        alert("Email updated! Please login again");
        setIsVerified(false);
        handleLogout();
      } else {
        alert(errors);
      }
    },
  });

  const handleClose = () => setIsVerified(false);

  const logoutHandler = async () => {
    try {
      const result = await logoutData();
      if (result.data.logout.success) {
        console.log("logout, token deleted");
      } else {
        console.log("error");
      }
      return result;
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logoutHandler();
    navigate("/login");
    userContext.setUser(null);
  };

  const handleCodeSent = async () => {
    setIsCodeSent(true);
    const res = await sendNewVerifyEmail({
      variables: {
        newEmail: formik.values.newEmail,
        token: emailToken,
      },
    });
    const { success, errors } = res.data.sendNewVerifyEmail;
    if (success) {
      alert("Email has been sent");
    } else {
      alert(errors);
    }
  };

  return (
    <MessageModal
      header="Modify Email"
      open={isVerified}
      handleClose={handleClose}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="newEmail"
          placeholder="New Email"
          size="small"
          value={formik.values.newEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
          helperText={formik.touched.newEmail && formik.errors.newEmail}
        />
        <TextField
          fullWidth
          id="verificationCode"
          placeholder="Verification Code"
          size="small"
          disabled={!formik.touched.newEmail || Boolean(formik.errors.newEmail)}
          value={formik.values.verificationCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.verificationCode &&
            Boolean(formik.errors.verificationCode)
          }
          helperText={
            formik.touched.verificationCode && formik.errors.verificationCode
          }
          sx={{
            mt: "2rem",
            mb: "2rem",
            "& .MuiOutlinedInput-root": {
              paddingRight: 0,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box borderLeft={"1px solid #ccc"}>
                  <Button
                    variant="text"
                    disableRipple
                    disabled={
                      !formik.touched.newEmail ||
                      Boolean(formik.errors.newEmail) ||
                      isCodeSent
                    }
                    sx={{
                      color: "#d30210",
                      p: "0px 10px 0px 10px",
                      minWidth: "50px",
                      textTransform: "capitalize",
                      "&:hover": { opacity: "0.5" },
                    }}
                    onClick={handleCodeSent}
                  >
                    {isCodeSent && timeLeft > 0 ? (
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
        <ModalButton name="Link" />
      </Box>
    </MessageModal>
  );
};

export default EmailChangeModal;
