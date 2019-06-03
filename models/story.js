const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const StorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags:[{
        type: String
    }],
    thumbnail: {
        type: String
    },
    date: {
        type: String
    }
}, {
    timestamps: {
        updatedAt: 'updated_at'
    }
});

let Story = mongoose.model('Story', StorySchema);

module.exports = Story;