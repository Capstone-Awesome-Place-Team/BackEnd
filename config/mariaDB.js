const fs = require('fs');
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

module.exports = connection;