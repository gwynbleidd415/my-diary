/*=====================Importing Modules=====================*/
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const knexStore = require("connect-session-knex")(session);

/*=====================Importing self created modules=====================*/
const db = require("./server/database");
const passport = require("./server/passport");
const routes = require("./server/routes");

/*=====================Setting up app=====================*/
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/*=====================Setting Session=====================*/
const sesstore = new knexStore({
	knex: db,
	// tablename: "sessions",
	createtable: true,
	clearInterval: 60000,
});

app.use(
	session({
		secret: "tobechangedlater",
		resave: false,
		saveUninitialized: false,
		cookie: {
			sameSite: "none",
			maxAge: 9000 * 1000,
		},
		store: sesstore,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);

/*=====================Listening to port 3000=====================*/
app.listen(3000, () => {
	console.log("server started on port 3001");
});
