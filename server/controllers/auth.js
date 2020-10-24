const mongoose = require("mongoose");
const User = mongoose.model("Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // import jsonwebtoken
const { JWT_SECRET } = require("../key");

// POST
function signupController(req, res) {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({ message: "Please add all fields" });
  }
  //   return res.json({ message: "Successfuly send" });
  User.findOne({ email: email })
    .then((saveUser) => {
      if (saveUser) {
        return res
          .status(422)
          .json({ message: "user already exists with that email!" });
      }
      bcrypt
        .hash(password, 12)
        .then((hashPassword) => {
          const user = new User({
            name,
            email,
            password: hashPassword,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "saved successfuly" });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function signinController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ message: "Please provide email or password" });
  }
  User.findOne({ email: email })
    .then((saveUser) => {
      if (!saveUser) {
        return res.status(422).json({ message: "Invalid email or password" });
      }
      bcrypt
        .compare(password, saveUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign({ _id: saveUser._id }, JWT_SECRET);
            res.json({ token });
            // return res.json({ message: "successfuly signed in" });
          } else {
            res.status(422).json({ message: "Invalid email or password" });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

module.exports = {
  signupController,
  signinController,
};
