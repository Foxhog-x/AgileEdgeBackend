require("dotenv").config(); // Load environment variables from .env file

const mysql = require("mysql2/promise");

const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "agile",
    waitForConnections: true,
    connectionLimit: 200,
    connectTimeout: 10000,
  });

  return connection;
};

getConnection()
  .then(() => console.log("Connection established successfully"))
  .catch((err) => console.error("Connection failed:", err));

module.exports = getConnection;
