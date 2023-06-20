import { Box, Card, Grid, Typography } from "@mui/material";

interface CardInfo {
  title: string;
  updatedTime: string;
  country: string;
  severity: string;
  event: string;
  instruction: string;
}

interface AlertCardProps {
  cardInfo: CardInfo;
}

const AlertCard: React.FC<AlertCardProps> = ({ cardInfo }) => {
  return (
    <Card
      sx={{
        maxWidth: 380,
        border: "1px solid rgba(0,0,0,.05)",
        borderRadius: "0.25rem 0.25rem",
        boxShadow: "0 2px 10px 0 rgba(0,0,0,.08)",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            padding: "15px",
            borderBottom: "1px solid rgba(0,0,0,.05)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="500"
            sx={{
              display: "block",
              paddingBottom: "0.2rem",
              maxWidth: "auto",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {cardInfo.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#919191",
              display: "block",
              whiteSpace: "nowrap",
            }}
          >
            LAST UPDATED: {cardInfo.updatedTime}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            padding: "15px",
            borderRight: "1px solid rgba(0,0,0,.05)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "block",
              whiteSpace: "nowrap",
              fontWeight: "500",
            }}
          >
            Country
          </Typography>
          <Typography
            variant="h6"
            fontSize="0.7rem"
            fontWeight={300}
            sx={{
              display: "block",
              margin: "0px 0px 1rem",
            }}
          >
            {cardInfo.country}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              display: "block",
              whiteSpace: "nowrap",
              fontWeight: "500",
            }}
          >
            Severity
          </Typography>
          <Typography
            variant="h6"
            fontSize="0.7rem"
            fontWeight={300}
            sx={{
              display: "block",
              margin: "0px 0px 1rem",
            }}
          >
            {cardInfo.severity}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              display: "block",
              whiteSpace: "nowrap",
              fontWeight: "500",
            }}
          >
            Event
          </Typography>
          <Typography
            variant="h6"
            fontSize="0.7rem"
            fontWeight={300}
            sx={{ display: "block" }}
          >
            {cardInfo.event}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            padding: "15px",
            borderLeft: "1px solid rgba(0,0,0,.05)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "block",
              whiteSpace: "nowrap",
              fontWeight: "500",
            }}
          >
            Instructions
          </Typography>
          <Typography
            variant="h6"
            fontSize="0.7rem"
            fontWeight={300}
            className="alert-card-text"
          >
            {cardInfo.instruction}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            padding: "15px",
            borderTop: "1px solid rgba(0,0,0,.05)",
          }}
        >
          <Box className="alert-tag">Ongoing</Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AlertCard;
