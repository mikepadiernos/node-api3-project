// INITIATE EXPRESS
const express = require('express');
const router = express.Router();

// IMPORT MIDDLEWARES
const middle = require('../middleware/middleware');

// MIDDLEWARES
const validUser = middle.validUser;
const validUserId = middle.validUserId;
const validPost = middle.validPost;

// IMPORT DATABASES
const db = require('./userDb');
const postDb = require('../posts/postDb');

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
	.post(validUser, (req, res) => {
		const user = req.body;
		db.insert(user)
			.then(user => {
				!user.name
					? res.status(400).json({success: false, message: "Provide a name"})
					: res.status(201).json({success: true, message: "User added", User: user})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "User not created", error})
			})
	});

router
	.route('/:id')
	.get(validUserId, (req, res) => {
		db.getById(req.params.id)
			.then(user => {
				res.status(400).json({success: true, message: "User found", user})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No user found", error})
			})
	})
	.put(validUserId, (req, res) => {
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
	.delete(validUserId, (req, res) => {
		const id = req.params.id;
		// const info = req.body;
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
	.get(validUserId, (req, res) => {
		const id = req.params.id;
		const info = req.body;
		db.getUserPosts(id)
			.then(posts => {
				!posts
					? res.status(404).json({success: false, message: "No posts found"})
					: res.status(200).json(posts)
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No posts found", error})
			})
	})
	.post(validUserId, validPost, (req, res) => {
		const id = req.params.id;
		const info = req.body;
		let newPost = {
			text: info,
			user_id: id
		};
		db.getById(id)
			.then(post => {
				!post
					? res.status()
					: postDb
						.insert(newPost)
						.then(post => {
							res.status(201).json({success: true, message: "Post added", post})
						})
						.catch(error => {
							res.status(500).json({success: false, message: "No post added", error})
						})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No post added", error})
			})
	});

module.exports = router;
