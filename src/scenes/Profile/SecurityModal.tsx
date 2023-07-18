import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { User } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import MessageModal from "./components/MessageModal";
import ModalButton from "./components/ModalButton";

type PropsType = {
  user?: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SecurityModal = ({ user, open, setOpen }: PropsType) => {
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
      verificationCode: "",
    },
    validationSchema: yup.object({
      verificationCode: yup.string().required("Please enter the code"),
    }),
    onSubmit: () => {
      console.log("code sended");
    },
  });

  const handleClose = () => setOpen(false);

  const handleCodeSent = () => {
    setIsCodeSent(true);
  };

  return (
    <MessageModal
      header="Security Verification"
      open={open}
      handleClose={handleClose}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography id="modal-modal-description" color={"#737373"}>
          Click to obtain the verification code. The code will be sent to your
          email address.
        </Typography>
        <Typography id="modal-modal-email" color={"#d30210"}>
          {user?.email}
        </Typography>
        <Box pt={"1rem"}>
          <TextField
            id="verificationCode"
            name="verificationCode"
            size="small"
            placeholder={"Verification Code"}
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
            fullWidth
            sx={{
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
                      disabled={isCodeSent}
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
        </Box>
        <Box pt={"2.5rem"}>
          <ModalButton name="Next" />
        </Box>
      </Box>
    </MessageModal>
  );
};

export default SecurityModal;
