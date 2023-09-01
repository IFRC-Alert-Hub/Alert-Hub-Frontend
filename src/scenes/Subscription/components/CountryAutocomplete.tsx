import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  CountryOptionsType,
  SubscriptionForm,
} from "../../../GraphQL API/TYPES";
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
    (country) => Number(country.id) === selectedRow.countryIds[0]
  );

  const [seleciton, setSelection] = useState<CountryOptionsType | null>(
    initOption.length > 0 ? initOption[0] : null
  );

  const handleChange = (event: any, newValue: CountryOptionsType | null) => {
    const countryIds = newValue ? [Number(newValue?.id)] : [];
    setSelectedRow((prevState) => ({
      ...prevState,
      countryIds: countryIds,
      admin1Ids: [],
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
        <FormLabel className="subs-form-legend">Country</FormLabel>
        <Tooltip
          title="Subscriptions are currently only supported for countries that have alert feeds on the Alert Hub"
          placement="bottom-start"
        >
          <IconButton disableRipple sx={{ p: "0 0 0 10px" }}>
            <ErrorOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Autocomplete
        disablePortal
        id="tags-outlined"
        size="small"
        options={countryList.sort(
          (a, b) => -b.name[0].localeCompare(a.name[0])
        )}
        groupBy={(option) => option.name[0]}
        getOptionLabel={(option) => option.name}
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
