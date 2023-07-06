import { Box, FormControl, InputAdornment, TextField } from "@mui/material";
import ContinentCollapse from "./ContinentCollapse";
import SearchIcon from "@mui/icons-material/Search";
import {
  ContinentType,
  CountryType,
  SubscriptionForm,
} from "../../API/queries/getSubscriptions";

type PropsType = {
  countryList: CountryType[];
  regionList: ContinentType[];
  subscriptionForm: SubscriptionForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CountrySelect = ({
  countryList,
  regionList,
  subscriptionForm,
  handleChange,
}: PropsType) => {
  // const sortedRegions = Array(regionList)
  //   .slice()
  //   .sort(
  //     (a: ContinentType, b: ContinentType) => parseInt(a.id) - parseInt(b.id)
  //   );

  return (
    <div>
      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <Box display="flex" sx={{ alignItems: "center" }}>
          <legend className="subs-form-legend">Countries</legend>
          <Box ml={2} sx={{ color: "gray", fontSize: "0.5em" }}>
            {subscriptionForm.countries.length}/{countryList.length} selected
          </Box>
        </Box>

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
        {regionList.map((item) => {
          if (item.name === "Unknown") {
            return <div></div>;
          }
          return (
            <ContinentCollapse
              key={item.id}
              continent={item.name}
              countries={item.countrySet}
              subscriptionForm={subscriptionForm}
              handleChange={handleChange}
            />
          );
        })}
      </FormControl>
    </div>
  );
};

export default CountrySelect;
