import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface PasswordComponentProps {
  formik: any;
}
const PasswordComponent: React.FC<PasswordComponentProps> = ({ formik }) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setConfirmPassword] = useState(false);

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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
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
            backgroundColor: passwordStrength === 100 ? "#4caf50" : "#f5333f",
          },
          "& .MuiLinearProgress-barColorPrimary.MuiLinearProgress-determinate":
            {
              backgroundColor: passwordStrength === 100 ? "#4caf50" : "#4caf50",
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
              <IconButton onClick={handleToggleConfirmPassword} edge="end">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default PasswordComponent;
