const jwt = require('jsonwebtoken');
const keys = require('../configurations');
const responseHandler = require('../utils').reponseHandler;
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, keys.JWT_SECRET);
        req.userData = decoded;
        next()
    }
    catch (error) {
        return responseHandler(res, 401, {
            message: 'Un Authorized'
        })
    }
}