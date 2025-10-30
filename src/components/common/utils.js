// To Validate Email
export const emailValidation = (text) => {
  // Correct regex pattern for email validation
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test if the input text matches the regex pattern
  const isValid = emailRegex.test(text);

  return isValid; // Return true if valid, false otherwise
};

//Convert the Date to YYMMDD format
export const formatDate = (dateObj) => {
  if (!dateObj) return null;
  const jsDate = dateObj.toDate();
  const year = jsDate.getFullYear();
  const month = String(jsDate.getMonth() + 1).padStart(2, "0");
  const day = String(jsDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatPkAmount = (rawValue, options = {}) => {
  const { decimals = 2, allowNegative = true, emptySymbol = "" } = options;

  // Handle empty/null/undefined cases
  if (rawValue === null || rawValue === undefined || rawValue === "") {
    return emptySymbol;
  }

  // Convert to number
  let numericValue;
  if (typeof rawValue === "string") {
    // Remove any existing formatting
    const cleanString = rawValue.replace(/[^\d.-]/g, "");
    numericValue = parseFloat(cleanString);
  } else {
    numericValue = Number(rawValue);
  }

  // Validate the number
  if (isNaN(numericValue)) {
    console.warn(`Invalid number value: ${rawValue}`);
    return emptySymbol;
  }

  // Handle negative values
  if (!allowNegative && numericValue < 0) {
    numericValue = 0;
  }

  // Format with Pakistan locale
  return numericValue.toLocaleString("en-PK", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  });
};
export const formatDateToUTC = (date) => {
  console.log("date is: ", date);
  return (
    date.getUTCFullYear().toString() +
    String(date.getUTCMonth() + 1).padStart(2, "0") +
    String(date.getUTCDate()).padStart(2, "0") +
    String(date.getUTCHours()).padStart(2, "0") +
    String(date.getUTCMinutes()).padStart(2, "0") +
    String(date.getUTCSeconds()).padStart(2, "0")
  );
};
