//public board controller

const db_con = require("../db");

const create_board = (req, res) => {
  const { board_name, description, board_type } = req.body;
  const user_id = req.user_id;
  const created_by = req.email;
  function isUndefined(value) {
    const undefined = void 0;
    return value === undefined;
  }

  const resultUndefined = isUndefined(user_id);
  if (resultUndefined) {
    res
      .status(400)
      .json({ message: "You do not have rights to create public boards" });
  } else {
    try {
      db_con.query(
        `INSERT INTO boards(board_name, description, user_id, board_type, created_by) values ("${board_name}", "${description}",${user_id},"${board_type}","${created_by}")`,
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
  }
};

const delete_board = (req, res) => {
  const { board_name, description, board_type } = req.body;
  const user_id = req.user_id;
  const created_by = req.email;
  function isUndefined(value) {
    const undefined = void 0;
    return value === undefined;
  }

  const resultUndefined = isUndefined(user_id);
  if (resultUndefined) {
    res
      .status(400)
      .json({ message: "You do not have rights to create public boards" });
  }
};

const update_board = (req, res) => {
  const user_id = req.user_id;
  const created_by = req.email;
  const { board_id, updatedBoard_name } = req.body;

  function isUndefined(value) {
    const undefined = void 0;
    return value === undefined;
  }

  const resultUndefined = isUndefined(user_id);
  if (resultUndefined) {
    res
      .status(400)
      .json({ message: "You do not have rights to create public boards" });
  } else {
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
  }
};

const fetch_board = (req, res) => {
  const organization = req.organization;
  console.log(organization); //checking the board belonging
  db_con.query(
    `SELECT * FROM boards WHERE board_type = "public" AND organization = "${organization}"`,
    (error, results) => {
      if (error) res.status(401).json({ error });
      if (results) {
        res.json({ results });
      }
    }
  );
};

module.exports = { create_board, delete_board, update_board, fetch_board };
