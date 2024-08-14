import express from 'express';
import User from './models/user.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import session from 'express-session';

mongoose.connect('mongodb://localhost:27017/authDemo')
	.then(() => {
		console.log('mongo connection is open.');
	})
	.catch(err => {
		console.log('mongo connection error.');
		console.log(err);
	});

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'notagoodsecret'}));

app.get('/', (req, res) => {
	res.send('this is the home page');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', async (req, res) => {
	const {password, username} = req.body;
	const hash = await bcrypt.hash(password, 12);
	const user = new User({
		username: username,
		hashedPassword: hash
	});
	await user.save();
	req.session.user_id = foundUser._id;
	res.redirect('/');
})

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', async (req, res) => {
	const {username, password} = req.body;
	const foundUser = await User.findOne({username}); // {username: username} can be replaced by just {username}
	const foundPassword = await bcrypt.compare(password, foundUser.hashedPassword);
	if (foundPassword) {
		req.session.user_id = foundUser._id;
		res.send('logged in successfully.');
	} else {
		res.send('something went wrong. try again');
	}
});

app.get('/secret', (req, res) => {
	if (!req.session.user_id) {
		res.redirect('/login');
	}
	res.send('You cannot see me!');
});

app.listen(3000, () => {
	console.log("SERVING YOUR APP.");
});