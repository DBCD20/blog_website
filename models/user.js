const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');
const SALT      = process.env.SALT;
const passport  = require('passport')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 10
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    stories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    }]
});

UserSchema.pre('save', async function(next){
    try {
        if(!this.isModified('password')){
            next();
        };
        this.password = await bcrypt.hash(this.password, parseInt(SALT));
        next();
    }
    catch(err){
        next(err)
    }
});
UserSchema.methods.comparePassword = async function(loginPass, done, user) {
    try {
        let isMatch = await bcrypt.compare(loginPass, this.password);
        if(!isMatch) return done(null, isMatch);
        return done(null, user)
    }
    catch(err){
      return console.log(err.message)
    }
};


const User = mongoose.model('User', UserSchema);

module.exports = User;

