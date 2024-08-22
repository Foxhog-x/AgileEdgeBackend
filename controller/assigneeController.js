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

const addAssignee = async (req, res) => {
  const obj = req.body.data;
  const { assigneeObj, cardId } = obj;

  const assignees = Array.isArray(assigneeObj) ? assigneeObj : [assigneeObj];

  const connection = await getConnection();

  try {
    for (const assignee of assignees) {
      const { member_id } = assignee;
      await connection.query(
        "INSERT INTO assignees(member_id, card_id) VALUES(?, ?)",
        [member_id, cardId]
      );
    }

    res.status(201).json({ message: "Assignee(s) successfully created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error occurred while inserting assignee(s)",
      message: "error",
    });
  } finally {
    connection.end();
  }
};
const removeAssignee = async (req, res) => {
  const obj = req.body;
  console.log(obj);
  const { assigneeObj, cardId } = obj;
  const member_id = assigneeObj.member_id;
  const connection = await getConnection();
  console.log(member_id);
  try {
    await connection.query(
      "DELETE FROM assignees WHERE (assignee_id = ? AND card_id = ?) OR (member_id = ? AND card_id = ?)",
      [member_id, cardId, member_id, cardId]
    );
    res.status(200).json({ message: "successfully Deleted" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "error ocuured in assignement", message: "Error" });
  } finally {
    connection.end();
  }
};
module.exports = {
  getAssignee,
  addAssignee,
  removeAssignee,
};
