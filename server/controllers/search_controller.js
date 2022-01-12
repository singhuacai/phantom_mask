const Search = require("../models/search_model");

const searchByPharmacyOrMask = async (req, res) => {
  if (!req.query.keyword) {
    return res.status(400).send({ error: "keyword is required!" });
  }
  const keyword = req.query.keyword.trim();
  const result = await Search.searchByPharmacyOrMask(keyword);
  let pharmacy = [];
  let mask = [];
  for (let item of result) {
    let obj = {};
    if (item.type === "pharmacy") {
      obj.pharmacyId = item.id;
      obj.pharmacyName = item.pharmacyName;
      pharmacy.push(obj);
    } else if (item.type === "mask") {
      obj.pharmacyMaskId = item.id;
      obj.pharmacyName = item.pharmacyName;
      obj.maskName = item.maskName;
      obj.maskPrice = item.maskPrice;
      mask.push(obj);
    }
  }
  let searchResult = { pharmacy, mask };
  res.status(200).send({ searchResult });
};
module.exports = { searchByPharmacyOrMask };
