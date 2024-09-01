const getConnection = require("../db");

const addContent = async (req, res) => {
  const { cardId, newQuillValues } = req.body;
  const connection = await getConnection();

  try {
    await connection.execute("Call ReactQuillSave(?, ?)", [
      cardId,
      newQuillValues,
    ]);
    res.status(201).json({ message: "sccessfully saved " });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error occured while saving quill content" });
  } finally {
    connection.end();
  }
};

const getQuillData = async (req, res) => {
  const { cardId } = req.body;

  const connection = await getConnection();
  try {
    const [result] = await connection.execute("Call GetQuillData(?)", [cardId]);
    res.status(201).json({ result: result[0], message: "sccessfully saved " });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error occured while fetching quill content" });
  } finally {
    await connection.end();
  }
};

module.exports = { addContent, getQuillData };
