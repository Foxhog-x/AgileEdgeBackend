const getConnection = require("../db");

const fetchMembersAvatar = async (req, res) => {
  const connection = await getConnection();
  try {
    const [result] = await connection.execute("CALL FetchAvatars()");
    res.status(200).json({ result: result, message: "successfully fetched" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error occured" });
  }
};
const fetchUserAvatar = async (req, res) => {
  const { member_id } = req.user;
  console.log(req.user);
  const connection = await getConnection();
  try {
    const [result] = await connection.query(
      "select member_id, avatar from members where member_id = ?",
      [member_id]
    );

    res.status(200).json({ result: result, message: "successfully fetched" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error occured" });
  } finally {
    connection.end();
  }
};

module.exports = { fetchMembersAvatar, fetchUserAvatar };
