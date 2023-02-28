//const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/payment.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/payment/addpayment", controller.addPayment);
  app.get("/api/payment/gettotalpayment", controller.getTotalPayment);
  app.get("/api/payment/getpaymentbyaddress", controller.getPaymentByAddress);

};
