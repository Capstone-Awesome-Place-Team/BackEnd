//Model
const THEME = require("../models/").THEME;
const RESTAURANT = require("../models/").RESTAURANT;
const sequelize = require("sequelize");

//메인 정보
exports.Main = async function (req, res) {
  try {
    //테마 정보(테마 title, image) select
    let themeInfo = await THEME.findAll({
      attributes: [
        sequelize.fn("DISTINCT", sequelize.col("theme_title")),
        "theme_title",
        "theme_img",
      ],
    });
    let themeList = [...themeInfo];
    res.status(200).json(themeList);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "테마 정보를 불러오는 과정에서 오류가 발생했습니다. ",
    });
  }
};

//테마별추천페이지 음식점 정보
exports.Theme_list = async function (req, res) {
  try {
    let themeList = [];
    //해당 테마 정보 select
    let themeInfo = await THEME.findOne({
      attributes: ["theme_title", "theme_content"],
      where: {
        theme_title: req.params.theme_title,
      },
    });
    //해당 테마 음식점 code, intro select
    let themeRestaurantList = await THEME.findAll({
      attributes: ["r_code", "restaurant_intro"],
      where: { theme_title: req.params.theme_title },
      row: true,
    });
    //r_code 리스트로 해당 음식점 정보 리스트 select
    for (const key of themeRestaurantList) {
      //음식점 상세 정보 select
      restaurantInfo = await RESTAURANT.findOne({
        where: { r_code: key.dataValues.r_code },
      });
      //음식점 정보 하나씩 배열에 삽입
      themeList.push({
        r_code: restaurantInfo.r_code,
        restaurant_name: restaurantInfo.r_name,
        img: restaurantInfo.image.split(" ")[0],
        address: restaurantInfo.address,
        star: restaurantInfo.stars,
        intro: key.dataValues.restaurant_intro,
        options: {
          takeout: restaurantInfo.takeout,
          parking: restaurantInfo.parking,
        },
      });
    }
    if (themeInfo != null) {
      res.status(200).json({
        theme_title: themeInfo.theme_title,
        theme_content: themeInfo.theme_content,
        restaurant_info: themeList,
      });
    } else {
      res.status(400).json({
        theme_title: "",
        theme_content: "",
        restaurant_info: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "테마 정보를 불러오는 과정에서 오류가 발생했습니다. ",
    });
  }
};
