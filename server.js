// IMPORT MODULES
const express         = require('express');
const cors            = require('cors');

// IMPORT ROUTERS
const users           = require('./users/userRouter');

// INITIATE EXPRESS AS SERVER
const server          = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// ROUTER = "./api/users"
server.use('/api/users', users);
server.use('/users', users);

//custom middleware

function logger(req, res, next) {}

module.exports = server;
