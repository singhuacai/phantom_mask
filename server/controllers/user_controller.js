const User = require("../models/user.model");
const { validateDateHhMm } = require("../../util/util");

function validatePosInt(num) {
  return num % 1 === 0 && num > 0;
}

const getUserListByTotalAmount = async (req, res) => {
  const { startDate, endDate } = req.query;
  const topXUsers = Number(req.query.topXUsers);
  if (!startDate || !endDate || !topXUsers) {
    return res.status(400).send({
      error: "startDate, endDate and topXUsers parameters are required!",
    });
  }
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

const purchaseMask = async (req, res) => {
  let { userId, pharmacyName, mask } = req.body;
  if (!userId || !pharmacyName || !mask) {
    return res.status(400).send({
      error: "userId, pharmacyName and mask parameters are required!",
    });
  }
  let maskArr = mask.replaceAll(" (", ",").replaceAll(")", "").split(",");
  maskArr.splice(2, 1, parseInt(maskArr[2]));
  const maskName = maskArr[0];
  const maskColor = maskArr[1];
  const perPackCount = maskArr[2];
  const result = await User.purchaseMask(
    userId,
    pharmacyName,
    maskName,
    maskColor,
    perPackCount
  );
  if (result.error || !result) {
    return res.status(400).send({ error: result.error });
  }
  res.status(200).send({ pharchaseId: result });
};

module.exports = { getUserListByTotalAmount, purchaseMask };
