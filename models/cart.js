const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    cart: {
        type: Array,
        default: []
    }
})
const Cart = mongoose.model('Cart', cartSchema);
module.exports = {
    Cart
}