const passport = require("passport");
const express = require("express");
const app = express();

// auth login
app.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
app.get("/logout", (req, res) => {
  // handle with passport
  req.logout();
  res.redirect("/");
});

//auth with google
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/google/callback",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    res.redirect("/profile/");
  }
);
// callback route for google to redirect to
// hand control to passport to use code to grab profile info

//, "public_profile", "user_friends", "manage_pages"]
app.get(
  "/facebook",
  passport.authenticate("facebook", { authType: "rerequest", scope: ["email"] })
);
//, "public_profile"], , "user_friends", "manage_pages"],
app.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    scope: ["email"],
    failureRedirect: "/login"
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/profile/");
  }
);

module.exports = app;
