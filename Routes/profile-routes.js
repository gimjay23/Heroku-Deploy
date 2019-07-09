const express = require("express");
const app = express();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

app.get("/", authCheck, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = app;
