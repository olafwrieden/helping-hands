let express = require('express');
let router = express.Router();

let Greeting = require("./Greeting");

router.use("/greeting", Greeting);

module.exports = router;