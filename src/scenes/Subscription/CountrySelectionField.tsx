import { FormControl, InputAdornment, TextField } from "@mui/material";
import ContinentCollapse from "./ContinentCollapse";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import { GET_ALL_COUNTRIES } from "../../API/queries/getAllCountries";

type CountryType = {
  id: string;
  name: string;
};

type ContinentType = {
  id: string;
  name: string;
  countrySet: CountryType[];
};

const CountrySelect = () => {
  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sortedRegions = data.listRegion
    .slice()
    .sort(
      (a: ContinentType, b: ContinentType) => parseInt(a.id) - parseInt(b.id)
    );

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
        {sortedRegions.map((item: ContinentType) => {
          if (item.name === "Unknown") {
            return <div key={item.id}></div>;
          }
          return (
            <ContinentCollapse
              key={item.id}
              continent={item.name}
              countries={item.countrySet}
            />
          );
        })}
      </FormControl>
    </div>
  );
};

export default CountrySelect;
