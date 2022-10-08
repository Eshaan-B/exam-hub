//require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const oauth = require("passport-google-oauth20");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user");

const profile = oauth.profile;

// SYNTAX: done(error, data);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

//when cookies comes from the browser
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for the Google strategy
      clientID:
        "962001318420-dv4u1rb8ij1q5k2qs4q14fhpr3033fjv.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      //passport callback function
      console.log("Access Token:", accessToken);
      console.log("Profile", profile);
      //make or get user
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          //already have the user
          console.log("User is: ", currentUser);
          done(null, currentUser);
        } else {
          console.log("Doesn't exist");
          console.log(profile);
          new User({
            _id: new mongoose.Types.ObjectId(),
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            profilePicture: profile.photos[0].value,
            uploads: [],
          })
            .save()
            .then((newUser) => {
              console.log("New user cerated: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
