require("dotenv").config({ path: "../.env" });
const mysql = require("mysql2/promise");
const env = process.env.NODE_ENV || "development";
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const mysqlConfig = {
  production: {
    // for EC2 machine
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
  development: {
    // for localhost development
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
};

let mysqlEnv = mysqlConfig[env];
const pool = mysql.createPool(mysqlEnv);

module.exports = {
  mysql,
  pool,
};
