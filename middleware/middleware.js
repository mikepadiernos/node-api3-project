const userDb = require('../users/userDb');
const postDb = require('../posts/postDb');

const logger = (req, res, next) => {
	const method = req.method;
	const endpoint = req.originalUrl;
	const date = new Date();
	console.log(`You made a ${method} request to ${endpoint} on ${date}`);
	next()
};

const validUser = (req, res, next) => {
	const { name } = req.body;
	Object.entries(req.body).length === 0
		? res.status(400).json({ message: 'No User Data' })
		: !name
		? res.status(400).json({ message: 'Missing required name field' })
		: next()
};

const validUserId = (req, res, next) => {
	const { id } = req.params;
	userDb.getById(id)
				.then(user => {
					user
						? req.user
						: res.status(400).json({ message: 'Invalid User ID!' })
					next()
				})
};

const validPost = (req, res, next) => {
	const { text } = req.body;
	Object.entries(req.body).length === 0
		? res.status(400).json({ message: 'No User Data' })
		: !text
		? res.status(400).json({ message: 'Missing required text field' })
		: next()
};

const validPostId = (req, res, next) => {
	const { id } = req.params;
	postDb.getById(id)
				.then(post => {
					post
						? req.post
						: res.status(400).json({ message: 'Invalid Post ID!' });
					next()
				})
};

module.exports = {
	logger,
	validUser,
	validUserId,
	validPost,
	validPostId,
};