import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { SubscriptionForm } from "../../../API/TYPES";

interface FormErrors {
  [key: string]: boolean;
}

interface CheckboxProps {
  verifyForm: boolean;
  formErrors: FormErrors;
  checkboxTitle: string;
  legend: string;
  checkboxItems: string[];
  selectedRow: SubscriptionForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormCheckbox = ({
  verifyForm,
  formErrors,
  checkboxTitle,
  legend,
  checkboxItems,
  selectedRow,
  handleChange,
}: CheckboxProps) => {
  return (
    <div>
      <FormControl
        required
        error={verifyForm && formErrors[checkboxTitle]}
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
            {legend}
          </FormLabel>
          {/* <Box ml={2} sx={{ color: "gray", fontSize: "10px" }}>
            {selectedRow[name]?.length}/{checkboxItems.length} selected
          </Box> */}
        </Box>

        <FormGroup sx={{ flexDirection: "row", marginLeft: "14px" }}>
          {checkboxItems.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={(selectedRow[checkboxTitle] as string[]).includes(
                    item
                  )}
                  onChange={handleChange}
                  name={checkboxTitle}
                  value={item}
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
        <FormHelperText>
          {verifyForm &&
            formErrors[checkboxTitle] &&
            "You need to select at least one"}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default FormCheckbox;
