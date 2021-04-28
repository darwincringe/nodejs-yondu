module.exports = app => {
	const user = require("../controllers/user.controller.js");

	var router = require("express").Router();

	// Signup new user
	router.post("/create-users", user.create);
	router.post("/update-users", user.update);
	router.post("/fetch-users", user.fetch);
	router.post("/delete-users", user.delete);

	app.use('/api', router);
};