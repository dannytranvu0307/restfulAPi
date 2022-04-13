
const verifyToken = require('./verify/verifyTokenadmin')
const router = require('express').Router();

const adminController = require('../controller/AdminController');
router.post('/login',adminController.login);
router.post('/register',verifyToken, adminController.register);
router.delete('/delete' ,verifyToken , adminController.delete);
router.get('/userlist',verifyToken , adminController.showuser);
router.get('/courselist',verifyToken , adminController.showcourse);
router.post('/addcourse',verifyToken, adminController.addcourse);
router.delete('/deletecourse' , verifyToken , adminController.deletecourse);

module.exports = router;    