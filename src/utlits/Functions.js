import { useRouter } from "next/router";

export const tConvert = (time) => {
  // Check correct time format and split into components
  time = time?.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}


export const convertTo24HourFormat = (timeStr) => {
  // Extracting hours and minutes from the time string
  var hours = parseInt(timeStr);
  var isPM = timeStr.toLowerCase().includes('pm');

  // If the time is in PM and not 12, add 12 hours to convert to 24-hour format
  if (isPM && hours !== 12) {
    hours += 12;
  }
  // If the time is 12:xx AM, convert it to 00:xx
  else if (!isPM && hours === 12) {
    hours = 0;
  }

  // Formatting hours with leading zero if necessary
  var formattedHours = hours < 10 ? '0' + hours : hours;

  // Returning the time in 24-hour format
  return formattedHours + ':00';
}






export function formatNumber(num, decimals = 1) {
  const suffixes = [
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
  ];

  let formattedNumber = "";

  if (num < 1000) {
    // Handle numbers less than 1,000
    formattedNumber = num.toFixed(decimals);
  } else {
    // Find the appropriate suffix
    const matchingSuffix = suffixes.find((suffix) => Math.abs(num) >= suffix.value);
    formattedNumber = (num / matchingSuffix.value).toFixed(decimals);
    formattedNumber += matchingSuffix.symbol;
  }

  return formattedNumber;
}



export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because month is zero-indexed
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}