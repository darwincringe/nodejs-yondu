const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

// Create and Save a new User
exports.create = (req, res) => {
	let token = req.headers['authorization'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	let errors = {};
	let hasError = false;

	if (!req.body.email) {
		hasError = true;
		errors.email = ["Email is required"];
	}
	if (!req.body.username) {
		hasError = true;
		errors.username = ["Username is required"];
	}
	if (!req.body.password_confirmation && req.body.password_confirmation == req.body.password) {
		errors.password = ["Password confirmation does not match"];
		hasError = true;
	}
	if (!req.body.password) {
		errors.password = ["Password is required"];
		hasError = true;
	}
	if (!req.body.first_name) {
		errors.first_name = ["First name is required"];
		hasError = true;
	}
	if (!req.body.last_name) {
		errors.last_name = ["Last name is required"];
		hasError = true;
	}
	if (!req.body.role) {
		errors.role = ["Role is required"];
		hasError = true;
	}

	if(hasError) {
		res.status(422).send({
			message: "Validation error",
			errors: errors,
		});
		return;
	}

	let hashedPassword = bcrypt.hashSync(req.body.password, 8);
	
	// Create a Tutorial
	const user = {
		email: req.body.email,
		username: req.body.username,
		password: hashedPassword,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		address: req.body.address,
		post_code: req.body.post_code,
		contact_phone_number: req.body.contact_phone_number,
		role: req.body.role,
	};

	// Save Tutorial in the database
	User.create(user)
		.then(data => {
			res.send({
				message: 'User created successfully!'
			});
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the User."
			});
		});
};

// Retrieve all Tutorials from the database.
exports.fetch = (req, res) => {
	let token = req.headers['authorization'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	User.findAll()
	.then(data => {
		res.send({
			users: data,
		});
	})
	.catch(err => {
		res.status(500).send({
		message:
			err.message || "Some error occurred while retrieving users."
		});
	});
};


// Uopdate and Save a new User
exports.update = (req, res) => {
	let token = req.headers['authorization'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	let errors = {};
	let hasError = false;

	if (!req.body.id) {
		hasError = true;
		errors.id = ["ID is required"];
	}
	if (!req.body.email) {
		hasError = true;
		errors.email = ["Email is required"];
	}
	if (!req.body.username) {
		hasError = true;
		errors.username = ["Username is required"];
	}
	if (!req.body.first_name) {
		errors.first_name = ["First name is required"];
		hasError = true;
	}
	if (!req.body.last_name) {
		errors.last_name = ["Last name is required"];
		hasError = true;
	}
	if (!req.body.role) {
		errors.role = ["Role is required"];
		hasError = true;
	}

	if(hasError) {
		res.status(422).send({
			message: "Validation error",
			errors: errors,
		});
		return;
	}

	// Create a User
	const user = {
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		address: req.body.address,
		post_code: req.body.post_code,
		contact_phone_number: req.body.contact_phone_number,
		role: req.body.role,
	};

	// Update User in the database
	User.update(user, {
		where: { id: req.body.id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "User was updated successfully."
				});
			} else {
				res.send({
					errors: {
						message: ['Server Error, please try again later'],
					},
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				errors: {
					message: ['Username or Email has a duplicate'],
				},
			});
		});
};

// Delete user/s
exports.delete = async (req, res) => {
	if (!req.body.ids && !Array.isArray(req.body.ids)) {
		hasError = true;
		errors.ids = ["One or two ID is required"];
	}

	let errors = {};
	let hasError = false;

	if(hasError) {
		res.status(422).send({
			message: "Validation error",
			errors: errors,
		});
		return;
	}

	let ids = req.body.ids;

	ids.forEach((id) => {
		User.destroy({ where: { id: id } });
	});


	res.status(200).send({
		message: "User/s successfully deleted",
	});
};