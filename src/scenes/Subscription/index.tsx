import { Button, Container, Grid, Typography } from "@mui/material";
import SubscriptionTable from "./SubscriptionTable";
import { useState } from "react";
import AddModal from "./AddModal";

interface SubscriptionData {
  id: number;
  title: string;
  countries: string[];
  urgency: string[];
  severity: string[];
  certainty: string[];
  method: string[];
  displayedCountries?: string[];
}

function createData(
  id: number,
  title: string,
  countries: string[],
  urgency: string[],
  severity: string[],
  certainty: string[],
  method: string[]
) {
  return { id, title, countries, urgency, severity, certainty, method };
}

const rows: SubscriptionData[] = [];

rows.push(
  createData(
    0,
    "Asian flood",
    ["Egypt", "South Africa", "Nigeria"],
    ["Future"],
    ["Extreme, Severe"],
    ["Observed"],
    ["Email, SMS"]
  )
);
for (let i = 1; i < 13; i++) {
  rows.push(
    createData(
      i,
      "Africa-v1",
      ["Egypt", "South Africa", "Nigeria", "Kenya", "Morocco"],
      ["Future, Expected"],
      ["Severe"],
      ["Likely"],
      ["Email"]
    )
  );
}

const Subscription = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth={"lg"}>
      <Grid container direction="row" margin="30px 0px 10px 0px">
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h2"
            fontWeight={"bold"}
            paddingBottom={"15px"}
            textTransform={"capitalize"}
            letterSpacing={"1.6px"}
          >
            My Subscription
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} className="subscription-add-btn">
          <Button
            variant="contained"
            color="error"
            onClick={handleOpen}
            sx={{ borderRadius: 3, marginRight: "10px" }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <SubscriptionTable rows={rows} />
      <AddModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default Subscription;
