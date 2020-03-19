// IMPORT DATABASES
const userDb = require('../users/userDb');
const postDb = require('../posts/postDb');

const logger = (req, res, next) => {
	const method = req.method;
	const endpoint = req.originalUrl;
	const date = new Date();
	console.log(`A ${method} request to ${endpoint} initiated on ${date.toDateString()}`);
	next()
};

const validUser = (req, res, next) => {
	const { name } = req.body;
	Object.entries(req.body).length === 0
		? res.status(400).json({ success: false, message: 'No User Data' })
		: !name
		? res.status(400).json({ success: false, message: 'Name field missing' })
		: next()
};

const validUserId = (req, res, next) => {
	const { id } = req.params;
	userDb.getById(id)
				.then(user => {
					// console.log("User: ", user);
					user
						? req.user = user && next()
						: res.status(400).json({ message: "Invalid User ID" });
				})
				.catch(error => {
					res.status(500).json({success: false, message: "Invalid User ID", error})
				})
};

const validPost = (req, res, next) => {
	const { text } = req.body;
	Object.entries(req.body).length === 0
		? res.status(400).json({ success: false, message: 'No User Data' })
		: !text
		? res.status(400).json({ success: false, message: 'Text field missing' })
		: next()
};

const validPostId = (req, res, next) => {
	const { id } = req.params;
	postDb.getById(id)
				.then(post => {
					post
						? req.post = post && next()
						: res.status(400).json({ success: false, message: 'Invalid Post ID' });
				})
				.catch(error => {
					res.status(500).json({success: false, message: "Invalid Post ID", error})
				})
};

module.exports = {
	logger,
	validUser,
	validUserId,
	validPost,
	validPostId,
};