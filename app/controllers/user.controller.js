const db = require("../models");
const User = db.user;
const Payment = db.payment;

exports.getUsers = (req, res) => {
  User.find()
    .exec((err, user) => {
      if (err) {
        res.status(404).send({ message: "No Exist User!" });
        return;
      }
      res.status(200).send({
        user
      });
    });
}

exports.getUserByAddress = async (req, res) => {
  let address = req.params.address;
  address = address.toLowerCase();
  try {
    let user = await User.findOne({ address: address }).exec();

    if (!user) {
      res.status(404).send({ message : "No Exist User!"});
      return;
    }    
    let payment = await Payment.find({ address: address}).exec();
    let total_amount = await Payment.aggregate([
      {$match: { address: address }}, 
      {$group: { _id: '', total_amount: { $sum: "$amount" } }}
    ]).exec();
    res.status(200).send({
      user: user.address,
      payment,
      total_amount: total_amount[0].total_amount
    });
  } catch(err) {
    res.status(500).send({ message: err });
    return;
  }
};