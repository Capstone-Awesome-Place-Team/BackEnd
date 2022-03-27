//request의 end point를 어떤 모듈에서 처리할 지
var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController')
//controller 읽기

router.get('/user', userController.GetUser);
router.post('/user/signup', userController.SignupUser);

module.exports = router;