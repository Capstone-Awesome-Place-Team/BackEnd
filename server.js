const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; //포트 번호 회의 필요
const router = require('./routes/routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', router)

app.listen(port, () => console.log(`Listening on port ${port}`)); //포트 응답 확인