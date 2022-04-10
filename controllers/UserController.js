//Model
const USER = require('../models/').USER; 
const RESTAURANT = require('../models/').RESTAURANT;
const LIKE = require('../models/').LIKE;


const Views = '../views'

//해시 암호화 내장 모듈
const crypto = require('crypto');

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
            res.status(200).json({ 
                nickname: userNickname, 
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
