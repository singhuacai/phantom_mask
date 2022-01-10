const { pool } = require("./mysql");

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

module.exports = { getUserListByTotalAmount };
