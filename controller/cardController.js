const mysql = require("mysql2/promise");
const createCard = (req, res) => {
  res.json({ data: req.body });
};

const deleteCard = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const updateCard = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const fetchCard = (req, res) => {
  async function executeCreateProject(projectName, projectDescription) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "12345",
      database: "agile",
    });

    try {
      await connection.query("CALL CreateProject(?, ?, @lastProjectId)", [
        projectName,
        projectDescription,
      ]);

      const [rows] = await connection.query(
        "SELECT @lastProjectId AS lastProjectId"
      );

      const lastProjectId = rows[0].lastProjectId;

      await connection.query(
        "CALL createBoardByDefault(?, ?, @last_Board_Id )",
        [lastProjectId, projectName]
      );

      const [newRows] = await connection.query(
        "SELECT @last_Board_Id AS last_board_Id"
      );

      const lastBoardId = newRows[0].last_board_Id;

      const [finalResult] = await connection.query(
        "CALL FetchAllBoardDetails(?)",
        [lastBoardId]
      );
      console.log(finalResult);
      res.json({ result: finalResult });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await connection.end();
    }
  }

  const { projectName, projectDescription } = req.body;
  if (projectDescription === null || undefined || "") {
    executeCreateProject(projectName, "Description not available");
  } else {
    executeCreateProject(projectName, projectDescription);
  }
};

module.exports = { createCard, deleteCard, updateCard, fetchCard };
