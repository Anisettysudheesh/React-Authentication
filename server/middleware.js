const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    try {
        let token = req.header("x-token");
        if (!token) {
            return res.status(400).send("Token not found");
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.user;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send("Invalid token");
    }
};