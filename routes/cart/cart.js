const express = require('express');
const router = express.Router();
const cartControllers = require('../../controllers/cart/cart');
router.post('/add_item_to_cart', cartControllers.ADD_ITEM_TO_CART);
router.get('/get_cart_items/:userID', cartControllers.GET_CART_ITEMS);
module.exports = router;