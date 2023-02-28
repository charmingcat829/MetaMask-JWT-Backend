const db = require("../models");
const User = db.user;

checkDuplicateAddress = (req, res, next) => {
  // Address
  User.findOne({
    address: req.body.address
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Address is already in use!" });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateAddress,
};

module.exports = verifySignUp;
