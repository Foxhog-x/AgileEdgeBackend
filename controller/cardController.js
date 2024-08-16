const getConnection = require("../db");

const createCard = async (req, res) => {
  const { columnId, cardName, endDate, cardPriority, startDate } =
    req.body.data;
  const connection = await getConnection();
  try {
    await connection.execute("Call AddCardAtEnd(?,?,?,?,?)", [
      columnId,
      cardName,
      endDate,
      cardPriority,
      startDate,
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
  const { sourceCardId, destinationCardId, destinationColumn_Id } = req.body;

  const connection = await getConnection();
  try {
    await connection.execute("CALL MoveCardExternal(?, ?, ?)", [
      sourceCardId,
      destinationCardId,
      destinationColumn_Id,
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

const assignMemeberToCard = async (req, res) => {
  const { cardId, memberId } = req.body;
  const connection = await getConnection();

  try {
    await connection.execute("CALL AssignAssigneeToCard(?, ?)", [
      cardId,
      memberId,
    ]);
    res.status(201).json({ message: " Assigned Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Occured in the backend" });
  }
};

const dissociateMemberToCard = async (req, res) => {
  const { assigneeId } = req.body;
  const connection = await getConnection();
  try {
    await connection.execute("CALL DissociateMemberToCard(?)", [assigneeId]);
    res.status(201).json({ message: " Dissociate Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Occured in the backend" });
  }
};

const createSubTask = async (req, res) => {
  console.log(req.body);
  const { cardId, checked, description } = req.body.data;
  const connection = await getConnection();
  try {
    await connection.execute("CALL AddSubTask(?, ?, ?)", [
      cardId,
      checked,
      description,
    ]);
    res.status(201).json({ message: "successfully created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error occour" });
  } finally {
    connection.end();
  }
};
const getSubTasks = async (req, res) => {
  const connection = await getConnection();
  try {
    const [response] = await connection.execute("Call GetSubTasks()");
    res.status(201).json({ result: response[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error occour" });
  } finally {
    connection.end();
  }
};

const deleteSubTasks = async (req, res) => {
  const { subtask_id } = req.query;

  const connection = getConnection();
  try {
    (await connection).execute("Call DeleteSubTask(?)", [subtask_id]);
    res.status(200).json({ message: " Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error is occured" });
  }
};

const updateSubTaskChecked = async (req, res) => {
  const { id } = req.body;
  const connection = getConnection();
  try {
    (await connection).execute("CALL UpdateSubTaskChecked(?)", [id]);
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occured" });
  }
};

module.exports = {
  createCard,
  deleteCard,
  editCardTitle,
  moveCardExternal,
  moveCardInternal,
  assignMemeberToCard,
  dissociateMemberToCard,
  createSubTask,
  getSubTasks,
  deleteSubTasks,
  updateSubTaskChecked,
};
