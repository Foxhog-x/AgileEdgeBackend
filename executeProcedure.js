const mysql = require("mysql2/promise");

async function executeCreateProject(projectName, projectDescription) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "agile",
  });

  try {
    console.log(connection);
    const [results] = await connection.query(
      "CALL CreateProject(?, ?, @lastProjectId)",
      [projectName, projectDescription]
    );

    console.log(results);
    // Retrieve the output parameter
    const [rows] = await connection.query(
      "SELECT @lastProjectId AS lastProjectId"
    );

    console.log(rows);
    const lastProjectId = rows[0].lastProjectId;

    console.log("New Project ID:", lastProjectId);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

// Example usage
executeCreateProject("New Project", "Description of the new project");
