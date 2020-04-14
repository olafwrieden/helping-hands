let express = require("express");
let router = express.Router();

router.use("/register", require("./Auth/Register"));
router.use("/login", require("./Auth/Login"));
router.use("/users", require("./User"));

module.exports = router;
