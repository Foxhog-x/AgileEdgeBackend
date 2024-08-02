const mysql = require("mysql2/promise");
const addColumn = async (req, res) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "agile",
  });
  try {
    const { board_Id, columnName } = req.body;
    if (!board_Id || !columnName) {
      res.status(409).json({ message: "argument not found" });
    } else {
      await connection.execute("CALL AddColumnAtEnd(?, ?)", [
        board_Id,
        columnName,
      ]);
      res.status(201).json({ message: "Created Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occured" });
  }
};
const moveColumns = async (req, res) => {
  // 12, 14
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "agile",
  });
  try {
    const { sourceColumn_Id, destinationColumn_Id, board_Id } = req.body;

    if (!sourceColumn_Id || !destinationColumn_Id || !board_Id) {
      res.status(409).json({ error: " erro occur on passing field" });
    } else {
      const getingColposition = await connection.query(
        `SELECT col_position, board_Id From columns where column_id = ?`,
        [sourceColumn_Id]
      );
      const sourceCol_Position = getingColposition[0][0].col_position;

      const gettinColrestult = await connection.query(
        `SELECT col_position From columns where column_id = ?`,
        [destinationColumn_Id]
      );

      const destinationCol_Position = gettinColrestult[0][0].col_position;
      console.log(sourceCol_Position, destinationCol_Position);
      if (sourceCol_Position > destinationCol_Position) {
        await connection.query(
          `UPDATE Columns
                         SET col_position = col_position + 1
                         WHERE board_id = ? AND col_position BETWEEN ? AND ?`,
          [board_Id, destinationCol_Position, sourceCol_Position]
        );

        await connection.query(
          `UPDATE Columns
                         SET col_position = ?
                         WHERE board_id = ? AND column_id = ?`,
          [destinationCol_Position, board_Id, sourceColumn_Id]
        );
      } else {
        await connection.query(
          `UPDATE Columns
                             SET col_position = col_position - 1
                             WHERE board_id = ? AND col_position BETWEEN ? AND ?`,
          [board_Id, sourceCol_Position, destinationCol_Position]
        );

        await connection.query(
          `UPDATE Columns
                             SET col_position = ?
                             WHERE board_id = ? AND column_id = ?`,
          [destinationCol_Position, board_Id, sourceColumn_Id]
        );
      }

      res.json({ message: "Successfully Updated " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Error occur while processing " });
  } finally {
    connection.end();
  }
};

const deleteColumn = async (req, res) => {
  const { board_Id, columnId } = req.body;
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "agile",
  });

  try {
    await connection.execute("CALL RemoveColumn(?, ?)", [board_Id, columnId]);
    res.status(200).json({ message: "Succssfully Deleted" });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: "error occur in the backend" });
  }
};

const editColumn = async (req, res) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "agile",
  });
  try {
    const { column_Id, newColumnName } = req.body;

    if (column_Id === null || newColumnName === null) {
      res
        .status(400)
        .json({ error: "Parameters board_Id and columnId must be defined." });
    } else {
      await connection.query("CALL EditColumnName(?, ?)", [
        column_Id,
        newColumnName,
      ]);
      res.status(200).json({ message: "Succssfully Edited" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occur in the backend" });
  } finally {
    connection.end();
  }
};

module.exports = { addColumn, moveColumns, deleteColumn, editColumn };
