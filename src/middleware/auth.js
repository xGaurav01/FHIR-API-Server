const basicAuth = require("express-basic-auth");
const database = require("../config/db-config.js");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../controllers/user-controllers.js");

const requireAuth = async (req, res, next) => {
  try {
    const token = await req?.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied, no token provided" });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = requireAuth;
