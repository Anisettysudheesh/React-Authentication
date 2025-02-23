const Register = require('./mongo'); // Import your User model

module.exports = async function(req, res, next) {
  try {
    const userId = req.header("x-user-id"); // Get user ID from header
    if (!userId) {
      return res.status(400).send("User ID not found");
    }

    // Verify that the user exists in the database
    const user = await Register.findById(userId);
    if (!user) {
      return res.status(400).send("Invalid user");
    }

    req.user = { id: userId }; // Attach the user ID to the request
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid user");
  }
};