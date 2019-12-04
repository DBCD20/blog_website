const express        = require('express');
const passport       = require('passport');
const router         = express.Router();
const DB             = require('../models');


router.route('/signup')
.get((req, res) => {
    if(!req.isAuthenticated()) return res.render('./signup');
    return res.redirect('/');
})
.post((req, res) => {
    DB.User.create(req.body)
    .then(newUser => {
            req.login(newUser, err => {
                if(err){return next(err)};
                return res.redirect('/')
            })
    })
    .catch(e => {
        console.log(e)
        return res.render('./signup')
    })
});
    router.route('/login')
    .get((req, res) => {
        if(!req.isAuthenticated()) return res.render('./login');
        
        return res.redirect('/');
    })
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }), (req, res, next) => {
    });

    router.route('/logout')
    .get((req, res) => {
        req.logout();
        res.redirect('login')
    });


module.exports = router;