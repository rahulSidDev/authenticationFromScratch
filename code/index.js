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

const requireLogin = (req, res, next) => {
	if (!req.session.user_id) {
		return res.redirect('/login');
	}
	next();
}

app.get('/', (req, res) => {
	res.send('this is the home page');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', async (req, res) => {
	const {password, username} = req.body;
	const user = new User({username: username,hashedPassword: password});
	await user.save();
	req.session.user_id = user._id;
	res.redirect('/');
})

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', async (req, res) => {
	const {username, password} = req.body;
	const foundUser = await User.findAndValidate(username, password);
	if (foundUser) {
		req.session.user_id = foundUser._id;
		res.redirect('/secret');
	} else {
		res.redirect('/login');
	}
});

app.post('/logout', (req, res) => {
	req.session.user_id = null; // req.session.destroy(); can also be used.
	res.redirect('/login');
});

app.get('/secret', requireLogin, (req, res) => {
	res.render('secret');
});

app.listen(3000, () => {
	console.log("SERVING YOUR APP.");
});