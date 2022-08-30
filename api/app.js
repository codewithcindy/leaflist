const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserData = require("./models/userData");

const port = process.env.PORT || 8080;

const app = express();

// Connect top MongoDB
mongoose
  .connect("mongodb://localhost:27017/leaflistDB")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(`Error: ${err}`));

// Enable cors
app.use(cors());

// Use body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Connected to backend");
});

app.post("/save", async (req, res) => {
  const data = req.body;
  const newData = new UserData(data);

  // Save data to mongo
  newData.save();
});

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
