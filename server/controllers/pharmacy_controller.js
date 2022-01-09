const Pharmacy = require("../models/pharmacy_model");

function validateHhMm(time) {
  var isValid = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);
  return isValid;
}

const getOpeningPharmacies = async (req, res) => {
  const { specificDay, specificTime } = req.query;
  const dayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  if (specificDay && !dayArr.includes(specificDay)) {
    return res.status(400).send({ error: "you key the wrong day!" });
  }
  if (specificTime && !validateHhMm(specificTime)) {
    return res.status(400).send({ error: "you key the wrong time!" });
  }

  const result = await Pharmacy.getOpeningPharmacies(specificDay, specificTime);
  openingPharmacies = result.map((pharmacy) => pharmacy.pharmacy_name);

  res.status(200).send({ openingPharmacies });
};

const getMasksByPharmacy = async (req, res) => {
  const { pharmacy, sortby, desc } = req.query;
  if (!pharmacy || !sortby || !desc) {
    return res
      .status(400)
      .send({ error: "pharmacy, sortby and desc parameters are required!" });
  }
  if (sortby !== "mask_name" && sortby !== "mask_price") {
    return res.status(400).send({ error: "you key the wrong sortby!" });
  }
  if (desc !== "false" && desc !== "true") {
    return res.status(400).send({ error: "you key the wrong status!" });
  }
  const result = await Pharmacy.getMasksByPharmacy(pharmacy, sortby, desc);
  const masksList = result.map((item) => {
    return {
      name: `${item.mask_name} (${item.mask_color}) (${item.per_pack_count} per pack)`,
      price: item.mask_price,
    };
  });
  res.status(200).send({ masksList });
};

module.exports = {
  getOpeningPharmacies,
  getMasksByPharmacy,
};
