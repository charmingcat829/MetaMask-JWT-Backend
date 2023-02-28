const router = require('express').Router();


// Users routes

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./user.routes'));
router.use('/payments', require('./payment.routes'));

module.exports = router;