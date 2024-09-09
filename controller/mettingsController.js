const getConnection = require("../db");
const transformEvents = require("../transformData/transformEvents");

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
const deleteEvent = async (req, res) => {
  const { id } = req.body;
  const connection = await getConnection();
  try {
    await connection.execute("CALL DeleteEvent(?)", [id]);
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured in the backend" });
  } finally {
    (await connection).end();
  }
};
const updateEvent = async (req, res) => {
  const { id, start, end } = req.body;
  const connection = await getConnection();
  try {
    await connection.execute("CALL UpdateEvent(?, ?, ?)", [id, start, end]);
    res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured in the backend" });
  } finally {
    (await connection).end();
  }
};
const todaysEventList = async (req, res) => {
  const connection = await getConnection();
  try {
    const [eventData] = await connection.execute("CALL GetTodayEvents()");
    const data = eventData[0];
    const result = transformEvents(data);

    res.status(200).json({ result: result, message: "successfully fetched" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured in the backend" });
  } finally {
    (await connection).end();
  }
};
module.exports = {
  getAll,
  createEvent,
  deleteEvent,
  todaysEventList,
  updateEvent,
};
