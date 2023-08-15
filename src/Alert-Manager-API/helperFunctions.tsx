export const convertCoordinates = (coordinatesString: string): number[][] => {
  const trimmedString = coordinatesString.trim();
  return trimmedString.split(" ").map((coordinates) => {
    const [latitude, longitude] = coordinates.split(",").map(parseFloat);
    return [latitude, longitude];
  });
};
