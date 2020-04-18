import * as express from 'express';
import { validate } from '../../../../middleware/validator';
import { body } from 'express-validator';
import * as passport from 'passport';

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

router.post("/", loginInputRules(), validate, async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (info) return res.status(401).send(info);
    if (err) {
      return res.status(500).send({ error: "An error occurred!" });
    }
    if (!user) {
      return res.send({
        error: "You have entered an invalid email or password.",
      });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.send({ user });
    });
  })(req, res, next);
});

export default router;
