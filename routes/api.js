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
            story.save( err => err ? console.log(err.message) : res.status(200).send({message: "success"}) )
        })
        .catch(err => console.log(err.messsage))
})
.catch(err => console.log(err.messsage))
}})

router.route('/:id/comment/:commentId')
.delete((req, res) => {
    Comment.findByIdAndDelete(req.params.commentId)
    .then(data => {
        Story.findById(req.params.id, async function(err, story){
            try {
                await story.comments.pull(data)
                await story.save()
                return res.status(200).send({message: "success"})
            }
            catch(err){
                console.log(err)
            }
        });
            // .then(story => {
            //     story.comments.pull(data)
            //     story.save();
            //     console.log(story.comments)
            // })
            // .then(()=>{
            //     return res.status(200).send({message: "success"})
            // })
            // .catch(err => console.log(err.message, err))
    })
    .catch(err => console.log(err.message, err))
})

module.exports = router;