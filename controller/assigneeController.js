const getConnection = require("../db");

const getAssignee = async (req, res) => {
  const { cardId } = req.body;
  const connection = await getConnection();
  try {
    [result] = await connection.execute("CALL GetAssigneesByCardId(?)", [
      cardId,
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occured" });
  } finally {
    connection.end();
  }
};
const addAssignee = (req, res) => {};

module.exports = {
  getAssignee,
  addAssignee,
};
