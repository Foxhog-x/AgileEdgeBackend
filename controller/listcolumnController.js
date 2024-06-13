const db_con = require("../db");

const createList = (req, res) => {
  const { board_id, column_name, position } = req.body;
  db_con.query(
    `INSERT INTO column_lists(board_id, column_name, position) values (${board_id}, "${column_name}", "${position}")`,
    (error, results) => {
      if (error) res.status(403).json({ error });
      if (results) {
        res.json({ results });
      }
    }
  );
};

const deleteList = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const fetchList = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

module.exports = { createList, deleteList, fetchList };
