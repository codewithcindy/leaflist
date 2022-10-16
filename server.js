if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const multer = require("multer");
const { storage } = require("./cloudinaryConfig");
const { MongoClient } = require("mongodb");
const upload = multer({ storage });
const dbURL = process.env.DB_URL || "mongodb://localhost:27017/leaflistDB";

const port = process.env.PORT || 8080;
const secret = process.env.SECRET;

const app = express();

// Connect to MongoDB
mongoose
  .connect(dbURL, { useNewUrlParser: true })
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

// Serve static files
app.use(express.static(path.join(__dirname, "client", "build")));

const store = MongoStore.create({
  mongoUrl: dbURL,
  mongoOptions: {
    secret,
    touchAfter: 24 * 60 * 60,
  },
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

// Configure sessions
app.use(
  session({
    store,
    name: "connected.id",
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
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
  new LocalStrategy(function (username, password, cb) {
    User.findOne(
      {
        username: username,
      },
      function (err, user) {
        // This is how you handle error
        if (err) return cb(err);
        // When user is not found
        if (!user) return cb(null, false);
        // When password is not correct
        if (user && !user.authenticate(password)) return cb(null, false);
        // When all things are good, we return the user
        return cb(null, user);
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
    user.profileImageSrc.url = process.env.PROFILE_DEFAULT;

    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
    });

    req.session.user = req.user;

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

    res.json(req.user);
  }
);

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

/****************************  Error handling  *******************************/

// app.all("*", (req, res, next) => {
//   console.log("ERRORRR BISH");
//   res.redirect("../client/src/components/App.js");
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname), "client", "build", "index.html");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
