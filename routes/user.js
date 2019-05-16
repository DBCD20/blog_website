const express   = require('express');
const router    = express.Router();
const DB        = require('../models');
const Joi       = require('@hapi/joi');


router.route('/new')
.get((req, res) => {
    return res.render('./signup');
})
.post((req, res) => {
    DB.User.create(req.body)
    .then(d => {
        console.log(d)
        return res.redirect('/');
    })
    .catch(e => console.log(e))
});

module.exports = router;

    // let schema = Joi.object.keys({
    //     username: Joi.string().alphanum().min(5).max(30).required(),
    //     password: Joi.string().regex(/^[a-zA-Z0-9]{5,15}$/),
    //     birthday: 
    //     email:  Joi.string().regex(/^[a-zA-Z0-9]{}\/)
    // })