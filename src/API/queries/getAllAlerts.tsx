import { useQuery, gql } from "@apollo/client";

const ALL_ALERTS = gql`
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
      }
      event
      expires
      geocodeName
      geocodeValue
      id
      identifier
      polygon
      msgType
      sender
      scope
      sent
      severity
      status
      urgency
    }
  }
`;

export function DisplayAlerts(): JSX.Element {
  const { loading, error, data } = useQuery(ALL_ALERTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data.listAlert.map(
        ({ areaDesc, certainty }: { areaDesc: string; certainty: string }) => (
          <div key={areaDesc}>
            <h3>{areaDesc}</h3>
            <br />
            <p>{certainty}</p>
            <br />
          </div>
        )
      )}
    </>
  );
}
