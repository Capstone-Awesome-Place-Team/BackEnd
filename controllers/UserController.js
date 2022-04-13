const USER = require('../models/').USER; //Model
const Views = '../views'
const crypto = require('crypto');
require("dotenv").config();
const jwt = require('jsonwebtoken');

//아직 view에 대한 계획 X
//router에서 받은 request에 대해 Model에서 받은 데이터 작업 수행 후 결과 View로 전달

//회원가입
exports.Signup = async function(req, res) {
    try {
        //해시 암호화
        let salt_value = Math.round((new Date().valueOf() * Math.random())) + "";
        let hash_pw = crypto.createHash("sha512").update(req.body.pw + salt_value).digest("hex");
        //id 중복확인 후 회원가입 진행
        await USER.findOne({where : {id: req.body.id}})
        .then((data) => {
            if(data) { // 반환 데이터가 있다면 이미 존재하는 id
                res.status(409).json({
                    error: "이미 존재하는 아이디입니다."
                });
            }
            else {
                USER.create({
                    id : req.body.id,
                    pw : hash_pw,
                    salt : salt_value,
                    nickname : req.body.nickname
                })
                .then((result) => {
                    res.status(201).json({
                        message: '회원가입 성공'
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        error: err
                    });
                });
            }
        });
    } catch (error) {
        console.log(error);
            res.status(400).json({
                error: '회원가입 중 오류 발생했습니다. '
            })
    }
}

//유빈 --- 로그인 구현
const token = () => {
  return {
    access(id) {
      return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : "30m",
      });
    }
    refresh(id) {
      return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn : "180 days",
      });
    }
  }
}

exports.Signin = async function(req, res, next) {
  try {
    let body = req.body;
    if(!body.id) {
      res.status(500).json("존재하지 않는 아이디 입니다.");
      return;
    }

    let result = await USER.findOne({where : {id : req.body.id} });
    let db_pw = result.dataValues.pw;
    let salt = result.dataValues.salt;
    let hash_pw = crypto.createHash("sha512").update(body.pw + salt).digest("hex"); //공부하고 전역 변수로 설정할 수 있는지 알아보기

    if (db_pw === hash_pw) {
        res.json({
            message : "로그인에 성공하였습니다",
            status : '200',
            data : { id : body.id },
            jwt : { //authData
              accessToken : token().access(req.query.id),
              refreshToken : token().refresh(req.query.id),
            }
        }); //브라우저에 그대로 노출됨 *수정필요
    }
    else { res.status(500).json({ message: "잘못된 비밀번호 입니다" }); }
    next();
  }
  catch (error) { console.error("알 수 없는 에러입니다:", error.message ) }
}
//---유빈
