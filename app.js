const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000; //포트 번호
const router = require('./routes/routes')
const cors = require('cors'); //npm i cors : cors 미들웨어 설치

//테스트용 view를 실행시키기 위한 코드들
const http = require('http');
const server = http.createServer(app);
const hostname = '127.0.0.1';
const path = require('path')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//cors 문제 해결
app.use(cors({
    origin: '*', //출처 허용
    credential: 'true' //사용자 인증이 필요한 리소스 접근
}))

//Sequelize 확인
const { sequelize } = require('./models');
sequelize.sync({ force : false})
	.then(() => {
		console.log('연결성공');
	})
	.catch((err) => {
		console.error(`연결실패 - ${err}`);
	});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/signup', (req, res) => {
	res.render('signup');
})
app.use('/', router)

app.listen(port, () => console.log(`Listening on port ${port}`)); //포트 응답 확인
