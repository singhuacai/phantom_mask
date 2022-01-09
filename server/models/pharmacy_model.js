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

module.exports = {
  getOpeningPharmacies,
};
