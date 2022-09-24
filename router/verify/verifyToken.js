const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.json({'erro':'access denined'})
    try{
         const verify = jwt.verify(token ,"anhvudeptraivcl")
         req.user = verify;

        next();
    }catch(erro){
        res.status(400).json({'erro':'Invalid token'})
    }
}