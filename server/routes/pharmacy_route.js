const router = require("express").Router();
const { wrapAsync } = require("../../util/util");
const {
  getOpeningPharmacies,
  getMasksByPharmacy,
} = require("../controllers/pharmacy_controller");

router.route("/pharmacy").get(wrapAsync(getOpeningPharmacies));
router.route("/pharmacy/masksList").get(wrapAsync(getMasksByPharmacy));

module.exports = router;
