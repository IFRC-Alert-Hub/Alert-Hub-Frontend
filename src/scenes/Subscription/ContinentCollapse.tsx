import { Box, Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ChangeEvent, useState } from "react";
import {
  CountryType,
  SubscriptionForm,
} from "../../API/queries/getSubscriptions";

interface PropsType {
  continent: string;
  countries: CountryType[];
  subscriptionForm: SubscriptionForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContinentCollapse = ({
  continent,
  countries,
  subscriptionForm,
  handleChange,
}: PropsType) => {
  const [open, setOpen] = useState(false);

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
          {countries?.map((country) => (
            <div key={country.id}>
              <input
                className="country-input"
                type="checkbox"
                name="countries"
                id={country.name}
                value={country.id}
                checked={subscriptionForm["countries"].includes(
                  `${country.id}`
                )}
                onChange={handleChange}
              />
              <label htmlFor={country.name} className="country-checkbox">
                {country.name}
              </label>
            </div>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default ContinentCollapse;
