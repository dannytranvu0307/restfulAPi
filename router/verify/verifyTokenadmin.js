const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("access denined")
    try{
         const verify = jwt.verify(token ,"anhvuvandeptrai")
         req.admin = verify;

        next();
    }catch(erro){
        res.status(400).send('Invalid token')
    }
}