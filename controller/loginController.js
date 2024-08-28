require("dotenv/config");
const getConnection = require("../db");
const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_PRIVATE_KEY;

const createMember = async (req, res) => {
  const { firstName, lastName, memberName, email, password } = req.body;
  const roleType = "regular"; //default regular set for the time being later we change
  const connection = await getConnection();
  console.log(firstName, lastName, memberName, email, password);
  try {
    await connection.execute("CALL CreateMember(?, ?, ?, ?, ?, ?)", [
      firstName,
      lastName,
      memberName,
      email,
      password,
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
  const { email, password } = req.body;
  const connection = await getConnection();
  try {
    if (email === undefined || password === undefined) {
      throw new Error("Email or password is undefined");
    }
    const [result] = await connection.execute("CALL FindMemberEmail(?, ?)", [
      email,
      password,
    ]);
    if (result[0].length) {
      const token = await jwt.sign(result[0][0], privateKey);

      if (token) {
        console.log(token);
        try {
          const [result] = await connection.execute("call getAllMembers()");
          res
            .status(200)
            .json({ message: "login successfully", token: token, result });
        } catch (error) {
          console.log(error);
        }
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
