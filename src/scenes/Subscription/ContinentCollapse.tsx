import { Box, Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ChangeEvent, useState } from "react";

type CountryType = {
  id: string;
  name: string;
};

interface PropsType {
  continent: string;
  countries: CountryType[];
}

const ContinentCollapse = ({ continent, countries }: PropsType) => {
  const [open, setOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCountries((prevSelectedCountries) => [
        ...prevSelectedCountries,
        value,
      ]);
    } else {
      setSelectedCountries((prevSelectedCountries) =>
        prevSelectedCountries.filter((item) => item !== value)
      );
    }
  };

  return (
    <Box>
      <div className="subs-form-continent">
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <Typography variant="h6">{continent}</Typography>
      </div>
      <Collapse in={open} sx={{ ml: 4, mr: 4 }}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          width={"100%"}
          sx={{
            maxHeight: "200px",
            overflow: "auto",
            border: "1px solid rgb(231, 235, 240)",
            borderRadius: "5px",
          }}
        >
          {countries.map((country) => (
            <>
              <input
                className="country-input"
                type="checkbox"
                id={country.name}
                value={country.name}
                checked={selectedCountries.includes(`${country.name}`)}
                onChange={handleChange}
              />
              <label htmlFor={country.name} className="country-checkbox">
                {country.name}
              </label>
            </>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default ContinentCollapse;
