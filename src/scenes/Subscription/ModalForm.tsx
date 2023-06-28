import {
  Box,
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CountrySelectionField from "./CountrySelectionField";
import FormCheckbox from "./FormCheckbox";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: "350px",
  maxHeight: "500px",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

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
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h3" fontWeight={"bold"} mb="5px">
          Add New Subscription
        </Typography>
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
              sx={{ width: "100%", mt: 1, mb: 1 }}
            />
          </Box>
          <CountrySelectionField />
          <FormCheckbox
            legend="Urgency"
            checkboxNames={[
              "Immediate",
              "Expected",
              "Future",
              "Past",
              "Unknown",
            ]}
          />
          <FormCheckbox
            legend="Severity"
            checkboxNames={[
              "Extreme",
              "Severe",
              "Moderate",
              "Minor",
              "Unknown",
            ]}
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
      </Box>
    </Modal>
  );
};

export default ModalForm;
