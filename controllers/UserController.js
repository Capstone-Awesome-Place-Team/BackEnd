const express = require('express');
const User = require('../models/User.js'); //Model 읽기
const Views = '../view'
//router에서 받은 request에 대해 Model에서 받은 데이터 작업 수행 후 결과 View로 전달
module.export = {
    SignupUser: function (req, res, next) {
        User.getUser(id).then((result) => {
            res.render(Views + 'index.ejs', {user: result});
        });
    }
}//임시로 넣은 부분이므로 신경 쓰지 말 것
//이 후 회원가입 작업 수행하도록 작성