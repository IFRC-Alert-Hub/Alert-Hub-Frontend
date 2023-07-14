import { gql } from "@apollo/client";

export const ALL_ALERTS = gql`
  query MyQuery($regionId: String, $iso3: String, $continentId: String) {
    listAlert(regionId: $regionId, iso3: $iso3, continentId: $continentId) {
      status
      source
      sent
      sender
      references
      scope
      restriction
      note
      msgType
      incidents
      identifier
      code
      addresses
      id
      country {
        id
        name
        region {
          name
        }
      }
      alertinfoSet {
        web
        urgency
        audience
        category
        certainty
        contact
        effective
        event
        eventCode
        headline
        expires
        instruction
        language
        onset
        responseType
        senderName
        severity
        id
        description
      }
    }
    listCountry {
      id
      iso3
      multipolygon
      name
      polygon
      centroid
      region {
        id
        name
        polygon
      }
    }
  }
`;

// export function DisplayAlerts(): JSX.Element {
//   const { loading, error, data } = useQuery(ALL_ALERTS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <>
//       <Container maxWidth="lg">
//         {" "}
//         {data.listAlert
//           .slice(0, 5)
//           .map(
//             ({
//               areaDesc,
//               certainty,
//               country,
//               sender,
//               event,
//               severity,
//               effective,
//               expires,
//               urgency,
//             }: {
//               areaDesc: string;
//               country: any;
//               sender: string;
//               event: string;
//               severity: string;
//               certainty: string;
//               effective?: string;
//               expires: string;
//               urgency: string;
//             }) => (
//               <div>
//                 <p>Region: {country.region.name}</p>
//                 <p>Country: {country.name}</p>

//                 <p>Event: {event}</p>
//                 <p>Severity: {severity}</p>
//                 <p>Urgency: {urgency}</p>
//                 <p>Certainty: {certainty}</p>
//                 <p>Sender: {sender}</p>

//                 <p>Effective: {effective}</p>
//                 <p>Expire: {expires}</p>
//                 <br />
//               </div>
//             )
//           )}
//         {console.log(data.listAlert.slice(0, 1))}
//       </Container>
//     </>
//   );
// }

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
