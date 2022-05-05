const THEME = require('../models/').THEME;
const RESTAURANT = require('../models/').RESTAURANT;
const sequelize = require('sequelize');

//메인 정보불러오기
exports.Main = async function(req, res) {
    try { 
        console.log(sequelize.fn);
        let themeInfo = await THEME.findAll({
                attributes: [sequelize.fn('DISTINCT', sequelize.col('theme_title')), 'theme_title', 'theme_img']
            })
        console.log(themeInfo);
        let themeList = [...themeInfo];

        res.status(200).json(
            themeList
        )
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: '테마 정보를 불러오는 과정에서 오류가 발생했습니다. '
        })
    }
}

//테마별추천페이지 음식점 정보불러오기
exports.Theme_list = async function(req, res) {
    try {
        let themeInfo = await THEME.findOne({
            attributes: ['theme_title', 'theme_content'], 
            where : {
                theme_title : req.params.theme_title
            }
        })
        console.log("THEME INFO IS"+themeInfo);
        let themeRestaurantList = await THEME.findAll({
            attributes: ['r_code', 'restaurant_intro'], 
            where : {theme_title : req.params.theme_title}, 
            row: true
        })
        console.log(themeRestaurantList);
        let themeList = [];
            //받은 r_code 리스트로 해당 음식점 정보 리스트 받아오기
        for (const key of themeRestaurantList){
            console.log(key.dataValues.r_code);

            restaurantInfo = await RESTAURANT.findOne({
                where : {r_code: key.dataValues.r_code}
                })
            themeList.push({
                r_code: restaurantInfo.r_code, 
                restaurant_name: restaurantInfo.r_name, 
                img: restaurantInfo.image.split('"')[1],
                address: restaurantInfo.address,
                star: restaurantInfo.stars,
                intro: key.dataValues.restaurant_intro, 
                options: {
                    takeout: restaurantInfo.takeout,
                    parking: restaurantInfo.parking,
                }
            })
        }
        res.status(200).json({ 
            theme_title: themeInfo.theme_title,
            theme_content: themeInfo.theme_content,  
            restaurant_info: themeList
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: '테마 정보를 불러오는 과정에서 오류가 발생했습니다. '
        })
    }
}