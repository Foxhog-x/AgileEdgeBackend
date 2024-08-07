require("dotenv/config");
const getConnection = require("../db");
const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_PRIVATE_KEY;

const createMember = async (req, res) => {
  const { memberName, email, memberPassword, roleType } = req.body;
  const connection = await getConnection();

  try {
    await connection.execute("CALL CreateMember(?, ?, ?, ?)", [
      memberName,
      email,
      memberPassword,
      roleType,
    ]);

    res.status(201).json({ success: true, message: "Created Succssfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occured in backend" });
  } finally {
    connection.end();
  }
};

const memberLoign = async (req, res) => {
  const { memberEmail, memberPassword } = req.body;
  const connection = await getConnection();
  try {
    const [result] = await connection.execute("CALL FindMemberEmail(?, ?)", [
      memberEmail,
      memberPassword,
    ]);
    if (result[0].length) {
      const token = await jwt.sign(result[0][0], privateKey);
      if (token) {
        res.status(200).json({ message: "login successfully", token: token });
      } else {
        res.status(500).json({ message: "error with signing" });
      }
    } else {
      res.status(403).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occured in backend" });
  } finally {
    connection.end();
  }
};
module.exports = { createMember, memberLoign };
