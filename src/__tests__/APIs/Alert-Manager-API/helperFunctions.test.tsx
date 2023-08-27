import { convertCoordinates } from "../../../APIs/Alert-Manager-API/helperFunctions";

test("convertCoordinates correctly parses coordinates string", () => {
  const coordinatesString = "12.34,56.78 90.12,34.56 78.90,12.34";
  const expectedCoordinates = [
    [12.34, 56.78],
    [90.12, 34.56],
    [78.9, 12.34],
  ];

  const parsedCoordinates = convertCoordinates(coordinatesString);

  expect(parsedCoordinates).toEqual(expectedCoordinates);
});
