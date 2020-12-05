const express = require("express");
const router = express.Router();

//const userCtrl = require("../controllers/user");
const userCtrl = require("../controllers/users");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.users)

module.exports = router;
