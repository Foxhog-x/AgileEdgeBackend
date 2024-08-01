const mysql = require("mysql2");
function getConnection() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "agile",
  });
  return connection;
}
module.exports = getConnection;
