import { Card, Grid } from "@mui/material";

const cardInfo = {
  title: "Flood Warning issured March 2023",
  updatedTime: "JUNE 8, 2023",
  country: "United States",
  severity: "Extreme",
  event: "Flood Warning",
  intruction:
    "When facing a flood, it is crucial to stay calm and vigilant. Seek higher ground, away from the flood's source, and avoid walking or driving through floodwaters. Follow evacuation orders promptly, disconnect electrical appliances, and store important documents and valuables in waterproof containers. Stay informed through local news and official channels, and offer assistance to those in need if it is safe to do so. Contact emergency services if immediate help is required. Prioritizing personal safety and following official instructions are key during a flood.",
};

const AlertCard = () => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ padding: "15px", borderBottom: "1px solid rgba(0,0,0,.05)" }}
        >
          <span className="alert-card-title">{cardInfo.title}</span>
          <span className="alert-card-time">
            LAST UPDATED: {cardInfo.updatedTime}
          </span>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ padding: "15px", borderRight: "1px solid rgba(0,0,0,.05)" }}
        >
          <span className="alert-card-title">Country</span>
          <p className="alert-card-p">{cardInfo.country}</p>
          <span className="alert-card-title">Severity</span>
          <p className="alert-card-p">{cardInfo.severity}</p>
          <span className="alert-card-title">Event</span>
          <p className="alert-card-p">{cardInfo.event}</p>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            padding: "15px",
            borderLeft: "1px solid rgba(0,0,0,.05)",
          }}
        >
          <span className="alert-card-title">Instructions</span>
          <p className="alert-card-text">{cardInfo.intruction}</p>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            padding: "15px",
            borderTop: "1px solid rgba(0,0,0,.05)",
          }}
        >
          <div className="alert-tag">Ongoing</div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AlertCard;
