const express = require('express');
const morgan = require('morgan');
const server = express()
const bodyParser = require("body-parser");
const cors = require('cors')
const {Product} = require('./models/models')

server.use(cors());
server.use(morgan('dev'));


server.use(express.static('./build'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Mudassir_Malik:mLab1234@ds139775.mlab.com:39775/clothing-store', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('Successfully connected to database')
})

server.use('/users', require('./routes/users'));

server.get('/allProducts', (req, res) => {
    Product.find().exec((err, result) => {
        if (err) throw res.send({success: false, error: err})
        res.send({success: true, data: result})
    })
})

server.get('/getDbProducts', (req, res) => {

    Product.find({title: 'mens'}).exec((err, result) => {
        if (err) throw res.send(err) ;
        res.send({success: true, data: result});
    })
}) 

server.get('/details/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
     if(err) throw res.send(err)
     res.send({success: true, data: product})
    })
})

server.get('/getDbmens', (req, res) => {

    Product.find({title: 'mens'}).exec((err, result) => {
        if (err) throw res.send(err) ;
        res.send({success: true, data: result});
    })
}) 

server.get('/womens', (req, res) => {

    Product.find({title: 'womens'}).exec((err, result) => {
        if (err) throw res.send(err) ;
        res.send({success: true, data: result});
    })
}) 

server.get('/kids', (req, res) => {

    Product.find({title: 'kids'}).exec((err, result) => {
        if (err) throw res.send(err) ;
        res.send({success: true, data: result});
    })
}) 

server.post('/addProduct', (req, res) => {
    var product = new Product({ 
        title: req.body.title, 
        price: req.body.price, 
        company: req.body.company,
        info: req.body.info,
        count: req.body.count,
        total: req.body.total,
        inCart: req.body.incar 
    })
    product.save((err, product) => {
        if (err) {
            console.log({success: false, err: err})
            // return res.json({ success: false, err: err })
        }
        console.log(res.json({success: true, data: product}))
        // res.json({ success: true, data: user })

    });
})

server.listen(process.env.PORT || 8000, () => console.log("server is running on port 8000"))
