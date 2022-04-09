const LIKE = require('../models/').LIKE; //Model

//찜설정or찜취소
exports.Like = async function(req, res) {
    try {
        await LIKE.findOne({where : {token: req.body.token, r_code: r_code}})
        .then((data) => {
            if(data) { // 반환 데이터가 있다면 취소요청이 들어온 것
                LIKE.destroy({
                    where: {token: req.body.token, r_code: r_code}
                })
                res.status(200).send({
                    message: "찜이 취소됐습니다."
                });
            }
            else {
                LIKE.create({
                    token : req.body.token, 
                    r_code : req.body.r_code
                })
                .then((result) => {
                    res.status(200).send('찜하셨습니다. ');
                })
                .catch((err) => {
                    res.send(err);
                });
            }      
        });
    } catch (error) {
        console.log(error);
            res.status(400).send({
                errorMessage: '찜 처리중 오류가 발생했습니다. '
            })
    }
}