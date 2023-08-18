module.exports = {
  preset: "ts-jest",
  testPathIgnorePatterns: [
    "/node_modules/",
    // "/__tests__/",
    // "/src/Alert-Manager-API/",
  ],
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
  },
};
