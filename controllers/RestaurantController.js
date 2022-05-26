//Model
const RESTAURANT = require("../models/").RESTAURANT;
const COMMENT = require("../models/").COMMENT;
const LIKE = require("../models/").LIKE;
const USER = require("../models/").USER;

const sequelize = require("sequelize");
const { Op } = require("sequelize");

//카테고리
exports.Category = async function (req, res) {
  try {
    let category = req.body.category;
    let categoryList = [];
    let result = [];
    //카테고리에 맞는 음식점 리스트 select
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
          where: { tag: { [Op.like]: "%한식%" } },
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
          where: { tag: { [Op.like]: "%중국식%" } },
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
          where: { tag: { [Op.like]: "%일식%" } },
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
          where: { tag: { [Op.like]: "%뷔페%" } },
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
          where: { tag: { [Op.like]: "%경양식%" } },
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
          where: { tag: { [Op.like]: "%분식%" } },
        });
        break;
      default:
        res.status(400).json({
          error: "잘못된 요청입니다. ",
        });
        return;
    }
    for (const key of categoryList) {
      //해당 음식점의 댓글 개수 select
      let comment = await COMMENT.findOne({
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("c_code")), "comment_count"],
        ],
        where: { r_code: key.dataValues.r_code },
      });
      //음식점 정보 배열에 하나씩 삽입
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

//음식점 상세정보
exports.RestaurantDetail = async function (req, res) {
  try {
    let like = false; //찜 여부
    let comments = [];
    let mycomment;
    if (req.headers.authorization != undefined) { //로그인 한 경우
      //요청 헤더 내의 authorization 헤더에서 토큰 추출
      let token = req.headers.authorization.split("Bearer ")[1];
      //토큰과 일치하는 user id select
      let userid = await USER.findOne({
        attribute: ["id"],
        where: { token: token },
      });
      //해당 음식점을 찜했는지 확인
      await LIKE.findOne({
        where: { id: userid.dataValues.id, r_code: req.params.r_code },
      }).then((result) => {
        if (result == null) {
          like = false;
        } else {
          like = true;
        }
      });
      //해당 user가 남긴 댓글 정보 select
      let mycommentInfo = await COMMENT.findOne({
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
      if (mycommentInfo != null) {
        mycomment = {
          star: mycommentInfo.dataValues.star,
          title: mycommentInfo.dataValues.comment_title,
          content: mycommentInfo.dataValues.comment_content,
          time: mycommentInfo.dataValues.createdAt,
        };
      } else { //남긴 댓글이 없는 경우
        mycomment = {
          star: 0,
          title: "",
          content: "",
          time: "",
        };
      }
    } else {
      //게스트인 경우
      mycomment = {
        star: 0,
        title: "",
        content: "",
        time: "",
      };
    }
    //해당 음식점 정보 select
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
    //이미지 url 두개 나누기
    let img_list = restaurantInfo.dataValues.image.split(" ");
    //해당 음식점에 남긴 댓글 전부 select
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
    for (const key of commentList) {
      let nickname = await USER.findOne({
        attribute: ["nickname"],
        where: { id: key.dataValues.id },
      });
      //댓글 정보 배열에 하나씩 삽입
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

//음식점 검색
exports.Search = async function (req, res) {
  try {
    let search = req.body.search; //검색 키워드
    let searchList = [];
    let result = [];
    // 검색 키워드에 해당하는 음식점 리스트 select
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
      where: {
        [Op.or]: [
          { tag: { [Op.like]: `%${search}%` } },
          { r_name: { [Op.like]: `%${search}%` } },
        ],
      },
    });
    for (const key of searchList) {
      let comment = await COMMENT.findOne({
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("c_code")), "comment_count"],
        ],
        where: { r_code: key.dataValues.r_code },
      });
      //검색 결과 음식점 정보 하나씩 배열에 삽입
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

//음식점 검색 새로고침
exports.SearchList = async function (req, res) { 
  try {
    let search = req.params.search; //검색 키워드
    let searchList = [];
    let result = [];
    // 검색 키워드에 해당하는 음식점 리스트 select
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
      where: {
        [Op.or]: [
          { tag: { [Op.like]: `%${search}%` } },
          { r_name: { [Op.like]: `%${search}%` } },
        ],
      },
    });
    for (const key of searchList) {
      let comment = await COMMENT.findOne({
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("c_code")), "comment_count"],
        ],
        where: { r_code: key.dataValues.r_code },
      });
      //검색 결과 음식점 정보 하나씩 배열에 삽입
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
