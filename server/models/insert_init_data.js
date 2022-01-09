const { pool } = require("./mysql");

const insertPharmaciesInfo = async (pharmacyInfo) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("START TRANSACTION");
    const [result] = await conn.query(
      "INSERT INTO pharmacies_info SET ?",
      pharmacyInfo
    );
    await conn.query("COMMIT");
    return result.insertId;
  } catch (error) {
    await conn.query("ROLLBACK");
    console.log(error);
    return error;
  } finally {
    await conn.release();
  }
};

const insertOpenAndMaskInfo = async (
  openingDayHoursInfo,
  pharmacyMasksInfo
) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("START TRANSACTION");
    await conn.query(
      "INSERT INTO pharmacies_open_hours (pharmacy_id ,opening_day,opening_start,opening_end) VALUES ?",
      [openingDayHoursInfo]
    );
    await conn.query(
      "INSERT INTO pharmacies_mask (pharmacy_id ,mask_name,mask_color,per_pack_count, mask_price) VALUES ?",
      [pharmacyMasksInfo]
    );
    await conn.query("COMMIT");
    return;
  } catch (error) {
    await conn.query("ROLLBACK");
    console.log(error);
    return error;
  } finally {
    await conn.release();
  }
};

module.exports = {
  insertPharmaciesInfo,
  insertOpenAndMaskInfo,
};