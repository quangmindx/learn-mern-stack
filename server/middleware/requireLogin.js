const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../key");
const mongoose = require("mongoose");
const User = mongoose.model("Users");

function requireLogin(req, res, next) {
  const { authorization } = req.headers;
  // authorization === "Bearer eaghehsweqewtw"
  if (!authorization) {
    return res.status(401).json({ message: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "you must be logged in" });
    }
    const { _id } = payload;
    User.findById(_id)
      .then((user_data) => {
        req.user = user_data;
        next();
      })
      .catch((err) => console.log(err));
  });
}

module.exports = requireLogin;
