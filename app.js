require('dotenv').config();
const express   = require('express');
const app       = express();
const helmet    = require('helmet');
const routes    = require('./routes');
PORT            = process.env.PORT || 3020;


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

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

//Error Handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
 
app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
		message: err.message,
		error: err
	});
});


app.listen(PORT, () => console.log(`Server is now up and running on PORT ${PORT}`))