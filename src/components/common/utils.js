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
  return jsDate.toISOString().split("T")[0]; // YYYY-MM-DD
};
