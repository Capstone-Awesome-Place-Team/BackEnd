const RESTAURANT = require("../models/").RESTAURANT;
const COMMENT = require("../models/").COMMENT;
const LIKE = require("../models/").LIKE;
const USER = require("../models/").USER;
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { Like } = require("./LikeController");

exports.Category = async function (req, res) {
  try {
    let category = req.body.category;
    let categoryList = [];
    let result = [];
    switch (category) {
      case "한식":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: { [Op.or]: [{ tag: { [Op.like]: "%한식%" } }] },
        });
        break;
      case "중국식":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: { [Op.or]: [{ tag: { [Op.like]: "%중국식%" } }] },
        });
        break;
      case "일식":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: { [Op.or]: [{ tag: { [Op.like]: "%일식%" } }] },
        });
        break;
      case "뷔페식":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: { [Op.or]: [{ tag: { [Op.like]: "%뷔페%" } }] },
        });
        break;
      case "경양식":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: { [Op.or]: [{ tag: { [Op.like]: "%경양식%" } }] },
        });
        break;
      case "찜탕":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: {
            [Op.or]: [
              { tag: { [Op.like]: "%찜%" } },
              { tag: { [Op.like]: "%탕%" } },
            ],
          },
        });
        break;
      case "족발보쌈":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: {
            [Op.or]: [
              { tag: { [Op.like]: "%족발%" } },
              { tag: { [Op.like]: "%보쌈%" } },
            ],
          },
        });
        break;
      case "회":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: {
            [Op.or]: [
              { tag: { [Op.like]: "%회%" } },
              { tag: { [Op.like]: "%스시%" } },
            ],
          },
        });
        break;
      case "고기구이":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: {
            [Op.or]: [
              { tag: { [Op.like]: "%고기%" } },
              { tag: { [Op.like]: "%숯불구이%" } },
            ],
          },
        });
        break;
      case "국수":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: {
            [Op.or]: [
              { tag: { [Op.like]: "%국수%" } },
              { tag: { [Op.like]: "%면%" } },
            ],
          },
        });
        break;
      case "치킨":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: {
            [Op.or]: [
              { tag: { [Op.like]: "%치킨%" } },
              { tag: { [Op.like]: "%닭튀김%" } },
            ],
          },
        });
        break;
      case "분식":
        categoryList = await RESTAURANT.findAll({
          attributes: [
            [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
            "r_name",
            "image",
            "address",
            "stars",
            "price",
            "takeout",
            "parking",
          ],
          where: { [Op.or]: [{ tag: { [Op.like]: "%분식%" } }] },
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
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("c_code")), "comment_count"],
        ],
        where: { r_code: key.dataValues.r_code },
      });
      result.push({
        r_code: key.dataValues.r_code,
        restaurant_name: key.dataValues.r_name,
        img: key.dataValues.image.split(" ")[0],
        address: key.dataValues.address,
        star: key.dataValues.stars,
        comment_count: comment.dataValues.comment_count,
        price: key.dataValues.price,
        options: {
          takeout: key.dataValues.takeout,
          parking: key.dataValues.parking,
        },
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "카테고리 로딩중 오류가 발생했습니다. ",
    });
  }
};

exports.RestaurantDetail = async function (req, res) {
  try {
    let token = req.headers.authorization.split("Bearer ")[1];
    //해당 user의 nickname 받아오기
    let userid = await USER.findOne({
      attribute: ["id"],
      where: { token: token },
    });
    let like = false;
    await LIKE.findOne({
      where: { id: userid.dataValues.id, r_code: req.params.r_code },
    }).then((result) => {
      if (result == null) {
        like = false;
      } else {
        like = true;
      }
    });
    let comments = [];
    restaurantInfo = await RESTAURANT.findOne({
      attributes: [
        "r_code",
        "r_name",
        "image",
        "address",
        "stars",
        "price",
        "takeout",
        "parking",
      ],
      where: { r_code: req.params.r_code },
    });
    let img_list = restaurantInfo.dataValues.image.split(" ");
    let commentList = await COMMENT.findAll({
      attributes: [
        "id",
        "comment_title",
        "comment_content",
        "star",
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%m/%d"),
          "createdAt",
        ],
      ],
      where: { r_code: req.params.r_code },
    });
    let comment = await COMMENT.findOne({
      attributes: [
        "comment_title",
        "comment_content",
        "star",
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%m/%d"),
          "createdAt",
        ],
      ],
      where: { id: userid.dataValues.id, r_code: req.params.r_code },
    });
    let mycomment;
    if (comment != null) {
      mycomment = {
        star: comment.dataValues.star,
        title: comment.dataValues.comment_title,
        content: comment.dataValues.comment_content,
        time: comment.dataValues.createdAt,
      };
    } else {
      mycomment = {
        star: 0,
        title: "",
        content: "",
        time: "",
      };
    }
    for (const key of commentList) {
      let nickname = await USER.findOne({
        attribute: ["nickname"],
        where: { id: key.dataValues.id },
      });
      comments.push({
        nickname: nickname.dataValues.nickname,
        star: key.dataValues.star,
        title: key.dataValues.comment_title,
        content: key.dataValues.comment_content,
        time: key.dataValues.createdAt,
      });
    }
    res.status(200).json({
      r_code: restaurantInfo.dataValues.r_code,
      restaurant_name: restaurantInfo.dataValues.r_name,
      img_list: img_list,
      address: restaurantInfo.dataValues.address,
      like: like,
      star: restaurantInfo.dataValues.stars,
      price: restaurantInfo.dataValues.price,
      options: {
        takeout: restaurantInfo.dataValues.takeout,
        parking: restaurantInfo.dataValues.parking,
      },
      comments,
      mycomment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "상세페이지 로딩중 오류가 발생했습니다. ",
    });
  }
};

exports.Search = async function (req, res) {
  try {
    let search = req.body.search;
    let searchList = [];
    let nameSearchList = [];
    let result = [];
    searchList = await RESTAURANT.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
        "r_name",
        "image",
        "address",
        "stars",
        "price",
        "takeout",
        "parking",
      ],
      where: { [Op.or]: [{ tag: { [Op.like]: `%${search}%` } }] },
    });
    nameSearchList = await RESTAURANT.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("r_code")), "r_code"],
        "r_name",
        "image",
        "address",
        "stars",
        "price",
        "takeout",
        "parking",
      ],
      where: { [Op.or]: [{ r_name: { [Op.like]: `%${search}%` } }] },
    });

    searchList.push(...nameSearchList);

    for (const key of searchList) {
      let comment = await COMMENT.findOne({
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("c_code")), "comment_count"],
        ],
        where: { r_code: key.dataValues.r_code },
      });
      result.push({
        r_code: key.dataValues.r_code,
        restaurant_name: key.dataValues.r_name,
        img: key.dataValues.image.split(" ")[0],
        address: key.dataValues.address,
        star: key.dataValues.stars,
        comment_count: comment.dataValues.comment_count,
        price: key.dataValues.price,
        options: {
          takeout: key.dataValues.takeout,
          parking: key.dataValues.parking,
        },
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "검색 로딩중 오류가 발생했습니다. ",
    });
  }
};
