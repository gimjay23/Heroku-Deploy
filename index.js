const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./Routes/auth-routes");
const profileRoutes = require("./Routes/profile-routes");
require("./Services/Passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
//const router = require('express').Router();

// set view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.uri, { useNewUrlParser: true });

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
