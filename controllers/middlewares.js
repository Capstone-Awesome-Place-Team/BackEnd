const jwt = require('jsonwebtoken');

exports.verifyToken = async function(req, res) {
    try{
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {//유효 기간 초과
            return res.status(419).json({
                message: '토큰이 만료되었습니다. '
            });
        }
        return res.status(401).json({
            message: '유효하지 않은 토큰입니다'
        })
    }
}