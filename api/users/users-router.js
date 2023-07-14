const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
const User = require("./users-model");
const Post = require("../posts/posts-model");

// The middleware functions also need to be required

const router = express.Router();
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

router.get("/", (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const user = req.user;
  res.json(user);
});

router.post("/", validateUser, async (req, res) => {
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

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id)
    .then(() => {
      res.json(req.user);
    })
    .catch(next);
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
});

router.post(
  "/:id/posts",
  validateUserId,
  validatePost,
  async (req, res, next) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    try {
      const post = await Post.insert({
        text: req.text,
        user_id: req.params.id,
      });
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }
);

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Something bad happened",
  });
});

// do not forget to export the router

module.exports = router;
