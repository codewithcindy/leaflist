if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const multer = require("multer");
const { storage } = require("./cloudinaryConfig");
const { MongoClient } = require("mongodb");
const { type } = require("os");
const upload = multer({ storage });
const dbURL = process.env.DB_URL || "mongodb://localhost:27017/leaflistDB";

const port = process.env.PORT || 8080;
const secret = process.env.SECRET;

const app = express();

// Connect to MongoDB
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((m) => {
    // m.connection.getClient();
    console.log("Connected to database");
  })
  .catch((err) => console.error(`Error: ${err}`));

// Connect to Mongo Atlas
const client = new MongoClient(dbURL);

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

// Serve static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}
// app.use(express.static(path.join(__dirname, "/client", "/build")));

// Use body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure sessions
const store = MongoStore.create({
  mongoUrl: dbURL,
  // touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

// store.on("error", function (e) {
//   console.log("SESSION STORE ERROR", e);
// });

const sessionConfig = {
  store,
  name: "session.id",
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    // httpOnly: true,
  },
};

app.use(session(sessionConfig));

// Enable cors
app.use(function (req, res, next) {
  const whitelist = ["http://localhost:3000", process.env.APP_URL];

  if (whitelist.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.header("Access-Control-Allow-Credentials", true);
  }

  next();
});

// Configure Passportjs
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

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
    user.profileImageSrc.url = process.env.PROFILE_DEFAULT;

    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
    });

    req.session.user = req.user;

    console.log(res);

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
    failureRedirect: "/~",
    failureMessage: "Login Error",
  }),
  (req, res) => {
    res.json(req.user);
  }
);

/**************************    Log Out   *****************************/

app.post(`/logout`, (req, res, next) => {
  // req.session.destroy();
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.sendStatus(200);
  });
});

/**************************    Profile Image    *****************************/
app.post(
  `/uploadImage`,
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

app.post(`/save`, (req, res, next) => {
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

/****************************  Error handling  *******************************/

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
