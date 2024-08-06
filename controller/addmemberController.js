const getConnection = require(".././db");
const passwordHelp = require("../helpers/hashPasswordHelper");

const addmember = async (req, res) => {
  console.log(req.type);
  const connection = await getConnection();
  try {
    if (req.type === "regular") {
      res.status(403).json({ message: "You do not have right to add members" });
    } else {
      const { user_id, member_name, email, password, organization, type } =
        req.body;
      const resultPassword = await passwordHelp.createHashpassword(password);
      connection.query(
        `insert into members(user_id, member_name, email, password, organization, type) values(${user_id}, "${member_name}", "${email}", "${resultPassword}", "${organization}","${type}")`,
        (error, results) => {
          if (error) res.status(500).json({ success: false, message: error });
          if (results) {
            console.log("successfully memeber created", results.affectedRows);
            res.json({ success: true, message: "Created Successfully " });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured" });
  }
};

module.exports = { addmember };
