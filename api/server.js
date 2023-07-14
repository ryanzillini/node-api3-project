const express = require("express");
const morgan = require("morgan");

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(morgan("dev"));

// global middlewares and the user's router need to be connected here

const usersRouter = require("./users/users-router");
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
