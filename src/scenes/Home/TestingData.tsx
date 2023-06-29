export const ExtremeThreatColour = "#f5333f";
export const ModerateThreatColour = "#ff9e00";
export const OtherAlertsColour = "#95BF6E";

const pinsData = [
  { coordinates: [-90.98571, 40.748817], color: ExtremeThreatColour },
  { coordinates: [-74.006, 40.7128], color: ModerateThreatColour },
  { coordinates: [-23.993, 40.7392], color: OtherAlertsColour },
];

const polygonCoordinates = [
  {
    coordinates: [
      [-67.13734, 45.13745],
      [-66.96466, 44.8097],
      [-68.03252, 44.3252],
      [-69.06, 43.98],
      [-70.11617, 43.68405],
      [-70.64573, 43.09008],
      [-70.75102, 43.08003],
      [-70.79761, 43.21973],
      [-70.98176, 43.36789],
      [-70.94416, 43.46633],
      [-71.08482, 45.30524],
      [-70.66002, 45.46022],
      [-70.30495, 45.91479],
      [-70.00014, 46.69317],
      [-69.23708, 47.44777],
      [-68.90478, 47.18479],
      [-68.2343, 47.35462],
      [-67.79035, 47.06624],
      [-67.79141, 45.70258],
      [-67.13734, 45.13745],
    ],

    color: ExtremeThreatColour,
  },
  {
    coordinates: [
      [-111.97247757707605, 33.405141431812496],
      [-111.66039281790292, 32.81858119772198],
      [-111.02099965276837, 32.20236266359389],
      [-110.20653454956084, 31.950821040094752],
      [-109.7954960862599, 32.35681295802918],
      [-109.32356303580347, 32.27962068530867],
      [-108.94297186608053, 32.24099988780213],
      [-108.76789992800803, 32.31179212744006],
      [-108.42536787525692, 32.21524356286564],
      [-107.94582300140611, 32.21524356286564],
      [-107.45866630416049, 32.23456149089131],
      [-106.94867413673173, 32.23456149089131],
      [-106.75076672847564, 32.34395214871819],
      [-106.95628596012611, 32.575166610768335],
      [-107.25314707251, 33.24613784509407],
      [-106.86494407939267, 33.9372618476702],
      [-106.75076672847564, 34.62908485460697],
      [-106.56047114361391, 35.060129905209834],
      [-107.07807513443751, 34.96661660362342],
      [-107.93821117801174, 35.234401726454436],
      [-108.54715704956831, 35.58801412919837],
      [-108.97341915965801, 35.346236380510746],
      [-110.35115919405585, 34.94166167075913],
      [-111.68322828808651, 35.28412509089915],
      [-111.52337999680275, 34.84801303694944],
      [-112.08665492799307, 34.39073561593149],
      [-112.12471404496542, 33.46231164949154],
      [-111.97247757707605, 33.405141431812496],
    ],

    color: OtherAlertsColour,
  },
];

const boundingRegionCoordinates = {
  type: "Polygon",
  coordinates: [
    [
      [-32.99047851563365, -47.08120743260386],
      [-32.99047851563365, 41.726381079898935],
      [67.90795898435852, 41.726381079898935],
      [67.90795898435852, -47.08120743260386],
      [-32.99047851563365, -47.08120743260386],
    ],
  ],
};