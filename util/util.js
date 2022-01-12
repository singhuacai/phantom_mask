const wrapAsync = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};

const validateDateHhMm = (time) => {
  var isValid =
    /^((19|20)\d\d)[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])\s([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(
      time
    );
  return isValid;
};

module.exports = {
  wrapAsync,
  validateDateHhMm,
};
