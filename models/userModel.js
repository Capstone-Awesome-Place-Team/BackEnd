//$npm i express morgan sequelize sequelize-cli mysql2 시퀄라이즈 설치
//$npx sequelize init 시퀄라이즈 호출

const connection = require('../config/mariaDB')
const db = require('../config/database.json');
const table = 'users';
connection.connect();

const User = {
    userID: {
        type: String, 
        required: ture //공부하기
        //unique: ?
    }
    hashedPW: {
        type: String,
        required: true,
    }
    nickname: {
        type: String,
        required: true,
    },
};
