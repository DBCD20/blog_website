require('dotenv').config();
const express   = require('express');
const app       = express();
const helmet    = require('helmet');

app.use(helmet());
//USED TO CLEAR SESSION, LOGIN WILL NOT APPEAR WHEN BACK BUTTON WAS PRESSED
app.use(function(req,res, next){
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

const { user, blog, api } = require('./routes');
const PORT                = process.env.PORT || 3000;
const secret              = process.env.SECRET;
const passport            = require('passport');
const session             = require('express-session');
const DB                  = require('./models');
const expressSanitizer    = require('express-sanitizer');

// Passport config
require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Placed below express.json and URLencoded
app.use(expressSanitizer());

app.use(express.static('./public'));

app.use(session({ 
    secret:  secret,
    resave: true,
    saveUninitialized: true
}));

// ,
// cookie: {
//     httpOnly: true,
//     secure: true
// }
app.use(passport.initialize());
app.use(passport.session());

app.use( (req, res, next) => {
    res.locals.currentUser = req.user;
    next()
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    DB.Story.find()
    .populate('author', 'username')
    .exec((err, data) => {
        if(err) return console.log(err);
        return res.status(200).render('./index', { stories: data });

    }) 
});

app.use('/user', user);
app.use('/blogs', blog);
app.use('/blogs/api', api);

app.get('*', (req, res) => { return res.render('./notfound')})
//Error Handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


 
app.use(function(err, req, res, next) {
        res.status(err.status || 500).send(
        {
		    message: err.message,
		    error: err
	});
});


app.listen(PORT, () => console.log(`Server is now up and running on PORT ${PORT}`))