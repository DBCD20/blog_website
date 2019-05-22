const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').User;

module.exports = function( passport ){
    passport.use(
        new LocalStrategy((username, password, done) =>{
            User.findOne({ username: username })
            .then(user => {
                if(!user){
                    return done(null, false, {message: "Username is not registered"});
                }
                if(!user.comparePassword(password)){
                    return done(null, false, { message: "Incorrect Password" });
                }
                return done(null, user);
            })
            .catch(err => console.log(err))
        })
    )
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
};
