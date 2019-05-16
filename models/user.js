const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');
const SALT      = process.env.SALT;

let UserSchema = new mongoose.Schema({
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

UserSchema.pre('save', function(next){
        if(!this.isModified('password')){
            next();
        };
        this.password = bcrypt.hashSync(this.password, parseInt(SALT));
        next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;