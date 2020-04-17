let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ greeting: `Hello From Express, ${req.user.first_name}!` });
  } else {
    res.send({ greeting: "Not authed to see message!" });
  }
});

router.post("/", (req, res) => {
  res.send({ greeting: `Hello, ${req.body.name}!` });
});

module.exports = router;
