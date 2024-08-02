const mysql = require("mysql2/promise");

const MoveColumns = async (req, res) => {
  // 12, 14
  try {
    const { sourceColumn_Id, destinationColumn_Id, board_Id } = req.body;

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "12345",
      database: "agile",
    });
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

module.exports = { MoveColumns };
