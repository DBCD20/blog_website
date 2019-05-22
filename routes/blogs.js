const express  = require('express');
const router   = express.Router();
const Story    = require('../models').Story
const User     = require('../models').User


router.route('/create/new')
.get((req, res) => {
    if(req.isAuthenticated()) return res.render('./create');
    return res.redirect('/user/login')
})
.post((req, res) => {
    let newStory = { ...req.body, author: req.user._id }
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
})

module.exports = router;