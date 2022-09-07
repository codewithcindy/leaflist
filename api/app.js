const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const catchAsync = require("./utils/catchAsync");

const port = process.env.PORT || 8080;

// Use Express
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

// Configure Passportjs
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.json("Connected to backend");
});

app.post(
  "/registerUser",
  catchAsync(async (req, res) => {
    try {
      const { email, password } = req.body;

      // Create new user instance
      const user = new User({ email });

      // Register new user using passport
      const registeredUser = await User.register(user, password);
    } catch (e) {
      res.send("Error registering user" + e);
    }
  })
);

// app.post("/saveNewUser", async (req, res) => {
//   console.log("posting data");
//   console.log(req.body);
//   // const data = req.body.formData;
//   // console.log(data);

//   // // const existingUser = await UserData.exists({ email: data.email });

//   // // console.log(existingUser);
//   // console.log("post saveuser");

//   // const newData = new UserData(data);

//   // // Save data to mongo
//   // newData.save();
//   res.send("successful");
// });

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
