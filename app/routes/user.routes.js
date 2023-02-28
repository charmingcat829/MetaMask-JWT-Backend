const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const express = require('express');
const router = express.Router();

router.get("/", controller.getUsers);
router.get("/:address", controller.getUserByAddress);

module.exports = router;


