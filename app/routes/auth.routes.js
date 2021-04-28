module.exports = app => {
	const auth = require("../controllers/auth.controller.js");

	var router = require("express").Router();

	// Signup new user
	router.post("/signup", auth.signup);
	router.post("/signin", auth.signin);

	router.post("/profiles", auth.profiles);

	app.use('/api', router);
};