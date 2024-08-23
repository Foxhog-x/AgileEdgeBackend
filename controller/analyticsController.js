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

module.exports = { getTaskProgress };
