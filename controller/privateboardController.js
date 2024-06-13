const db_con = require("../db");

//private Board Controllers
const create_board = (req, res) => {
  const { board_name, description, user_id, board_type } = req.body;
  const created_by = req.email;
  const organization = req.organization;
  try {
    db_con.query(
      `INSERT INTO boards(board_name, description, user_id, board_type, created_by, organization) values ("${board_name}", "${description}",${user_id},"${board_type}","${created_by}", "${organization}")`,
      (error, results) => {
        if (error) res.json({ error });
        if (results) {
          console.log(results);
          res.status(201).json({
            success: true,
            message: `successfully created `,
          });
          console.log("successfully created", results.affectedRows);
        }
      }
    );
  } catch (error) {
    if (error) res.status(401).json({ error });
  }
};

const delete_board = (req, res) => {
  const { board_id } = req.body;
  const created_by = req.email;
  console.log(created_by, "createdby");
  try {
    db_con.query(
      `DELETE FROM boards WHERE board_id = ${board_id} AND created_by= "${created_by}"`,
      (error, results) => {
        if (error) res.status(403).json({ error });
        if (results) {
          res.json({ results });
        }
      }
    );
  } catch (error) {
    if (error) res.status(401).json({ error });
  }
};

const update_board = (req, res) => {
  const { board_id, updatedBoard_name } = req.body;
  const created_by = req.email;
  console.log(created_by);
  try {
    db_con.query(
      `UPDATE boards
      SET board_name = '${updatedBoard_name}'
      WHERE board_id = '${board_id}'
      AND created_by = '${created_by}'
      `,
      (error, results) => {
        if (error) res.status(403).json({ error });
        if (results) {
          res.status(201).json({ message: "Successfully Updated" });
          console.log(results.affectedRows);
        }
      }
    );
  } catch (error) {
    if (error) res.status(401).json({ error });
  }
};

const fetch_board = (req, res) => {
  const created_by_email = req.email;
  try {
    db_con.query(
      `SELECT * FROM boards where created_by = "${created_by_email}" and board_type = 'private'`,
      (error, results) => {
        if (error) res.status(401).json({ error });
        if (results) {
          res.status(200).json({ results });
        }
      }
    );
  } catch (error) {
    if (error) res.status(401).json({ error });
  }
};

module.exports = { create_board, delete_board, update_board, fetch_board };
