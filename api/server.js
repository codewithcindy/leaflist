if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const catchAsync = require("./utils/catchAsync");
const session = require("express-session");
const flash = require("connect-flash");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { storage } = require("./cloudinaryConfig");
// const { db } = require("./models/user");
const upload = multer({ storage });
const dbURL = process.env.DB_URL || "mongodb://localhost:27017/leaflistDB";

const port = 8080;

const app = express();

// // Connect to MongoDB
mongoose
  .connect(dbURL)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(`Error: ${err}`));

// Connect to Mongo Atlas

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

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Invalid username or password" });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: "Invalid username or password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      username: user.username,
      heading: user.heading,
      subHeading: user.subheading,
      description: user.description,
      links: user.links,
      socialLinks: user.socialLinks,
      profileImageSrc: user.profileImageSrc,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// passport.serializeUser(function (user, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(async function (user, done) {
//   User.findById(user._id, function (err, user) {
//     done(err, user);
//   });
// });

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("not authenticated");
  }
}

app.get("/", (req, res) => {
  res.send("Server good");
});

/****************************    Register    *******************************/

app.post("/registerUser", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Create new user instance
    const user = new User({ username });

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

  // , (err) => {
  //   if (err) return next(err);
  // }
});

/****************************    Login    *******************************/

// app.get("/login", (req, res, next) => {});

app.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

// app.post("/saveImage", upload.single());

/**************************    Profile Image    *****************************/
app.post("/uploadImage", upload.single("profileImage"), (req, res, next) => {
  try {
    const image = req.file;

    // Send the single file data to React
    res.json(image);
  } catch (e) {
    next(e);
    console.log(e);
  }
});

/****************************    Final    *******************************/

app.post("/save", (req, res, next) => {
  console.log("saving", req.body);

  const user = User.findByIdAndUpdate(
    { _id: req.body._id },
    { ...req.body },
    {
      runValidators: true,
      new: true,
    }
  );

  user.save();

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
