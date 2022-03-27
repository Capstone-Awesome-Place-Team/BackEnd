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

app.listen(port, () => console.log(`Listening on port ${port}`));