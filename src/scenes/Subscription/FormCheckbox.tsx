import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { SubscriptionForm } from "../../API/queries/getSubscriptions";

interface CheckboxProps {
  legend: string;
  checkboxItems: string[];
  subscriptionForm: SubscriptionForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormCheckbox = ({
  legend,
  checkboxItems,
  subscriptionForm,
  handleChange,
}: CheckboxProps) => {
  const checkboxName = legend.toLowerCase();

  return (
    <div>
      <FormControl component="fieldset" sx={{ mt: 1 }}>
        <Box display="flex" sx={{ alignItems: "center" }}>
          <legend className="subs-form-legend">{legend}</legend>
          <Box ml={2} sx={{ color: "gray", fontSize: "10px" }}>
            {subscriptionForm[checkboxName].length}/{checkboxItems.length}{" "}
            selected
          </Box>
        </Box>

        <FormGroup sx={{ flexDirection: "row", marginLeft: 1 }}>
          {checkboxItems.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={subscriptionForm[checkboxName].includes(item)}
                  onChange={handleChange}
                  name={checkboxName}
                  value={item}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default FormCheckbox;
