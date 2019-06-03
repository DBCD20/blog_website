const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
         ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
    date: String
})

module.exports = mongoose.model('Comment', CommentSchema);