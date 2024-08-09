const getConnection = require("../db");

const getAll = async (req, res) => {
  const connection = await getConnection();
  try {
    const [result] = await connection.execute("CALL GetAllEvents");

    const data = result[0];
    res.status(200).json({ result: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured in the backend" });
  } finally {
    (await connection).end();
  }
};

const createEvent = async (req, res) => {
  const { title, start, end } = req.body;
  const connection = await getConnection();
  try {
    const [result] = await connection.execute("CALL CreateEvent(?, ?, ?)", [
      title,
      start,
      end,
    ]);

    res.status(200).json({ message: "Successfully Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured in the backend" });
  } finally {
    (await connection).end();
  }
};
module.exports = { getAll, createEvent };
