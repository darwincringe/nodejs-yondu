const db = require("./app/models");
const User = db.users;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Dropped and resync database successfully!");

  const users = [
		{
			email: 'admin@mailnator.com',
			username: 'admin',
			password: '$2a$08$9LmAW2ls8XQ6h.oJRvkjLOPxFj2AXxo29zlGjHe9QrnkPQljj8Umq', // password
			first_name: 'john',
			last_name: 'doe',
			address: 'blk2 lt81 krovah street kalawaan pasig city',
			post_code: '1600',
			contact_phone_number: '09267468269',
			role: 'admin',
		},
		{
			email: 'user@mailnator.com',
			username: 'user',
			password: '$2a$08$9LmAW2ls8XQ6h.oJRvkjLOPxFj2AXxo29zlGjHe9QrnkPQljj8Umq', // password
			first_name: 'jane',
			last_name: 'doe',
			address: 'blk2 lt81 krovah street kalawaan pasig city',
			post_code: '1600',
			contact_phone_number: '09267468269',
			role: 'user',
		},
	];

	users.forEach(user => {
		User.create(user);
	});
});

