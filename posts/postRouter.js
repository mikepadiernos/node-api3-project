// INITIATE EXPRESS
const express = require('express');
let router = express.Router();

// IMPORT MIDDLEWARES
const middle = require('../middleware/middleware');

// MIDDLEWARES
const validPost = middle.validPost;
const validPostId = middle.validPostId;

// IMPORT DATABASES
const db = require('./postDb');


router
	.route('/')
	.get((req, res) => {
		db.get(req.params.id)
			.then(posts => {
					res.status(200).json(posts)
				}
			)
			.catch(error => {
				res.status(500).json({success: false, message: "No posts found", error})
			})
	});

router
	.route('/:id')
	.get(validPostId, (req, res) => {
		db.getById(req.params.id)
			.then(posts => {
				res.status(200).json(posts)
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No posts found", error})
			})
	})
	.put(validPost, validPostId, (req, res) => {
		const id = req.params.id;
		const info = req.body;
		db.update(id, info)
			.then(post => {
				!info.text && post
					? res.status(404).json({success: false, message: "Post not updated", post})
					: res.status(200).json({success: true, message: "Post updated", Post: info})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "Post not updated", error})
			})
	})
	.delete(validPostId, (req, res) => {
		const id = req.params.id;
		db.getById(id)
			.then(post => {
				!post
					? res.status(404).json({success: false, message: "Post found"})
					: db.remove(id)
						.then(del => {
							if (del) {res.status(200).json({success: true, post})}
						})
						.catch(error => {
							res.status(500).json({success: false, message: "Post not removed", error})
						})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "Post not removed", error})
			})
	});

module.exports = router;
