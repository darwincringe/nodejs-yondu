const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

exports.signup = (req, res) => {

	// Validate request
	if (!req.body.email) {
		res.status(400).send({
			message: "email can not be empty!"
		});
		return;
	}else if (!req.body.username) {
		res.status(400).send({
			message: "email can not be empty!"
		});
		return;
	}else if (!req.body.password) {
		res.status(400).send({
			message: "password can not be empty!"
		});
		return;
	}else if (!req.body.first_name) {
		res.status(400).send({
			message: "first name can not be empty!"
		});
		return;
	}else if (!req.body.last_name) {
		res.status(400).send({
			message: "last name can not be empty!"
		});
		return;
	}

	let hashedPassword = bcrypt.hashSync(req.body.password, 8);

	const user = {
		last_name: req.body.last_name,
		first_name: req.body.first_name,
		email: req.body.email,
		username: req.body.username,
		password: hashedPassword,
		role: req.body.role,
	};

	User.create(user)
		.then(data => {

			let token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
				expiresIn: 86400 // expires in 24 hours
			});

			res.status(200).send({ auth: true, token: token, user: data });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "There was a problem registering the user."
			});
		});

};

exports.profiles = (req, res) => {
	let token = req.headers['authorization'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
	    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

		User.findByPk(decoded.id)
		.then(data => {
			res.send({
				user: data,
			});
		})
		.catch(err => {
			res.status(500).send({
				message: "No user found."
			});
		});
	});
};

exports.signin = (req, res) => {

	const user = User.findOne({ where: { username: req.body.username }}).then(user => {
		if (!user) return res.status(404).send('Invalid Credentials.');
		
		const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) return res.status(401).send({ 
			token: null, 
			message: 'Incorrect Credentials',
		});

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: 86400 // expires in 24 hours
		});

		res.status(200).json({ 
			user: user,
			token: token
		});
	});

};