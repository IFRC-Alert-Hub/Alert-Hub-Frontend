import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import MessageModal from "./components/MessageModal";
import ModalButton from "./components/ModalButton";

type PropsType = {
  isVerified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmailChangeModal = ({ isVerified, setIsVerified }: PropsType) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

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
    onSubmit: () => {
      console.log("Link new Email");
    },
  });

  const handleClose = () => setIsVerified(false);

  const handleCodeSent = () => {
    setIsCodeSent(true);
  };

  return (
    <MessageModal
      header="Modify Email"
      open={isVerified}
      handleClose={handleClose}
    >
      <Box component="form">
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
