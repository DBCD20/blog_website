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

const routes        = require('./routes');
const PORT          = process.env.PORT || 3000;
const secret        = process.env.SECRET;
const passport      = require('passport');
const session       = require('express-session');
const DB            = require('./models');

// Passport config
require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.use(session({ 
    secret:  secret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use( (req, res, next) => {
    res.locals.currentUser = req.user;
    next()
});

app.set('view engine', 'ejs');

let Stories = [
    {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        author: "Juan Dela Cruz",
        summary: "REST (i.e. Representation State Transfer) is an architectural style for defining our routes. It is a way of mapping HTTP routes and the CRUD functionalities.",
        date: "June 21, 2019",
        img: 'https://images.pexels.com/photos/2250619/pexels-photo-2250619.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
    },
    {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        author: "Juan Dela Cruz",
        date: "June 21, 2019",
        img: 'https://images.pexels.com/photos/2191051/pexels-photo-2191051.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
    },
    {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        author: "Juan Dela Cruz",
        date: "June 21, 2019",
        img: 'https://images.pexels.com/photos/2238300/pexels-photo-2238300.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
    },
    {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        author: "Juan Dela Cruz",
        date: "June 21, 2019",
        img: 'https://images.pexels.com/photos/2262697/pexels-photo-2262697.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
    }
]

app.get('/', (req, res) => {
    return res.status(200).render('./index', {stories: Stories});
})

app.use('/user', routes.user);
app.use('/blogs', routes.blog);

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