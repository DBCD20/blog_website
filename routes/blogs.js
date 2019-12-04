const express       = require('express');
const router        = express.Router();
const { Story, User } = require('../models');
const blogs           = require('../handlers/blogs');
const moment          = require('moment');


router.get('/create/new', blogs.createPage)
router.post('/create', blogs.create);
router.get('/:id/edit', blogs.editPage)

router.route('/:id')
    .get(blogs.showInd)
    .put(blogs.edit)
    .delete(blogs.delete);





module.exports = router;