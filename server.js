const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; //포트 회의 필요

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); 
const mariaDB = require('mysql');

const connection = mariaDB.createConnection({ //DB 연결
  host: conf.host, 
  user: conf.user, 
  password: conf.password, 
  port: conf.port, 
  database: conf.database
});
connection.connect();

const req = require('express/lib/request');

const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });

const createHashedPassword = (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64'), salt });
        });
    });

//회원가입
app.post('/signup', (req, res) => {
    let sql = 'INSERT INTO USER VALUES (?, ?, ?, ?, ?)';
    let token = req.body.token; //토큰은 이렇게 받는걸까?
    let id = req.body.id;
    let pw = req.body.pw;
    let nickname = req.body.nickname;
    let { hashedPw, salt} = await createHashedPassword(pw);
    let params = [token, id, hashedPw, salt, nickname];
    connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
      }
    );
  });

app.listen(port, () => console.log(`Listening on port ${port}`));