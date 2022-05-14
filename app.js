const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 80; //포트 번호
const router = require("./routes/routes");
const cors = require("cors"); //npm i cors : cors 미들웨어 설치
const getConnection = require("./controllers/DBController");
//테스트용 view를 실행시키기 위한 코드들
const http = require("http");
const server = http.createServer(app);
const hostname = "127.0.0.1";
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//cors 문제 해결
app.use(
  cors({
    origin: "*", //출처 허용
    credential: "true", //사용자 인증이 필요한 리소스 접근
  })
);

//Sequelize 확인
const { sequelize } = require("./models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("연결성공");
  })
  .catch((err) => {
    console.error(`연결실패 - ${err}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.use("/", router);

app.listen(port, () => console.log(`Listening on port ${port}`)); //포트 응답 확인

// const jsonFile = fs.readFileSync("./data.json", "utf8");
// const jsonData = JSON.parse(jsonFile);
// getConnection((conn) => {
//   for (let i = 0; i < 250; i++) {
//     conn.query("insert into RESTAURANT value (?,?,?,?,?,?,?,?,?)", [
//       i,
//       jsonData.data[i].img,
//       jsonData.data[i].restaurant_name,
//       jsonData.data[i].address,
//       jsonData.data[i].tag,
//       jsonData.data[i].price,
//       jsonData.data[i].star,
//       jsonData.data[i].options.parking,
//       jsonData.data[i].options.takeout,
//     ]);
//   }
//   console.log("connection");
//   conn.release();
// });

// pool
//   .getConnection()
//   .then((conn) => {
//     conn
//       .query("SELECT 1 as val")
//       .then((data) => {
//         for (let i = 0; i < 250; i++) {
//           conn.query("insert into RESTAURANT value (?,?,?,?,?,?,?,?,?)", [
//             i,
//             jsonData.data[i].img,
//             jsonData.data[i].restaurant_name,
//             jsonData.data[i].address,
//             jsonData.data[i].tag,
//             jsonData.data[i].price,
//             jsonData.data[i].star,
//             jsonData.data[i].options.parking,
//             jsonData.data[i].options.takeout,
//           ]);
//         }
//       })
//       .then((res) => {
//         conn.release();
//       })
//       .catch((err) => {
//         conn.release();
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log("not connected");
//   });
const configData = JSON.parse(fs.readFileSync("./config/config.json", "utf8"));
let mysql = require("mysql");
let connection = mysql.createConnection({
  username: configData.development.username,
  password: configData.development.password,
  database: configData.development.database,
  host: configData.development.host,
  dialect: configData.development.dialect,
});

let pool = mysql.createPool({
  username: configData.development.username,
  password: configData.development.password,
  database: configData.development.database,
  host: configData.development.host,
  dialect: configData.development.dialect,
});

// connection.connect(function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }

//   console.log("connected as id " + connection.threadId);
// });

const jsonFile = fs.readFileSync("./data.json", "utf8");
const jsonData = JSON.parse(jsonFile);
pool.getConnection(function (err, connection) {
  if (err) throw err; // not connected!

  // Use the connection
  for (let i = 0; i < 250; i++) {
    connection.query(
      "insert into RESTAURANT value (?,?,?,?,?,?,?,?,?)",
      [
        i,
        jsonData.data[i].img,
        jsonData.data[i].restaurant_name,
        jsonData.data[i].address,
        jsonData.data[i].tag,
        jsonData.data[i].price,
        jsonData.data[i].star,
        jsonData.data[i].options.parking,
        jsonData.data[i].options.takeout,
      ],
      function (error, results, fields) {
        if (error) throw error;
        // Neat!
      }
    );
  }
  // connection.query(
  //   "SELECT something FROM sometable",
  //   function (error, results, fields) {
  //     // When done with the connection, release it.
  //     connection.release();

  //     // Handle error after the release.
  //     if (error) throw error;

  //     // Don't use the connection here, it has been returned to the pool.
  //   }
  // );
});
