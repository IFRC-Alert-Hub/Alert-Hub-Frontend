interface Data {
  country: string;
  event: string;
  sender: string;
  effective: Date;
  expires: Date;
}

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
    expires: "19/06/20",
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
    expires: "23/06/23",
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
    expires: "19/06/22",
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
    expires: "19/06/21",
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
    expires: "19/06/23",
  },
];

interface HeadCell {
  disablePadding?: boolean;
  id?: keyof Data;
  label?: string;
  numeric?: boolean;
  isDropdownFilter?: boolean;
  selectedFilter?: string | undefined;
  title?: string;
  filterKey?: string;
  menuItems?: string[];
}

const headCells: HeadCell[] = [
  {
    id: "country",
    numeric: false,
    disablePadding: true,
    label: "Country",
    isDropdownFilter: false,
  },
  {
    id: "event",
    numeric: true,
    disablePadding: false,
    label: "Event",
    isDropdownFilter: false,
  },

  {
    id: "sender",
    numeric: true,
    disablePadding: false,
    label: "Sender",
    isDropdownFilter: false,
  },
  {
    id: "effective",
    numeric: true,
    disablePadding: false,
    label: "Effective",
    isDropdownFilter: false,
  },
  {
    id: "expires",
    numeric: true,
    disablePadding: false,
    label: "Expires",
    isDropdownFilter: false,
  },
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
    isDropdownFilter: true,
  },
  {
    selectedFilter: "All",
    title: "Urgency",
    filterKey: "urgency",
    menuItems: ["Future", "Past", "Unknown"],
    isDropdownFilter: true,
  },
  {
    selectedFilter: "All",
    title: "Severity",
    filterKey: "severity",
    menuItems: ["Moderate", "Minor", "Unknown"],
    isDropdownFilter: true,
  },
  {
    selectedFilter: "All",
    title: "Certainty",
    filterKey: "certainty",
    menuItems: ["Possible", "Unlikely", "Unknown"],
    isDropdownFilter: true,
  },
];

export type { Data };
export { rows, headCells };
