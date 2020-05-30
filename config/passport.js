var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(
    new LocalStrategy(function (username, password, done) {
        db.User.findOne({ where: { username: username } }).then(res => {
            console.log
         if (res === null) {
                return done(null, false, { message: "Incorrect username." });
            }
            if (res.dataValues.password !== password) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, res);

        }).catch(err => {
            return done(err);
            
        })
    })
    
);
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
