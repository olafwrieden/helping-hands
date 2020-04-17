let express = require("express");
const typeorm = require("typeorm");
let router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    const userRepo = typeorm.getRepository("User");
    userRepo
      .findOne(req.user.id)
      .then((user) => res.send(user))
      .catch((err) => res.status(500).send({ error: "An error occurred!" }));
  } else {
    res.status(401).send({ error: "You are not logged in." });
  }
});

module.exports = router;
