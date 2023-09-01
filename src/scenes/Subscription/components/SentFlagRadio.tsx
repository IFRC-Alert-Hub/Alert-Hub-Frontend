import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { SubscriptionForm } from "../../../GraphQL API/TYPES";

export const RADIO_OPTIONS = [
  {
    value: "0",
    label: "Immediate",
  },
  {
    value: "1",
    label: "12 Hours",
  },
  {
    value: "2",
    label: "1 Day",
  },
  {
    value: "3",
    label: "Never",
  },
];

interface FormErrors {
  [key: string]: boolean;
}

type PropsType = {
  verifyForm: boolean;
  formErrors: FormErrors;
  selectedRow: SubscriptionForm;
  setSelectedRow: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
};

const SentFlagRadio = ({
  verifyForm,
  formErrors,
  selectedRow,
  setSelectedRow,
}: PropsType) => {
  const [value, setValue] = useState(-1);

  useEffect(() => {
    const initValue = selectedRow.sentFlag;
    setValue(initValue);
  }, [selectedRow.sentFlag]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = Number((event.target as HTMLInputElement).value);
    setValue(updatedValue);
    setSelectedRow((prevState) => ({
      ...prevState,
      sentFlag: updatedValue,
    }));
  };

  return (
    <FormControl
      required
      error={verifyForm && formErrors["sentFlag"]}
      component="fieldset"
      sx={{
        mt: 1,
      }}
    >
      <Box display="flex" sx={{ alignItems: "center" }}>
        <FormLabel
          className="subs-form-legend"
          sx={{ "&.Mui-focused": { color: "#000000" } }}
        >
          Notification Interval
        </FormLabel>
      </Box>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{ ml: "14px" }}
      >
        {RADIO_OPTIONS.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio disableRipple />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>
        {verifyForm && formErrors["sentFlag"] && "You need to select one"}
      </FormHelperText>
    </FormControl>
  );
};

export default SentFlagRadio;
