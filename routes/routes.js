//request의 end point를 어떤 모듈에서 처리할 지
var express = require("express");
var router = express.Router();
const req = require("express/lib/request");
var UserController = require("../controllers/UserController");
var LikeController = require("../controllers/LikeController");
var ThemeController = require("../controllers/ThemeController");
var RestaurantController = require("../controllers/RestaurantController");
//controller 읽기

router.post("/signup", UserController.Signup); //회원가입 url 매핑
router.post("/signin", UserController.Signin); //로그인 url 매핑
router.get("/mypage", UserController.Mypage); //마이페이지 url 매핑
router.put("/user_edit", UserController.UserEdit); //개인정보 수정 url 매핑
router.post("/like", LikeController.Like); //찜하기 url 매핑
router.delete("/like", LikeController.Like); //찜취소 url 매핑
router.get("/main", ThemeController.Main); //메인정보불러오기 url 매핑
router.get("/theme_list/:theme_title", ThemeController.Theme_list); //테마별추천페이지 음식점 정보불러오기 url 매핑
router.post("/category", RestaurantController.Category); //카테고리 url 매핑
router.get("/restaurant/:r_code", RestaurantController.RestaurantDetail); //상세페이지 url 매핑

module.exports = router;
