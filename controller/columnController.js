const mysql = require("mysql2/promise");
const getConnection = require("../db");

const addColumn = async (req, res) => {
  const connection = await getConnection();
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
  const connection = await getConnection();
  try {
    const { sourceColumn_Id, destinationColumn_Id, board_Id } = req.body;

    if (!sourceColumn_Id || !destinationColumn_Id || !board_Id) {
      res.status(409).json({ error: " error occur on passing field" });
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
  const connection = await getConnection();

  try {
    await connection.execute("CALL RemoveColumn(?, ?)", [board_Id, columnId]);
    res.status(200).json({ message: "Succssfully Deleted" });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: "error occur in the backend" });
  }
};

const editColumnName = async (req, res) => {
  const connection = await getConnection();
  try {
    const { columnName, columnId } = req.body;
    console.log(columnId, columnName);
    await connection.execute("CALL EditColumnName(?, ?)", [
      columnId,
      columnName,
    ]);
    res.status(200).json({ message: "Successfully Edited" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occur in the backend" });
  } finally {
  }
};

module.exports = { addColumn, moveColumns, deleteColumn, editColumnName };
