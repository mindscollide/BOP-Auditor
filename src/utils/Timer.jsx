export const getDateTimeString = (date, time) => {
  let dateString = `${date}${time}`;
  return dateString.replace(/[-:\s]/g, "");
};

export const convertDateTimeIntoLocal = (utcDateString) => {
  if (utcDateString === null || utcDateString === undefined) return;
  const year = parseInt(utcDateString.slice(0, 4));
  const month = parseInt(utcDateString.slice(4, 6)) - 1; // JS months are 0-based
  const day = parseInt(utcDateString.slice(6, 8));
  const hour = parseInt(utcDateString.slice(8, 10));
  const minute = parseInt(utcDateString.slice(10, 12));
  const second = parseInt(utcDateString.slice(12, 14));

  // Create date in UTC
  const utcDate = new Date(Date.UTC(year, month, day, hour, minute, second));

  return utcDate;
};
