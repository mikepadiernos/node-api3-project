// IMPORT MODULES
const express         = require('express');
const cors            = require('cors');
const helmet          = require('helmet');

// IMPORT MIDDLEWARES
const middle          = require('./middleware/middleware');

// MIDDLEWARES
const logger          = middle.logger;

// IMPORT ROUTERS
const users           = require('./users/userRouter');
const posts           = require('./posts/postRouter');

// INITIATE EXPRESS AS SERVER
const server          = express();

server.use(helmet(), logger, express.json(), cors());

server
  .route('/')
  .get( (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });

// ROUTER - "./api/users"
server.use('/api/users', users);
server.use('/users', users);

// ROUTER - "./api/posts"
server.use('/api/posts', posts);
server.use('/posts', posts);

module.exports = server;
