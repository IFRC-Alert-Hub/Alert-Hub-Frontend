interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

const rows = [
  {
    region: "Europe",
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
  },
  {
    region: "Europe",
    name: "Donut",
    calories: 452,
    fat: 25,
    carbs: 51,
    protein: 4.9,
  },
  {
    region: "Europe",
    name: "Eclair",
    calories: 262,
    fat: 16,
    carbs: 24,
    protein: 6,
  },
  {
    region: "Europe",
    name: "Frozen yoghurt",
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    region: "Africa",
    name: "Gingerbread",
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 3.9,
  },
  {
    region: "Africa",
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
  },
  {
    region: "Africa",
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
  },
  {
    region: "Africa",
    name: "Jelly Bean",
    calories: 375,
    fat: 0,
    carbs: 94,
    protein: 0,
  },
  {
    region: "Middle East",
    name: "KitKat",
    calories: 518,
    fat: 26,
    carbs: 65,
    protein: 7,
  },
  {
    region: "Africa",
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
  },
  {
    region: "Europe",
    name: "Marshmallow",
    calories: 318,
    fat: 0,
    carbs: 81,
    protein: 2,
  },
  {
    region: "Europe",
    name: "Nougat",
    calories: 360,
    fat: 19,
    carbs: 9,
    protein: 37,
  },
  {
    region: "America",
    name: "Oreo",
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
    id: "name",
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
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
];

export type { Data };
export { rows, headCells };
