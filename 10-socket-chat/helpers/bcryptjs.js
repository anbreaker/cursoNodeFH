const bcryptjs = require('bcryptjs');

const encryptPass = (password) => {
  // Iterator crypt
  const salt = bcryptjs.genSaltSync(12);

  return (password = bcryptjs.hashSync(password, salt));
};

module.exports = encryptPass;
