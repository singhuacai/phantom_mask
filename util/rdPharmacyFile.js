var fs = require("fs");

fs.readFile("../data/pharmacies.json", "utf-8", function (err, data) {
  if (err) throw err;
  let rawData = JSON.parse(data);
  for (let item of rawData) {
    console.log(item);
    let pharmacyName = item.name;
    let cashBalance = item.cashBalance;
    let pharmacyMasks = item.masks;
    let opening_time = item.openingHours.split("/");
    const new_opening_time = opening_time.map((item) => {
      return item.trim().replaceAll(" - ", "-").replaceAll(", ", ",");
    });
    // console.log(new_opening_time);
    const raw_opening_info = new_opening_time.map((element) => {
      return element.split(" ");
    });
    // console.log(raw_opening_info);
    const opening_info = splitTime(splitDay(raw_opening_info));
    console.log(opening_info);

    // Masks
    for (let i = 0; i < pharmacyMasks.length; i++) {
      //   console.log(pharmacyMasks[i].name);
      const name = pharmacyMasks[i].name;
      const nameArr = name.replaceAll(" (", ",").replaceAll(")", "").split(",");
      nameArr.splice(2, 1, parseInt(nameArr[2]));
      pharmacyMasks[i].name = nameArr;
    }
    console.log(pharmacyMasks);
  }
});

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
      //   console.log(temp_day, start, end, day[start], day[end]);
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
