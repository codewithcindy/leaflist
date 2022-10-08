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
const { MongoClient } = require("mongodb");
const upload = multer({ storage });
const dbURL = process.env.DB_URL || "mongodb://localhost:27017/leaflistDB";

const port = 8080;

const app = express();

// // Connect to MongoDB
mongoose
  .connect(dbURL)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(`Error: ${err}`));

const client = new MongoClient(dbURL);

// Connect to Mongo Atlas
async function run(userData) {
  try {
    // Connect to Mongo Client
    console.log("Connection open");
    await client.connect();
    const db = client.db("Leaflist");
    const collection = db.collection("users");

    const result = await collection.updateMany({}, { $set: { ...userData } });
    console.log("results", result);
    return result;
  } finally {
    // Close connection
    await client.close();
    console.log("Connection closed");
  }
}

// Configure sessions
app.use(
  session({
    secret: "orange",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    name: "connected.id",
  })
);

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

// Use flash
// app.use(flash());

// Configure Passportjs
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (password, username, done) {
    User.findOne(
      {
        username: username,
      },
      function (err, user) {
        // This is how you handle error
        if (err) return done(err);
        // When user is not found
        if (!user) return done(null, false);
        // When password is not correct
        if (user && !user.authenticate(password)) return done(null, false);
        // When all things are good, we return the user
        return done(null, user);
      }
    );
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

/****************************    Register    *******************************/

app.post("/registerUser", async (req, res, next) => {
  try {
    // console.log("req.body", req.body);

    const { username, password } = req.body;

    // Create new user instance
    const user = new User({ username });

    // Set default profile image
    user.profileImageSrc.url =
      "https://res.cloudinary.com/codewithcindy/image/upload/v1664316788/Leaflist/default_profile_image_fwfrwu.png";

    const registeredUser = await User.register(user, password);

    // console.log("registerduser", registeredUser);

    // req.session.passport.user = req.user;

    req.login(registeredUser, (err) => {
      if (err) return next(err);
    });

    req.session.user = req.user;

    // console.log("req.session", req.session);

    res.json(registeredUser);
  } catch (e) {
    res.status(401);
    next(e);
  }
});

/****************************    Login    *******************************/

app.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureMessage: true,
    failureRedirect: "/~",
  }),
  (req, res) => {
    // console.log(req.user);
    req.session.user = req.user;

    console.log("req.session", req.session);

    // console.log(req.session);
    // Add user to localStorage

    res.json(req.user);
    // res.sendStatus(200);
  }
);

// app.post("/saveImage", upload.single());

/**************************    Log Out   *****************************/

app.post("/logout", (req, res, next) => {
  // req.session.destroy();
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.sendStatus(200);
  });
});

/**************************   Update Session *****************************/
// app.post("/updateSession", (req, res) => {
//   const data = req.body;

//   console.log(`update session`, data);

//   // req.session.user = data;

//   // console.log(`new session`, req.session);
// });

/**************************    Profile Image    *****************************/
app.post(
  "/uploadImage",
  upload.single("profileImage", { type: "authenticated" }),
  (req, res, next) => {
    try {
      const image = req.file;

      // Send the single file data to React
      res.json(image);
    } catch (e) {
      next(e);
      console.log(e);
    }
  }
);

/****************************    Final    *******************************/

app.post("/save", (req, res, next) => {
  const userData = {
    heading: req.body.heading,
    subHeading: req.body.subHeading,
    description: req.body.description,
    links: req.body.links,
    socialLinks: req.body.socialLinks,
    profileImageSrc: req.body.profileImageSrc,
  };

  run(userData).catch(console.dir);

  res.send("yay");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
