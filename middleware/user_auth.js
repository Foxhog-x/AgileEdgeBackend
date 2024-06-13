const privateKeyjwt = "wwpbr";
const jwt = require("jsonwebtoken");
const db_con = require("../db");
const user_auth = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    req.token = token;
    jwt.verify(token, privateKeyjwt, (err, authorizedData) => {
      if (err) {
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        const email = authorizedData.email;
        db_con.query(
          `SELECT user_id AS user_id, email, organization, type, 'users' AS source
          FROM users
          WHERE email = '${email}' AND type = 'admin'
          UNION
          SELECT member_id AS member_id, email, organization, type, 'members' AS source
          FROM members
          WHERE email = '${email}' AND type = 'regular'; `,
          (error, results) => {
            if (error) {
              console.log("ERROR: Could not connect to the protected route");
              res.json({ error });
            }
            if (results) {
              console.log(results);
              if (results[0]?.source === "users") {
                req.user_id = results[0]?.user_id;
                req.email = results[0]?.email;
                req.organization = results[0].organization;
                req.type = results[0]?.type;
                next();
              } else {
                if (results[0]?.source === "members") {
                  req.member_id = results[0]?.user_id;
                  req.email = results[0]?.email;
                  req.organization = results[0]?.organization;
                  req.type = results[0]?.type;
                  next();
                }
              }
            }
          }
        );
        console.log("SUCCESS: Connected to protected route");
      }
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = user_auth;
