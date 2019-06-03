const express  = require('express');
const router   = express.Router();
const { Story, Comment, User } = require('../models');
const moment   = require('moment');

router.route('/:id/comment')
.get((req, res) => {
    Story.findById(req.params.id)
    .populate({path: 'comments',
        populate: {path: 'user', select: 'username'}})
    .exec((err, story) => {
        if(err) console.log(err.message);
        console.log(story)
        return res.status(200).json({
            comments: story.comments
        });
    })
})
.post((req, res) => {
if(req.user){
    let sanitized   = req.sanitize(req.body.text)
    let newComment  = {
        user    : req.user._id,
        body    : sanitized,
        date    : moment().format("MMM Do YYYY")
    }
//CREATE A COMMENT OBJECT
    Comment.create(newComment)
    .then(data => {
        Story.findById(req.params.id) 
        .then(story => {
            console.log(newComment)
//PUSH THE COMMENT ID TO THE STORY AS REFERENCE
            story.comments.push(data)
            story.save( err => err ? console.log(err.message) : res.status(200).json({comment: data.body}) )
        })
        .catch(err => console.log(err.messsage))
})
.catch(err => console.log(err.messsage))
}})

router.route('/:id/comment/:commentId')
.delete((req, res) => {
    Comment.findByIdAndDelete(req.params.commentId)
    .then(data => {
        Story.findById(req.params.id)
            .then(story => {
                story.comments.remove(data)
                story.save(err => console.log(err))
                res.status(200).json({ message:"success" })
            })
            .catch(err => console.log(err.message, err))
    })
    .catch(err => console.log(err.message, err))
})

module.exports = router;
    // Story.findById(req.params.id)
    //     .then(data => {
    //         data.comments.pull(req.params.commentId)
    //         data.save( err => err ? console.log(err) : null )
    //     }).then(() => {
    //         Comment.findByIdAndDelete(req.params.commentId)
    //         .then(data => res.status(200).json({ message: 'success' }))
    //         .catch(err => console.log(err)) 
    //     }).catch( err => console.log(err))