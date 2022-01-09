var fs = require("fs");

const {
  insertUserInfo,
  insertPurchaseHistory,
} = require("../server/models/insert_init_data");

fs.readFile("../data/users.json", "utf-8", async (err, data) => {
  if (err) throw err;
  let rawData = JSON.parse(data);
  for (let item of rawData) {
    let userInfo = {
      user_name: item.name,
      user_cash_balance: item.cashBalance,
    };
    let userId = await insertUserInfo(userInfo);

    let purchaseHistories = item.purchaseHistories;
    let purchaseHistoriesInfo = [];
    for (let history of purchaseHistories) {
      purchaseHistoriesInfo.push([
        userId,
        history.pharmacyName,
        history.maskName,
        history.transactionAmount,
        history.transactionDate,
      ]);
    }
    await insertPurchaseHistory(purchaseHistoriesInfo);
  }
});
