##  맛집 추천 웹 서비스(Recommending restaurant web service) : BackEnd
#### Description
  > 22.02.14 ~ 22.05.31
#### 👨‍💻Member
  > 이선호
  > 
  > 정의정
#### contest
  > 📌 2022 Capstone Design 강의 프로젝트

### 개요
  > 서울열린데이터광장에서 제공하는 공공데이터를 가공, 활용하여 소비자가 선택한 음식점에 대한 정보를 보다 쉽게 제공받을 수 있는 서비스

### DNS
  - [백엔드 서버](http://ec2-44-192-125-43.compute-1.amazonaws.com)

### 프로젝트 내용
  * 서버 및 DB
    * node.js의 express를 활용
    * AWS EC2를 이용하여 서버 환경 구축
    * AWS RDS를 이용하여 mariaDB 구축
    * AWS S3 버킷에 음식점 이미지 저장
    * DB에 선정한 약 300개 음식점 이미지 url 및 옵션 삽입
    * node.js sequelize를 사용해 DB 관리 및 모델 접근
  * 기능
    * 회원가입 페이지: 회원가입(hash 암호화) 기능
    * 로그인 페이지: 로그인(JWT) 기능
    * 마이 페이지: 회원 정보 수정, 찜 목록 리스트 조회 및 취소 기능
    * 메인 페이지: 검색, 룰렛, 선택장애, 카테고리 기능
    * 테마 별 추천 페이지: 테마 리스트 조회 기능
    * 검색결과 페이지: 검색결과 조회 기능
    * 맛집 상세 페이지: 맛집 정보, 댓글 추가, 찜 설정 및 취소 기능

### 일정
  <img src="https://user-images.githubusercontent.com/94631526/169692380-93ad45d0-107f-45c1-8966-5f73237b9c1c.png" width=650 height=600>
  
### 요구사항
  <img src="https://user-images.githubusercontent.com/94631526/169692379-441af978-ce7f-437f-b6f7-5fb6c108e308.png" width=650 height=300>
  
### 아키텍처
  <img src="https://user-images.githubusercontent.com/94631526/169692075-60d02f83-4c90-47fd-8a81-082d688c392d.png" width=500 height=300>
  
### 설계
#### 1. ERD
  <img src="https://user-images.githubusercontent.com/94631526/169692364-535469e3-a697-4769-ac34-b6ea0a146d36.png" width=650 height=450>
  
#### 2. Class Diagram
  <img src="https://user-images.githubusercontent.com/94631526/169692370-55ddea71-5968-41b1-a76d-5472ad09d562.png" width=500 height=300>
  <img src="https://user-images.githubusercontent.com/94631526/169692366-6ba2d275-0513-4ba3-82e1-39c3e155cb19.png" width=500 height=300>
  <img src="https://user-images.githubusercontent.com/94631526/169692362-4623e5d5-72ce-4cde-848a-ebce3096b223.png" width=500 height=400>
  <img src="https://user-images.githubusercontent.com/94631526/169692365-dd16a4a1-8ac7-44ec-bf7b-8f6e949e5afd.png" width=500 height=200>
  <img src="https://user-images.githubusercontent.com/94631526/169692368-265e2ef4-33f1-404c-b754-78e5e97bec08.png" width=500 height=300>
  
#### 3. Sequence Diagram
  manager는 Controller&DAO 역할을 수행함
  
  <img src="https://user-images.githubusercontent.com/94631526/169692382-ec4df12c-69d1-456f-abe4-379e8d480fce.png" width=500 height=300>
  <img src="https://user-images.githubusercontent.com/94631526/169692373-e9e41706-a0cf-49d1-9030-268540476cea.png" width=500 height=300>
  <img src="https://user-images.githubusercontent.com/94631526/169692374-ad144450-8380-421c-b865-d07809870abb.png" width=500 height=300>
  <img src="https://user-images.githubusercontent.com/94631526/169692371-f628a960-3296-4c05-b7ad-865bc64f106d.png" width=500 height=300>
  <img src="https://user-images.githubusercontent.com/94631526/169692377-5b2516d7-b171-4b01-a14d-5e6ce47a01a8.png" width=500 height=300>
  <img src="https://user-images.githubusercontent.com/94631526/169692381-eef2964d-83ab-4541-933a-ba5170ce0d3b.png" width=500 height=300>
  <img src="https://user-images.githubusercontent.com/94631526/169692375-9aa74169-775e-44c4-8329-eee604bc7543.png" width=500 height=400>
