

const router = require('express').Router();
const verify = require('./verify/verifyToken');
const verifyinput1= require('./verify/verifyinput')
const verifyinput2 = require('./verify/verifyinput2')
const verifydelete = require('./verify/verifydelete')
const HomeController = require('../controller/HomeController');
router.get("/show", HomeController.show)

//patch a videoid 
router.patch("/addfavorite", verify ,verifyinput1 ,verifyinput2, HomeController.favoriteadd)
router.patch("/deletefavorite", verify ,verifyinput1,verifydelete, HomeController.favoritedelete)

router.get('/showfavorite' , verify , HomeController.showfavorite);



module.exports = router;    