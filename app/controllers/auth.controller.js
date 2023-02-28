const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
  let address = req.body.address;
  address = address.toLowerCase();
  try {
    let user = await User.findOne({ address: address }).exec()
    if (!user) {
      user = new User({ address: address});
      user = await user.save();
    }    
    var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: config.expiresIn })
    res.status(200).send({
      address: user.address,
      accessToken: token
    });
  } catch(err) {
    res.status(500).send({ message: err });
    return;
  }
};
