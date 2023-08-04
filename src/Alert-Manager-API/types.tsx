export type Region = {
  centroid: string;
  id: string;
  name: string;
  polygon: string;
  countries?: Country[];
};

export type Country = {
  id: number;
  name: string;
  iso3: string;
  coordinates?: number[][];
  type: string;
  centroid: number[];
};

export type DistrictData = {
  country_id: number;
  country_name: string;
  districts: { id: number; name: string }[];
};

export type District = {
  id: number;
  name: string;
};
