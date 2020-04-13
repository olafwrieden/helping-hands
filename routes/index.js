let express = require('express');
let router = express.Router();

router.use("/users", require("./User"));

module.exports = router;