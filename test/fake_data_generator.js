require("dotenv").config();
const { NODE_ENV } = process.env;
const { pool } = require("../server/models/mysql");
const {
  pharmacies_info,
  opening_hour,
  mask,
  user,
  purchase_history,
} = require("./fake_data");

async function _createFakePharmaciesInfo(conn) {
  return await conn.query(
    "INSERT INTO pharmacies_info (name, cash_balance) VALUES ?",
    [pharmacies_info.map((x) => Object.values(x))]
  );
}

async function _createFakeOpenHours(conn) {
  return await conn.query(
    "INSERT INTO pharmacies_open_hours (pharmacy_id, opening_day, opening_start, opening_end) VALUES ?",
    [opening_hour.map((x) => Object.values(x))]
  );
}

async function _createFakeMask(conn) {
  return await conn.query(
    "INSERT INTO pharmacies_mask (pharmacy_id, mask_name, mask_color, per_pack_count, mask_price) VALUES ?",
    [mask.map((x) => Object.values(x))]
  );
}

async function _createFakeUser(conn) {
  return await conn.query(
    "INSERT INTO user (user_name, user_cash_balance) VALUES ?",
    [user.map((x) => Object.values(x))]
  );
}

async function _createFakePurchaseHistory(conn) {
  return await conn.query(
    "INSERT INTO purchase_history (user_id, pharmacy_id, mask_name, mask_color, per_pack_count, transaction_amount, transaction_date) VALUES ?",
    [purchase_history.map((x) => Object.values(x))]
  );
}

async function createFakeData() {
  if (NODE_ENV !== "test") {
    console.log("Not in test env");
    return;
  }
  const conn = await pool.getConnection();
  await conn.query("START TRANSACTION");
  await conn.query("SET FOREIGN_KEY_CHECKS = ?", 0);
  await _createFakePharmaciesInfo(conn);
  await _createFakeOpenHours(conn);
  await _createFakeMask(conn);
  await _createFakeUser(conn);
  await _createFakePurchaseHistory(conn);
  await conn.query("SET FOREIGN_KEY_CHECKS = ?", 1);
  await conn.query("COMMIT");
  await conn.release();
}

async function truncateFakeData() {
  if (NODE_ENV !== "test") {
    console.log("Not in test env");
    return;
  }

  const truncateTable = async (table) => {
    const conn = await pool.getConnection();
    await conn.query("START TRANSACTION");
    await conn.query("SET FOREIGN_KEY_CHECKS = ?", 0);
    await conn.query(`TRUNCATE TABLE ${table}`);
    await conn.query("SET FOREIGN_KEY_CHECKS = ?", 1);
    await conn.query("COMMIT");
    await conn.release();
    return;
  };

  const tables = [
    "pharmacies_info",
    "pharmacies_open_hours",
    "pharmacies_mask",
    "user",
    "purchase_history",
  ];
  for (let table of tables) {
    await truncateTable(table);
  }

  return;
}

async function closeConnection() {
  return await pool.end();
}

async function main() {
  await truncateFakeData();
  await createFakeData();
  await closeConnection();
}

// execute when called directly.
if (require.main === module) {
  main();
}

module.exports = {
  createFakeData,
  truncateFakeData,
  closeConnection,
};
