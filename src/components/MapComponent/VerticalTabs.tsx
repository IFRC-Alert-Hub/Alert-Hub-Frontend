import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import testData from "../../scenes/Home/TestData";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const tabPanelRef = React.useRef<HTMLDivElement | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (tabPanelRef.current) {
      tabPanelRef.current.scrollTop = 0;
    }
    setValue(newValue);
  };

  React.useEffect(() => {
    if (tabPanelRef.current) {
      tabPanelRef.current.scrollTop = 0;
    }
  }, [value]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 280,
        width: 550,
        borderRadius: "5px !important",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          "& .Mui-selected": {
            color: "#f6343f !important",
          },
          width: "150px",
        }}
      >
        {testData.map((item, index) => (
          <Tab
            key={index}
            label={item.AlertBody.info.event}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      <div style={{ overflowY: "auto", width: "400px" }} ref={tabPanelRef}>
        {testData.map((item, index) => (
          <TabPanel value={value} index={index}>
            <Typography variant="h5" fontWeight={500} paddingBottom={"10px"}>
              {item.AlertBody.info.headline}
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Language: </span>
              {item.AlertBody.info["language"]
                ? item.AlertBody.info.language
                : "N/A"}
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Expires: </span>
              {item.AlertBody.info["expires"]
                ? item.AlertBody.info.expires
                : "N/A"}
            </Typography>

            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Severity: </span>
              {item.AlertBody.info.severity}{" "}
            </Typography>

            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Certainty: </span>
              {item.AlertBody.info["certainty"]
                ? item.AlertBody.info.certainty
                : "N/A"}
            </Typography>

            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Urgency: </span>
              {item.AlertBody.info["urgency"]
                ? item.AlertBody.info.urgency
                : "N/A"}
            </Typography>

            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Effective: </span>
              {item.AlertBody.info["effective"]
                ? item.AlertBody.info.effective
                : "N/A"}
            </Typography>

            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}>Description: </span>
              {item.AlertBody.info.description}{" "}
            </Typography>
          </TabPanel>
        ))}
        {/* <TabPanel value={value} index={0}>
          <Typography variant="h3">Avertissement De PLUIE Modéré</Typography>
          1. Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </TabPanel>
        <TabPanel value={value} index={1}>
          2. Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </TabPanel>
        <TabPanel value={value} index={2}>
          3. Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </TabPanel>
        <TabPanel value={value} index={3}>
          4. Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </TabPanel>
        <TabPanel value={value} index={4}>
          5. Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </TabPanel>
        <TabPanel value={value} index={5}>
          6. Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </TabPanel>
        <TabPanel value={value} index={6}>
          7. Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </TabPanel> */}
      </div>
    </Box>
  );
}
