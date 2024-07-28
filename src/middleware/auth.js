const basicAuth = require('express-basic-auth');
const database = require('../config/db-config.js');

const authenticateUser = async (username, password, cb) => {
  try {
    const res = await database.query("SELECT * FROM users WHERE username = $1", [username]);
    if (res.rows.length > 0) {
      const user = res.rows[0];
      const isValid = password === user.password;
      if (isValid) {
        return cb(null, true);
      }
    }
    return cb(null, false);
  } catch (err) {
    return cb(err);
  }
};

const requireAuth = basicAuth({
  authorizer: authenticateUser,
  authorizeAsync: true,
  unauthorizedResponse: "Invalid User",
});

module.exports = requireAuth;
