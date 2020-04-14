const express = require("express");
const bcrypt = require("bcryptjs");
const typeorm = require("typeorm");
const { validate } = require("../../middleware/validator");
const { body } = require("express-validator");

const router = express.Router();

/**
 * Login Validation Rules
 */
const loginInputRules = () => {
  return [
    body("email", "Invalid email address")
      .isEmail()
      .normalizeEmail({ all_lowercase: true }),
    body("password", "Your password must be at least 6 characters long")
      .isLength({ min: 6 })
      .trim()
      .escape(),
  ];
};

router.post("/", loginInputRules(), validate, async (req, res) => {
  const User = typeorm.getRepository("User");
  const { email, password } = req.body;

  // Find User by Email
  const user = await User.createQueryBuilder()
    .where({ email })
    .addSelect("password", "User_password")
    .getOne();
  if (!user) {
    return res
      .status(401)
      .send({ error: "You have entered an invalid email or password." });
  }

  // Validate Password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res
      .status(401)
      .send({ error: "You have entered an invalid email or password." });
  }

  // Check if Deactivated
  if (!user.enabled) {
    return res.status(401).send({
      error: "Your login is temporarily suspended.",
    });
  }

  res.send({ message: "Welcome! Your creds are valid." });
});

module.exports = router;
