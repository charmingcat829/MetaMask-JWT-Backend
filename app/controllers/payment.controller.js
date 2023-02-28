const db = require("../models");
const Payment = db.payment;
const User = db.user;

exports.createPayment = async (req, res) => {
  let user = await User.findOne({ address: req.body.address }).exec();
  if (!user) {
    res.status(404).send({message : "No Exist User!"});
    return;
  }        

  const payment = new Payment({
    address: req.body.address,
    amount: req.body.amount,
    created_at:  new Date(),
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
  let address = req.params.address;
  address = address.toLowerCase();
  Payment.aggregate([
    {
      $match: { address: address }
    },
    {
      $group: { _id: '', total_amount: { $sum: "$amount" } }
    } 
  ]).exec((err, payment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //payment[0].address = address;
    res.status(200).send({
      payment
    });
  }); 
};



