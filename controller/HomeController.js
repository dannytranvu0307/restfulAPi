const Course = require('../model/Course');
const user = require('../model/User')



class HomeController{
     show(req, res , next){
      Course.find({})
      .then((course)=>
      res.json(course))
      .catch(next)
      
    }
    

  // you needa post videoid 
  favoriteadd(req, res, next){
    const id = req.user._id;
     user.findByIdAndUpdate(id,{ "$push": {"favorite": req.body.videoid }})
      .then(()=>{
        res.json({"status":"successed"})
      })
      .catch(next)
  
    
  }
  favoritedelete(req, res, next){
    const id = req.user._id;
    user.findByIdAndUpdate(id, { "$pull": {"favorite": req.body.videoid }})
     .then(()=>{
       res.json({"status":"successed"})
     })
     .catch(next)
    
  }
    showfavorite(req, res, next ){
      const id = req.user._id;
      user.findById(id)
      .then((user)=>{
        const listfavoriteid = user.favorite;
        Course.find({_id: listfavoriteid })
        .then((course)=>{
          res.json(course)
        })
        .catch(next)
      })
      .catch(next)
    }
   
}
module.exports = new  HomeController();