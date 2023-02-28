const express = require('express');
const router = express.Router();
const controller = require("../controllers/payment.controller");

router.post("/", controller.createPayment);
router.get("/:address", controller.getPaymentByAddress);
module.exports = router;