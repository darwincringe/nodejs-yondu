module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		first_name: {
			type: Sequelize.STRING
		},
		last_name: {
			type: Sequelize.STRING
		},
		address: {
			type: Sequelize.STRING
		},
		post_code: {
			type: Sequelize.STRING
		},
		contact_phone_number: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
		},
		username: {
			type: Sequelize.STRING,
			unique: true,
		},
		password: {
			type: Sequelize.STRING
		},
		role: {
			type: Sequelize.STRING,
			defaultValue: 'user',
		},
	});

	return User;
};