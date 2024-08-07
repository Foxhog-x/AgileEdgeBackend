const db_con = require(".././db");
const passwordHelp = require(".././helpers/hashPasswordHelper");
const getConnection = require("../db");
const createAdmin = async (req, res) => {
  const { email, password, username, organization, type } = req.body;
  const connection = getConnection();
  const resultPassword = await passwordHelp.createHashpassword(password);
  try {
    const [result] = await connection.execute(
      "INSERT INTO user(email, password, username, organization, type) values(?, ?, ?, ?, ?)",
      [email, password, username, organization, type]
    );

    console.log(result);
  } catch (error) {
    if (error) res.json({ error: "error Occured in backend" });
  }
};

module.exports = { createAdmin };
