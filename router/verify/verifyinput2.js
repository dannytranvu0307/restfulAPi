
const user = require("../../model/User");
const {mongooseToObject} = require('../../mongoose');
module.exports = async  function(req, res, next ){
    const videoid = req.body.videoid;
    const userid = req.user._id;
    var arrayfavoritelist = []; 
    try {
        await user.findById(userid)
        .then((user)=>
        {  array = mongooseToObject(user).favorite
      
         array.map((favorite)=> arrayfavoritelist.push(favorite))
      }
          
        )
        .catch((err)=>
          res.status(404).send('errorrr')
        )
        
     } catch (error) {
        res.send('user is not allowed')
     }
     let vadidate = true;
     for(let value of arrayfavoritelist){
            if(videoid === value)
              vadidate = false;
         }
  
    if(arrayfavoritelist.length === 0)
      return next();
   else if(vadidate){ 
      return next();
   } else{
      return res.send('videoid is already exist')
   }
  
  
}