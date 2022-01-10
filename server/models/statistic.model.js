const { pool } = require("./mysql");

const getMaskAmountAndTotalTransValue = async (startDate, endDate) => {
  let binding = [startDate, endDate];
  let queryStr = `
  SELECT 
  SUM(BINARY(per_pack_count)) AS 'totalAmountOfMasks', 
  SUM(BINARY(transaction_amount)) AS 'dollarValueOfTransactions'
  FROM purchase_history
  WHERE transaction_date BETWEEN ? AND ?;`;
  const [MaskAmountAndTotalTransValue] = await pool.query(queryStr, binding);
  return MaskAmountAndTotalTransValue;
};

module.exports = { getMaskAmountAndTotalTransValue };
