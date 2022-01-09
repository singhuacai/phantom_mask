var fs = require("fs");
const {
  insertPharmaciesInfo,
  insertOpenAndMaskInfo,
} = require("../server/models/insert_init_data");

fs.readFile("../data/pharmacies.json", "utf-8", async (err, data) => {
  if (err) throw err;
  let rawData = JSON.parse(data);
  for (let item of rawData) {
    let pharmacyMasks = item.masks;
    let pharmacyInfo = {
      name: item.name,
      cash_balance: item.cashBalance,
    };

    let pharmacyId = await insertPharmaciesInfo(pharmacyInfo);

    // open_date_hour
    const openingDayHours = transDayHours(item.openingHours);
    let openingDayHoursInfo = [];
    for (let element of openingDayHours) {
      let dayArr = element[0];
      let openingStart = element[1][0];
      let openingEnd = element[1][1];
      for (let day of dayArr) {
        openingDayHoursInfo.push([pharmacyId, day, openingStart, openingEnd]);
      }
    }

    // Masks
    let pharmacyMasksInfo = [];
    for (let i = 0; i < pharmacyMasks.length; i++) {
      const name = pharmacyMasks[i].name;
      const nameArr = name.replaceAll(" (", ",").replaceAll(")", "").split(",");
      nameArr.splice(2, 1, parseInt(nameArr[2]));
      pharmacyMasks[i].name = nameArr;
    }
    for (let item of pharmacyMasks) {
      pharmacyMasksInfo.push([pharmacyId, ...item.name, item.price]);
    }
    await insertOpenAndMaskInfo(openingDayHoursInfo, pharmacyMasksInfo);
  }
});

function transDayHours(openingHours) {
  const openingHoursArr = openingHours.split("/").map((element) => {
    return element.trim().replaceAll(" - ", "-").replaceAll(", ", ",");
  });
  const rawOpeningDayHours = openingHoursArr.map((element) => {
    return element.split(" ");
  });
  const openingDayHours = splitTime(splitDay(rawOpeningDayHours));
  return openingDayHours;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function splitDay(raw_opening_info) {
  const day = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
  return raw_opening_info.map((element) => {
    let arr_day = [];
    if (element[0].includes("-")) {
      let temp_day = element[0].split("-");
      let start = temp_day[0];
      let end = temp_day[1];
      let result = [];
      for (let i = day[start]; i <= day[end]; i++) {
        result.push(getKeyByValue(day, i));
      }
      arr_day = result;
    } else {
      arr_day = element[0].split(",");
    }
    return [arr_day, element[1]];
  });
}

function splitTime(opening_info) {
  return opening_info.map((element) => {
    return [element[0], element[1].split("-")];
  });
}
