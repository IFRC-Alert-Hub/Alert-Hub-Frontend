import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useState } from "react";

interface CheckboxProps {
  legend: string;
  checkboxNames: string[];
}

interface CheckboxItem {
  [key: string]: boolean;
}

const FormCheckbox = ({ legend, checkboxNames }: CheckboxProps) => {
  const initialState: CheckboxItem = checkboxNames.reduce((obj, value) => {
    obj[value] = false;
    return obj;
  }, {} as CheckboxItem);

  const [checkedItems, setCheckedItems] = useState<CheckboxItem>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div>
      <FormControl component="fieldset">
        <legend className="subs-form-legend">{legend}</legend>
        <FormGroup sx={{ flexDirection: "row", marginLeft: 1 }}>
          {checkboxNames.map((name) => (
            <FormControlLabel
              key={name}
              control={
                <Checkbox
                  checked={checkedItems[name]}
                  onChange={handleChange}
                  name={name}
                />
              }
              label={name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default FormCheckbox;
