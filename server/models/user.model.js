const { pool } = require("./mysql");
const moment = require("moment");

const getUserListByTotalAmount = async (startDate, endDate, topXUsers) => {
  let binding = [startDate, endDate, topXUsers];
  let queryStr = `
  SELECT user.user_name
  FROM user 
  INNER JOIN purchase_history ph
    ON user.id =ph.user_id 
  WHERE ph.transaction_date BETWEEN ? AND ?
  GROUP BY user.user_name
  ORDER BY sum(ph.transaction_amount) DESC
  limit ?;`;
  const [userListByTotalAmount] = await pool.query(queryStr, binding);
  return userListByTotalAmount;
};

const purchaseMask = async (
  userId,
  pharmacyName,
  maskName,
  maskColor,
  perPackCount
) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("START TRANSACTION");
    // 1. check the pharmacyName, maskName, maskColor, perPackCount
    let queryStr = `
    SELECT pi2.id AS pharmacyId, pi2.cash_balance AS pharmacyCashBalance, pm.mask_price AS maskPrice
    FROM pharmacies_info pi2 
    INNER JOIN pharmacies_mask pm 
      ON pi2.id = pm.pharmacy_id 
    WHERE pi2.name = ? AND pm.mask_name = ? AND pm.mask_color = ? AND pm.per_pack_count = ?;`;
    let bindings = [pharmacyName, maskName, maskColor, perPackCount];
    let [result] = await conn.query(queryStr, bindings);
    if (result.length === 0) {
      await conn.query("ROLLBACK");
      return { error: "you key the wrong paramaters!" };
    }
    let { pharmacyId, pharmacyCashBalance, maskPrice } = result[0];

    // 2. check the user cash balance
    [result] = await conn.query(
      `SELECT user_cash_balance AS userCashBalance FROM user WHERE id = ?;`,
      [userId]
    );
    let { userCashBalance } = result[0];
    if (userCashBalance < maskPrice) {
      await conn.query("ROLLBACK");
      return { error: "Insufficient balance" };
    }

    // 3. update the user cash balance
    userCashBalance -= maskPrice;
    await conn.query("UPDATE user SET user_cash_balance = ? WHERE id = ?", [
      userCashBalance,
      userId,
    ]);

    // 4. update the pharmacy cash balance
    pharmacyCashBalance += maskPrice;
    await conn.query(
      "UPDATE pharmacies_info SET cash_balance = ? WHERE id = ?",
      [pharmacyCashBalance, pharmacyId]
    );

    // 5. add the purchase history
    const transactionDate = moment().format("YYYY-MM-DD HH:mm:ss");
    queryStr = "INSERT INTO purchase_history SET ?";
    bindings = {
      user_id: userId,
      pharmacy_id: pharmacyId,
      mask_name: maskName,
      mask_color: maskColor,
      per_pack_count: perPackCount,
      transaction_amount: maskPrice,
      transaction_date: transactionDate,
    };

    [result] = await conn.query(queryStr, bindings);
    await conn.query("COMMIT");
    return result.insertId;
  } catch (error) {
    await conn.query("ROLLBACK");
    console.log(error);
    return -1;
  } finally {
    await conn.release();
  }
};

module.exports = { getUserListByTotalAmount, purchaseMask };
