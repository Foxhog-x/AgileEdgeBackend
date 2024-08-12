const getConnection = require("../db");

const fetchOnline = async (req, res) => {
  const connection = await getConnection();
  try {
    const [result] = await connection.execute("CALL FetchOnlineUsers()");
    data = result[0][0];
    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occured while fetch online" });
  } finally {
    connection.end();
  }
};
module.exports = { fetchOnline };
