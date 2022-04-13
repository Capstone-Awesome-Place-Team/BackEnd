//request의 end point를 어떤 모듈에서 처리할 지
var express = require('express');
var router = express.Router();
const req = require('express/lib/request');
var userController = require('../controllers/UserController')
//controller 읽기

router.post('/signup', userController.Signup); //회원가입 url 매핑
router.post('/signin', userController.Signin); //로그인
module.exports = router;
