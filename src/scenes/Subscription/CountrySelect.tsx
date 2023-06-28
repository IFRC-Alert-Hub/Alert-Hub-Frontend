import { FormControl, InputAdornment, TextField } from "@mui/material";
import ContinentCollapse from "./ContinentCollapse";
import SearchIcon from "@mui/icons-material/Search";

const CountrySelect = () => {
  return (
    <div>
      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <legend className="subs-form-legend">Countries</legend>
        <TextField
          id="search-bar"
          placeholder="Search countries..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
          variant="outlined"
          sx={{ width: "100%", borderRadius: 5, mt: 1, mb: 1 }}
        />
        <ContinentCollapse continent="Africa" />
        <ContinentCollapse continent="America" />
        <ContinentCollapse continent="Asia Pacific" />
        <ContinentCollapse continent="Europe" />
        <ContinentCollapse continent="Middle East & North East" />
      </FormControl>
    </div>
  );
};

export default CountrySelect;
