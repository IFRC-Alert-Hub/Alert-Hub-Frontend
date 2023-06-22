interface Data {
  calories: number;
  carbs: number;
  fat: number;
  country: string;
  protein: number;
}
const initialFilters = [
  {
    id: 1,
    selectedFilter: "All",
    title: "Region",
    filterKey: "region",
    menuItems: ["Europe", "Africa", "America"],
  },
  {
    id: 2,
    selectedFilter: "All",
    title: "Country",
    filterKey: "country",
    menuItems: ["USA", "Canada", "Australia"],
  },
];
const rows = [
  {
    region: "Europe",
    country: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
  },
  {
    region: "Europe",
    country: "Donut",
    calories: 452,
    fat: 25,
    carbs: 51,
    protein: 4.9,
  },
  {
    region: "Europe",
    country: "Eclair",
    calories: 262,
    fat: 16,
    carbs: 24,
    protein: 6,
  },
  {
    region: "Europe",
    country: "Frozen yoghurt",
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    region: "Africa",
    country: "Gingerbread",
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 3.9,
  },
  {
    region: "Africa",
    country: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
  },
  {
    region: "Africa",
    country: "Ice cream sandwich",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
  },
  {
    region: "Africa",
    country: "Jelly Bean",
    calories: 375,
    fat: 0,
    carbs: 94,
    protein: 0,
  },
  {
    region: "Middle East",
    country: "KitKat",
    calories: 518,
    fat: 26,
    carbs: 65,
    protein: 7,
  },
  {
    region: "Africa",
    country: "USA",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
  },
  {
    region: "Europe",
    country: "Marshmallow",
    calories: 318,
    fat: 0,
    carbs: 81,
    protein: 2,
  },
  {
    region: "Europe",
    country: "Nougat",
    calories: 360,
    fat: 19,
    carbs: 9,
    protein: 37,
  },
  {
    region: "America",
    country: "Oreo",
    calories: 437,
    fat: 18,
    carbs: 63,
    protein: 4,
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
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
  },
];

export type { Data };
export { rows, headCells, initialFilters };
