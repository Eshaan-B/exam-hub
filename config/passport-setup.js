require("dotenv").config();
const passport = require("passport");
const oauth = require("passport-google-oauth20");
const GoogleStrategy = require("passport-google-oauth20");

const profile = oauth.profile;
const verifyCallback = oauth.verifyCallback;
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
      // done(null, { username: profile.displayName });
    }
  )
);
