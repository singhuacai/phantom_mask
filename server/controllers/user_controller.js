const User = require("../models/user.model");

function validateDateHhMm(time) {
  var isValid =
    /^((19|20)\d\d)[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])\s([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])/.test(
      time
    );
  return isValid;
}

function validatePosInt(num) {
  return num % 1 === 0 && num > 0;
}

const getUserListByTotalAmount = async (req, res) => {
  const { startDate, endDate } = req.query;
  const topXUsers = Number(req.query.topXUsers);
  if (
    !validateDateHhMm(startDate) ||
    !validateDateHhMm(endDate) ||
    !validatePosInt(topXUsers)
  ) {
    return res.status(400).send({ error: "you key the wrong paramaters!" });
  }
  const result = await User.getUserListByTotalAmount(
    startDate,
    endDate,
    topXUsers
  );
  const userListByTotalAmount = result.map((element) => element.user_name);
  res.status(200).send({ userList: userListByTotalAmount });
};

module.exports = { getUserListByTotalAmount };
