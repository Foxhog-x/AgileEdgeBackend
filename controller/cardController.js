const getConnection = require("../db");

const createCard = async (req, res) => {
  const { columnId, cardName, cardDescription, endDate, cardPriority } =
    req.body;
  const connection = await getConnection();
  try {
    await connection.execute("Call AddCardAtEnd(?,?,?,?,?)", [
      columnId,
      cardName,
      cardDescription,
      endDate,
      cardPriority,
    ]);
    res.status(201).json({ message: "Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occoured" });
  } finally {
    connection.end();
  }
};

const deleteCard = async (req, res) => {
  const { card_Id } = req.body;
  const connection = await getConnection();
  try {
    await connection.execute("CALL DeleteCard(?)", [card_Id]);
    res.status(201).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occoured" });
  } finally {
    connection.end();
  }
};

const editCardTitle = async (req, res) => {
  const { card_Id, newCardName } = req.body;

  const connection = await getConnection();
  try {
    await connection.execute("CALL EditCardTitle(?, ?)", [
      card_Id,
      newCardName,
    ]);
    res.status(201).json({ message: "Edited Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occoured" });
  } finally {
    connection.end();
  }
};

const moveCardExternal = async (req, res) => {
  const { sourcecard_Id, destinationCard_Id, destinationColumn_ID } = req.body;
  const connection = await getConnection();
  try {
    await connection.execute("CALL MoveCardExternal(?, ?, ?)", [
      sourcecard_Id,
      destinationCard_Id,
      destinationColumn_ID,
    ]);
    res.status(200).json({ message: "Update Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occoured" });
  } finally {
    connection.end();
  }
};

const moveCardInternal = async (req, res) => {
  const { columnId, sourcecard_Id, destinationCard_Id } = req.body;
  const connection = await getConnection();
  try {
    await connection.execute("CALL MoveCardInside(?, ?, ?)", [
      columnId,
      sourcecard_Id,
      destinationCard_Id,
    ]);
    res.status(200).json({ message: "Update Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occoured" });
  } finally {
    connection.end();
  }
};
module.exports = {
  createCard,
  deleteCard,
  editCardTitle,
  moveCardExternal,
  moveCardInternal,
};
