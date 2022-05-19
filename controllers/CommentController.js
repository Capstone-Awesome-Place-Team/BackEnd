const RESTAURANT = require("../models/").RESTAURANT;
const COMMENT = require("../models/").COMMENT;
const USER = require("../models/").USER;
const sequelize = require("sequelize");

exports.Write = async function (req, res) {
    try {
        let token = req.headers.authorization.split("Bearer ")[1];
        //해당 user의 id 받아오기
        let userid = await USER.findOne({
            attribute: ["id"],
            where: { token: token },
        });
        let overlap = false; //중복여부
        await COMMENT.findOne({
            attributes: ["c_code"],
            where: { r_code: req.body.r_code, id: userid.dataValues.id },
        }).then((result) => {
            if(result!=null){
                overlap = true;
            }
        });
        if(overlap === false){
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
            console.log("댓글 수: "+comment_count);
            console.log("oldRestaurantStars * comment_count: "+(oldRestaurantStars * comment_count));
            console.log("comment_count + 1.0: "+(comment_count + 1.0));
            
            let newRestaurantStars = ((oldRestaurantStars * comment_count) + req.body.comments.star) / (comment_count + 1.0)
            console.log("별점평균: "+newRestaurantStars);
            //댓글 저장
            await COMMENT.create({
                r_code: req.body.r_code,
                id: userid.dataValues.id,
                comment_title: req.body.comments.title,
                comment_content: req.body.comments.content,
                star: req.body.comments.star
            })
                .catch((err) => {
                    console.log(err)
                });
            //음식점 별점 수정
            RESTAURANT.update(
                {
                    stars: newRestaurantStars,
                },
                { where: { r_code: req.body.r_code } }
            )
                .catch((err) => {
                    console.log(err)
                });
            res.status(201).json({
                message: "댓글 저장 성공",
            });
        } else {
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