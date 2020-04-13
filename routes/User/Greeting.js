let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send({ greeting: "Hello From Express!" });
});

router.post("/", (req, res) => {
  res.send({ greeting: `Hello, ${req.body.name}!` });
});

module.exports = router;
