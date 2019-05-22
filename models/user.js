const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');
const SALT      = process.env.SALT;

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
UserSchema.methods.comparePassword = async function(loginPass, next) {
    try {
        let isMatch = await bcrypt.compare(loginPass, this.password);
        return isMatch;
    }
    catch(err){
        next(err)
    }
};


const User = mongoose.model('User', UserSchema);

module.exports = User;

