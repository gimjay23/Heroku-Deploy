const router = require("express").Router();
const passport = require("passport");

// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  req.logout();
  res.redirect("/");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    res.redirect("/profile/");
  }
);
// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    authType: "rerequest",
    scope: ["email", "public_profile", "user_friends", "manage_pages"]
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile", "user_friends", "manage_pages"],
    failureRedirect: "/login"
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/profile/");
  }
);

module.exports = router;
