const express = require("express");
const router = express.Router();

const auth = require("./../middleware/auth");
const indexController = require('./../controllers/index')

router.get('/', indexController.index);
router.patch("/api/roles", indexController.roles);


module.exports = router;