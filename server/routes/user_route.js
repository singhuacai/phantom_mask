const router = require("express").Router();
const { wrapAsync } = require("../../util/util");

const {
  getUserListByTotalAmount,
  purchaseMask,
} = require("../controllers/user_controller");

router
  .route("/user/listByTotalAmount")
  .get(wrapAsync(getUserListByTotalAmount));

router.route("/user/purchaseMask").post(wrapAsync(purchaseMask));
module.exports = router;
