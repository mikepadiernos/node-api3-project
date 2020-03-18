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
	.get((req, res) => {
		db.getById(req.params.id)
			.then(user => {
				res.status(400).json({success: true, message: "User found", user})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No user found", error})
			})
	})
	.put((req, res) => {
		const id = req.params.id;
		const info = req.body;
		db.update(id, info)
			.then(user => {
				!info.name && user
					? res.status(404).json({success: false, message: "User not found"})
					: res.status(200).json({success: true, message: "User updated", User: info})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "User not updated", error})
			})
	})
	.delete((req, res) => {
		const id = req.params.id;
		db.getById(id)
			.then(user => {
				!user
					? res.status(404).json({success: false, message: "User found"})
					: db.remove(id)
							.then(del => {
								if (del) {res.status(200).json({success: true, user})}
							})
							.catch(error => {
								res.status(500).json({success: false, message: "User not removed", error})
							})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "User not removed", error})
			})
	});


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
