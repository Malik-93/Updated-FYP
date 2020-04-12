const express = require('express');
const router = express.Router();
const couponControllers = require('../../controllers/coupons/coupons');
router.post('/create_coupon', couponControllers.GENERATE_COUPONS);
module.exports = router;