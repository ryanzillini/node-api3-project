const express = require("express");
const User = require("./users-model");

// You will need `users-model.js` and `posts-model.js` both
const Post = require("../posts/posts-model");
// The middleware functions also need to be required

const router = express.Router();
const { validateUserId, validateUser } = require("../middleware/middleware");

router.get("/", async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const user = await User.get();
    if (!user) {
      res.status(404).json({ message: "users not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const user = req.user;
  res.json(user);
});

router.post("/", validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = await User.insert(req.body);
  try {
    if (newUser) {
      res.json(newUser);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Something bad happened",
  });
});

// do not forget to export the router

module.exports = router;
