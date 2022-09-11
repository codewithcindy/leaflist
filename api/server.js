const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const catchAsync = require("./utils/catchAsync");
const session = require("express-session");
const flash = require("connect-flash");

const port = 8080;

const app = express();

// Connect top MongoDB
mongoose
  .connect("mongodb://localhost:27017/leaflistDB")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(`Error: ${err}`));

// Enable cors
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

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

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("not authenticated");
  }
}

app.get("/", (req, res) => {
  res.send("Server good");
});

app.post("/registerUser", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Create new user instance
    const user = new User({ username });

    // Save user to mongo
    // await user.save();

    // Register new user using passport
    // User.register(user, password, (err) => {
    //   if (err) {
    //     console.log("error while registering user", err);
    //     return next(err);
    //   }
    // });

    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      // req.session.username = req.body.username;

      // res.redirect("/loginUser");
    });

    req.session.user = req.user;

    console.log(req.user);
    res.json(registeredUser);
  } catch (e) {
    next(e);
  }
});

app.post("/save", (req, res, next) => {
  console.log("saving", req.body);

  const user = User.findById({ id: req.body._id }, req.body, {
    runValidators: true,
    new: true,
  });

  console.log(user);
  res.send("yay");
});

// app.post("/loginUser", passport.authenticate("local"), (req, res, next) => {
//   console.log(req.user);

//   // res.json("hello");
// });

// app.get(
//   "/loginUser",
//   passport.authenticate("local"),
//   { failureRedirect: "/login", failureMessage: true },
//   (req, res, next) => {
//     console.log("loginUser");
//     console.log(req.user);

//     res.json({ user: req.user });
//     // res.send("user logged in");
//   }
// );

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
