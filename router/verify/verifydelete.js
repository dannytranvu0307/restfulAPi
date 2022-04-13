
const user = require("../../model/User");
const {mongooseToObject} = require('../../mongoose');
module.exports = async  function(req, res, next ){
    const videoid = req.body.videoid;
    const userid = req.user._id;
    var arrayfavoritelist ;
    try {
        await user.findById(userid)
        .then((user)=>
          arrayfavoritelist = mongooseToObject(user).favorite  
        )
        .catch((err)=>
          res.status(404).send('errorrr')
        )
        
     } catch (error) {
        res.send('user is not allowed')
     }

   if(arrayfavoritelist.length !== 0){
      let vadidate = false;
    for( let value of arrayfavoritelist){
       if( videoid === value ){
          vadidate = true
       }
     }
     if(vadidate){
      next();
     } else{
        res.send('videoid dont exist')
     }
   }else{
      return  res.send('your list is empty, add some video ');
   }
}