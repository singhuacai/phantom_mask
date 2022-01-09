const router = require("express").Router();
const { wrapAsync } = require("../../util/util");
const { getOpeningPharmacies } = require("../controllers/pharmacy_controller");

router.route("/pharmacy").get(wrapAsync(getOpeningPharmacies));

module.exports = router;
