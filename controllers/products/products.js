const { Product } = require('../../models/models');
const responseHandler = require('../../utils').reponseHandler;
const serverURL = require('../../configurations').URL;
exports.ADD_PRODUCT = (req, res, next) => {
    const newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        price: req.body.price,
        productImage: req.file.path,
        sizesAvail: req.body.sizesAvail || ['small', 'medium', 'large', 'xlarge'],
        colorsAvail: req.body.colorsAvail || ['grey', 'blue', 'black']
    })
    newProduct.save()
        .then(product => {
            return responseHandler(res, 200, { success: true, message: 'Product Created Sccessfully', data: product });
        })
        .catch(err => {
            return responseHandler(res, 501, { success: false, Error: 'Product Creating error:', err });
        })
}

exports.GET_ALL_PRODUCTS = (req, res, next) => {
    Product.find()
        .exec()
        .then(products => {
            if (!products.length) {
                return responseHandler(res, 404, { success: true, message: 'There are no products in db yet' });
            }
            return responseHandler(res, 200, { success: true, products })
        })
        .catch(err => {
            return responseHandler(res, 501, { success: false, message: 'Something went wrong', Error: err })
        })
}

exports.GET_ONE_PRODUCT = (req, res, next) => {
    Product.findById({ _id: req.params.productId })
        .exec()
        .then(product => {
            if (!product) {
                return responseHandler(res, 404, { success: false, message: 'Product not found' });
            }
            return responseHandler(res, 200, { success: true, product })
        })
        .catch(err => {
            return responseHandler(res, 501, { success: false, message: 'Something went wrong', Error: err })
        })
}

exports.UPDATE_PRODUCT = (req, res, next) => {
    Product.findByIdAndUpdate({ _id: req.params.productId }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            company: req.body.company,
            price: req.body.price,
            productImage: req.file.path
        }
    })
        .exec()
        .then(product => {
            if (!product) {
                return responseHandler(res, 404, { success: false, message: 'Product not found' })
            }
            return responseHandler(res, 200, {
                success: true,
                message: 'Product updated successfully',
                body: {
                    method: 'PATCH',
                    URL: `${serverURL}/${product._id}`,
                    data: product
                }
            })
        })
        .catch(err => {
            return responseHandler(res, 501, { success: false, message: 'Something went wrong', Error: err })
        })
}

exports.DELETE_PRODUCT = (req, res, next) => {
    Product.findByIdAndRemove({ _id: req.params.productId })
        .exec()
        .then(delProdcut => {
            if (!delProdcut) {
                return responseHandler(res, 404, { success: false, message: 'Product not found' })
            }
            return responseHandler(res, 200, { success: true, message: 'Product deleted successfully', data: delProdcut })
        })
        .catch(err => {
            return responseHandler(res, 501, { success: false, message: 'Something went wrong', Error: err })
        })
}