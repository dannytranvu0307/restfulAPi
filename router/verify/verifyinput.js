const Course = require('../../model/Course');

module.exports = async  function (req, res, next){
   const id =  req.body.videoid ;
   if(!id){
      return res.status(404).send('access deninde')
   }
   
   try {
      const verify = await Course.findById(id);
      if(verify){
         return next();
      }
      
   } catch (error) {
      res.send("invalid id")
   }
   
    
}