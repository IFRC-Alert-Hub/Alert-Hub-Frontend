import { Box, Button, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import CountrySelect from "./CountrySelect";
import FormCheckbox from "./FormCheckbox";

type PropsType = {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
};

interface SubscriptionForm {
  title: string;
  country: string[];
  urgency: string[];
  severity: string[];
  certainty: string[];
  method: string[];
}

const ModalForm = ({ open, handleClose }: PropsType) => {
  const [subscriptionForm, setSubscriptionForm] = useState<SubscriptionForm>({
    title: "",
    country: [],
    urgency: [],
    severity: [],
    certainty: [],
    method: [],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submit");
  };

  const handleCancel = () => {
    setSubscriptionForm(subscriptionForm);
    handleClose(open);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setSubscriptionForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} m={1}>
      <Box sx={{ mb: 1 }}>
        <InputLabel htmlFor="title" className="subs-form-title">
          Group Title
        </InputLabel>
        <TextField
          id="title"
          name="title"
          variant="outlined"
          size="small"
          value={subscriptionForm.title}
          onChange={handleChange}
          required
          sx={{ width: "100%", mt: 1, mb: 1 }}
        />
      </Box>
      <CountrySelect />
      <FormCheckbox
        legend="Urgency"
        checkboxNames={["Immediate", "Expected", "Future", "Past", "Unknown"]}
      />
      <FormCheckbox
        legend="Severity"
        checkboxNames={["Extreme", "Severe", "Moderate", "Minor", "Unknown"]}
      />
      <FormCheckbox
        legend="Certainty"
        checkboxNames={[
          "Observed",
          "Likely",
          "Possible",
          "Unlikely",
          "Unknown",
        ]}
      />
      <FormCheckbox legend="Methods" checkboxNames={["Email", "SMS"]} />
      <Box display="flex" justifyContent="flex-end">
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
      </Box>
    </Box>
  );
};

export default ModalForm;
