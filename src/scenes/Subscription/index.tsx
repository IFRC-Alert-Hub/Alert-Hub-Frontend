import { Button, Container, Grid, Typography } from "@mui/material";
import SubscriptionTable from "./SubscriptionTable";
import { useState } from "react";
import ModalForm from "./ModalForm";

interface SubscriptionData {
  id: number;
  title: string;
  countries: string[];
  urgency: string[];
  severity: string[];
  certainty: string[];
  methods: string[];
  displayedCountries?: string[];
}

const rows: SubscriptionData[] = [
  {
    id: 0,
    title: "Asian flood",
    countries: ["China", "Japan", "India"],
    urgency: ["Future"],
    severity: ["Extreme, Severe"],
    certainty: ["Observed"],
    methods: ["Email, SMS"],
  },
  {
    id: 1,
    title: "Africa-v1",
    countries: ["Egypt", "South Africa", "Nigeria", "Kenya", "Morocco"],
    urgency: ["Future, Expected"],
    severity: ["Severe"],
    certainty: ["Likely"],
    methods: ["Email"],
  },
];

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
            My Subscription Group
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
      <ModalForm open={open} handleClose={handleClose} />
    </Container>
  );
};

export default Subscription;
