const bcrypt = require('bcrypt');

const utils = {
  encryptPassword: async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}

module.exports = utils;