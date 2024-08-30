const getConnection = require("../db");

const getTaskProgress = async (req, res) => {
  const connection = await getConnection();
  try {
    const [result] = await connection.execute("CALL GetTaskProgress()");
    res
      .status(200)
      .json({ result: result[0], message: "successfully fetched" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error occured progress" });
  }
};

const getAnalytics = async (req, res) => {
  const connection = await getConnection();
  try {
    const [numberOfTaskByColumn] = await connection.execute(
      "CALL GetNumberOfTaskByColumn()"
    );

    const [countByPriority] = await connection.execute(
      "CALL GetTaskCountByPriority()"
    );

    const [taskCountsByMember] = await connection.execute(
      "CALL GetTaskCountsByMember()"
    );

    res.status(200).json({
      numberOfTaskByColumn: numberOfTaskByColumn[0],
      countByPriority: countByPriority[0],
      taskCountsByMember: taskCountsByMember[0],
      message: "successfully fetched",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error occured progress" });
  }
};

module.exports = {
  getTaskProgress,
  getAnalytics,
};
