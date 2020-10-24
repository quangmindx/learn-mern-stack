const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const { signupController, signinController } = require("../controllers/auth");

// GET
// router.get("/protected", requireLogin, (req, res) => {
//   res.send("Hello");
// });

// POST
router.post("/signup", (req, res) => {
  signupController(req, res);
});

router.post("/signin", (req, res) => {
  signinController(req, res);
});

module.exports = router;
