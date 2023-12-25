/*=====================Importing NPM packages=====================*/
const express = require("express");
const bcrypt = require("bcrypt");

/*=====================Importing packages created by me=====================*/
const db = require("./database");
const passport = require("./passport");

const route = express.Router();
const saltRounds = 7;

/*=====================Constants for state=====================*/
// const checker = [];

/*=====================EXTRAS=====================*/

/*=====================Without LOGIN=====================*/
route.get("/", (req, res) => {
	if (req.isAuthenticated()) {
		// console.log("authenticated");
		res.redirect(`/${req.user.uid}/home`);
	} else {
		// console.log("Not authenticated");
		res.render("offHome");
	}
});
route.get("/home", (req, res) => {
	if (req.isAuthenticated()) res.redirect(`/${req.user.uid}/home`);
	else res.redirect("/");
});
route.get("/:paramid", (req, res) => {
	if (req.params.paramid === "about" || req.params.paramid === "contact")
		res.render("offAC", { param: req.params.paramid });
	else res.status(404).render("offError");
});
// route.get("/checker/:iid", (req, res) => {
// 	checker.push(req.params.iid);
// 	res.send(checker);
// });
route.post("/login", function (req, res, next) {
	// console.log(req.body);
	if (req.isAuthenticated()) res.redirect(`/${req.user.uid}/home`);
	else if (req.body.username === "" || req.body.password === "")
		res.status(401).json("noData");
	else {
		passport.authenticate("local", function (err, user, info) {
			if (err) return res.status(400).json("There was an error");
			if (!user) return res.status(401).json(info.message);
			req.logIn(user, function (err) {
				if (err) return next(err);
				const uData = req.user.uid;
				return res.redirect(`/${req.user.uid}/home`);
			});
		})(req, res, next);
	}
});
route.post("/register", (req, res) => {
	if (req.isAuthenticated()) res.redirect(`/${req.user.uid}/home`);
	else {
		const { username, email, inputPassword } = req.body;
		const password = inputPassword;
		console.log(req.body);
		let reUser, reEmail, rePass;
		reUser = /^\w{6,24}$/;
		reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		rePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!\s)(?=.{8,24})/;
		let reErrors = [];
		if (!reUser.test(username))
			reErrors.push(
				"The username must contain only alphanumeric characters and of length 6-24"
			);
		if (!reEmail.test(email)) reErrors.push("Please enter valid email.");
		if (!rePass.test(password))
			reErrors.push(
				"Password must have atleast one uppercase, lowercase and digit character and length must be between 8-24"
			);
		if (reErrors.length === 0) {
			console.log(reErrors);
			db("users")
				.select("username")
				.where({
					username: username,
				})
				.then((resp) => {
					if (resp.length !== 0) {
						reErrors.push("Username is already in use");
						res.json(reErrors);
					} else {
						bcrypt.hash(password, saltRounds, async (err, hash) => {
							if (err) res.json(err);
							else {
								try {
									await db("users").insert({
										username: username,
										email: email,
										password: hash,
									});
									await db.schema.createTable("u_" + username, (table) => {
										table.increments();
										table.dateTime("Time").defaultTo(db.fn.now());
										table.string("Title");
										table.text("Body");
									});
									// res.send(hash);
									res.json("Success");
								} catch (err) {
									res.json(err);
								}
							}
						});
					}
				});
		} else {
			res.json(reErrors);
		}
	}
});

/*=====================Registered Users=====================*/
route.get("/:username/home", async (req, res) => {
	if (!req.isAuthenticated()) res.redirect("/home");
	else {
		let resp = await db(`u_${req.user.uid}`).select();
		resp.reverse();
		// resp = await resp.json();
		res.render("onHome", { data: resp, user: req.user.uid });
	}
});

route.get("/:username/posts/:id", async (req, res) => {
	if (!req.isAuthenticated()) res.redirect("/home");
	else {
		let id = parseInt(req.params.id);
		const result = await db(`u_${req.user.uid}`).where("id", "=", id).select();
		res.render("post", { result: result[0], user: req.user.uid });
	}
});
route.get("/:username/delete/:id", async (req, res) => {
	if (!req.isAuthenticated()) res.redirect("/home");
	else {
		let id = parseInt(req.params.id);
		await db(`u_${req.user.uid}`).where("id", "=", id).del();
		res.redirect(`/${req.user.uid}/home`);
	}
});

route.get("/:username/compose", (req, res) => {
	res.render("compose", { user: req.user.uid });
});
route.post("/compose", async (req, res) => {
	if (!req.isAuthenticated()) res.redirect("/home");
	else {
		try {
			await db(`u_${req.user.uid}`)
				.insert({
					Title: req.body.Title,
					Body: req.body.Body,
				})
				.catch((err) => {
					res.json(err);
				});
		} catch (e) {
			console.log(e);
		}
		res.redirect(`/${req.user.uid}/home`);
	}
});
route.get("/:username/logout", (req, res) => {
	req.logOut();
	res.redirect("/");
});

module.exports = route;
