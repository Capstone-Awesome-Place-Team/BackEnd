const User = require('../models/User.js'); //Model 읽기 로그인에 필요할 것으로 예상됨
const Views = '../views'
//아직 view에 대한 계획 X
//router에서 받은 request에 대해 Model에서 받은 데이터 작업 수행 후 결과 View로 전달

const connection = require('../config/mariaDB')
connection.connect();

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
module.export = {
    SignupUser: function (req, res, next) {
        try {
            let token = req.body.token;
            let id = req.body.id;
            let pw = req.body.pw;
            let nickname = req.body.nickname;
            let sql1 = 'SELECT id FROM USER WHERE id = ?' //sql 쿼리문-> id 에맞는 row들고 오고싶다
            connection.query(sql1, [user_id], function (err, rows, fields) {
                console.log(rows);
                
                if (rows[0] === undefined) { //중복되는게 없는 경우 DB에 INSERT
                    let sql2 = 'INSERT INTO USER VALUES (?, ?, ?, ?, ?)';
            
                    let { hashedPassword, salt} = await createHashedPassword(pw);
                    let params = [token, id, hashedPassword, salt, nickname];
                    connection.query(sql2, params,
                        (err, rows, fields) => {
                        res.send(rows);
                        });
                    }
                else {    
                    res.status(400).send({ //번호 바꿔야하는지?
                        errorMessage: '해당 ID는 이미 존재합니다. '
                    });  //ID 중복
                }
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({
                errorMessage: '회원가입 중 오류 발생했습니다. '
            })
        }
    }
}