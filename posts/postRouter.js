// INITIATE EXPRESS
const express = require('express');
let router = express.Router();

// IMPORT DATABASE
const db = require('./postDb');


router
	.route('/')
	.get((req, res) => {});

router
	.route('/:id')
	.get((req, res) => {})
	.put((req, res) => {})
	.delete((req, res) => {});

module.exports = router;
