const express = require('express');
const morgan = require('morgan');
const server = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const { Product } = require('./models/models');
const configs = require('./configurations');
const mongoose = require('mongoose')
const productsRoutes = require('./routes/products/products');
server.use(cors());
server.use(morgan('dev'));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zohaib_clothing', { useNewUrlParser: true, useUnifiedTopology: true })
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
server.use('/api/products', productsRoutes)
server.get('/getDbProducts', (req, res) => {

    Product.find({ title: 'mens' }).exec((err, result) => {
        if (err) throw res.send(err);
        res.send({ success: true, data: result });
    })
})

server.get('/details/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) throw res.send(err)
        res.send({ success: true, data: product })
    })
})

server.get('/getDbmens', (req, res) => {
    Product.find({ title: 'mens' }).exec((err, result) => {
        if (err) throw res.send(err);
        res.send({ success: true, data: result });
    })
})

server.get('/womens', (req, res) => {

    Product.find({ title: 'womens' }).exec((err, result) => {
        if (err) throw res.send(err);
        res.send({ success: true, data: result });
    })
})

server.get('/kids', (req, res) => {

    Product.find({ title: 'kids' }).exec((err, result) => {
        if (err) throw res.send(err);
        res.send({ success: true, data: result });
    })
})

const PORT = configs.PORT;
server.listen(process.env.PORT || PORT, () => console.log(`server is running on port ${PORT}`))
