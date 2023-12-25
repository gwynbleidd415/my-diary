// Postgresql is used as database and knex manager is used

const knex = require("knex");

const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "PG_User",
		password: "PG_Password",
		database: "myDiary",
	},
});

module.exports = db;
