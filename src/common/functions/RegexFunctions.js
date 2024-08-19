export const removeSpaceandSpecialCharAcptHash = (data) => {
  let pattern = /^[^ .,:;!@$%^&*()\\\-+=~`{}\[\]|/"'<>?]+$/;
  let isValid = pattern.test(data);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

export const AcceptsOnlyCharacter = (data) => {
  let pattern = /^[A-Za-z]+$/;
  let isValid = pattern.test(data);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};
