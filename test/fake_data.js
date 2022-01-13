const pharmacies_info = [
  {
    name: "Better You",
    cash_balance: 100,
  },
  {
    name: "Cash Saver Pharmacy",
    cash_balance: 200,
  },
  {
    name: "PrecisionMed",
    cash_balance: 300,
  },
  {
    name: "MedSavvy",
    cash_balance: 400,
  },
  {
    name: "Pill Pack",
    cash_balance: 500,
  },
];

const opening_hour = [
  {
    pharmacy_id: 1,
    opening_day: "Mon",
    opening_start: "06:00:00",
    opening_end: "10:00:00",
  },
  {
    pharmacy_id: 1,
    opening_day: "Tue",
    opening_start: "06:00:00",
    opening_end: "12:00:00",
  },
  {
    pharmacy_id: 1,
    opening_day: "Wed",
    opening_start: "06:00:00",
    opening_end: "14:00:00",
  },
  {
    pharmacy_id: 1,
    opening_day: "Fri",
    opening_start: "06:00:00",
    opening_end: "16:00:00",
  },
  {
    pharmacy_id: 1,
    opening_day: "Sun",
    opening_start: "06:00:00",
    opening_end: "18:00:00",
  },
  {
    pharmacy_id: 2,
    opening_day: "Mon",
    opening_start: "08:00:00",
    opening_end: "12:00:00",
  },
  {
    pharmacy_id: 2,
    opening_day: "Tue",
    opening_start: "08:00:00",
    opening_end: "14:00:00",
  },
  {
    pharmacy_id: 2,
    opening_day: "Fri",
    opening_start: "08:00:00",
    opening_end: "16:00:00",
  },
  {
    pharmacy_id: 2,
    opening_day: "Sat",
    opening_start: "08:00:00",
    opening_end: "18:00:00",
  },
  {
    pharmacy_id: 2,
    opening_day: "Sun",
    opening_start: "08:00:00",
    opening_end: "20:00:00",
  },
  {
    pharmacy_id: 3,
    opening_day: "Tue",
    opening_start: "10:00:00",
    opening_end: "14:00:00",
  },
  {
    pharmacy_id: 3,
    opening_day: "Wed",
    opening_start: "10:00:00",
    opening_end: "16:00:00",
  },
  {
    pharmacy_id: 3,
    opening_day: "Thu",
    opening_start: "10:00:00",
    opening_end: "18:00:00",
  },
  {
    pharmacy_id: 3,
    opening_day: "Fri",
    opening_start: "10:00:00",
    opening_end: "20:00:00",
  },
  {
    pharmacy_id: 3,
    opening_day: "Sun",
    opening_start: "10:00:00",
    opening_end: "22:00:00",
  },
  {
    pharmacy_id: 4,
    opening_day: "Tue",
    opening_start: "12:00:00",
    opening_end: "14:00:00",
  },
  {
    pharmacy_id: 4,
    opening_day: "Wed",
    opening_start: "12:00:00",
    opening_end: "16:00:00",
  },
  {
    pharmacy_id: 4,
    opening_day: "Thu",
    opening_start: "12:00:00",
    opening_end: "18:00:00",
  },
  {
    pharmacy_id: 4,
    opening_day: "Fri",
    opening_start: "12:00:00",
    opening_end: "20:00:00",
  },
  {
    pharmacy_id: 4,
    opening_day: "Sat",
    opening_start: "12:00:00",
    opening_end: "22:00:00",
  },
  {
    pharmacy_id: 5,
    opening_day: "Mon",
    opening_start: "14:00:00",
    opening_end: "18:00:00",
  },
  {
    pharmacy_id: 5,
    opening_day: "Tue",
    opening_start: "14:00:00",
    opening_end: "20:00:00",
  },
  {
    pharmacy_id: 5,
    opening_day: "Wed",
    opening_start: "14:00:00",
    opening_end: "22:00:00",
  },
  {
    pharmacy_id: 5,
    opening_day: "Thu",
    opening_start: "14:00:00",
    opening_end: "23:00:00",
  },
  {
    pharmacy_id: 5,
    opening_day: "Sat",
    opening_start: "14:00:00",
    opening_end: "23:59:59",
  },
];

