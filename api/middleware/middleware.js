function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`
  Request Method: ${req.method},
  Request URL: ${req.url},
  Timestamp: ${new Date().toLocaleString()}
  `);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log("ValidateUserId middleware");
  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log("ValidateUser middleware");
  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log("ValidatePost middleware");
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
};
