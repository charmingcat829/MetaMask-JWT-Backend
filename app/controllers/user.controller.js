const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getallinfo = (req, res) => {
  User.find()
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({
        user
      });
    });
}

exports.getinfobyaddress = (req, res) => {
  User.findOne({
    address: req.body.address
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      
      res.status(200).send({
        id: user._id,
        username: user.username,
        address: user.address
      });
    });
}