const mask = [
  {
    pharmacy_id: 1,
    mask_name: "AniMask",
    mask_color: "blue",
    per_pack_count: 10,
    mask_price: 33.65,
  },
  {
    pharmacy_id: 2,
    mask_name: "MaskT",
    mask_color: "black",
    per_pack_count: 10,
    mask_price: 14.9,
  },
  {
    pharmacy_id: 2,
    mask_name: "Free to Roam",
    mask_color: "black",
    per_pack_count: 3,
    mask_price: 13.83,
  },
  {
    pharmacy_id: 2,
    mask_name: "AniMask",
    mask_color: "green",
    per_pack_count: 10,
    mask_price: 49.21,
  },
  {
    pharmacy_id: 3,
    mask_name: "Second Smile",
    mask_color: "blue",
    per_pack_count: 10,
    mask_price: 39.98,
  },
  {
    pharmacy_id: 3,
    mask_name: "Free to Roam",
    mask_color: "green",
    per_pack_count: 3,
    mask_price: 8.83,
  },
  {
    pharmacy_id: 3,
    mask_name: "Masquerade",
    mask_color: "black",
    per_pack_count: 3,
    mask_price: 8.17,
  },
  {
    pharmacy_id: 4,
    mask_name: "Masquerade",
    mask_color: "black",
    per_pack_count: 10,
    mask_price: 19.17,
  },
  {
    pharmacy_id: 4,
    mask_name: "Free to Roam",
    mask_color: "black",
    per_pack_count: 10,
    mask_price: 30.74,
  },
  {
    pharmacy_id: 4,
    mask_name: "MaskT",
    mask_color: "black",
    per_pack_count: 3,
    mask_price: 4.14,
  },
  {
    pharmacy_id: 5,
    mask_name: "MaskT",
    mask_color: "green",
    per_pack_count: 10,
    mask_price: 32.57,
  },
];

const user = [
  {
    user_name: "user1",
    user_cash_balance: 100,
  },
  {
    user_name: "user2",
    user_cash_balance: 100,
  },
  {
    user_name: "user3",
    user_cash_balance: 100,
  },
  {
    user_name: "user4",
    user_cash_balance: 100,
  },
  {
    user_name: "user5",
    user_cash_balance: 100,
  },
];

const purchase_history = [
  {
    user_id: 1,
    pharmacy_id: 1,
    mask_name: "AniMask",
    mask_color: "blue",
    per_pack_count: 10,
    transaction_amount: 33.65,
    transaction_date: "2021-01-02 20:41:02",
  },
  {
    user_id: 2,
    pharmacy_id: 2,
    mask_name: "AniMask",
    mask_color: "green",
    per_pack_count: 10,
    transaction_amount: 49.21,
    transaction_date: "2021-01-04 11:29:05",
  },
  {
    user_id: 3,
    pharmacy_id: 3,
    mask_name: "Second Smile",
    mask_color: "blue",
    per_pack_count: 10,
    transaction_amount: 39.98,
    transaction_date: "2021-01-07 03:49:25",
  },
  {
    user_id: 4,
    pharmacy_id: 5,
    mask_name: "MaskT",
    mask_color: "green",
    per_pack_count: 10,
    transaction_amount: 32.57,
    transaction_date: "2021-01-22 09:27:11",
  },
  {
    user_id: 5,
    ppharmacy_id: 4,
    mask_name: "Free to Roam",
    mask_color: "black",
    per_pack_count: 10,
    transaction_amount: 30.74,
    transaction_date: "2021-01-26 03:41:14",
  },
];

module.exports = {
  pharmacies_info,
  opening_hour,
  mask,
  user,
  purchase_history,
};
