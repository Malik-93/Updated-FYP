const { User } = require('../../models/models');
const responseHandler = require('../../utils').reponseHandler;
exports.ADD_ITEM_TO_CART = (req, res, next) => {
    const { product } = req.body;
    User.findByIdAndUpdate({ _id: product.userID })
        .exec()
        .then(user => {
            const { cart } = user;
            let checkExistingProduct = cart.find(item => {
                if (item._id === product._id) {
                    return true
                } else {
                    return false
                }
            });
            if (checkExistingProduct) {
                return responseHandler(res, 403, { success: true, message: 'Product Already Exist' })
            } else {
                cart.push(product);
                user.cart = cart
                user.save()
                    .then(result => {
                        return responseHandler(res, 200, { success: true, message: 'Product Added to cart', result })
                    })
                    .catch(err => {
                        return responseHandler(res, 501, { success: false, message: 'Error occured after product saved', Error: err })
                    })
            }
        })
        .catch(err => {
            return responseHandler(res, 501, { success: false, message: 'Something went wrong', Error: err })
        })
}
