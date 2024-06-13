const bcrypt = require("bcrypt");
const saltRounds = 10;

const createHashpassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

const descriptHashPassword = async (password, encryptedhashpassword) => {
  try {
    const result = await bcrypt.compare(password, encryptedhashpassword);
    return result;
  } catch (error) {
    if (error) return error;
  }
};
module.exports = { createHashpassword, descriptHashPassword };
