const router = require("express").Router();
const { wrapAsync } = require("../../util/util");
const {
  getOpeningPharmacies,
  getMasksByPharmacy,
  getPharmaciesByMaskPrice,
} = require("../controllers/pharmacy_controller");

router
  .route("/pharmacy/listByOpeningHours")
  .get(wrapAsync(getOpeningPharmacies));
router.route("/pharmacy/masksList").get(wrapAsync(getMasksByPharmacy));
router
  .route("/pharmacy/listByPriceRange")
  .get(wrapAsync(getPharmaciesByMaskPrice));

module.exports = router;
