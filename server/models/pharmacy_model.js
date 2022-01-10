const { pool } = require("./mysql");

const getOpeningPharmacies = async (queryDay, time) => {
  let binding = [];
  let whereArr = [];
  if (queryDay) {
    binding.push(queryDay);
    whereArr.push("poh.opening_day IN (?)");
  }
  if (time) {
    binding.push(time);
    whereArr.push("(? BETWEEN poh.opening_start AND poh.opening_end)");
  }
  let whereStr = whereArr.join(" AND ");
  if (whereStr) whereStr = `WHERE ${whereStr}`;

  const queryStr = `
  SELECT DISTINCT pi.name AS pharmacy_name
  FROM pharmacies_info AS pi
  INNER JOIN pharmacies_open_hours AS poh 
    ON pi.id = poh.pharmacy_id
  ${whereStr};`;
  const [openingPharmacies] = await pool.query(queryStr, binding);
  return openingPharmacies;
};

const getMasksByPharmacy = async (pharmacy, sortby, desc) => {
  let orderByStr = desc ? `${sortby} DESC` : sortby;
  let queryStr = `
    SELECT 
      pm.mask_name,
      pm.mask_color,
      pm.per_pack_count,
      pm.mask_price 
    FROM pharmacies_info AS pi
    INNER JOIN pharmacies_mask AS pm
      ON pi.id = pm.pharmacy_id
    WHERE pi.name = ?
    ORDER BY ${orderByStr};`;
  const binding = [pharmacy];
  const [masksByPharmacy] = await pool.query(queryStr, binding);
  return masksByPharmacy;
};

const getPharmaciesByMaskPrice = async (
  max,
  min,
  perPackCountBasis,
  operator
) => {
  let countLimitStr = `pm.per_pack_count ${operator ? "<" : ">"} ?`;
  let binding = [min, max, perPackCountBasis];
  let queryStr = `
    SELECT DISTINCT psi.name
    FROM pharmacies_info AS psi
    INNER JOIN pharmacies_mask AS pm
      ON psi.id = pm.pharmacy_id
    WHERE (pm.mask_price BETWEEN ? And ?) AND ${countLimitStr};`;
  const [pharmaciesByMaskPrice] = await pool.query(queryStr, binding);
  return pharmaciesByMaskPrice;
};

module.exports = {
  getOpeningPharmacies,
  getMasksByPharmacy,
  getPharmaciesByMaskPrice,
};
