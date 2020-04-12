const { Cart } = require('../../models/cart');
const responseHandler = require('../../utils').reponseHandler;
const updateCartHandler = (res, uId, updatedCart) => {
    Cart.findOneAndUpdate({ _userId: uId }, {
        $set: {
            cart: updatedCart,
        }
    })
        .exec()
        .then(result => {
            return responseHandler(res, 200, { success: true, message: 'Product Quantity Updated' })
        })
        .catch(err => {
            return responseHandler(res, 501, { success: false, message: 'Error occured during quantity updates', Error: err })
        })
}
exports.ADD_ITEM_TO_CART = (req, res, next) => {
    const { product, userID } = req.body;
    Cart.findOne({ _userId: userID })
        .exec()
        .then(user => {
            if (user) {
                // console.log(user)
                let { cart } = user;
                let existingProduct = cart.find(item => {
                    if (item._productid === product._productid) {
                        return item
                    } else {
                        return false
                    }
                });
                if (existingProduct) {
                    let updateProduct = cart.map(doc => {
                        if (doc._productid === existingProduct._productid) {
                            doc.quantity += product.quantity
                        }
                        return doc
                    })
                    updateCartHandler(res, userID, updateProduct)
                    // check(res, userID, updateProduct)
                } else {
                    product.quantity = parseInt(product.quantity);
                    cart.push(product);
                    user.cart = cart
                    user.save()
                        .then(result => {
                            return responseHandler(res, 200, { success: true, message: 'Cart item Updated' })
                        })
                        .catch(err => {
                            return responseHandler(res, 501, { success: false, message: 'Error occured during cart items updates', Error: err })
                        })
                }
            } else {
                let arr = [];
                product.quantity = parseInt(product.quantity);
                arr.push(product);
                let newCart = new Cart();
                newCart._userId = userID;
                newCart.cart = arr;
                newCart
                    .save()
                    .then(result => {
                        return responseHandler(res, 200, { success: true, message: 'Product Added to cart' })
                    })
                    .catch(err => {
                        return responseHandler(res, 501, { success: false, message: 'Error occured during product saving', Error: err })
                    })
            }
        })
        .catch(err => {
            return responseHandler(res, 500, { success: false, message: 'Something went wrong', Error: err })
        })
}
exports.GET_CART_ITEMS = (req, res, next) => {
    const { userID } = req.params;
    Cart.findOne({ _userId: userID })
        .exec()
        .then(cart => {
            if (!cart) {
                return responseHandler(res, 200, { success: true, statusCode: 404, message: 'User Not Found' })
            }
            else if (!cart.cart.length) {
                return responseHandler(res, 200, { success: true, statusCode: 404, message: 'Cart is Empty' })
            }
            return responseHandler(res, 200, { success: true, userCart: cart.cart })
        })
        .catch(err => {
            return responseHandler(res, 501, { success: true, message: 'Something Went Wrong', Error: err })
        })
}
