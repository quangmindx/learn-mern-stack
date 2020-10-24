const mongoose = require("mongoose");
const Post = mongoose.model("posts");

function createPostController(req, res) {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ message: "Please add all the fields" });
  }
  req.user.password = undefined; // hidden password on object post
  const post = new Post({
    title,
    body,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => console.log(err));
}

function getAllPosts(req, res) {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
}

function getMyPost(req, res) {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => console.log(err));
}

module.exports = {
  createPostController,
  getAllPosts,
  getMyPost,
};
