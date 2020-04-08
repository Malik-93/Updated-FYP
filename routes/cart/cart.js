const express = require('express');
const router = express.Router();
const cartControllers = require('../../controllers/cart/cart');
router.patch('/add_item_to_cart', cartControllers.ADD_ITEM_TO_CART);
module.exports = router;