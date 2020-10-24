const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const {
  createPostController,
  getAllPosts,
  getMyPost,
} = require("../controllers/post");

router.get("/allpost", (req, res) => {
  getAllPosts(req, res);
});

router.get("/mypost", requireLogin, (req, res) => {
  getMyPost(req, res);
});

router.post("/createpost", requireLogin, (req, res) => {
  createPostController(req, res);
});

module.exports = router;
