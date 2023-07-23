export const firstNavBarItems = [
  { name: "About", path: "/about", exact: false },
  // { name: "Resources", path: "/resources", exact: false },
];

export const secondNavBarItems = [{ name: "Home", path: "/", exact: true }];

export const RegionsDropdownItems = [
  { name: "Africa", path: "/regions/1", exact: false },
  { name: "America", path: "/regions/2", exact: false },
  { name: "Asia Pacific", path: "/regions/3", exact: false },
  { name: "Europe", path: "/regions/4", exact: false },
  { name: "Middle East & North East", path: "/regions/5", exact: false },
];

export const HazardTypeDropdownItems = [
  { name: "Hazard Type 1", path: "/hazard-type/0", exact: false },
  { name: "Hazard Type 2", path: "/hazard-type/1", exact: false },
  { name: "Hazard Type 3", path: "/hazard-type/2", exact: false },
];

export const UrgencyLevelDropdownItems = [
  { name: "Immediate", path: "/urgency-level/immediate", exact: false },
  { name: "Expected", path: "/urgency-level/expected", exact: false },
];

export const SeverityLevelDropdownItems = [
  { name: "Extreme", path: "/severity-level/immediate", exact: false },
  { name: "Severe", path: "/severity-level/expected", exact: false },
];

export const CertaintyLevelDropdownItems = [
  { name: "Observed", path: "/certainty-level/observed", exact: false },
  {
    name: "Likely",
    path: "/certainty-level/likely",
    exact: false,
  },
];
