const router = require("express").Router();
const { wrapAsync } = require("../../util/util");

const { getUserListByTotalAmount } = require("../controllers/user_controller");

router
  .route("/user/listByTotalAmount")
  .get(wrapAsync(getUserListByTotalAmount));

module.exports = router;
