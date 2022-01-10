const User = require("../models/user.model");
const { validateDateHhMm } = require("../../util/util");

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
