const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

const { JWT_TOKEN } = process.env;

exports.verifyUser = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({
            status: 0,
            message: 'No token provided.'
        });
    }

    const token = authorizationHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.decoded = decoded;

        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTimestamp) {
            return res.json({
                status: 0,
                message: 'Token has expired.'
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            status: 0,
            message: 'Invalid or expired token.'
        });
    }
};


exports.verifyAdmin = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({
            status: 0,
            message: 'No token provided.'
        });
    }

    const token = authorizationHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.decoded = decoded;

        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTimestamp) {
            return res.json({
                status: 0,
                message: 'Token has expired.'
            });
        }

        if (req.decoded.isAdmin != true) {
            return res.json({
                status: 0,
                message: 'authorization failed.'
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            status: 0,
            message: 'Invalid or expired token.'
        });
    }
};

