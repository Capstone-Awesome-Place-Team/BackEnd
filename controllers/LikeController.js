//Model
const LIKE = require('../models/').LIKE;
const USER = require('../models/').USER;

//찜설정or찜취소
exports.Like = async function (req, res) {
    try {
        //요청 헤더 내의 authorization 헤더에서 토큰 추출
        let token = req.headers.authorization.split('Bearer ')[1];
        //토큰과 일치하는 user id select
        let userid = await USER.findOne({
            attributes: ['id'],
            where: { token: token }
        })
        let id = userid.dataValues.id;
        if (!id) {
            res.status(400).json({
                error: "사용자미상"
            });
            return
        }
        //해당 음식점을 찜했는지 확인
        await LIKE.findOne({ where: { id: id, r_code: req.body.r_code } })
            .then((data) => {
                if (data) { // 반환 데이터가 있다면 취소요청이 들어온 것
                    LIKE.destroy({
                        where: { id: id, r_code: req.body.r_code }
                    })
                    res.status(200).json({
                        message: '찜이 취소됐습니다.'
                    });
                }
                else { //반환 데이터가 없다면 새로이 찜을 하겠다는 것
                    console.log(req.body.r_code);
                    LIKE.create({
                        id: id,
                        r_code: req.body.r_code
                    }).then((result) => {
                        res.status(201).json({
                            message: '찜하셨습니다. '
                        });
                    }).catch((err) => {
                        res.status(400).json({
                            error: err
                        });
                    });
                }
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: '찜 처리중 오류가 발생했습니다. '
        })
    }
}