export const formatTime = (timestamp: Date) => {
  // Ensure the timestamp is a number. If it's a string, try converting it.
  const numericTimestamp = Number(timestamp);

  // Check if the timestamp is valid
  if (isNaN(numericTimestamp)) {
    return "Invalid Time"; // Or handle the error as appropriate
  }

  const date = new Date(numericTimestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${formattedMinutes}`;
};
