// Level 1
export type Bbox = {
  type: string;
  coordinates: number[][][];
};
export type CountryRegionData = {
  id: number;
  name: string;
  bbox: Bbox[];
  centroid: any[];
  countries?: Country[];
};

export type Country = {
  id: number;
  name: string;
  iso3: string;
  coordinates: any[];
  type: string;
  centroid: any[];
  filters: any;
};

// Level 2
export type Country_Admin1s_Data = {
  country_id: number;
  country_name: string;
  admin1s: admin1[];
};

export type admin1 = {
  id: number;
  name: string;
  iso3: string;
  coordinates: any[];
  type: string;
  filters: any;
};

// Level 3
export type Admin1_Alert_Data = {
  admin1_id: number;
  admin1_name: string;
  alerts: Alert[];
};

export type Alert = {
  id: number;
  url: string;
  identifier: string;
  sent: string;
  sender: string;
  msg_type: string;
  source: string;
  scope: string;
  restriction: string;
  addresses: string;
  code: string;
  note: string;
  references: string;
  incidents: string;
  info: AlertInfo[];
};

export type AlertInfo = {
  id: number;
  language: string;
  category: string;
  event: string;
  response_type: string;
  urgency: string;
  severity: string;
  certainty: string;
  audience: string;
  event_code: string;
  effective: string;
  onset: string;
  expires: string;
  sender_name: string;
  headline: string;
  description: string;
  instruction: string;
  web: string;
  contact: string;
  parameter: InfoParameter;
};

type InfoParameter = {
  id: number;
  value_name: string;
  value: string;
};

// Level 4
export type AlertInfoArea = {
  info_id: number;
  areas?: Area[];
};

type Area = {
  id: number;
  area_desc: string;
  altitude: string;
  ceiling: string;
  polygons: AreaPolygon[];
  circle: AreaCircle[];
  geocodes: AreaGeocodes[];
};

type AreaPolygon = {
  id: number;
  coordinates: any[];
  type: string;
  name: string;
};

type AreaCircle = {
  id: number;
  type: string;
  name: string;
  center: any[];
  radius: number;
};

type AreaGeocodes = {
  id: number;
  value_name: string;
  value: string;
};
