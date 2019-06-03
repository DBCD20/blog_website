const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const mongoose  = require('mongoose');


module.exports = function( passport ){


    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.findOne({ username: username })
          .then((user, err) => {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false);
            }
            return user.comparePassword(password, done, user)
          })
          .catch(err => console.log(err.message))
        }
      ));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
};
