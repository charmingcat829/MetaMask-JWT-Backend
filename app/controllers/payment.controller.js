const db = require("../models");
const Payment = db.payment;
const User = db.user;

exports.addPayment = (req, res) => {
  const payment = new Payment({
    address: req.body.address,
    amount: req.body.amount,
    created_at: req.body.created_at,
    payment_method: req.body.payment_method
  });

  payment.save((err, payment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Payment occured successfully!" });
  });
}

exports.getPaymentByAddress = (req, res) => {
  Payment.aggregate([
    {
      $match: { address: req.body.address }
    },
    {
      $group: { _id: '', total_amount: { $sum: "$amount" } }
    } 
  ]).exec((err, payment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    payment[0].address = req.body.address;
    res.status(200).send({
      payment
    });
  }); 
};

exports.getTotalPayment = (req, res) => {
  Payment.aggregate([{
    $group: {
        _id: '',
        amount: { $sum: '$amount' }
    }
  }]).exec((err, payment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      payment
    });
  });
};


