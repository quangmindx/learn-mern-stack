const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

// Database connection
const { mongoDb_url } = require("./key");
mongoose.connect(mongoDb_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(err);
  });

// app

const UserSchema = require("./models/user");
const PostedSchema = require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
