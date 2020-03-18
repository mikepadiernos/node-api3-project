// INITIATE EXPRESS
const express = require('express');
let router = express.Router();

// IMPORT DATABASE
const db = require('./userDb');

router
	.route('/')
	.get((req, res) => {
		db.get(req.params.id)
			.then(users => {
					res.status(200).json(users)
				}
			)
			.catch(error => {
				res.status(500).json({success: false, message: "No users found", error})
			})
	})
	.post((req, res) => {
		const user = req.body;
		db.insert(user)
			.then(user => {
				!user.name
					? res.status(400).json({success: false, message: "Provide a name"})
					: res.status(201).json({success: true, message: "User added"})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "User not created", error})
			})
	});

router
	.route('/:id')
	.get((req, res) => {})
	.delete((req, res) => {})
	.put((req, res) => {});

router
	.route('/:id/posts')
	.get((req, res) => {})
	.post((req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
