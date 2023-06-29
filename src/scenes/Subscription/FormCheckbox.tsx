import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

interface SubscriptionForm {
  [key: string]: string | string[];
  title: string;
  countries: string[];
  urgency: string[];
  severity: string[];
  certainty: string[];
  methods: string[];
}

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
      <FormControl component="fieldset">
        <legend className="subs-form-legend">{legend}</legend>
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
