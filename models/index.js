const mongoose      = require('mongoose');
const User          = require('./user');
const Story         = require('./story');
const Comment       = require('./comment');
mongoose.Promise    = Promise;
mongoose.set({ debug: true });

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    keepAlive: true
})

module.exports.User  = User;
module.exports.Story = Story;
module.exports.Comment = Comment;
