const express = require('express');
const morgan = require('morgan');
const server = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const configs = require('./configurations');
const mongoose = require('mongoose')
const productsRoutes = require('./routes/products/products');
const cartRoutes = require('./routes/cart/cart');
const couponRoutes = require('./routes/coupons/coupons');

server.use(cors());
server.use(morgan('dev'));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zohaib_clothing', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: false })
mongoose.connection.once('open', () => {
    console.log('Successfully connected to database')
})
// server.use(express.static('./build'))
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/uploads', express.static('uploads'))
// Users
server.use('/api/users', require('./routes/users'));
// Proucts
server.use('/api/products', productsRoutes);
// Cart
server.use('/api/cart', cartRoutes)
// Coupons
server.use('/api/coupons', couponRoutes)

const PORT = configs.PORT;
server.listen(process.env.PORT || PORT, () => console.log(`server is running on port ${PORT}`))
