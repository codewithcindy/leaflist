const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const catchAsync = require("./utils/catchAsync");
const session = require("express-session");
const flash = require("connect-flash");

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
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Use body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure sessions
app.use(
  session({
    secret: "orange cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

// Use flash
app.use(flash());

// Configure Passportjs
app.use(passport.initialize());
app.use(passport.session());
// passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Res.locals
app.use(function (req, res, next) {
  res.locals.user = req.user;
});

app.get("/", (req, res) => {
  // res.json("Connected to backend");
  console.log("connected");
});

app.get("/loadUser", (req, res) => {
  console.log(req.user);
});

// app.get("/checkAuthentication", (req, res) => {
//   console.log(req.user);
//   console.log("req user");

//   if (req.user) {
//     res.send(true);
//   } else {
//     res.send(false);
//   }
// });

app.post(
  "/registerUser",
  catchAsync(async (req, res, next) => {
    console.log("backend req.body");
    console.log(req.body);

    res.json({ message: "yay" });
    // res.send("user registered");
    // const { username, password } = req.body;

    // // Create new user instance
    // const user = new User({ username });

    // // Register new user using passport
    // const registeredUser = await User.register(user, password);

    // console.log(registeredUser);

    // req.login(registeredUser, (err) => {
    //   if (err) return next(err);
    //   // res.status(200).send({ registeredUser });
    // });
  })
);

// app.post("/login", passport.authenticate("local"), (req, res) => {
//   res.send("successfully logged in");
// });

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
// });

// Error-Handling
// app.use((err, req, res, next) => {
//   const { status = 500 } = err;

//   res.status(status).render(err);
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
