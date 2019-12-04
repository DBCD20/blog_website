const { Story, User } = require('../models');
const moment          = require('moment');
const express = require('express');
//SHOW CREATE BLOG PAGE
exports.createPage = function(req, res){
        if(req.isAuthenticated()) return res.render('./create');
        return res.redirect('/user/login')
}
//CREATE ROUTE
exports.create = function(req, res){
        let sanitized = req.sanitize(req.body.body);
        let newStory = {
            ...req.body,
            tags    : new Array(req.body.tag),
            body    : sanitized,
            author  : req.user._id, 
            date: moment().format("MMM Do YYYY")}
        Story.create(newStory)
        .then(d => {
            User.findById(req.user._id)
            .then(User => {
                User.stories.push(d)
                User.save(err => {
                    if(err) console.log(err);
                    return res.redirect('/')
                });
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
};
// SHOW ROUTE
exports.showInd = function( req, res ){
    Story.findById(req.params.id)
    .populate('author', 'username')
    .exec((err, story) => {
        let isAuthor;
        if(err) return console.log(err);
        if(req.user){
            isAuthor = parseInt(req.user._id) == parseInt(story.author._id);
        }
        return res.render('./show', {Story: story, isAuthor: isAuthor })
    })
}
//SHOW EDIT PAGE
exports.editPage = function(req, res){
    Story.findById(req.params.id)
        .then(story => {
            return res.render('./update', {
                Story: story
            });
        })
};
//EDIT ROUTE
exports.edit = function(req, res){
    let sanitized = req.sanitize(req.body.body);
    let updatedData = {
        ...req.body,
        tags    : new Array(req.body.tag.split(', ')),
        body    : sanitized,
        author  : req.user._id, 
    }
    console.log(req.body.tag.split(','));
    Story.findByIdAndUpdate(req.params.id, updatedData, {new: true, useFindAndModify: false})
        .then(story => res.redirect(`/blogs/${story._id}`))
        .catch(err => console.log(err, err.message))
};
//DELETE ROUTE
exports.delete = function(req, res){
    Story.findByIdAndDelete(req.params.id)
        .then(story => User.findById(story.author._id)
            .then(user => {
                user.stories.pull(story)
                user.save()
                return story;
            })
            .then(story=>{
                console.log(story)
                return res.status(200).send({
                    message: "success"
                })
            }).catch(err => console.log(err))
        ).catch(err => console.log(err));
}
