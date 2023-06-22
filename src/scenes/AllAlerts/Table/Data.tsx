interface Data {
  country: string;
  event: string;
  sender: string;
  effective: string;
  expires: string;
}
const initialFilters = [
  {
    selectedFilter: "All",
    title: "Region",
    filterKey: "region",
    menuItems: [
      "Africa",
      "America",
      "Asia Pacific",
      "Europe",
      "Middle East & North East",
    ],
  },
  {
    selectedFilter: "All",
    title: "Urgency",
    filterKey: "urgency",
    menuItems: ["Future", "Past", "Unknown"],
  },
  {
    selectedFilter: "All",
    title: "Severity",
    filterKey: "severity",
    menuItems: ["Moderate", "Minor", "Unknown"],
  },
  {
    selectedFilter: "All",
    title: "Certainty",
    filterKey: "certainty",
    menuItems: ["Possible", "Unlikely", "Unknown"],
  },
];
const rows = [
  {
    region: "Asia Pacific",
    country: "Australia",
    event: "Red thunderstorm warning",
    severity: "Moderate",
    urgency: "Future",
    certainty: "Likely",
    sender:
      "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-australia",
    effective: "2023-06-23T22:59:59+00:00",
    expires: "2023-06-25T22:59:59+00:00",
  },
  {
    region: "Europe",
    country: "Belgium",
    event: "Yellow snow squall warning",
    severity: "Minor",
    urgency: "Past",
    certainty: "Unlikely",
    sender: "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-belgium",
    effective: "2023-06-22T18:59:59+00:00",
    expires: "2023-06-23T18:59:59+00:00",
  },
  {
    region: "Africa",
    country: "Nigeria",
    event: "Yellow heavy rain warning",
    severity: "Moderate",
    urgency: "Future",
    certainty: "Likely",
    sender: "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-nigeria",
    effective: "2023-06-24T00:59:59+00:00",
    expires: "2023-06-26T00:59:59+00:00",
  },
  {
    region: "America",
    country: "United States",
    event: "Red tornado warning",
    severity: "Major",
    urgency: "Past",
    certainty: "Possible",
    sender: "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-usa",
    effective: "2023-06-22T12:59:59+00:00",
    expires: "2023-06-23T12:59:59+00:00",
  },
  {
    region: "Middle East & North East",
    country: "Israel",
    event: "Yellow dust storm warning",
    severity: "Minor",
    urgency: "Unknown",
    certainty: "Unlikely",
    sender: "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-israel",
    effective: "2023-06-25T14:59:59+00:00",
    expires: "2023-06-27T14:59:59+00:00",
  },
];

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "country",
    numeric: false,
    disablePadding: true,
    label: "Country",
  },
  {
    id: "event",
    numeric: true,
    disablePadding: false,
    label: "Event",
  },
  {
    id: "sender",
    numeric: true,
    disablePadding: false,
    label: "Sender",
  },
  {
    id: "effective",
    numeric: true,
    disablePadding: false,
    label: "Effective",
  },
  {
    id: "expires",
    numeric: true,
    disablePadding: false,
    label: "Expires",
  },
];

export type { Data };
export { rows, headCells, initialFilters };
