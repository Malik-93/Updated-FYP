const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const discountCouponsSchema = new Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        code: { type: String, require: true, unique: true },
        isPercent: { type: Boolean, require: true, default: true },
        amount: { type: Number, required: true }, // if is percent, then number must be ≤ 100, else it’s amount of discount
        expireDate: { type: String, require: true, default: "" },
        isActive: { type: Boolean, require: true, default: true }
    });
    const Coupon = mongoose.model('coupons', discountCouponsSchema);
    module.exports = {
        Coupon
    }