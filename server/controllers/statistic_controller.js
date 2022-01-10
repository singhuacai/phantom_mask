const Statistic = require("../models/statistic.model");
const { validateDateHhMm } = require("../../util/util");

const getMaskAmountAndTotalTransValue = async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!validateDateHhMm(startDate) || !validateDateHhMm(endDate)) {
    return res.status(400).send({ error: "you key the wrong paramaters!" });
  }
  const result = await Statistic.getMaskAmountAndTotalTransValue(
    startDate,
    endDate
  );

  res.status(200).send({ result });
};
module.exports = { getMaskAmountAndTotalTransValue };
