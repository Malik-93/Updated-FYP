const {Coupon } = require('../../models/coupon');
const couponGenerator = require('../../utils').couponGenerator;
const responseHandler = require('../../utils').reponseHandler;
const moment = require('moment');
exports.GENERATE_COUPONS = (req, res, next) => {
    const {userID} = req.body;
    let coupon =  couponGenerator();
    const newCoupon = new Coupon();
    newCoupon.userId = userID;
    newCoupon.code = coupon;
    newCoupon.isPercent = false;
    newCoupon.amount = 50;
    newCoupon.expireDate = moment().set('date', moment().get('date') + 1).format('DD-MMM-YYYY');
    newCoupon.isActive = true;
    newCoupon
    .save()
    .then(product => {
        return responseHandler(res, 200, { success: true, statusCode: 200, message: 'Coupon Created Sccuessfully', data: product });
    })
    .catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            return responseHandler(res, 501, { success: false, Error: 'Duplicate Code Detection', err });
        } else {
            return responseHandler(res, 501, { success: false, Error: 'Error occurend during coupon creation:', err });

        }
    })
}