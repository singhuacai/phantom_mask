var fs = require("fs");

const {
  insertUserInfo,
  checkPharmacyId,
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
      let [result] = await checkPharmacyId(history.pharmacyName);
      const pharmacyId = result.pharmacyId;
      if (pharmacyId === -1) continue;
      let maskInfo = history.maskName;
      let maskInfoArr = maskInfo
        .replaceAll(" (", ",")
        .replaceAll(")", "")
        .split(",");
      maskInfoArr.splice(2, 1, parseInt(maskInfoArr[2]));

      purchaseHistoriesInfo.push([
        userId,
        pharmacyId,
        ...maskInfoArr,
        history.transactionAmount,
        history.transactionDate,
      ]);
    }
    await insertPurchaseHistory(purchaseHistoriesInfo);
  }
});
