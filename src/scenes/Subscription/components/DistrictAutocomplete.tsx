import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { DistrictOptionsType, SubscriptionForm } from "../../../API/TYPES";
import React, { useEffect, useState } from "react";

interface FormErrors {
  [key: string]: boolean;
}

type PropsType = {
  verifyForm: boolean;
  formErrors: FormErrors;
  districtList: DistrictOptionsType[];
  selectedRow: SubscriptionForm;
  setSelectedRow: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
};

const CountryAutocomplete = ({
  verifyForm,
  formErrors,
  districtList,
  selectedRow,
  setSelectedRow,
}: PropsType) => {
  const [value, setValue] = useState<DistrictOptionsType[]>([]);

  useEffect(() => {
    const initValue = districtList.filter((item) =>
      selectedRow.districtIds.includes(Number(item.districtId))
    );
    setValue(initValue);
  }, [districtList, selectedRow.countryIds, selectedRow.districtIds]);

  const handleChange = (event: any, newValue: DistrictOptionsType[]) => {
    const districtIds = newValue.map((item) => Number(item.districtId));
    setSelectedRow((prevState) => ({
      ...prevState,
      districtIds: districtIds,
    }));
    setValue(newValue);
  };

  const handleSelectAll = () => {
    const districtIds = districtList.map((item) => Number(item.districtId));
    setSelectedRow((prevState) => ({
      ...prevState,
      districtIds: districtIds,
    }));
    setValue(districtList);
  };

  return (
    <FormControl
      required
      error={verifyForm && formErrors["districtIds"]}
      component="fieldset"
      sx={{ width: "100%" }}
    >
      <Box display="flex" sx={{ alignItems: "center" }}>
        <FormLabel className="subs-form-legend">Districts</FormLabel>
        {selectedRow.countryIds.length === 0 ? (
          <></>
        ) : (
          <Button
            variant="text"
            size="small"
            onClick={handleSelectAll}
            sx={{
              ml: 1.5,
              p: 0,
              color: "gray",
              textTransform: "capitalize",
              "&:hover": { backgroundColor: "#F8F8F8" },
            }}
          >
            select all
          </Button>
        )}
      </Box>
      <Autocomplete
        multiple
        value={value}
        disabled={selectedRow.countryIds.length === 0}
        id="checkboxes-districts"
        size="small"
        options={districtList}
        groupBy={(option) => option.countryName}
        disableCloseOnSelect
        getOptionLabel={(option) => option.districtName}
        onChange={handleChange}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <FormControlLabel
              label={option.districtName}
              control={<Checkbox checked={selected} />}
            />
          </li>
        )}
        renderInput={(params) => <TextField {...params} placeholder="Search" />}
        sx={{ mt: 1, mb: 1 }}
      />
      <FormHelperText>
        {verifyForm &&
          formErrors["districtIds"] &&
          "You need to select at least one"}
      </FormHelperText>
    </FormControl>
  );
};

export default CountryAutocomplete;
