"use strict"

const createError = require('http-errors');
const express = require('express');
const responseGen = require('../util/response-gen');
let router = express.Router();

router.get('/login', async function (req, res, next) {
    res.render('login');
});

router.post('/login', async function (req, res, next) {
    let sess = req.session;
    let receivedUserId = req.body.id;
    let receivedUserPassword = req.body.password;

    console.log(receivedUserId, receivedUserPassword);

    try {

        if (!receivedUserId || !receivedUserPassword){
            responseGen()
            return next(createError(400, "ID와 Password는 필수 입니다."));
        }

        sess.userId = null;
        let rows = await db.query(sql.sql_select_user_by_id, receivedUserId);

        if (rows.length == 0) {
            return next(createError(401, '해당 사용자를 찾을 수 없습니다.'));
        }

        let userId = rows[0]['userid'];
        let userPassword = rows[0]['pwd'];

        if (userPassword !== receivedUserPassword) {
            return next(createError(401, '패스워드가 일치하지 않습니다.'));
        }

        //로그인 상태 저장
        sess.userId = receivedUserId;
        sess.userInfo = rows[0];
        res.send("정상적으로 로그인 되었습니다.");

    } catch (err) {
        return next(createError(500, err));
    }

});

router.get('/logout', function (req, res, next) {
    let sess = req.session;

    if (sess && sess.userId) {
        sess.destroy();
        res.clearCookie();
        return res.send("정상적으로 로그아웃 되었습니다.");
    } else {
        return next(createError(500, '관리자에게 문의해주세요.'));
    }
});

module.exports = router;