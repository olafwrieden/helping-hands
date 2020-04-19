import * as express from 'express';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { validate } from '../../../../middleware/validator';
import { body } from 'express-validator';
import { Users } from "../../../entity/Users";
const router = express.Router();

/**
 * Register Validation Rules
 */
const registerInputRules = () => {
  return [
    body("firstName").isAlpha().isLength({ min: 2 }).trim().escape(),
    body("lastName").isAlpha().isLength({ min: 2 }).trim().escape(),
    body("email", "Invalid email address")
      .isEmail(),
    body("password", "Your password must be at least 6 characters long")
      .isLength({ min: 6 })
      .trim()
      .escape(),
    body("gender").isIn(["male", "female", "other"]),
    body("phone").exists().trim(),
    body("address").exists().trim(),
    body("city").exists().trim(),
    body("zipCode").exists().trim(),
  ];
};

router.post("/", registerInputRules(), validate, async (req, res) => {
  const connection = getConnection('default')
  const User = connection.getRepository<Users>("Users");
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    phone,
    address,
    city,
    zipCode,
    canDrive,
    isVolunteer
  } = req.body;

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
    firstName,
    lastName,
    email,
    password: hashedPassword,
    gender,
    phone,
    address,
    city,
    zipCode,
    canDrive,
    isVolunteer
  });

  // Return User
  const user: Users = await User.findOne(newUser.id);
  if (!user) {
    return res.status(500).send({ error: "A new user could not be created." });
  }

  res.send({ message: "The new user was successfully registered.", user });
});

export default router;
