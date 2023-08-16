import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Admin1OptionsType, SubscriptionForm } from "../../../API/TYPES";
import React, { useEffect, useState } from "react";

interface FormErrors {
  [key: string]: boolean;
}

type PropsType = {
  verifyForm: boolean;
  formErrors: FormErrors;
  admin1List: Admin1OptionsType[];
  selectedRow: SubscriptionForm;
  setSelectedRow: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
};

const Admin1Autocomplete = ({
  verifyForm,
  formErrors,
  admin1List,
  selectedRow,
  setSelectedRow,
}: PropsType) => {
  const [value, setValue] = useState<Admin1OptionsType[]>([]);

  useEffect(() => {
    const initValue = admin1List.filter((item) =>
      selectedRow.admin1Ids.includes(Number(item.admin1Id))
    );
    setValue(initValue);
  }, [admin1List, selectedRow.countryIds, selectedRow.admin1Ids]);

  const handleChange = (event: any, newValue: Admin1OptionsType[]) => {
    const admin1Ids = newValue.map((item) => Number(item.admin1Id));
    setSelectedRow((prevState) => ({
      ...prevState,
      admin1Ids: admin1Ids,
    }));
    setValue(newValue);
  };

  const handleSelectAll = () => {
    const admin1Ids = admin1List.map((item) => Number(item.admin1Id));
    setSelectedRow((prevState) => ({
      ...prevState,
      admin1Ids: admin1Ids,
    }));
    setValue(admin1List);
  };

  return (
    <FormControl
      required
      error={verifyForm && formErrors["admin1Ids"]}
      component="fieldset"
      sx={{ width: "100%" }}
    >
      <Box display="flex" sx={{ alignItems: "center" }}>
        <FormLabel className="subs-form-legend">Admin1s</FormLabel>
        <Tooltip
          title="Unknown contains all alerts without a specific admin1"
          placement="bottom-start"
        >
          <IconButton disableRipple sx={{ p: "0 0 0 10px" }}>
            <ErrorOutlineIcon />
          </IconButton>
        </Tooltip>
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
        id="checkboxes-admin1s"
        size="small"
        options={admin1List}
        groupBy={(option) => option.countryName}
        disableCloseOnSelect
        getOptionLabel={(option) => option.admin1Name}
        onChange={handleChange}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <FormControlLabel
              label={option.admin1Name}
              control={<Checkbox checked={selected} />}
            />
          </li>
        )}
        renderInput={(params) => <TextField {...params} placeholder="Search" />}
        sx={{ mt: 1, mb: 1 }}
      />
      <FormHelperText>
        {verifyForm &&
          formErrors["admin1Ids"] &&
          "You need to select at least one"}
      </FormHelperText>
    </FormControl>
  );
};

export default Admin1Autocomplete;
