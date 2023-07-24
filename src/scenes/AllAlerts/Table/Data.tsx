type Order = "asc" | "desc" | "";

interface Data {
  identifier: string;
  country: string;
  event: string;
  sender: string;
  effective: Date;
  sent: Date;
  eventCategory: string;
}

type RowsData = {
  identifier: string;
  eventCategory: string;
  event: string;
  region: string;
  country: string;
  severity: string;
  urgency: string;
  certainty: string;
  sender: string;
  effective: string;
  sent: string;
  [key: string]: string;
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
}

const headCells: HeadCell[] = [
  {
    id: "identifier",
    numeric: true,
    disablePadding: false,
    label: "Identfier",
    isDropdownFilter: false,
    minWidth: "150px",
    hasFilter: true,
  },

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
    id: "sent",
    numeric: true,
    disablePadding: false,
    label: "Sent",
    isDropdownFilter: false,
    minWidth: "100px",
    hasFilter: true,
  },
  {
    id: "sender",
    numeric: true,
    disablePadding: false,
    label: "Sender",
    isDropdownFilter: false,
    minWidth: "150px",
    hasFilter: false,
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
  },
];

export type { Data, RowsData, Order };
export { headCells };
