let express = require("express");
let router = express.Router();

router.use("/register", require("./Auth/Register"));
router.use("/login", require("./Auth/Login"));
router.use("/logout", require("./Auth/Logout"));
router.use("/users", require("./User"));
router.use("/profile", require("./User/Profile"));

module.exports = router;
