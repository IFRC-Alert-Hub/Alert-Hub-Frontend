import {
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { User } from "../../context/UserContext";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../API/mutations/profileMutation";
import { auth_system } from "../../API/API_Links";
import { useState } from "react";
import SecurityModal from "./SecurityModal";
import EmailChangeModal from "./EmailChangeModal";
import { GET_USER_DETAILS } from "../../API/ALL_QUERIES";

type PropsType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  editStatus: boolean;
  setEditStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .max(20, "First name should not be above 20 characters length"),
  lastName: yup
    .string()
    .max(20, "Last name should not be above 20 characters length"),
  country: yup
    .string()
    .max(20, "Country should not be above 20 characters length"),
  city: yup.string().max(20, "City should not be above 20 characters length"),
});

const ProfileForm = ({
  user,
  setUser,
  editStatus,
  setEditStatus,
}: PropsType) => {
  const [open, setOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [emailToken, setEmailToken] = useState("");

  const handleOpen = () => setOpen(true);

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: GET_USER_DETAILS }],
    client: auth_system,
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      city: user?.city || "",
      country: user?.country || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateProfile({ variables: values });
      setUser((user) => ({
        ...(user as User),
        firstName: values.firstName,
        lastName: values.lastName,
        city: values.city,
        country: values.country,
      }));
      setEditStatus(true);
    },
  });

  const handleCancel = () => {
    formik.values.firstName = user?.firstName as string;
    formik.values.lastName = user?.lastName as string;
    formik.values.city = user?.city as string;
    formik.values.country = user?.country as string;
    setEditStatus(true);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="form-box"
      onSubmit={formik.handleSubmit}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <InputLabel className="form-label" htmlFor="firstName">
            First Name
          </InputLabel>
          <TextField
            id="firstName"
            name="firstName"
            size="small"
            className="form-text-field"
            value={formik.values.firstName || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={editStatus}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel className="form-label" htmlFor="lastName">
            Last Name
          </InputLabel>
          <TextField
            id="lastName"
            name="lastName"
            size="small"
            className="form-text-field"
            value={formik.values.lastName || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={editStatus}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel className="form-label" htmlFor="city">
            City
          </InputLabel>
          <TextField
            id="city"
            name="city"
            size="small"
            className="form-text-field"
            value={formik.values.city || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={editStatus}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel className="form-label" htmlFor="country">
            Country
          </InputLabel>
          <TextField
            id="country"
            name="country"
            size="small"
            className="form-text-field"
            value={formik.values.country || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={editStatus}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
        </Grid>

        <Grid item xs={12} m={{ xs: "0px 0px 20px 0px", sm: "0 30px 20px 0" }}>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <OutlinedInput
            id="email"
            name="email"
            size="small"
            value={user?.email || ""}
            disabled
            fullWidth
            sx={{ p: 0 }}
            endAdornment={
              <InputAdornment position="end">
                <Box borderLeft={"1px solid #ccc"}>
                  <Button
                    variant="text"
                    disabled={!editStatus}
                    disableRipple
                    onClick={handleOpen}
                    sx={{
                      color: "#d30210",
                      p: "0px 10px 0px 10px",
                      textTransform: "capitalize",
                      "&:hover": { opacity: "0.5" },
                    }}
                  >
                    {"Switch"}
                  </Button>
                </Box>
              </InputAdornment>
            }
          />
        </Grid>
        {/* <Grid item xs={12} m={{ xs: "0px 0px 20px 0px", sm: "0 30px 30px 0" }}>
          <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
          <OutlinedInput
            id="phoneNumber"
            name="phoneNumber"
            size="small"
            value={user?.phoneNumber || ""}
            disabled
            fullWidth
            sx={{ p: "0px" }}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="text"
                  disabled={!editStatus}
                  disableRipple
                  sx={{
                    color: "red",
                    textTransform: "capitalize",
                    "&:hover": { opacity: "0.5" },
                  }}
                >
                  {"Switch"}
                </Button>
              </InputAdornment>
            }
          />
        </Grid> */}

        {editStatus ? (
          <div></div>
        ) : (
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="flex-end"
            pr={{ xs: "20px", sm: "30px" }}
          >
            <Button
              variant="outlined"
              color="error"
              sx={{ marginRight: "10px" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="error">
              Submit
            </Button>
          </Grid>
        )}
      </Grid>
      {!isVerified ? (
        <SecurityModal
          user={user as User}
          open={open}
          setOpen={setOpen}
          setIsVerified={setIsVerified}
          setEmailToken={setEmailToken}
        />
      ) : (
        <EmailChangeModal
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          emailToken={emailToken}
        />
      )}
    </Box>
  );
};

export default ProfileForm;
