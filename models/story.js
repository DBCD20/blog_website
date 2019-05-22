const mongoose = require('mongoose');


const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },   
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags:[{
        type: String
    }],
    thumbnail: {
        type: String
    }
});

let Story = mongoose.model('Story', StorySchema);

module.exports = Story;