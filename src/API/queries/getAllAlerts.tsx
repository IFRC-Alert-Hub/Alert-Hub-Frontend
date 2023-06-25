import { useQuery, gql } from "@apollo/client";
import { Container } from "@mui/material";

export const ALL_ALERTS = gql`
  query MyQuery {
    listAlert {
      areaDesc
      certainty
      country {
        centroid
        id
        iso
        iso3
        name
        polygon
        region {
          name
          centroid
          polygon
          id
        }
      }
      event
      expires
      geocodeName
      geocodeValue
      id
      identifier
      msgType
      urgency
      status
      severity
      sent
      sender
      scope
      polygon
      effective
    }
  }
`;

export function DisplayAlerts(): JSX.Element {
  const { loading, error, data } = useQuery(ALL_ALERTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Container maxWidth="lg">
        {" "}
        {data.listAlert
          .slice(0, 5)
          .map(
            ({
              areaDesc,
              certainty,
              country,
              sender,
              event,
              severity,
              effective,
              expires,
              urgency,
            }: {
              areaDesc: string;
              country: any;
              sender: string;
              event: string;
              severity: string;
              certainty: string;
              effective?: string;
              expires: string;
              urgency: string;
            }) => (
              <div>
                <p>Region: {country.region.name}</p>
                <p>Country: {country.name}</p>

                <p>Event: {event}</p>
                <p>Severity: {severity}</p>
                <p>Urgency: {urgency}</p>
                <p>Certainty: {certainty}</p>
                <p>Sender: {sender}</p>

                <p>Effective: {effective}</p>
                <p>Expire: {expires}</p>
                <br />
              </div>
            )
          )}
        {console.log(data.listAlert.slice(0, 1))}
      </Container>
    </>
  );
}

// region: "Asia Pacific",
//     country: "Australia",
//     event: "Red thunderstorm warning",
//     severity: "Moderate",
//     urgency: "Future",
//     certainty: "Likely",
//     sender:
//       "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-australia",
//     effective: "2023-06-23T22:59:59+00:00",
//     expires: "19/06/20",
