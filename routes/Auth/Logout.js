const express = require("express");
const passport = require("passport");
const { validate } = require("../../middleware/validator");
const { body } = require("express-validator");

const router = express.Router();

router.get("/", async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
    console.log('signed out at api')
    return res.send({ status: "Signed Out!" });
  });

  /* passport.authenticate("local", (err, user, info) => {
    console.log(user, "user");
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
  })(req, res, next); */
});

module.exports = router;
