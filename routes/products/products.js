const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/products/products');
const checkAuth = require('../../middlewares/checkAuth');
const fs = require('fs')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, next) => {
        fs.exists('./uploads/', (exist) => {
            if (exist) {
                next(null, './uploads/')
            } else {
                fs.mkdir('./uploads/', (err, folder) => {
                    next(null, './uploads/')
                })
            }
        })
    },
    filename: (req, file, next) => {
        next(null, new Date().getTime() + file.originalname)
    }
})

const upload = multer({
    storage,
})

router.post('/addProduct', checkAuth, upload.single('productImage'), productsController.ADD_PRODUCT)
router.get('/all_products', productsController.GET_ALL_PRODUCTS)
router.get('/:productId', productsController.GET_ONE_PRODUCT)
router.patch('/:productId', checkAuth, upload.single('productImage'), productsController.UPDATE_PRODUCT)
router.delete('/:productId', checkAuth, productsController.DELETE_PRODUCT)


module.exports = router