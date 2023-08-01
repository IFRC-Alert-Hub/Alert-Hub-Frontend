import { useIntl } from "react-intl";

const NavItems = () => {
  const { formatMessage } = useIntl();

  const firstNavBarItems = [
    {
      name: formatMessage({ id: "firstNavBarItem.about" }),
      path: "/about",
      exact: false,
    },
    {
      name: formatMessage({ id: "firstNavBarItem.resources" }),
      path: "/resources",
      exact: false,
    },
  ];
  const secondNavBarItems = [
    {
      name: formatMessage({ id: "secondNavBarItems.home" }),
      path: "/",
      exact: true,
    },
  ];

  const RegionsDropdownItems = [
    {
      name: formatMessage({ id: "RegionsDropdownItems.africa" }),
      path: "/regions/1",
      exact: false,
    },
    {
      name: formatMessage({ id: "RegionsDropdownItems.america" }),
      path: "/regions/2",
      exact: false,
    },
    {
      name: formatMessage({ id: "RegionsDropdownItems.asiaPacific" }),
      path: "/regions/3",
      exact: false,
    },
    {
      name: formatMessage({ id: "RegionsDropdownItems.europe" }),
      path: "/regions/4",
      exact: false,
    },
    {
      name: formatMessage({ id: "RegionsDropdownItems.middleEastNorthEast" }),
      path: "/regions/5",
      exact: false,
    },
  ];

  return { firstNavBarItems, secondNavBarItems, RegionsDropdownItems };
};

export default NavItems;

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
