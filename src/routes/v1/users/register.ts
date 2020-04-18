import * as express from 'express';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { validate } from '../../../../middleware/validator';
import { body } from 'express-validator';
import {Users} from "../../../entity/Users";
const router = express.Router();

/**
 * Register Validation Rules
 */
const registerInputRules = () => {
  return [
    body("firstName").isAlpha().isLength({ min: 2 }).trim().escape(),
    body("lastName").isAlpha().isLength({ min: 2 }).trim().escape(),
    body("email", "Invalid email address")
      .isEmail()
      .normalizeEmail({ all_lowercase: true, gmail_remove_dots: false }),
    body("password", "Your password must be at least 6 characters long")
      .isLength({ min: 6 })
      .trim()
      .escape(),
  ];
};

router.post("/", registerInputRules(), validate, async (req, res) => {
  const connection = getConnection('default')
  const User = connection.getRepository<Users>("Users");
  const { email, password } = req.body;

  // Does a user with this email already exist?
  const exists = await User.findOne({ email });
  if (exists) {
    return res
      .status(409)
      .send({ error: "A user with this email address already exists." });
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create User
  const newUser = await User.save({
    ...req.body,
	  password: hashedPassword
  });

  // Return User
  const user: Users = await User.findOne(newUser.id);
  if (!user) {
    return res.status(500).send({ error: "A new user could not be created." });
  }

  res.send({ user });
});

export default router;
