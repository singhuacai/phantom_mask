const router = require("express").Router();
const { wrapAsync } = require("../../util/util");

const {
  getMaskAmountAndTotalTransValue,
} = require("../controllers/statistic_controller");

router
  .route("/statistic/maskAmountAndTotalTransValue")
  .get(wrapAsync(getMaskAmountAndTotalTransValue));

module.exports = router;
