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

const checkBoxList = [
  {
    legend: "Urgency",
    checkboxItems: ["Immediate", "Expected", "Future", "Past", "Unknown"],
  },
  {
    legend: "Severity",
    checkboxItems: ["Extreme", "Severe", "Moderate", "Minor", "Unknown"],
  },
  {
    legend: "Certainty",
    checkboxItems: ["Observed", "Likely", "Possible", "Unlikely", "Unknown"],
  },
  {
    legend: "Methods",
    checkboxItems: ["Email", "SMS"],
  },
];

type PropsType = {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
};

interface SubscriptionForm {
  [key: string]: string | string[];
  title: string;
  countries: string[];
  urgency: string[];
  severity: string[];
  certainty: string[];
  methods: string[];
}

const ModalForm = ({ open, handleClose }: PropsType) => {
  const [subscriptionForm, setSubscriptionForm] = useState<SubscriptionForm>({
    title: "",
    countries: [],
    urgency: [],
    severity: [],
    certainty: [],
    methods: [],
  });

  const emptyForm = {
    title: "",
    countries: [],
    urgency: [],
    severity: [],
    certainty: [],
    methods: [],
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(subscriptionForm);
    setSubscriptionForm(emptyForm);
    handleClose(open);
  };

  const handleReset = () => {
    setSubscriptionForm(emptyForm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedValues = checked
        ? [...(subscriptionForm[name] as string[]), value]
        : (subscriptionForm[name] as string[]).filter(
            (item: string) => item !== value
          );

      setSubscriptionForm((prevState) => ({
        ...prevState,
        [name]: updatedValues,
      }));
    } else {
      setSubscriptionForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h3" fontWeight={"bold"} mb="5px">
          Add New Group
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
          <CountrySelectionField
            subscriptionForm={subscriptionForm}
            handleChange={handleChange}
          />
          {checkBoxList.map((item) => (
            <FormCheckbox
              key={item.legend}
              legend={item.legend}
              checkboxItems={item.checkboxItems}
              subscriptionForm={subscriptionForm}
              handleChange={handleChange}
            />
          ))}
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="error"
              sx={{ marginRight: "10px" }}
              onClick={handleReset}
            >
              Reset
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
