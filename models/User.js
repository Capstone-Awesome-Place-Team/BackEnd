//Model: DB에서 값을 가져오고 Controller에 반환하는 역할
//UserModel작성하기

const connection = require('../config/mariaDB')
connection.connect();

const User = {
    //User데이터 불러오기
    getUser: async (id) => {
    }
    //User데이터 입력하기
}
