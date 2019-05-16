const mongoose = require('mongoose');
const User     = require('./user');
const Story     = require('./story');
mongoose.Promise = Promise;
mongoose.set({ debug: true });

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    keepAlive: true
})

module.exports.User  = User;
module.exports.Story = Story;
