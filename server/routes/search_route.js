const router = require("express").Router();
const { wrapAsync } = require("../../util/util");

const { searchByPharmacyOrMask } = require("../controllers/search_controller");

router.route("/search").get(wrapAsync(searchByPharmacyOrMask));

module.exports = router;
