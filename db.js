const mysql = require("mysql2/promise");

const getConnection = async () => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agile",
  });
};

module.exports = getConnection;
