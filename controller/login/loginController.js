const db_con = require("../../db");
const passwordHelp = require("../../helpers/hashPasswordHelper");
const jwt = require("jsonwebtoken");
const privateKeyjwt = "wwpbr";
const login = async (req, res) => {
  const { email, password } = req.body;

  db_con.query(
    `SELECT password From users WHERE email ="${email}"`,
    async (error, results) => {
      if (error) res.json({ sqlError: error });
      if (results) {
        const encryptedHashPassword = results[0]?.password;

        const compareResult = await passwordHelp.descriptHashPassword(
          password,
          encryptedHashPassword
        );

        console.log(compareResult);
        if (compareResult) {
          const userObj = {
            email,
          };
          try {
            jwt.sign(
              userObj,
              privateKeyjwt,
              { expiresIn: "360h" },
              (error, token) => {
                if (error) console.log(error);
                res.json({
                  success: true,
                  message: "login successfull",
                  token,
                });
              }
            );
          } catch (error) {
            if (error) res.json({ error });
          }
        } else {
          res.json({ success: false, message: "login unsuccessfull" });
        }
      }
    }
  );
};

const memberLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    db_con.query(
      `SELECT * FROM members where email = "${email}"`,
      async (error, results) => {
        if (error) res.json(error);
        if (results) {
          const hashPassword = results[0]?.password;
          const resultPassword = await passwordHelp.descriptHashPassword(
            password,
            hashPassword
          );
          console.log(resultPassword);
          if (resultPassword === true) {
            const memberObj = {
              email: email,
            };
            jwt.sign(memberObj, privateKeyjwt, (error, token) => {
              if (error) res.json({ error });
              if (token) {
                res
                  .status(200)
                  .json({ success: true, message: "login Successful", token });
              }
            });
          } else {
            res
              .status(400)
              .json({ success: false, message: "login unsuccessful" });
          }
        }
      }
    );
  } catch (error) {
    if (error) res.status(401);
  }
};

module.exports = { login, memberLogin };
