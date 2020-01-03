const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const errorCode = require('../code/error');
const router = express.Router();

router.all('/*', function (req, res, next) {
    sess = req.session;

    if (!sess.user) {
        return next(createError(401, errorCode.error_unauthorized_401));
    }
    next('route');
});

module.exports = router;

