import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { CountryType, SubscriptionForm } from "../../API/TYPES";

type optionsType = {
  id: string;
  name: string;
  firstLetter: string;
}[];

interface FormErrors {
  [key: string]: boolean;
}

type PropsType = {
  verifyForm: boolean;
  formErrors: FormErrors;
  countryList: CountryType[];
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
  const options = countryList.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const displayValues = options.filter((item) =>
    selectedRow.countryIds.includes(Number(item.id))
  );

  const handleChange = (event: any, newValue: optionsType) => {
    const countryIds = newValue?.map((item) => Number(item.id));
    setSelectedRow((prevState) => ({
      ...prevState,
      countryIds: countryIds,
    }));
  };

  return (
    <FormControl
      required
      error={verifyForm && formErrors["countryIds"]}
      component="fieldset"
      sx={{ width: "100%" }}
    >
      <Box display="flex" sx={{ alignItems: "center" }}>
        <FormLabel className="subs-form-legend">Countries</FormLabel>
        <Box ml={2} sx={{ color: "gray", fontSize: "0.5em" }}>
          {selectedRow.countryIds.length}/{countryList.length} selected
        </Box>
      </Box>
      <Autocomplete
        multiple
        id="tags-outlined"
        size="small"
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.name}
        value={displayValues}
        filterSelectedOptions
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} placeholder="Countries" />
        )}
        sx={{ mt: 1, mb: 1 }}
      />
      <FormHelperText>
        {verifyForm &&
          formErrors["countryIds"] &&
          "You need to select at least one"}
      </FormHelperText>
    </FormControl>
  );
};

export default CountryAutocomplete;
