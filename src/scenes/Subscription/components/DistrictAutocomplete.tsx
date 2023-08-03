import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";

const MOCK_DISTRICTS = [
  {
    countryId: "1",
    countryName: "Country1",
    districts: [
      {
        districtId: "1",
        districtName: "District1",
      },
      {
        districtId: "2",
        districtName: "District2",
      },
    ],
  },
  {
    countryId: "2",
    countryName: "Country2",
    districts: [
      {
        districtId: "3",
        districtName: "District3",
      },
      {
        districtId: "4",
        districtName: "District4",
      },
      {
        districtId: "5",
        districtName: "District5",
      },
    ],
  },
  {
    countryId: "3",
    countryName: "Country3",
    districts: [
      {
        districtId: "6",
        districtName: "District6",
      },
      {
        districtId: "7",
        districtName: "District7",
      },
      {
        districtId: "8",
        districtName: "District8",
      },
    ],
  },
];

const MOCK_DISTRICTS_OPTIONS = MOCK_DISTRICTS.flatMap((country) => {
  const { countryId, countryName, districts } = country;
  return districts.map((district) => ({
    districtId: district.districtId,
    districtName: district.districtName,
    countryId,
    countryName,
  }));
});

const CountryAutocomplete = () => {
  return (
    <FormControl required component="fieldset" sx={{ width: "100%" }}>
      <Box display="flex" sx={{ alignItems: "center" }}>
        <FormLabel className="subs-form-legend">Districts</FormLabel>
        <Box ml={2} sx={{ color: "gray", fontSize: "0.5em" }}>
          0/10 selected
        </Box>
      </Box>
      <Autocomplete
        multiple
        id="checkboxes-districts"
        size="small"
        options={MOCK_DISTRICTS_OPTIONS}
        groupBy={(option) => option.countryName}
        disableCloseOnSelect
        getOptionLabel={(option) => option.districtName}
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
    </FormControl>
  );
};

export default CountryAutocomplete;
