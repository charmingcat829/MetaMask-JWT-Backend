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

exports.getPaymentByAddress = async (req, res) => {
  let address = req.params.address;
  address = address.toLowerCase();
  try {
    let user = await User.findOne( { address: address}).exec();
    if (!user) {
      res.status(404).send({message: "NO Exist User"});
      return;
    }
    let total_amount = await Payment.aggregate([
      {$match: { address: user.address }}, 
      {$group: { _id: '', total_amount: { $sum: "$amount" } }}
    ]).exec();
    res.status(200).send({ address : user.address, total_amount: total_amount[0].total_amount});
  } catch(err) {
    res.status(500).send({message : err});
    return;
  } 
};



