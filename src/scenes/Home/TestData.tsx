const testData = [
  {
    AlertBody: {
      identifier: "14022341600000_20221030174929",
      sender: "Guangling_County_Meteorological_Bureau",
      sent: "2022-10-30T17:49:06+08:00",
      status: "Actual",
      msgType: "Alert",
      scope: "Public",
      info: {
        language: "en-US",
        category: "Met",
        event: "gale",
        urgency: "Unknown",
        severity: "Minor",
        certainty: "Unknown",
        effective: "2022-10-30T17:49:47+08:00",
        senderName: "glx_ zhiban",
        headline:
          "Guangling County Meteorological Bureau issued a blue gale warning [Level IV/general]",
        description:
          "At 17:40 on October 30, 2022, Guangling County Meteorological Station issued a blue warning signal of strong wind: it is estimated that the average wind force in the next 24 hours in our county will be 4-5, and the gust will reach 7 or above. Relevant units and personnel shall be well prepared for prevention. Warning scope: all townships and towns (streets). Defense guidelines: 1. The government and relevant departments shall do a good job in preventing gales according to their responsibilities; 2. Close the doors and windows, reinforce the hoardings, scaffolding, billboards and other structures that are easy to be blown by the wind, properly place the outdoor articles that are easy to be affected by the strong wind, and cover the building materials; 3. Pedestrians shall not ride bicycles as much as possible, and shall not stay under billboards, temporary structures, etc. in the wind; 4. Relevant departments and units shall pay attention to the fire prevention of forests, grasslands, etc.",
        area: {
          areaDesc: "Guangling County 2",
          geocode: {
            valueName: "CPEAS Geographic Code",
            value: "140223000000",
          },
          cc_polys: [],
        },
      },
      Signature: null,
    },
  },
  {
    AlertBody: {
      identifier: "OCA-marinePollution_1839",
      sender: "iocean.oca.gov.tw",
      sent: "2022-11-02T00:00:00+08:00",
      status: "Actual",
      msgType: "Alert",
      scope: "Public",
      info: {
        language: "zh-TW",
        category: "Env",
        event: "海洋污染",
        urgency: "Immediate",
        severity: "Minor",
        certainty: "Observed",
        effective: "2022-11-01T11:57:00+08:00",
        expires: "2023-09-01T11:57:00+08:00",
        senderName: "海洋保育署",
        headline: "海洋污染事件",
        description: "地方政府高雄市政府海洋局:寶山3號船體破洞漏油",
        area: {
          areaDesc: "高雄港53號碼頭",
          circle: "22.5888888888889,120.294444444444 0.5",
          cc_polys: [],
        },
      },
    },
  },
  {
    AlertBody: {
      identifier: "GDACS_EQ_1344240_1470530",
      sender: "info-gdacs@gdacs.org",
      sent: "2022-10-30T08:24:04-00:00",
      status: "Actual",
      msgType: "Alert",
      scope: "Public",
      info: {
        language: null,
        category: "Geo",
        event: "Earthquake",
        urgency: "Past",
        severity: "Minor",
        certainty: "Observed",
        senderName: "Global Disaster Alert and Coordination System",
        headline:
          "Green earthquake alert (Magnitude 4.8M, Depth:10km) in Solomon Islands 30/10/2022 09:24 UTC, No people affected in 100km.",
        description:
          "On 10/30/2022 9:24:04 AM, an earthquake occurred in Solomon Islands potentially affecting No people affected in 100km. The earthquake had Magnitude 4.8M, Depth:10km.",
        area: {
          areaDesc: "Polygon",
          polygon:
            "-11.462,164.307 -11.431,164.307 -11.399,164.305 -11.368,164.302 -11.337,164.298 -11.306,164.293 -11.275,164.287 -11.244,164.28 -11.214,164.272 -11.184,164.262 -11.154,164.252 -11.125,164.24 -11.096,164.228 -11.067,164.214 -11.039,164.2 -11.012,164.184 -10.985,164.168 -10.958,164.15 -10.932,164.132 -10.907,164.113 -10.883,164.092 -10.859,164.071 -10.836,164.049 -10.814,164.027 -10.793,164.003 -10.772,163.979 -10.752,163.954 -10.733,163.929 -10.715,163.902 -10.698,163.875 -10.682,163.848 -10.667,163.82 -10.652,163.791 -10.639,163.762 -10.627,163.733 -10.615,163.703 -10.605,163.672 -10.596,163.642 -10.588,163.611 -10.581,163.579 -10.575,163.548 -10.57,163.516 -10.566,163.484 -10.563,163.452 -10.562,163.42 -10.561,163.388 -10.562,163.356 -10.563,163.324 -10.566,163.292 -10.57,163.26 -10.575,163.229 -10.581,163.197 -10.588,163.166 -10.596,163.135 -10.605,163.104 -10.615,163.074 -10.627,163.044 -10.639,163.014 -10.652,162.985 -10.667,162.957 -10.682,162.929 -10.698,162.901 -10.715,162.874 -10.733,162.848 -10.752,162.822 -10.772,162.797 -10.793,162.773 -10.814,162.75 -10.836,162.727 -10.859,162.705 -10.883,162.684 -10.907,162.664 -10.932,162.645 -10.958,162.626 -10.985,162.609 -11.012,162.592 -11.039,162.577 -11.067,162.562 -11.096,162.548 -11.125,162.536 -11.154,162.524 -11.184,162.514 -11.214,162.505 -11.244,162.496 -11.275,162.489 -11.306,162.483 -11.337,162.478 -11.368,162.474 -11.399,162.471 -11.431,162.47 -11.462,162.469 -11.493,162.47 -11.525,162.471 -11.556,162.474 -11.587,162.478 -11.618,162.483 -11.649,162.489 -11.68,162.496 -11.71,162.505 -11.74,162.514 -11.77,162.524 -11.799,162.536 -11.828,162.548 -11.857,162.562 -11.885,162.577 -11.912,162.592 -11.939,162.609 -11.966,162.626 -11.992,162.645 -12.017,162.664 -12.041,162.684 -12.065,162.705 -12.088,162.727 -12.11,162.75 -12.131,162.773 -12.152,162.797 -12.172,162.822 -12.191,162.848 -12.209,162.874 -12.226,162.901 -12.242,162.929 -12.257,162.957 -12.272,162.985 -12.285,163.014 -12.297,163.044 -12.309,163.074 -12.319,163.104 -12.328,163.135 -12.336,163.166 -12.343,163.197 -12.349,163.229 -12.354,163.26 -12.358,163.292 -12.361,163.324 -12.362,163.356 -12.363,163.388 -12.362,163.42 -12.361,163.452 -12.358,163.484 -12.354,163.516 -12.349,163.548 -12.343,163.579 -12.336,163.611 -12.328,163.642 -12.319,163.672 -12.309,163.703 -12.297,163.733 -12.285,163.762 -12.272,163.791 -12.257,163.82 -12.242,163.848 -12.226,163.875 -12.209,163.902 -12.191,163.929 -12.172,163.954 -12.152,163.979 -12.131,164.003 -12.11,164.027 -12.088,164.049 -12.065,164.071 -12.041,164.092 -12.017,164.113 -11.992,164.132 -11.966,164.15 -11.939,164.168 -11.912,164.184 -11.885,164.2 -11.857,164.214 -11.828,164.228 -11.799,164.24 -11.77,164.252 -11.74,164.262 -11.71,164.272 -11.68,164.28 -11.649,164.287 -11.618,164.293 -11.587,164.298 -11.556,164.302 -11.525,164.305 -11.493,164.307 -11.462,164.307 -11.462,164.307",
          cc_polys: [],
        },
      },
    },
  },
];

export default testData;
