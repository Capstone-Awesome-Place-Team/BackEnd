//Model
const USER = require('../models/').USER; 
const RESTAURANT = require('../models/').RESTAURANT;
const LIKE = require('../models/').LIKE;

const Views = '../views'

const bodyParser = require('body-parser');
//해시 암호화 내장 모듈
const crypto = require('crypto');

//JWT
require("dotenv").config({});
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middlewares');


//회원가입
exports.Signup = async function(req, res) {
    try {
        let idCheck = /^[A-Za-z0-9+]{1,15}$/; //영대소문자, 숫자 최대 15글자
        let pwCheck = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])([A-Za-z0-9+]){8,15}$/; //영대소문자, 숫자 조합 최소 8자 최대 15자
        let nicknameCheck = /^[가-힣A-Za-z0-9+]{1,15}$/; //한글, 영대소문자, 숫자 최대 15글자
        if (!idCheck.test(req.body.id)) { return res.status(400).json({ error: "아이디 양식이 다릅니다. "})}
        if (!pwCheck.test(req.body.pw)) { return res.status(400).json({ error: "비밀번호 양식이 다릅니다. "})}
        if (!nicknameCheck.test(req.body.nickname)) { return res.status(400).json({ error: "닉네임 양식이 다릅니다. "})}
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
                    res.status(500).json({
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
  
exports.Signin = async function(req, res, next) {
    try {
        let body = req.body;
        let result = await USER.findOne({where : {id : req.body.id} });
        if(!result) {
            res.status(400).json({
                message: "존재하지 않는 아이디 입니다."
            });
            return;
        }
        let db_pw = result.dataValues.pw;
        let salt = result.dataValues.salt;
        let hash_pw = crypto.createHash("sha512").update(body.pw + salt).digest("hex");
  
        if (db_pw === hash_pw) {
            //토큰 생성
            let token = jwt.sign({ id: body.id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '30m' //유효 기간
            })
            USER.update({
                token : token
            }, { where : {
                id : body.id
            }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                });
            });
            res.status(200).json({
                message : "로그인에 성공하였습니다", 
                token
            });
        } else { 
            res.status(500).json({ message: "잘못된 비밀번호 입니다" });
        } 
        next();
    } catch (error) { console.error("알 수 없는 에러입니다:", error.message ) }
}

exports.Mypage = async function(req, res) {
    try { 
        //요청 헤더 내의 authorization 헤더에서 토큰 추출
        let token = req.headers.authorization.split('Bearer ')[1];
        //해당 user의 nickname 받아오기
        let userNickname = await USER.findOne({
            attributes: ['nickname'], 
            where : {token: token}
        })
        if(userNickname) {
            //user가 찜한 음식점의 r_code 받아오기
            let likeRestaurantList = await LIKE.findAll({
                attributes: ['r_code'], 
                where : {token: token}
            })
            let likeList = [];
            //받은 r_code 리스트로 해당 음식점 정보 리스트 받아오기
            for (const key in likeRestaurantList){
                restaurantInfo = await RESTAURANT.findOne({
                    where : {r_code: key}
                    })
                likeList.push({
                    r_code: restaurantInfo.r_code, 
                    restaurant_name: restaurantInfo.r_name, 
                    img: restaurantInfo.image,
                    address: restaurantInfo.address,
                    star:restaurantInfo.stars,
                    options: {
                        takeout: restaurantInfo.takeout,
                        parking: restaurantInfo.parking,
                    }
                })
            }
            let nickname = userNickname.nickname
            res.status(200).json({ 
                nickname: nickname, 
                like_list: likeList
            })
        } else {

        }
    } catch (error) {
        console.log(error);
            res.status(400).json({
                error: '마이페이지 로딩중 오류가 발생했습니다. '
            })
    }
}
