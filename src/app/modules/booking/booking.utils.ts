export function calculateTimeDifferenceInHours(
  startTime: string,
  endTime: string,
): number {
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  // Convert times to minutes since start of the day
  const startTotalMinutes = startHour * 60 + startMinute
  const endTotalMinutes = endHour * 60 + endMinute

  // Calculate difference in minutes
  const differenceInMinutes = endTotalMinutes - startTotalMinutes

  // Convert minutes to hours
  return differenceInMinutes / 60
}

//   // Example usage
//   const startTime = "10:00";
//   const endTime = "13:00";
//   const differenceInHours = calculateTimeDifferenceInHours(startTime, endTime);

//   console.log(`The difference in hours is: ${differenceInHours}`);
