import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { CountryOptionsType, SubscriptionForm } from "../../../API/TYPES";
import { useState } from "react";

interface FormErrors {
  [key: string]: boolean;
}

type PropsType = {
  verifyForm: boolean;
  formErrors: FormErrors;
  countryList: CountryOptionsType[];
  selectedRow: SubscriptionForm;
  setSelectedRow: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
};

const CountryAutocomplete = ({
  verifyForm,
  formErrors,
  countryList,
  selectedRow,
  setSelectedRow,
}: PropsType) => {
  const initOption = countryList.filter(
    (country) => Number(country.countryId) === selectedRow.countryIds[0]
  );
  const [seleciton, setSelection] = useState<CountryOptionsType | null>(
    initOption.length > 0 ? initOption[0] : null
  );

  const handleChange = (event: any, newValue: CountryOptionsType | null) => {
    const countryIds = [Number(newValue?.countryId)];
    setSelectedRow((prevState) => ({
      ...prevState,
      countryIds: countryIds,
      districtIds: [],
    }));
    setSelection(newValue);
  };

  return (
    <FormControl
      required
      error={verifyForm && formErrors["countryIds"]}
      component="fieldset"
      sx={{ width: "100%", mb: 1 }}
    >
      <Box display="flex" sx={{ alignItems: "center" }}>
        <FormLabel className="subs-form-legend">Countries</FormLabel>
      </Box>
      <Autocomplete
        disablePortal
        id="tags-outlined"
        size="small"
        options={countryList}
        getOptionLabel={(option) => option.countryName}
        value={seleciton}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} placeholder="Countries" />
        )}
        sx={{ mt: 1, mb: 1 }}
      />
      <FormHelperText>
        {verifyForm && formErrors["countryIds"] && "You need to select one"}
      </FormHelperText>
    </FormControl>
  );
};

export default CountryAutocomplete;
