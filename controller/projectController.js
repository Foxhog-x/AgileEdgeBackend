const mysql = require("mysql2/promise");

const createProject = (req, res) => {
  async function executeCreateProject(projectName, projectDescription) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "12345",
      database: "agile",
    });

    try {
      await connection.execute("CALL CreateProject(?, ?, @lastProjectId)", [
        projectName,
        projectDescription,
      ]);

      const [rows] = await connection.execute(
        "SELECT @lastProjectId AS lastProjectId"
      );

      const lastProjectId = rows[0].lastProjectId;

      await connection.execute(
        "CALL createBoardByDefault(?, ?, @last_Board_Id )",
        [lastProjectId, projectName]
      );

      const [newRows] = await connection.execute(
        "SELECT @last_Board_Id AS last_board_Id"
      );

      const lastBoardId = newRows[0].last_board_Id;

      const [finalResult] = await connection.execute(
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

const getAllProject = async (req, res) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "agile",
  });

  try {
    const [result] = await connection.execute("CALL GetAllProjects()");

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured on server side" });
  } finally {
    await connection.end();
  }
};

const deleteProject = async (req, res) => {
  const { project_Id } = req.body;
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "agile",
  });
  try {
    await connection.execute("CALL DeleteProject(?)", [project_Id]);

    res.status(200).json({ message: "Project Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error from server Side" });
  } finally {
    connection.end();
  }
};

const editname = async (req, res) => {
  const { project_Id, newProjectName } = req.body;
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "agile",
  });
  try {
    await connection.execute("CALL EditProjectName(?, ?)", [
      project_Id,
      newProjectName,
    ]);

    res.status(200).json({ message: "Project Rename Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error from server Side" });
  } finally {
    connection.end();
  }
};

const getAllContents = async (req, res) => {
  const { project_Id } = req.body;

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "agile",
  });

  try {
    const [result] = await connection.execute("CALL GetBoardIdOfProject(?)", [
      project_Id,
    ]);

    const { board_id } = result[0][0];

    const [fetchAllContentsResult] = await connection.execute(
      "CALL FetchAllBoardDetails(?)",
      [board_id]
    );

    res.status(200).json({ result: fetchAllContentsResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error from server Side" });
  } finally {
    connection.end();
  }
};
module.exports = {
  createProject,
  getAllProject,
  deleteProject,
  editname,
  getAllContents,
};
