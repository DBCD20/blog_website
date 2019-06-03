const express  = require('express');
const router   = express.Router();
const Story    = require('../models').Story
const User     = require('../models').User
const moment   = require('moment');


router.get('/create/new', (req, res) => {
    if(req.isAuthenticated()) return res.render('./create');
    return res.redirect('/user/login')
})
router.post('/create', (req, res) => {
    let sanitized = req.sanitize(req.body.body);
    let newStory = {
        ...req.body,
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
});
router.route('/:id/edit')
.get((req, res) => {
    Story.findById(req.params.id)
        .then(story => {
            return res. render('./update', {
                Story: story
            });
        })
})

router.route('/:id')
.get(( req, res ) => {
    Story.findById(req.params.id)
    .populate('author', 'username')
    .exec((err, story) => {
        let isAuthor;
        console.log(story)
        if(err) return console.log(err);
        if(req.user){
            isAuthor = parseInt(req.user._id) == parseInt(story.author._id);
        }
        return res.render('./show', {Story: story, isAuthor: isAuthor })
    })
})
.put((req, res) => {
    console.log("hit the update route")
    return
})
.delete((req, res) => {
    if(req.user){
    Story.findById(req.params.id)
    .then(story => {
        if(parseInt(req.user._id) == parseInt(story.author._id)){
            User.findById(story.author._id)
            .then(user => {
                Story.deleteOne(story)
                .then(e => {
                    user.stories.pull(req.params.id)
                    user.save();
                    res.status(200)
                })
                .catch(err => console.log(err.message))
            })
        }
    })
    .catch(err => console.log(err))    
    
    return res.redirect('/');
}
return res.redirect('/user/login');
});





module.exports = router;