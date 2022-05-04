const RESTAURANT = require('../models/').RESTAURANT;
const COMMENT = require('../models/').COMMENT;
const sequelize = require('sequelize');
const { Op } = require("sequelize");

exports.Category = async function (req, res) {
    try {
        let category = req.body.category;
        let categoryList = [];
        let result = [];
        switch(category)
        {
            case "한식":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%한식%" } } ] }
                });
                break;
            case "중국식":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%중국식%" } } ] }
                });
                break;
            case "일식":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%일식%" } } ] }
                });
                break;
            case "뷔페식":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%뷔페%" } } ] }
                });
                break;
            case "경양식":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%경양식%" } } ] }
                });
                break;
            case "찜탕":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%찜%" } }, { tag: { [Op.like]: "%탕%" } } ] }
                });
                break;    
            case "족발보쌈":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%족발%" } }, { tag: { [Op.like]: "%보쌈%" } } ] }
                });
                break;
            case "회":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%회%" } }, { tag: { [Op.like]: "%스시%" } } ] }
                });
                break;
            case "고기구이":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%고기%" } }, { tag: { [Op.like]: "%숯불구이%" } } ] }
                });
                break;
            case "국수":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%국수%" } }, { tag: { [Op.like]: "%면%" } } ] }
                });
                break;
            case "치킨":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%치킨%" } }, { tag: { [Op.like]: "%닭튀김%" } } ] }
                });
                break;
            case "분식":
                categoryList = await RESTAURANT.findAll({
                    attributes: [ [ sequelize.fn('DISTINCT', sequelize.col('r_code')), 'r_code' ] , 'r_name', 'image', 'address', 'stars', 'price', 'takeout', 'parking' ], 
                    where: { [Op.or]: [ { tag: { [Op.like]: "%분식%" } } ] }
                });
                break;  
            default: 
                res.status(400).json({
                    error: "잘못된 요청입니다. ",
                });
                return;       
        }
        for (const key of categoryList) {
            let comment = await COMMENT.findOne({
                attributes: [ [sequelize.fn('COUNT', sequelize.col('c_code')), 'comment_count'] ], 
                where: { r_code: key.dataValues.r_code }
            });          
            result.push({
                r_code: key.dataValues.r_code,
                restaurant_name: key.dataValues.r_name,
                img: key.dataValues.image,
                address: key.dataValues.address,
                star: key.dataValues.stars,
                comment_count: comment.dataValues.comment_count, 
                price: key.dataValues.price, 
                options: {
                    takeout: key.dataValues.takeout,
                    parking: key.dataValues.parking,
                },
            });
        };
        res.status(200).json(
            result
        )
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "카테고리 로딩중 오류가 발생했습니다. ",
        });
    }
};