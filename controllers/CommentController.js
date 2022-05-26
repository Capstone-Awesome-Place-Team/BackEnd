//Model
const RESTAURANT = require("../models/").RESTAURANT;
const COMMENT = require("../models/").COMMENT;
const USER = require("../models/").USER;
const sequelize = require("sequelize");

//댓글 작성
exports.Write = async function (req, res) {
    try {
        //요청 헤더 내의 authorization 헤더에서 토큰 추출
        let token = req.headers.authorization.split("Bearer ")[1];
        //토큰과 일치하는 user id select
        let userid = await USER.findOne({
            attribute: ["id"],
            where: { token: token },
        });
        let overlap = false; //중복여부
        //해당 user가 해당 음식점에 남긴 댓글이 있는지 확인
        await COMMENT.findOne({
            attributes: ["c_code"],
            where: { r_code: req.body.r_code, id: userid.dataValues.id },
        }).then((result) => {
            if (result != null) {
                overlap = true;
            }
        });
        //남긴 댓글이 없는 경우에만 댓글 작성 가능
        if (overlap === false) {
            let oldRestaurantStars = 0;
            let comment_count = 0;
            await RESTAURANT.findOne({
                attributes: [
                    "stars"
                ],
                where: { r_code: req.body.r_code },
            }).then((result) => {
                oldRestaurantStars = result.dataValues.stars;
            });
            await COMMENT.findOne({
                attributes: [
                    [sequelize.fn("COUNT", sequelize.col("c_code")), "comment_count"],
                ],
                where: { r_code: req.body.r_code },
            }).then((result) => {
                comment_count = result.dataValues.comment_count;
            });
            //평점 계산
            let newRestaurantStars = ((oldRestaurantStars * comment_count) + req.body.comments.star) / (comment_count + 1.0)
            //댓글 저장
            await COMMENT.create({
                r_code: req.body.r_code,
                id: userid.dataValues.id,
                comment_title: req.body.comments.title,
                comment_content: req.body.comments.content,
                star: req.body.comments.star
            }).catch((err) => {
                console.log(err)
            });
            //음식점 별점 수정
            RESTAURANT.update(
                {
                    stars: newRestaurantStars,
                },
                { where: { r_code: req.body.r_code } }
            ).catch((err) => {
                console.log(err)
            });
            res.status(201).json({
                message: "댓글 저장 성공",
            });
        } else { //해당 유저가 해당 음식점에 남긴 댓글이 있는 경우
            res.status(400).json({
                error: "이미 댓글을 남기셨습니다. ",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "댓글 저장 중 오류가 발생했습니다. ",
        });
    }
};