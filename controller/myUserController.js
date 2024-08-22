const getConnection = require("../db");

const updateProfile = async (req, res) => {
  const { member_id } = req.user;
  console.log(member_id);
  const { image } = req.body;
  const { firstName, lastName, address } = req.body.data;

  const connection = await getConnection();
  try {
    await connection.execute("CALL UpdateProfile(?,?,?,?,?)", [
      image,
      firstName,
      lastName,
      address,
      member_id,
    ]);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occured", message: "error happend" });
  } finally {
    connection.end();
  }
};

module.exports = { updateProfile };
