type Order = "asc" | "desc" | "";

interface Data {
  event: string;
  eventCategory: string;
  sent: string;
  sender: string;
  region: string;
  country: string;
  admin1s: string;
}

// const rows: RowsData[] = [
//   {
//     region: "Asia Pacific",
//     country: "Australia",
//     event: "Red thunderstorm warning",
//     eventCategory: "Moderate",
//     identifier: "Likely",
//     sender:
//       "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-australia",
//     sent: "2022-06-01T18:59:59+00:00",
//   },
//   {
//     region: "Europe",
//     country: "Belgium",
//     event: "Yellow snow squall warning",
//     eventCategory: "Minor",
//     identifier: "Unlikely",
//     sender: "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-belgium",
//     sent: "2023-06-20T18:59:59+00:00",
//   },
//   {
//     region: "Africa",
//     country: "Nigeria",
//     event: "Yellow heavy rain warning",
//     eventCategory: "Moderate",
//     identifier: "Likely",
//     sender: "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-nigeria",
//     sent: "2022-01-19T18:59:59+00:00",
//   },
// ];
type RowsData = {
  identifier: string;
  event: string;
  eventCategory: string;
  sent: string;
  sender: string;
  region: string;
  country: string;
  [key: string]: string;
  id: string;
  admin1s: string;
};

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
  minWidth: string;
  hasFilter?: boolean;
  allMenuItemTitle?: string;
  isDatePicker?: boolean;
  isSearchable?: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "event",
    numeric: true,
    disablePadding: false,
    label: "Event",
    isDropdownFilter: false,
    minWidth: "150px",
    hasFilter: true,
  },

  {
    selectedFilter: "All",
    title: "Event Category",
    filterKey: "eventCategory",
    menuItems: [
      "Geo",
      "Met",
      "Safety",
      "Security",
      "Rescue",
      "Fire",
      "Health",
      "Env",
      "Transport",
      "Infra",
      "CBRNE",
      "Other",
    ],
    isDropdownFilter: true,
    minWidth: "150px",
    allMenuItemTitle: "All Event Categories",
  },
  {
    selectedFilter: "All",
    title: "Region",
    filterKey: "region",
    menuItems: [
      "Africa",
      "Americas",
      "Asia Pacific",
      "Europe",
      "Middle East & North East",
    ],
    isDropdownFilter: true,
    minWidth: "150px",
    allMenuItemTitle: "All Regions",
  },
  {
    id: "country",
    numeric: false,
    disablePadding: true,
    label: "Country",
    isDropdownFilter: false,
    minWidth: "150px",
    hasFilter: true,
    isSearchable: true,
  },

  {
    id: "admin1s",
    numeric: false,
    disablePadding: true,
    label: "Admin1s",
    isDropdownFilter: false,
    minWidth: "150px",
    hasFilter: false,
    isSearchable: true,
  },
  {
    id: "sent",
    numeric: true,
    disablePadding: false,
    label: "Sent",
    isDropdownFilter: false,
    minWidth: "100px",
    hasFilter: false,
    isDatePicker: true,
  },
];

export type { Data, RowsData, Order };
export { headCells };
