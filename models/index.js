const mongoose      = require('mongoose');
const User          = require('./user');
const Story         = require('./story');
const Comment       = require('./comment');
mongoose.Promise    = Promise;
mongoose.set({ debug: true });

// setTimeout(function(){
    mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    keepAlive: true
})
.then(() => console.log('CONNECTED TO THE DB'))
.catch(err => console.log("CAN'T CONNECT TO THE DB"))
// }, 2000)


module.exports.User  = User;
module.exports.Story = Story;
module.exports.Comment = Comment;
