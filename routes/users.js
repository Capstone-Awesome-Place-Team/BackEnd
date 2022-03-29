const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const models = require("../models");


router.get('/sign_up', function(req, res, next) {
  res.render("user/signup"); //views의 SignUP.ejs? 에 연결로 수정하기
});


router.post("/sign_up", async function(req,res,next){
    let body = req.body;

    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + ""; //솔팅
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex"); //해쉬화

    let result = models.user.create({ //간이 모델
        name: body.userName,
        email: body.userEmail,
        password: hashPassword,
        salt: salt
    })

    res.redirect("/user/sign_up");
})

// 메인 페이지
router.get('/', function(req, res, next) {
    if(req.cookies){
        console.log(req.cookies); //쿠키 가져오기
    }

    res.send("환영합니다 ~");
});

// 로그인 GET
router.get('/login', function(req, res, next) {
    res.render("user/login");
});

// 로그인 POST
/*
router.post("/login", async function(req,res,next){
    let body = req.body;

    let result = await models.user.findOne({
        where: {
            email : body.userEmail
        }
    });

    let dbPassword = result.dataValues.password;
    let inputPassword = body.password;
    let salt = result.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    if(dbPassword === hashPassword){
        console.log("비밀번호 일치");
        // 쿠키 설정
        res.cookie("user", body.userEmail , {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        });
        res.redirect("/user");
    }
    else{
        console.log("비밀번호 불일치");
        res.redirect("/user/login");
    }
});*/

module.exports = router;
