const getConnection = require("../db");
const getComments = async (req, res) => {
  const { cardId } = req.body;
  const connection = await getConnection();
  try {
    const [result] = await connection.execute("CALL GetComments(?)", [cardId]);
    res.status(200).json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured in the backend" });
  } finally {
    connection.end();
  }
};

module.exports = { getComments };
