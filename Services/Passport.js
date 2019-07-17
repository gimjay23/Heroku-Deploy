const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      //checking to see if user exists in database
      User.findOne({
        googleId: profile.id
      }).then(existingUser => {
        if (existingUser) {
          console.log("user already exists as: ", existingUser);
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            thumbnail: profile._json.picture
          })
            .save()
            .then(newUser => {
              console.log("new user created: " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.appId,
      clientSecret: keys.appSecret,
      callbackURL: "/auth/facebook/callback", //for production, you need the full url, unlike just /auth ... for dev
      profileFields: ["name", "picture.type(small)", "email"],
      enableProof: true
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        facebookId: profile.id
      }).then(existingUser => {
        if (existingUser) {
          console.log("user already exists as: ", existingUser);
          done(null, existingUser);
        } else {
          new User({
            facebookId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            thumbnail: profile.photos[0].value
          })
            .save()
            .then(newUser => {
              console.log("new user created: " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
