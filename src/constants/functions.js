export const navOptionHandler = () => ({
  headerShown: false,
  animationEnabled: false,
});

export const validateEmail = value => {
  var emailRex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
};

export const validateMobile = value => {
  var phoneRex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/im;
  if (phoneRex.test(value)) {
    return true;
  }
  return false;
};

export const validateAlias = value => {
  var aliasRex = /^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/;
  if (aliasRex.test(value)) {
    return true;
  }
  return false;
};

export const validateLength = (value, length) => {
  if (value.length >= length) {
    return true;
  }
  return false;
};

export const isEmpty = param => {
  return (
    param == undefined ||
    param == null ||
    (typeof param === 'string' && param == '')
  );
};
