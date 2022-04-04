const USER = require('../models/').USER; //Model
const Views = '../views'
const crypto = require('crypto');
//아직 view에 대한 계획 X
//router에서 받은 request에 대해 Model에서 받은 데이터 작업 수행 후 결과 View로 전달

//회원가입
exports.Signup = async function(req, res) {
    try {
        let salt_value = Math.round((new Date().valueOf() * Math.random())) + "";
        let hash_pw = crypto.createHash("sha512").update(req.body.pw + salt_value).digest("hex");
        await USER.findOne({where : {id: req.body.id}})
        .then((data) => {
            if(data) { // 반환 데이터가 있다면 이미 존재하는 id
                res.status(400).send({
                    message: "이미 존재하는 아이디입니다."
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
                    res.status(200).send('회원가입 성공');
                })
                .catch((err) => {
                    res.send(err);
                });
            }      
        });
    } catch (error) {
        console.log(error);
            res.status(400).send({
                errorMessage: '회원가입 중 오류 발생했습니다. '
            })
    }
}