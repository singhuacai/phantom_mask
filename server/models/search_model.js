const { pool } = require("./mysql");

const searchByPharmacyOrMask = async (keyword) => {
  const binding = [`${keyword}%`, `${keyword}%`];
  let queryStr = `
  SELECT 
    'mask' AS type,
    pm.id,
    pi.name AS pharmacyName,
    CONCAT(pm.mask_name,' (',pm.mask_color,') ','(',pm.per_pack_count,' per_pack_count)') AS maskName,
    pm.mask_price AS 'maskPrice'
  FROM pharmacies_mask pm
  LEFT JOIN pharmacies_info pi
    ON pm.pharmacy_id =pi.id 
  WHERE pm.mask_name like ?
  UNION
  SELECT 
    'pharmacy' AS type,
    id,
    name,
    '-',
    '-'
  FROM pharmacies_info 
  WHERE name like ?
  ORDER BY maskName, pharmacyName;`;
  const [searchResult] = await pool.query(queryStr, binding);
  return searchResult;
};

module.exports = { searchByPharmacyOrMask };
