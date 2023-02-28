const mongoose = require("mongoose");

const Payment = mongoose.model(
  "Payment",
  new mongoose.Schema({
    address: String,
    amount: Number,
    created_at: Date,
    payment_method: String
  })
);

module.exports = Payment;
