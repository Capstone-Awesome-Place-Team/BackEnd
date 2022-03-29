//$npm i cors 를 수행해서 패키지 설치

const fs = require('fs');
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const router = require('./routes/routes')

const whitelist = ["http://localhost:8080"];
const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }else callback(new Error("NotAllowed Origin"));
    }, 
};

app.unsubscribe(cors(corsOptions)); //옵션 추가한 cors 미들웨어 추가
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', router)

app.listen(port, () => console.log(`Listening on port ${port}`)); //포트 응답 확인