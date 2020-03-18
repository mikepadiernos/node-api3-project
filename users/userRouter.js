const express = require('express');

const router = express.Router();

router
	.route('/')
	.get((req, res) => {})
	.post((req, res) => {});

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
